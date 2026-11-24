import type { ReactNode } from "react"
import { NavLink } from "react-router";

export interface ActionBtnHideAndShowProps {
    children?: ReactNode;
    isHidden: boolean;
    showHidePassword: () => void;
}

const ButtonHideShow = ({children, isHidden, showHidePassword}: ActionBtnHideAndShowProps) => {
    return(
         <button type="button" className={`px-3 py-2 absolute right-0 justify-center items-center bottom-0 h-[2.6rem] rounded-r-sm cursor-pointer ${isHidden ? "hidden": "flex"}`} onClick={() => {showHidePassword()}}>
           {children}
        </button>
    )
}

interface btnAddProps{
    link?:string,
    label:string,
    status?:boolean,
    onAction?: (...args: unknown[]) => unknown;
}

const ButtonAdd = ({link="", label, onAction, status}: btnAddProps):ReactNode => {
    if (status){
        return(
            <button className={`px-2 py-2 w-auto h-auto bg-teal-600 text-white rounded-md cursor-pointer shadow-md active:translate-y-0.5 transition duration-75 hover:bg-teal-800 flex items-center gap-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="2" r="0" fill="currentColor">
                        <animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)">
                        <animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)">
                        <animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)">
                        <animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)">
                        <animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)">
                        <animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)">
                        <animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)">
                        <animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                </svg>
                {label}
            </button>
        )
    }

    if (link != ""){
         return (
             <NavLink to={link} className={`px-2 py-2 w-auto h-auto bg-teal-600 text-white rounded-md cursor-pointer shadow-md active:translate-y-0.5 transition duration-75 hover:bg-teal-800`}>
                {label}
            </NavLink>
        )       
    } else {
        return(
            <button type="button" className={`px-2 py-2 w-auto h-auto bg-teal-600 text-white rounded-md cursor-pointer shadow-md active:translate-y-0.5 transition duration-75 hover:bg-teal-800`} onClick={() => onAction?.()}>
                {label}
            </button>
        )
    }
}


const ButtonUpdatePass = ({label, onAction, status}: btnAddProps) => {
    if (status){
        return(
            <button className={`px-2 py-2 w-auto h-auto bg-yellow-600 text-white rounded-md cursor-pointer shadow-md active:translate-y-0.5 transition duration-75 hover:bg-yellow-800 flex items-center gap-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="2" r="0" fill="currentColor">
                        <animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)">
                        <animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)">
                        <animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)">
                        <animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)">
                        <animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)">
                        <animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)">
                        <animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)">
                        <animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
                    </circle>
                </svg>
                {label}
            </button>
        )
    }else {
        return(
            <button type="button" className={`px-2 py-2 w-auto h-auto bg-yellow-600 text-white rounded-md cursor-pointer shadow-md active:translate-y-0.5 transition duration-75 hover:bg-yellow-800`} onClick={() => onAction?.()}>
                {label}
            </button>
        )
    }
}
const ButtonSecondary = ({link="", label, onAction}: btnAddProps):ReactNode => {
    if (link != ""){
         return (
             <NavLink to={link} className={`px-2 py-2 w-auto h-auto bg-slate-400  rounded-md cursor-pointer shadow-md active:translate-y-0.5 transition duration-75 hover:bg-slate-500 text-white`}>
                {label}
            </NavLink>
        )       
    } else {
        return(
            <button type="button" className={`px-2 py-2 w-auto h-auto bg-slate-400 text-white rounded-md cursor-pointer shadow-md active:translate-y-0.5 transition duration-75 hover:bg-slate-500`} onClick={() => onAction?.()}>
                {label}
            </button>
        )
    }
}

const ButtonDeleteBulk = ({children, label}: {children:ReactNode, label:string}) => {
    return (
        <button type="button" className={`px-2 py-2 w-auto h-auto bg-rose-600 hover:bg-rose-700 text-white rounded-md cursor-pointer shadow-md active:translate-y-0.5 transition duration-75 flex gap-1`}>
            {children}
            {label}
        </button>
    )
}
export {ButtonHideShow, ButtonAdd, ButtonDeleteBulk, ButtonSecondary, ButtonUpdatePass}