import {LoginCard} from "../../Components/MainCard";
import { ButtonAdd, ButtonHideShow, ButtonSecondary } from "../../Components/Button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import createFormValidator from "../../Utils/FormValidator";
import axios from "axios";
import type { LaravelErrorResponse } from "../../Utils/InterfaceLaravelErrorAuth";
import { setCryptoStorage } from "../../Utils/StorageHandle";
import { Status } from "../../Components/Status";
import { behaviorStore } from "../../Utils/behaviorStore";

const Login = () => {
    const location = useLocation();
    const regsiterLink = location.pathname.includes("login") ? "../register" : "register";
    const [isHideHidden, setIsHideHidden] = useState(false);
    const [isShowHidden, setIsShowHidden] = useState(true);
    const {setError, isValid} = createFormValidator();
    const [isNewStatus, setIsNewStatus] = useState("");
    const [statusType, setStatusType] = useState(0);
    const [isLogin, setIsLogin] = useState(false);

    const APIURI = import.meta.env.VITE_BACKEND_URI;

    const navigate = useNavigate();
    const showHidePassword = (): void => {
        if (isHideHidden == false){
            setIsHideHidden(true);
            setIsShowHidden(false);
        } else {
            setIsHideHidden(false);
            setIsShowHidden(true);
        }
    }

    useEffect(() => {
       const setStatus = () => {
            const logoutStatus = localStorage.getItem("status");
            
            setIsNewStatus(logoutStatus || "");
            setStatusType(1);
       }

       setStatus();

       if(isNewStatus != ""){
            localStorage.removeItem('status');
       }

       return(() => {
       })
    }, [isNewStatus])


    const validateLogin = () => {
        setIsLogin(true);
        const emailInpt = document.getElementById("email") as HTMLInputElement | null;
        const password = document.getElementById("password") as HTMLInputElement | null;

        const emailErr = document.getElementById("emailErr");
        const passErr = document.getElementById("passErr");
        
        const emailVal = emailInpt?.value.trim() ?? "";
        if (emailVal === "") {
            setError(emailErr, "Email wajib diisi.");
        } else {
            setError(emailErr);
        }
        
        const passVal = password?.value.trim() ?? "";
        if (passVal === "") {
            setError(passErr, "Password wajib diisi.");
        } else {
            setError(passErr);
        }

        if(isValid()){
            loginProccedd(emailVal, passVal);
        }else{
            setIsLogin(false);
        }
    }

    const loginProccedd = (email:string,  password:string) => {
        const data = {
            email,
            password
        };

        axios.post(`${APIURI}/login`, data)
        .then((res) => {
            const data = res.data.data;

            setCryptoStorage("auth", {
                "accessToken": data.access_token,
                "tokenType": data.token_type,
                "user": data.user,
            });

            behaviorStore.startSession();
            behaviorStore.clearTrackLatencyCount();

            setIsLogin(false);

            navigate('/admin');
        })
        .catch((err) => {
            if (axios.isAxiosError<LaravelErrorResponse>(err)) {
                const status = err.response?.status;
                const responseData = err.response?.data;

                // Jika error validasi dari Laravel (422)
                if (status === 422 && responseData?.errors) {
                const errors = responseData.errors;
                if (errors.email?.[0]) {
                    setError(document.getElementById("emailErr"), errors.email[0]);
                }
                if (errors.password?.[0]) {
                    setError(document.getElementById("passErr"), errors.password[0]);
                }
                } else {
                    const fallbackMsg = responseData?.message || "Terjadi kesalahan pada server.";
                    setIsNewStatus(fallbackMsg);
                    setStatusType(0);
                }
            }

            setIsLogin(false);
        });
    }

    return (
        <>
           <div className="flex justify-center items-center align-middle h-[90vh]">
                <LoginCard >
                    <div className="flex flex-col justify-center items-center w-full gap-3">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-xl text-bold font-sora">Sign In</h1>
                            <p>Selamat datang kembali!</p>
                            {isNewStatus !="" ?  <Status  msg={isNewStatus} type={statusType} /> : ""}
                        </div>

                        <div className="flex flex-col w-[80%] gap-3">
                            <div className="flex flex-col justify-start items-start">
                                <label htmlFor="email">Email</label>
                                <input type="email"id="email" name="email" className="w-full border-[0.1px] border-slate-400 rounded-sm px-3 py-2" placeholder="Email"/>
                                <span className="text-sm text-red-500 hidden ms-1" id="emailErr"></span>
                            </div>

                            <div className="flex flex-col">

                                <div className="flex flex-col justify-start items-start relative">
                                    <label htmlFor="password">Password</label>
                                    <input type={`${isHideHidden == false ? 'password' : 'text'}`}  id="password" className="w-full border-[0.1px] border-slate-400 rounded-sm px-3 py-2" placeholder="Password"/>
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
                        </div>
                        <div className="flex w-[80%] justify-end gap-2">
                            <ButtonSecondary link={regsiterLink} label="Register"/>
                            <ButtonAdd label="Sign In" onAction={validateLogin} status={isLogin}/>
                        </div>
                    </div>
                </LoginCard>
           </div>
        </>
    )
}

export default Login;