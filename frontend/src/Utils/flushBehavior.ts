// src/Utils/flushBehavior.ts
import api, { type AuthStorage } from './Api';
import { getCryptoStorage } from './StorageHandle';
import { behaviorStore } from './behaviorStore';


export async function flushBehaviorViaApi(): Promise<boolean> {
  if (!behaviorStore.hasSession() || behaviorStore.isSent()) return true;

  const payload = behaviorStore.snapshot(true);
  if (!payload) return true;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await api.post('/behavior-logs/create', { ...payload, send_trigger: 'logout' });
      behaviorStore.markSent('logout');
      return true;
    } catch {
      /*  */
    }
  }
  return false;
}

export function flushOnPageHide(): void {
  if (!behaviorStore.hasSession() || behaviorStore.isSent()) return;

  const payload = behaviorStore.snapshot(false);
  const token = getCryptoStorage<AuthStorage>('auth')?.accessToken;
  if (!payload || !token) return;

  fetch(`${import.meta.env.VITE_BACKEND_URI}/behavior-logs/create`, {
    method: 'POST',
    keepalive: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...payload, send_trigger: 'pagehide' }),
  }).catch(() => {
    /*  */
  });
}
