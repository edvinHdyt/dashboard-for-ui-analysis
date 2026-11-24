// src/Utils/useBehaviorTracker.ts
import { useEffect } from 'react';
import { behaviorStore } from './behaviorStore';
import { flushOnPageHide } from './flushBehavior';

// Masukan pengguna yang dianggap aktivitas (untuk idle_time).
// scroll tidak bubbling, jadi listener dipasang dengan capture: true.
const ACTIVITY_EVENTS = [
  'mousemove',
  'pointerdown',
  'keydown',
  'scroll',
  'wheel',
  'touchstart',
] as const;

/**
 * Dipasang di MainLayout (dan di layar HandleLogout sebagai cadangan).
 * - Listener aktivitas  -> idle_time
 * - visibilitychange    -> hidden_time dan pembekuan idle saat tab tersembunyi
 * - pagehide            -> kirim data saat tab/browser ditutup atau refresh
 */
export function useBehaviorTracker(): void {
  useEffect(() => {
    const onActivity = () => behaviorStore.recordActivity();
    const onVisibility = () =>
      behaviorStore.setHidden(document.visibilityState === 'hidden');
    const onPageHide = () => flushOnPageHide();

    ACTIVITY_EVENTS.forEach((evt) =>
      window.addEventListener(evt, onActivity, { passive: true, capture: true })
    );
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);

    onVisibility();

    return () => {
      ACTIVITY_EVENTS.forEach((evt) =>
        window.removeEventListener(evt, onActivity, { capture: true })
      );
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, []);
}
