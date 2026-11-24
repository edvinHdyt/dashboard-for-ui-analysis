import { useNavigate } from "react-router";
import { removeCryptoStorage } from "./StorageHandle";
import api from "./Api";
import { useCallback, useEffect, useRef, useState } from "react";
import { behaviorStore } from "./behaviorStore";
import { flushBehaviorViaApi } from "./flushBehavior";
import { useBehaviorTracker } from "./useBehaviorTracker";

const HandleLogout = () => {
    const navigate = useNavigate();
    const called = useRef(false);
    const [status, setStatus] = useState<"sending" | "error">("sending");

    // Cadangan: jika tab ditutup saat layar ini tampil (MainLayout sudah
    // di-unmount, jadi listener pagehide miliknya sudah dilepas)
    useBehaviorTracker();
    behaviorStore.clearTrackLatencyCount();

    const run = useCallback(async () => {
        setStatus("sending");

        // 1. Kirim data perilaku dulu (token masih valid)
        const saved = await flushBehaviorViaApi();
        if (!saved) {
            // Tahan di halaman ini, token dan sesi tetap utuh
            setStatus("error");
            return;
        }

        // 2. Baru logout (alur asli Anda tidak berubah)
        try {
            const res = await api.post("/logout");
            localStorage.setItem("status", res.data.message);
        } catch (err) {
            console.log(err);
        } finally {
            removeCryptoStorage("auth");
            behaviorStore.clear();
            navigate("/auth", { replace: true });
        }
    }, [navigate]);

    useEffect(() => {
        if (called.current) return;
        called.current = true;
        run();
    }, [run]);

    if (status === "error") {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
                <p className="font-semibold">Data sesi gagal disimpan.</p>
                <p className="text-sm">
                    Periksa koneksi internet Anda lalu coba lagi. Jangan tutup halaman ini.
                </p>
                <button
                    onClick={run}
                    className="rounded-md bg-primary px-4 py-2 text-white cursor-pointer"
                >
                    Coba lagi
                </button>
            </div>
        );
    }

    return <p className="p-6 text-center">Menyimpan data sesi...</p>;
};

export { HandleLogout };
