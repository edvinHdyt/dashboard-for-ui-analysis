import {Navigate, Outlet, useLocation, useMatches} from "react-router";
import { SidebarAdmin, NavbarAdmin } from "./Navigations/NavigationAdmin";
import { useEffect, useState } from "react";
import { ModalAlertMsg, ModalDelete } from "../Components/Modals";
import { getCryptoStorage } from "../Utils/StorageHandle";
import { checkApi, type AuthStorage } from "../Utils/Api";
import { useBehaviorTracker } from "../Utils/useBehaviorTracker";

export interface MainLayoutContext{
    openAlertModal: (msg:string, type:number)=>void,
    closeAlertModal: ()=>void,
    isDataDelete:boolean,
    openDeleteConfirmModal: () => void,
    authData: AuthStorage,
    setIsDataDelete: React.Dispatch<boolean>
}

export interface TitleHandle{
    title?: string
}

function MainLayout(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState(0);
    const [alertMsg, setAlertMsg] = useState("");
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isDataDelete, setIsDataDelete] = useState(false);
    const authData = getCryptoStorage<AuthStorage>("auth");

    useBehaviorTracker();
    const location = useLocation();
    const matches = useMatches();

    useEffect(() => {
        checkApi();
        
        const currentMatch = [...matches]
        .reverse()
        .find((match) => (match.handle as TitleHandle)?.title);

        const pageTitle = (currentMatch?.handle as TitleHandle)?.title;
        document.title = pageTitle ? `${pageTitle} | Swakarsa` : "Swakarsa";
    }, [matches]);

    if(!authData){
        return <Navigate to="../auth/login" replace/>
    }

    const openAlertModal = (msg:string, type:number):void => {
        setIsModalAlertOpen(true);
        setAlertType(type);
        setAlertMsg(msg);
    }

    const openDeleteConfirmModal = () => {
        setIsModalDeleteOpen(true);
    }

    const closeAlertModal = ():void => {
        setIsModalAlertOpen(false)
    }

    const closeDeleteConfirmModal = () => {
        setIsModalDeleteOpen(false);
    }

    const setConfrimDeleteDataTrue = () => {
        setIsDataDelete(true);
    }

    const dataContext = {
        openAlertModal,
        closeAlertModal,
        isDataDelete,
        openDeleteConfirmModal,
        authData,
        setIsDataDelete
    }

    const isBookCreate = location.pathname.includes('books/create');

    return (
        <>
            <div className={` bg-primary flex flex-row gap-2 min-w-0  min-h-screen h-screen max-h-full`}>
                <SidebarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} authData={authData}/>
                <div className="flex flex-col w-full gap-2 flex-1 h-full">
                <NavbarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} authData={authData}/>
                    <div className="w-full bg-slate-50 px-15 shadow-xl lg:rounded-l-md py-5 flex-1">
                        <div className="flex gap-3 flex-col">
                            <Outlet context={dataContext satisfies MainLayoutContext}/>
                        </div>
                    </div>
                </div>
            </div>

            <ModalAlertMsg
                msg={alertMsg}
                alertType={alertType}
                isModalAlertOpen={isModalAlertOpen}
                closeAlertModal={closeAlertModal}
            />

            <ModalDelete
                isModalOpen={isModalDeleteOpen}
                setConfrimDeleteDataTrue={setConfrimDeleteDataTrue}
                closeDeleteConfirmModal={closeDeleteConfirmModal}
            />
        </>
    )
}

export default MainLayout;