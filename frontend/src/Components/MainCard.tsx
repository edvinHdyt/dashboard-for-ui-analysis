import type { ReactNode } from "react"

const LoginCard = ({children}: {children: ReactNode}) => {
    return (
         <div className="w-120 py-3 bg-white shadow-sm border-[0.8px] border-slate-200 rounded-md font-montserrat flex justify-center items-center mb-5">
            {children}
        </div>
    )
}

export {LoginCard};