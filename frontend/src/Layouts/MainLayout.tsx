import {Outlet} from "react-router";
import { SidebarAdmin, NavbarAdmin } from "./Navigations/NavigationAdmin";
import { useState } from "react";

function MainLayout(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <div className="h-screen bg-primary flex flex-row gap-2">
                <SidebarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                <div className="flex flex-col w-full gap-2 flex-1 h-full">
                    <NavbarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                    <div className="w-full bg-slate-50 px-15 shadow-xl lg:rounded-l-md py-5 flex-1 h-full">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainLayout;