import {Outlet} from "react-router";
import { SidebarAdmin, NavbarAdmin } from "./Navigations/NavigationAdmin";
import { useState } from "react";
import { ModalAlertMsg, ModalDelete } from "../Components/Modals";

export interface MainLayoutContext{
    openAlertModal: (msg:string, type:number)=>void,
    closeAlertModal: ()=>void,
    isDataDelete:boolean,
    openDeleteConfirmModal: () => void,
}

function MainLayout(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState(0);
    const [alertMsg, setAlertMsg] = useState("");
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isDataDelete, setIsDataDelete] = useState(false);

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
    }

    return (
        <>
            <div className="h-screen bg-primary flex flex-row gap-2">
                <SidebarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                <div className="flex flex-col w-full gap-2 flex-1 h-full">
                    <NavbarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
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