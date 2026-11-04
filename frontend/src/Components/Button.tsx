import type { ReactNode } from "react"

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

export {ButtonHideShow}