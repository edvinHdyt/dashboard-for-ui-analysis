import {NavLink} from "react-router";
import {useState} from "react";

const SidebarAdmin = () => {
    const [iconWidth, setIconWidth] = useState("1.4em");
    
    return (
        <div className="hidden lg:flex flex-col px-6 py-5 w-70 min-h-screen justify-start items-center gap-4">
            <a href="">
                <h1 className="text-xl font-sora text-white font-bold text-shadow-2xs">
                    Swakarsa
                </h1>
            </a>

            <ul className="flex flex-col gap-3 text-white w-full items-center">
               <NavLink className="w-full bg-white/30 px-3 py-2 flex gap-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width={`${iconWidth}`} height={`${iconWidth}`} viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path d="M21 19v-6.733a4 4 0 0 0-1.245-2.9L13.378 3.31a2 2 0 0 0-2.755 0L4.245 9.367A4 4 0 0 0 3 12.267V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2" />
                            <path d="M9 15a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6H9z" />
                        </g>
                    </svg>
                    <span>Dashboard</span>
               </NavLink>
               <NavLink className="w-full  px-3 py-2 flex gap-2 rounded-md hover:bg-white/30">
                   <svg xmlns="http://www.w3.org/2000/svg" width={`${iconWidth}`} height={`${iconWidth}`} viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                            <circle cx="12" cy="5.75" r="3" />
                            <path d="M12 13c-1.75-1.25-4-1.75-7.25-1.75v7.5c3.25 0 5.5.5 7.25 1.75c1.75-1.25 4-1.75 7.25-1.75v-7.5c-3.25 0-5.5.5-7.25 1.75m0 .25v6.5" />
                        </g>
                    </svg>

                    <span>Authors</span>
               </NavLink>
               <NavLink className="w-full  px-3 py-2 flex gap-2 rounded-md hover:bg-white/30">
                   <svg xmlns="http://www.w3.org/2000/svg" width={`${iconWidth}`} height={`${iconWidth}`} viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 6s1.5-2 5-2s5 2 5 2v14s-1.5-1-5-1s-5 1-5 1zm10 0s1.5-2 5-2s5 2 5 2v14s-1.5-1-5-1s-5 1-5 1z" />
                    </svg>
                    <span>Books</span>
               </NavLink>
            </ul>
        </div>
    )
}

const ProfileDropdown = () => {
    const [iconWidth, setIconWidth] = useState("1.4em");

    return (
        <>
            <div className="h-auto 20 w-50 absolute bg-white top-13 right-15 py-2 rounded-md border border-slate-400 shadow-md">
                <ul>
                    <NavLink className="w-full  px-3 py-2 flex gap-2 rounded-md hover:bg-primary/30 h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width={`${iconWidth}`} height={`${iconWidth}`} viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 6s1.5-2 5-2s5 2 5 2v14s-1.5-1-5-1s-5 1-5 1zm10 0s1.5-2 5-2s5 2 5 2v14s-1.5-1-5-1s-5 1-5 1z" />
                            </svg>
                            <span>Books</span>
                    </NavLink>
                </ul>
            </div>
        </>
    )
}

const NavbarAdmin  = () => {
    return (
        <>
            <div className="w-full bg-white h-14 px-15 py-2 lg:rounded-l-md shadow-md flex justify-end relative">
                <button className="w-10 h-10 rounded-3xl border-slate-400 border flex justify-center items-center shadow-md cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="7" r="5" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7" />
                        </g>
                    </svg>
                </button>
                <ProfileDropdown />
            </div>
        </>
    )
}

export {SidebarAdmin, NavbarAdmin}