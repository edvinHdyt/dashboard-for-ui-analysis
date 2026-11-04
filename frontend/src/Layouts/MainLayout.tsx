import {Outlet} from "react-router";
import { SidebarAdmin, NavbarAdmin } from "./Navigations/NavigationAdmin";

function MainLayout(){
    return (
        <>
            <div className="min-h-screen bg-primary flex flex-row gap-2">
                <SidebarAdmin />
                <div className="flex flex-col w-full">
                    <NavbarAdmin />
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default MainLayout;