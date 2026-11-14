import type { ReactNode } from "react";


interface titleProps{
    children?: ReactNode
}

const TitlePage = ({children}: titleProps):ReactNode =>{
    return (
        <h1 className="text-2xl font-sora font-bold">
            {children}
        </h1>
    )
}

export default TitlePage;