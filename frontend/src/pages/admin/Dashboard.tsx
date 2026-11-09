import type { ReactNode } from "react";


const Dashboard = ():ReactNode => {
    return(
        <>
            <div className="flex gap-3 flex-col">
                <h1 className="text-2xl font-sora font-bold">
                    Dashboard
                </h1>

                <div className="w-full h-20 bg-white border border-slate-300 shadow-md rounded-md px-5 py-2 flex justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-display">
                            Selamat Datang atmin
                        </h2>
                        <p className="text-md font-display">Buku apa yang sedang dibaca hari ini?</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;