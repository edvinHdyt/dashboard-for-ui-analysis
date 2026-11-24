import { Navigate, Outlet, useMatches } from "react-router";
import NavbarLogin from "./Navigations/NavbarLogin";
import { getCryptoStorage } from "../Utils/StorageHandle";
import { useEffect } from "react";
import { type TitleHandle } from "./MainLayout";

const LoginLayout = () => {
    const userData = getCryptoStorage('auth');

    const matches = useMatches();

    useEffect(() => {
        const currentMatch = [...matches]
        .reverse()
        .find((match) => (match.handle as TitleHandle)?.title);

        const pageTitle = (currentMatch?.handle as TitleHandle)?.title;
        document.title = pageTitle ? `${pageTitle} | Swakarsa` : "Swakarsa";
    }, [matches]);

    if(userData != null){
        return <Navigate to="/admin" replace />;
    }

    return (
        <>
            <NavbarLogin />
            <div className="px-20 mt-2 bg-slate-50">
                <Outlet />
            </div>
        </>
    )
}

export default LoginLayout;