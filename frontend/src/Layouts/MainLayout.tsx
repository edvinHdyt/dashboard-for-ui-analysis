import {Navigate, Outlet} from "react-router";
import { SidebarAdmin, NavbarAdmin } from "./Navigations/NavigationAdmin";
import { useEffect, useState } from "react";
import { ModalAlertMsg, ModalDelete } from "../Components/Modals";
import { getCryptoStorage, setCryptoStorage } from "../Utils/StorageHandle";
import type { AuthStorage } from "../Utils/Api";
import api from "../Utils/Api";

export interface MainLayoutContext{
    openAlertModal: (msg:string, type:number)=>void,
    closeAlertModal: ()=>void,
    isDataDelete:boolean,
    openDeleteConfirmModal: () => void,
    authData: AuthStorage
}

function MainLayout(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState(0);
    const [alertMsg, setAlertMsg] = useState("");
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isDataDelete, setIsDataDelete] = useState(false);
    const authData = getCryptoStorage<AuthStorage>("auth");

    useEffect(() => {
        if (!authData) return;

        api.get('/me')
        .then((res) => {
            setCryptoStorage<AuthStorage>("auth", {
                accessToken: authData.accessToken,
                user: res.data.data
            });
        }).catch(() => {
        })

    }, [authData]);

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
        authData
    }

    return (
        <>
            <div className="h-screen bg-primary flex flex-row gap-2">
                <SidebarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} authData={authData}/>
                <div className="flex flex-col w-full gap-2 flex-1 h-full">
                    <NavbarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} authData={authData}/>
                    <div className="w-full bg-slate-50 px-15 shadow-xl lg:rounded-l-md py-5 flex-1 h-full">
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