import type { AuthStorage } from "./Api";
import { getCryptoStorage } from "./StorageHandle";

export type SendTrigger = 'logout' | 'pagehide';

const IDLE_MAIN_MS = 2000;
const IDLE_ALT1_MS = 3000;
const IDLE_ALT2_MS = 5000;
const ACTIVITY_THROTTLE_MS = 100;

let latencyCount:number[] = [];

const idleContribution = (gap: number, threshold: number): number => gap > threshold ? gap : 0;

export interface BehaviorState {
  sessionId: string;
  startedAt: number;          // epoch ms, awal task_time
  endedAt: number | null;     // dibekukan saat flush jalur logout
  // --- fitur ML ---
  errorCount: number;         // jumlah kesalahan pengguna
  attemptCount: number;       // jumlah percobaan aksi (sukses + gagal)
  featureUsage: number;       // total pemakaian fitur
  idleMs: number;             // idle_time, ambang 2 detik
  idleMs3: number;            // ambang 3 detik (sensitivitas)
  idleMs5: number;            // ambang 5 detik (sensitivitas)
  // --- fitur konteks ---
  deviceWidth: number;
  deviceScreen: string;
  latencyMs: number | null;   // median ping (diisi di tahap berikutnya)
  // --- data pendamping ---
  requestTimeTotal: number;   // total waktu ada request berjalan
  hiddenTime: number;         // total waktu tab tersembunyi
  // --- status pengiriman ---
  sent: boolean;
  sendTrigger: SendTrigger | null;
}

export class BehaviorStore {
  private static readonly STORAGE_KEY = 'behavior_session';

  // null = belum ada sesi (sebelum login / setelah logout)
  private state: BehaviorState | null;

  private lastActivityAt = Date.now();      // aktivitas pengguna terakhir
  private inflight = 0;                     // jumlah request yang sedang berjalan
  private hidden = false;                   // tab sedang tersembunyi?
  private pausedSince: number | null = null; // mulai pembekuan (request ATAU tab tersembunyi)
  private pausedAccum = 0;                  // ms terbekukan dalam jeda berjalan
  private busySince: number | null = null;  // untuk request_time_total
  private hiddenSince: number | null = null; // untuk hidden_time


  constructor() {
    this.state = this.load();

     const now = Date.now();
    this.lastActivityAt = now; // setelah refresh, waktu memuat ulang tidak dihitung
    this.hidden =
      typeof document !== 'undefined' && document.visibilityState === 'hidden';
    if (this.hidden) this.hiddenSince = now;
    this.refreshPause(now);
  }

  startSession(): void {
    const now = Date.now();
    this.state = {
      sessionId: crypto.randomUUID(),
      startedAt: now,
      endedAt: null,
      errorCount: 0,
      attemptCount: 0,
      featureUsage: 0,
      idleMs: 0,
      idleMs3: 0,
      idleMs5: 0,
      deviceWidth: window.innerWidth,
      deviceScreen: `${window.innerWidth}x${window.innerHeight}`,
      latencyMs: null,
      requestTimeTotal: 0,
      hiddenTime: 0,
      sent: false,
      sendTrigger: null,
    };
    this.resetTrackers(now);
    this.persist();
  }

  clear(): void {
    this.state = null;
    try {
      sessionStorage.removeItem(BehaviorStore.STORAGE_KEY);
    } catch {
      /* diabaikan */
    }
  }

  clearTrackLatencyCount(): void{
    latencyCount = []
  }

  hasSession(): boolean {
    return this.state !== null;
  }

  // ------------------------------------------------------------
  // Pencatat. Semuanya diabaikan bila belum ada sesi atau data sudah
  // terkirim, sehingga kegagalan login tidak ikut menaikkan error_rate.
  // ------------------------------------------------------------

  addAttempt(): void{
    if(!this.isRecording()) return;
    this.state!.attemptCount += 1;
    this.persist();
  }

  addError(): void {
    if (!this.isRecording()) return;
    this.state!.errorCount += 1;
    this.persist();
  }

  trackLatencyDuration(duration:number):void{
    if(this.getLatencyRateListLen() < 10){
      latencyCount.push(duration);
      return;
    }

    const totalLatency = latencyCount.reduce((prev, curr) => {
      return prev + curr; 
    });

    this.state!.latencyMs = Math.round(totalLatency/this.getLatencyRateListLen());
    this.persist();
  }

  trackFeature(): void {
    if (!this.isRecording()) return;
    this.state!.featureUsage += 1;
    this.persist();
  }

  getErrorCount(): number {
    return this.state?.errorCount ?? 0;
  }

  getLatencyRateListLen():number{
    return latencyCount.length;
  }

  getSession():void{
    console.log(this.state);
  }

  recordActivity(): void {
    if (!this.isRecording()) return;
    const now = Date.now();

    if (now - this.lastActivityAt < ACTIVITY_THROTTLE_MS && this.pausedSince === null) {
      return;
    }
    this.closeGap(now);
  }

  requestStart(): void {
    const now = Date.now();
    if (this.inflight === 0) this.busySince = now;
    this.inflight += 1;
    this.refreshPause(now);
  }

  requestEnd(): void {
    if (this.inflight === 0) return;
    const now = Date.now();
    this.inflight -= 1;
    if (this.inflight === 0 && this.busySince !== null) {
      if (this.isRecording()) {
        this.state!.requestTimeTotal += now - this.busySince;
        this.persist();
      }
      this.busySince = null;
    }
    this.refreshPause(now);
  }

  /** Dipanggil dari listener visibilitychange. */
  setHidden(hidden: boolean): void {
    if (hidden === this.hidden) return;
    const now = Date.now();
    this.hidden = hidden;
    if (hidden) {
      this.hiddenSince = now;
    } else if (this.hiddenSince !== null) {
      if (this.isRecording()) {
        this.state!.hiddenTime += now - this.hiddenSince;
        this.persist();
      }
      this.hiddenSince = null;
    }
    this.refreshPause(now);
  }

  /** Untuk pengujian di konsol: keadaan internal pelacak idle. */
  getIdleDebug() {
    return {
      inflight: this.inflight,
      hidden: this.hidden,
      msSinceActivity: Date.now() - this.lastActivityAt,
      pausedNow: this.pausedSince !== null,
    };
  }

  // ------------------------------------------------------------
  // Pengiriman
  // ------------------------------------------------------------

  snapshot(freezeEnd = false) {
    if (!this.state) return null;

    const endedAt = this.state.endedAt ?? Date.now();
    if (freezeEnd && this.state.endedAt === null) {
      this.state.endedAt = endedAt;
      this.persist();
    }
    const s = this.state;

    const auth:AuthStorage |null= getCryptoStorage("auth");
    const id_user = auth?.user.id;
    
    return {
      id_user,
      session_id: s.sessionId,
      task_time: endedAt - s.startedAt,
      idle_time: Math.round(s.idleMs),
      error_count: s.errorCount,
      attempt_count: s.attemptCount,
      feature_usage: s.featureUsage,
      device_width: s.deviceWidth,
      device_screen: s.deviceScreen,
      latency_rate: s.latencyMs,
      request_time_total: Math.round(s.requestTimeTotal),
      hidden_time: Math.round(s.hiddenTime),
      started_at: new Date(s.startedAt).toISOString(),
      ended_at: new Date(endedAt).toISOString(),
    };
  }

  isSent(): boolean {
    return this.state?.sent ?? false;
  }

  /** Tandai data sudah terkirim sukses, beserta jalurnya. */
  markSent(trigger: SendTrigger): void {
    if (!this.state) return;
    this.state.sent = true;
    this.state.sendTrigger = trigger;
    this.persist();
  }

  getSendTrigger(): SendTrigger | null {
    return this.state?.sendTrigger ?? null;
  }

  // ------------------------------------------------------------
  // Internal
  // ------------------------------------------------------------

  private isRecording(): boolean {
    return this.state !== null && !this.state.sent;
  }

  private refreshPause(now: number): void {
    const shouldPause = this.inflight > 0 || this.hidden;
    if (shouldPause && this.pausedSince === null) {
      this.pausedSince = now;
    } else if (!shouldPause && this.pausedSince !== null) {
      this.pausedAccum += now - this.pausedSince;
      this.pausedSince = null;
    }
  }

  /**
   * Tutup jeda yang sedang berjalan pada waktu `now`: kurangi waktu yang
   * terbekukan, tambahkan ke idle sesuai ambang, lalu mulai jeda baru.
   */
  private closeGap(now: number): void {
    if (!this.isRecording()) return;

    const pausedTotal =
      this.pausedAccum +
      (this.pausedSince !== null ? now - this.pausedSince : 0);
    const gap = Math.max(0, now - this.lastActivityAt - pausedTotal);

    const s = this.state!;
    const add2 = idleContribution(gap, IDLE_MAIN_MS);
    const add3 = idleContribution(gap, IDLE_ALT1_MS);
    const add5 = idleContribution(gap, IDLE_ALT2_MS);
    s.idleMs += add2;
    s.idleMs3 += add3;
    s.idleMs5 += add5;

    // Mulai jeda baru
    this.lastActivityAt = now;
    this.pausedAccum = 0;
    if (this.pausedSince !== null) this.pausedSince = now;

    if (add2 > 0 || add3 > 0 || add5 > 0) this.persist();
  }

  private resetTrackers(now: number): void {
    this.lastActivityAt = now;
    this.pausedAccum = 0;
    this.pausedSince = this.inflight > 0 || this.hidden ? now : null;
    this.busySince = this.inflight > 0 ? now : null;
    this.hiddenSince = this.hidden ? now : null;
  }

  private load(): BehaviorState | null {
    try {
      const raw = sessionStorage.getItem(BehaviorStore.STORAGE_KEY);
      return raw ? (JSON.parse(raw) as BehaviorState) : null;
    } catch {
      return null;
    }
  }


  private persist(): void {
    if (!this.state) return;
    try {
      sessionStorage.setItem(
        BehaviorStore.STORAGE_KEY,
        JSON.stringify(this.state)
      );
    } catch {
      /* storage penuh/diblokir: data tetap ada di memori */
    }
  }
}

// Instance tunggal yang dipakai seluruh aplikasi
export const behaviorStore = new BehaviorStore();

 