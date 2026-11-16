import { Navigate, Outlet } from "react-router";
import NavbarLogin from "./Navigations/NavbarLogin";
import { getCryptoStorage } from "../Utils/StorageHandle";

const LoginLayout = () => {
    const userData = getCryptoStorage('auth');

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