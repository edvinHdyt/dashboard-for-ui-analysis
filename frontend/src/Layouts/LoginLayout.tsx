import { Outlet } from "react-router";
import NavbarLogin from "./Navigations/NavbarLogin";

const LoginLayout = () => {
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