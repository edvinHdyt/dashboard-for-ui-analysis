import TitlePage from "../../Components/TitlePage";
import { MainCard } from "../../Components/MainCard";
import { useLocation, useOutletContext } from "react-router";
import type { MainLayoutContext } from "../../Layouts/MainLayout";
import { ButtonAdd, ButtonHideShow, ButtonSecondary } from "../../Components/Button";
import { useState } from "react";


const UserManagementCreate = () => {
    const [isHideHidden, setIsHideHidden] = useState(false);
    const [isShowHidden, setIsShowHidden] = useState(true);

    const [isConfHideHidden, setIsConfHideHidden] = useState(false);
    const [isConfShowHidden, setIsConfShowHidden] = useState(true);

    
    const location = useLocation();
    const isCreate = location.pathname.includes('create');
    const isUpdated = location.pathname.includes('update');
    const context = useOutletContext<MainLayoutContext>();
    

    
    const validatedInput = () => {
       const usernameInpt = document.getElementById("usernameInpt") as HTMLInputElement | null;
        const emailInpt = document.getElementById("emailInpt") as HTMLInputElement | null;
        const roleInpt = document.getElementById("roleInpt") as HTMLInputElement | HTMLSelectElement | null;
        const password = document.getElementById("password") as HTMLInputElement | null;
        const confPass = document.getElementById("confPass") as HTMLInputElement | null;

        const usernameErr = document.getElementById("usernameErr");
        const emailErr = document.getElementById("emailErr");
        const roleErr = document.getElementById("roleErr");
        const passErr = document.getElementById("passErr");
        const confPassErr = document.getElementById("confPassErr");

        let isValid = true;

        // Helper untuk menampilkan atau menyembunyikan pesan error
        const setError = (el: HTMLElement | null, message?: string) => {
            if (!el) return;
            if (message) {
                el.textContent = message;
                el.classList.remove("hidden");
                isValid = false;
            } else {
                el.classList.add("hidden");
            }
        };

        const usernameVal = usernameInpt?.value.trim() ?? "";
        if (usernameVal === "") {
            setError(usernameErr, "Username wajib diisi.");
        } else {
            setError(usernameErr);
        }

        const emailVal = emailInpt?.value.trim() ?? "";
        if (emailVal === "") {
            setError(emailErr, "Email wajib diisi.");
        } else {
            setError(emailErr);
        }

        const roleVal = roleInpt?.value.trim() ?? "";
        if (roleVal === "default") {
            setError(roleErr, "Role wajib dipilih.");
        } else {
            setError(roleErr);
        }

        const passVal = password?.value.trim() ?? "";
        if (passVal === "") {
            setError(passErr, "Password wajib diisi.");
        } else {
            setError(passErr);
        }

        const confPassVal = confPass?.value.trim() ?? "";
        if (confPassVal === "") {
            setError(confPassErr, "Confirm password wajib diisi.");
        } else {
            setError(confPassErr);
        }

        if(passVal != confPassVal){
            setError(passErr, "Password dan Confirm Password tidak sesuai")
        }


        if (isValid){
            context?.openAlertModal("test", 0);
        }

    }

    const showHidePassword = (): void => {
        if (isHideHidden == false){
            setIsHideHidden(true);
            setIsShowHidden(false);
        } else {
            setIsHideHidden(false);
            setIsShowHidden(true);
        }
    }

    const showHideConfPassword = (): void => {
        if (isConfHideHidden == false){
            setIsConfHideHidden(true);
            setIsConfShowHidden(false);
        } else {
            setIsConfHideHidden(false);
            setIsConfShowHidden(true);
        }
    }

    return (
        <>
           <TitlePage>Create User</TitlePage>
           
           <MainCard>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="usernameInpt">Username</label>
                        <input type="text" name="username" id="usernameInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Username" required/>
                        <span className="text-sm text-red-500 hidden ms-1" id="usernameErr">Username is required!</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="emailInpt">Email</label>
                        <input type="email" name="title" id="emailInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Email" required/>
                        <span className="text-sm text-red-500 hidden ms-1" id="emailErr">Email is required!</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="categoryInpt">No Handphone</label>
                        <input type="number" name="npHp" id="noHpInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="No Handphone"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="roleInpt">Role</label>
                       <select name="role" id="roleInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" defaultValue={"default"}>
                        <option value="default">Choose Role</option>
                       </select>
                        <span className="text-sm text-red-500 hidden ms-1" id="roleErr"></span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col justify-start items-start relative">
                            <label htmlFor="password">Password</label>
                            <input type={`${isHideHidden == false ? 'password' : 'text'}`}  id="password" className="w-full border-[0.1px] border-slate-400 rounded-sm px-3 py-2 outline-teal-500" placeholder="Password" defaultValue={"Password"}/>
                            <ButtonHideShow isHidden={isShowHidden} showHidePassword={showHidePassword}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19s-7.764-4.013-9.257-5.962a1.69 1.69 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5s7.764 4.013 9.257 5.962" />
                                        <circle cx="12" cy="12" r="3" />
                                    </g>
                                </svg>
                            </ButtonHideShow>
                            <ButtonHideShow isHidden={isHideHidden} showHidePassword={showHidePassword}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <g fill="none">
                                        <path fill="currentColor" d="M12 14.98c-5.88 0-10.12-5.38-10.65-7.39h21.3c-.6 2.27-4.77 7.39-10.65 7.39" opacity=".2" />
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M22.31 7.77a10.98 10.98 0 0 1-20.62 0m3.02 4.99L3 14.46m16.29-1.7l1.71 1.7" />
                                        <path fill="currentColor" d="M8.52 14.81c.12-.4.55-.64.95-.55c.4.1.63.5.5.89l-.72-.17zm.73 2.66a.83.83 0 0 1-.96.55a.7.7 0 0 1-.5-.89l.73.17zm0-2.5l.73.18l-.73 2.32l-.73-.17l-.74-.17l.74-2.32zm6.23-.16a.83.83 0 0 0-.95-.55c-.4.1-.63.5-.5.89l.72-.17zm-.73 2.66c.13.4.56.64.96.55c.4-.1.63-.5.5-.89l-.73.17zm0-2.5l-.73.18l.73 2.32l.73-.17l.74-.17l-.74-2.32z" />
                                    </g>
                                </svg>
                            </ButtonHideShow>
                        </div>
                        <span className="text-sm text-red-500 hidden ms-1" id="passErr"></span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col justify-start items-start relative">
                            <label htmlFor="confPass">Confirm Password</label>
                            <input type={`${isConfHideHidden == false ? 'password' : 'text'}`}  id="confPass" className="w-full border-[0.1px] border-slate-400 rounded-sm px-3 py-2 outline-teal-500" placeholder="Confirm Password" defaultValue={"Password"}/>
                            <ButtonHideShow isHidden={isConfShowHidden} showHidePassword={showHideConfPassword}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                        <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19s-7.764-4.013-9.257-5.962a1.69 1.69 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5s7.764 4.013 9.257 5.962" />
                                        <circle cx="12" cy="12" r="3" />
                                    </g>
                                </svg>
                            </ButtonHideShow>
                            <ButtonHideShow isHidden={isConfHideHidden} showHidePassword={showHideConfPassword}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <g fill="none">
                                        <path fill="currentColor" d="M12 14.98c-5.88 0-10.12-5.38-10.65-7.39h21.3c-.6 2.27-4.77 7.39-10.65 7.39" opacity=".2" />
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M22.31 7.77a10.98 10.98 0 0 1-20.62 0m3.02 4.99L3 14.46m16.29-1.7l1.71 1.7" />
                                        <path fill="currentColor" d="M8.52 14.81c.12-.4.55-.64.95-.55c.4.1.63.5.5.89l-.72-.17zm.73 2.66a.83.83 0 0 1-.96.55a.7.7 0 0 1-.5-.89l.73.17zm0-2.5l.73.18l-.73 2.32l-.73-.17l-.74-.17l.74-2.32zm6.23-.16a.83.83 0 0 0-.95-.55c-.4.1-.63.5-.5.89l.72-.17zm-.73 2.66c.13.4.56.64.96.55c.4-.1.63-.5.5-.89l-.73.17zm0-2.5l-.73.18l.73 2.32l.73-.17l.74-.17l-.74-2.32z" />
                                    </g>
                                </svg>
                            </ButtonHideShow>
                        </div>
                        <span className="text-sm text-red-500 hidden ms-1" id="confPassErr"></span>
                    </div>
                    <div className="flex justify-end gap-2">
                        <ButtonSecondary label="Back" link="../user-management"/>
                        <ButtonAdd label="Created" onAction={validatedInput}/>
                    </div>
                </div>
           </MainCard>
        </>
    )
}


export default UserManagementCreate;