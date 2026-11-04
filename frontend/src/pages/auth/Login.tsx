import {LoginCard} from "../../Components/MainCard";
import { ButtonHideShow } from "../../Components/Button";
import { useState } from "react";

const Login = () => {
    const [isHideHidden, setIsHideHidden] = useState(false);
    const [isShowHidden, setIsShowHidden] = useState(true);

    const showHidePassword = (): void => {
        if (isHideHidden == false){
            setIsHideHidden(true);
            setIsShowHidden(false);
        } else {
            setIsHideHidden(false);
            setIsShowHidden(true);
        }
    }

    return (
        <>
           <div className="flex justify-center items-center align-middle h-[90vh]">
                <LoginCard >
                    <div className="flex flex-col justify-center items-center w-full gap-3">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-xl text-bold font-sora">Sign In</h1>
                            <p>Selamat datang kembali!</p>
                        </div>

                        <div className="flex flex-col w-[80%] gap-3">
                            <div className="flex flex-col justify-start items-start">
                                <label htmlFor="email">Email</label>
                                <input type="email"id="email" name="email" className="w-full border-[0.1px] border-slate-400 rounded-sm px-3 py-2" placeholder="Email"/>
                            </div>
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
                        </div>
                        <div className="flex w-[80%] justify-end">
                            <button type="button" className="w-auto h-10 bg-emerald-400 px-3 py-1 rounded-md font-sora border-slate-200 shadow-sm cursor-pointer">
                                Sign in
                            </button>
                        </div>
                    </div>
                </LoginCard>
           </div>
        </>
    )
}

export default Login;