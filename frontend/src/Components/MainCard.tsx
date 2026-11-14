import type { ReactNode } from "react"

const LoginCard = ({children}: {children: ReactNode}) => {
    return (
         <div className="w-120 py-3 bg-white shadow-sm border-[0.8px] border-slate-200 rounded-md font-montserrat flex justify-center items-center mb-5">
            {children}
        </div>
    )
}

const MainCard = ({children}: {children: ReactNode}) => {
    return (
        <div className="w-full min-h-20 bg-white border border-slate-300 shadow-md rounded-md px-5 py-2">
            {children}
        </div>
    )
}

export {LoginCard, MainCard};