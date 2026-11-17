import axios from "axios";
import { getCryptoStorage, removeCryptoStorage } from "../Utils/StorageHandle";

export interface AuthStorage {
  accessToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// 1. Otomatis sisipkan token dari storage terenkripsi ke setiap request
api.interceptors.request.use((config) => {
  const auth = getCryptoStorage<AuthStorage>("auth");
  const token = auth?.accessToken ?? localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Otomatis hapus storage & redirect jika server membalas 401 (token expired/tidak valid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeCryptoStorage("auth");
      localStorage.removeItem("access_token");

        if (!window.location.pathname.startsWith("/auth")) {
          window.location.href = "/auth";
        }
    }

    return Promise.reject(error);
  }
);

export default api;