import type { ReactNode } from "react";
import TitlePage from "../../Components/TitlePage";
import { MainCard } from "../../Components/MainCard";
import { useOutletContext } from "react-router";
import type { MainLayoutContext } from "../../Layouts/MainLayout";

const Dashboard = ():ReactNode => {
    const context = useOutletContext<MainLayoutContext>();

    const user = context.authData.user;
    return(
        <>
            <TitlePage>Dashboard</TitlePage>
            <MainCard>
                <div className="flex justify-between">
                <div className="flex flex-col">
                        <h2 className="text-lg font-display">
                            Selamat Datang {user.username}
                        </h2>
                        <p className="text-md font-display">Buku apa yang sedang dibaca hari ini?</p>
                    </div>
                </div>
            </MainCard>
        </>
    )
}

export default Dashboard;