import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_CRYPTO_SECRET || "default-secret-key";

// Menyimpan data terenkripsi ke localStorage
export function setCryptoStorage<T>(key: string, value: T): void {
  const jsonString = JSON.stringify(value);
  const ciphertext = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
  localStorage.setItem(key, ciphertext);
}

// Mengambil & mendekripsi data dari localStorage
export function getCryptoStorage<T>(key: string): T | null {
  const ciphertext = localStorage.getItem(key);
  if (!ciphertext) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    // Jika gagal dekripsi (misal value di DevTools diubah manual)
    if (!decryptedText) {
      localStorage.removeItem(key);
      return null;
    }

    return JSON.parse(decryptedText) as T;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

// Menghapus data dari localStorage
export function removeCryptoStorage(key: string): void {
  localStorage.removeItem(key);
}