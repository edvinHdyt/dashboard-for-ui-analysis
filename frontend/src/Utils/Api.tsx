import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { getCryptoStorage, removeCryptoStorage } from "../Utils/StorageHandle";
import { behaviorStore } from "../Utils/behaviorStore";

export interface AuthStorage {
  accessToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

interface ResponsePingInterface{
  duration:number
}
export const checkApi = () => {
  if (behaviorStore.getLatencyRateListLen() <= 10){
    api.get("/ping")
    .then((res:AxiosResponse<ResponsePingInterface>) => {
      behaviorStore.trackLatencyDuration(res.duration ?? 0);
    }).catch(() => {
      
    })
  }
}

// Config request yang ditandai agar hitungan request berjalan selalu seimbang
type TrackedConfig = InternalAxiosRequestConfig & { __idleTracked?: boolean };

const MUTATING = ["post", "put", "patch", "delete"];

// Bukan aksi pengguna: tidak masuk attempt_count dan error_count
const EXCLUDED_ATTEMPT = ["/login", "/logout", "/behavior-logs", "/ping"];
// Tidak membekukan idle (permintaan milik tracker sendiri)
const EXCLUDED_IDLE = ["/behavior-logs", "/ping"];

const matches = (list: string[], url?: string) =>
  list.some((p) => url?.includes(p));

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}`,
  // Request menggantung membekukan idle tanpa batas, jadi beri batas waktu
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// 1. Sisipkan token dan tandai request yang membekukan idle
api.interceptors.request.use((config) => {
  const auth = getCryptoStorage<AuthStorage>("auth");
  const token = auth?.accessToken ?? localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!matches(EXCLUDED_IDLE, config.url)) {
    (config as TrackedConfig).__idleTracked = true;
    behaviorStore.requestStart();
  }
  return config;
});

// Selesaikan pelacakan request (tepat sekali per request)
const endTracking = (cfg?: TrackedConfig) => {
  if (cfg?.__idleTracked) {
    cfg.__idleTracked = false;
    behaviorStore.requestEnd();
  }
};

// 2. Hitung attempt/error, lalu hapus storage & redirect jika 401
api.interceptors.response.use(
  (response) => {
    endTracking(response.config as TrackedConfig);

    // Mutasi sukses = satu percobaan berhasil
    const method = (response.config.method ?? "").toLowerCase();
    if (
      MUTATING.includes(method) &&
      !matches(EXCLUDED_ATTEMPT, response.config.url)
    ) {
      behaviorStore.addAttempt();
    }
    return response;
  },
  (error) => {
    endTracking(error.config as TrackedConfig | undefined);

    const status = error.response?.status;
    const method = (error.config?.method ?? "").toLowerCase();
    const url: string = error.config?.url ?? "";

    // Mutasi ditolak karena input/aksi pengguna (400-422, kecuali 401) =
    // satu percobaan gagal. 5xx, timeout, dan jaringan putus tidak dihitung.
    if (
      MUTATING.includes(method) &&
      !matches(EXCLUDED_ATTEMPT, url) &&
      typeof status === "number" &&
      status >= 400 &&
      status <= 422 &&
      status !== 401
    ) {
      behaviorStore.addError();
      behaviorStore.addAttempt();
    }

    if (status === 401) {
      removeCryptoStorage("auth");
      localStorage.removeItem("access_token");
      behaviorStore.clear(); // sesi tidak bisa dikirim lagi

      if (!window.location.pathname.startsWith("/auth")) {
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
