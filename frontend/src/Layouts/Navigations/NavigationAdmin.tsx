import {NavLink} from "react-router";
import {useEffect, useRef, useState} from "react";  

export interface sidebarAdminProps{
    isSidebarOpen:boolean,
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SidebarComponnent = ({isSidebarOpen, setIsSidebarOpen}: sidebarAdminProps) => {
    const iconWidth="1.4em";
    const classMenuActive = 'w-full hover:bg-white/30 px-3 py-2 flex gap-2 rounded-md bg-white/30';
    const classMenuInActive = 'w-full hover:bg-white/30 px-3 py-2 flex gap-2 rounded-md';

    return (
        <div className="flex flex-col px-6 py-5 w-70 min-h-screen justify-start items-center gap-4 relative">
            {/* close button */}
            <button type="button" className="absolute right-3 top-3 w-10 h-10 bg-white rounded-sm shadow-md border border-black cursor-pointer active:translate-y-0.5 transition duration-75 flex justify-center items-center lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconWidth} viewBox="0 0 1024 1024">
                    <path d="M0 0h1024v1024H0z" fill="none" />
                    <path fill="currentColor" fill-rule="evenodd" d="M799.855 166.312c.023.007.043.018.084.059l57.69 57.69c.041.041.052.06.059.084a.1.1 0 0 1 0 .069c-.007.023-.018.042-.059.083L569.926 512l287.703 287.703c.041.04.052.06.059.083a.12.12 0 0 1 0 .07c-.007.022-.018.042-.059.083l-57.69 57.69c-.041.041-.06.052-.084.059a.1.1 0 0 1-.069 0c-.023-.007-.042-.018-.083-.059L512 569.926L224.297 857.629c-.04.041-.06.052-.083.059a.12.12 0 0 1-.07 0c-.022-.007-.042-.018-.083-.059l-57.69-57.69c-.041-.041-.052-.06-.059-.084a.1.1 0 0 1 0-.069c.007-.023.018-.042.059-.083L454.073 512L166.371 224.297c-.041-.04-.052-.06-.059-.083a.12.12 0 0 1 0-.07c.007-.022.018-.042.059-.083l57.69-57.69c.041-.041.06-.052.084-.059a.1.1 0 0 1 .069 0c.023.007.042.018.083.059L512 454.073l287.703-287.702c.04-.041.06-.052.083-.059a.12.12 0 0 1 .07 0Z" />
                </svg>

            </button>
            <a href="">
                <h1 className="text-xl font-sora text-white font-bold text-shadow-2xs">
                    Swakarsa
                </h1>
            </a>
``
            <ul className="flex flex-col gap-3 text-white w-full items-center">
               <NavLink className={( {isActive} ) => isActive ? classMenuActive: classMenuInActive} to={"dashboard"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={`${iconWidth}`} height={`${iconWidth}`} viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path d="M21 19v-6.733a4 4 0 0 0-1.245-2.9L13.378 3.31a2 2 0 0 0-2.755 0L4.245 9.367A4 4 0 0 0 3 12.267V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2" />
                            <path d="M9 15a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6H9z" />
                        </g>
                    </svg>
                    <span>Dashboard</span>
               </NavLink>
               <NavLink className={({isActive}) => isActive ? classMenuActive : classMenuInActive} to={"authors"}>
                   <svg xmlns="http://www.w3.org/2000/svg" width={`${iconWidth}`} height={`${iconWidth}`} viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                            <circle cx="12" cy="5.75" r="3" />
                            <path d="M12 13c-1.75-1.25-4-1.75-7.25-1.75v7.5c3.25 0 5.5.5 7.25 1.75c1.75-1.25 4-1.75 7.25-1.75v-7.5c-3.25 0-5.5.5-7.25 1.75m0 .25v6.5" />
                        </g>
                    </svg>

                    <span>Authors</span>
               </NavLink>
               <NavLink className={({isActive}) => isActive ? classMenuActive : classMenuInActive} to={"books"}>
                   <svg xmlns="http://www.w3.org/2000/svg" width={`${iconWidth}`} height={`${iconWidth}`} viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 6s1.5-2 5-2s5 2 5 2v14s-1.5-1-5-1s-5 1-5 1zm10 0s1.5-2 5-2s5 2 5 2v14s-1.5-1-5-1s-5 1-5 1z" />
                    </svg>
                    <span>Books</span>
               </NavLink>
                <NavLink className={({isActive}) => isActive ? classMenuActive : classMenuInActive} to={"categories"}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconWidth} viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                            <circle cx="17" cy="7" r="3" />
                            <circle cx="7" cy="17" r="3" />
                            <path d="M14 14h6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 4h6v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
                        </g>
                    </svg>
                    <span>Categories</span>
               </NavLink>
            </ul>
        </div>
    )
}




const SidebarAdmin = ({isSidebarOpen, setIsSidebarOpen}: sidebarAdminProps) => {    
   return (
    <>
        <div className="hidden lg:flex">
            <SidebarComponnent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        </div>

        <div className={`absolute left-0 top-0 z-50 lg:hidden bg-primary shadow-md border-r border-black-400 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <SidebarComponnent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        </div>
    </>
   )
}


const NavbarAdmin  = ({isSidebarOpen, setIsSidebarOpen}: sidebarAdminProps) => {
    const [isDropdownUserOpen, setIsDropdownUserOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const iconWidth = "1.4em"

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
            ){
                setIsDropdownUserOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    })

    return (
        <>
            <div className="w-full bg-slate-50 h-14 px-15 py-2 lg:rounded-l-md shadow-md flex justify-between lg:justify-end relative" ref={dropdownRef}>
    
                <button className="w-10 h-10 bg-white rounded-sm shadow-md border border-slate-400 cursor-pointer active:translate-y-0.5 transition duration-75 flex justify-center items-center lg:hidden " onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconWidth} viewBox="0 0 48 48">
                        <path d="M0 0h48v48H0z" fill="none" />
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M7.95 11.95h32m-32 12h32m-32 12h32" />
                    </svg>
                </button>
                <button className="w-10 h-10 rounded-3xl border-slate-400 border flex justify-center items-center shadow-md cursor-pointer" onClick={() => setIsDropdownUserOpen(!isDropdownUserOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="7" r="5" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7" />
                        </g>
                    </svg>
                </button>
                {isDropdownUserOpen && (
                    <ProfileDropdown />
                )}
            </div>
        </>
    )
}


const ProfileDropdown = () => {
    const iconWidth="1.4em";

    return (
        <>
            <div className="h-auto 20 w-50 absolute bg-white top-13 right-15 py-2 rounded-md border border-slate-400 shadow-md">
                <ul>
                    <NavLink className="w-full  px-3 py-2 flex gap-2 rounded-md hover:bg-primary/30 h-full" to={""}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={`${iconWidth}`} height={`${iconWidth}`} viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <g fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="7" r="5" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7" />
                            </g>
                        </svg>

                            <span>John Doe</span>
                    </NavLink>
                    <NavLink className="w-full  px-3 py-2 flex gap-2 rounded-md hover:bg-primary/30 h-full" to={""}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={`${iconWidth}`} height={`${iconWidth}`} viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.393 4C4 4.617 4 5.413 4 7.004v9.994c0 1.591 0 2.387.393 3.002q.105.165.235.312c.483.546 1.249.765 2.78 1.202c1.533.438 2.3.657 2.856.329a1.5 1.5 0 0 0 .267-.202C11 21.196 11 20.4 11 18.803V5.197c0-1.596 0-2.393-.469-2.837a1.5 1.5 0 0 0-.267-.202c-.555-.328-1.323-.11-2.857.329c-1.53.437-2.296.656-2.78 1.202a2.5 2.5 0 0 0-.234.312M11 4h2.017c1.902 0 2.853 0 3.443.586c.33.326.476.764.54 1.414m-6 14h2.017c1.902 0 2.853 0 3.443-.586c.33-.326.476-.764.54-1.414m4-6h-7m5.5-2.5S22 11.34 22 12s-2.5 2.5-2.5 2.5" />
                        </svg>

                            <span>Log Out</span>
                    </NavLink>
                </ul>
            </div>
        </>
    )
}


export {SidebarAdmin, NavbarAdmin}