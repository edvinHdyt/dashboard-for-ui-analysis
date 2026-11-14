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
    onAction?: (...args: unknown[]) => unknown;
}

const ButtonAdd = ({link="", label, onAction}: btnAddProps):ReactNode => {
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

const ButtonSecondary = ({link="", label, onAction}: btnAddProps):ReactNode => {
    if (link != ""){
         return (
             <NavLink to={link} className={`px-2 py-2 w-auto h-auto bg-slate-400 text-black rounded-md cursor-pointer shadow-md active:translate-y-0.5 transition duration-75 hover:bg-slate-500`}>
                {label}
            </NavLink>
        )       
    } else {
        return(
            <button type="button" className={`px-2 py-2 w-auto h-auto bg-slate-400 text-black rounded-md cursor-pointer shadow-md active:translate-y-0.5 transition duration-75 hover:bg-slate-500`} onClick={() => onAction?.()}>
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
export {ButtonHideShow, ButtonAdd, ButtonDeleteBulk, ButtonSecondary}