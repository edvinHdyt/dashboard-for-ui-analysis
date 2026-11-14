import { useEffect } from "react";
import Swal from "sweetalert2";

interface modalAlertMsgProps{
    msg: string,
    alertType: number,
    isModalAlertOpen: boolean,
    onAction?: (...args: unknown[]) => unknown;
    closeAlertModal: () => void;
}

interface modalDeleteProps{
    isModalOpen: boolean,
    setConfrimDeleteDataTrue: (...args: unknown[])=> unknown,
    closeDeleteConfirmModal: (...args: unknown[])=> unknown,
}

const ModalDelete = ({isModalOpen, setConfrimDeleteDataTrue, closeDeleteConfirmModal}: modalDeleteProps) =>{
    const canQuickDismiss = false;

    useEffect(() => {
        if (!isModalOpen) return;
        
        const triggerModal = async () => {
            const res =  await Swal.fire({
                icon: "warning",
                title: "Confirmation Alert",
                "html": 'Apakah anda yakin ingin menghapus data?',
                cancelButtonText: 'Batal',
                confirmButtonText: 'Ya, Hapus',
                reverseButtons: true, // Posisi tombol Batal di kiri, Hapus di kanan
                allowEscapeKey: canQuickDismiss,
                allowOutsideClick: canQuickDismiss,
                buttonsStyling: false,
                showCancelButton:true,
                customClass: {
                    popup: 'rounded-lg shadow-xl border border-slate-200 font-sans p-5',
                    title: 'text-lg font-bold text-slate-800',
                    htmlContainer: 'text-sm text-slate-600 mt-2',
                    actions: 'flex justify-center gap-3 mt-5 w-full',
                    confirmButton:
                        'px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-md hover:bg-rose-700 transition-colors cursor-pointer',
                    cancelButton:
                        'px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-300 transition-colors cursor-pointer',
                },
            });


            if(res.isConfirmed){
                setConfrimDeleteDataTrue();
            }
            closeDeleteConfirmModal();
        }

        triggerModal();
        
    }, [isModalOpen, canQuickDismiss]);

    return(
        <></>
    )
}


const ModalAlertMsg = ({
    msg,
    alertType,
    isModalAlertOpen,
    closeAlertModal,
}: modalAlertMsgProps) => {    
    useEffect(() => {
        let timerId: number | undefined;

        if (isModalAlertOpen){
            timerId = setTimeout(() => {
                closeAlertModal();
            }, 2000);
        }

        return(() => {
            clearTimeout(timerId);
        })
    }, [
        isModalAlertOpen,
        closeAlertModal
    ]);

    let colorAlert;
    let textAlert;

    switch (alertType) {
        case 0:
            colorAlert = "bg-red-500";
            textAlert = "text-white";
            break;
        case 2:
            colorAlert = "bg-yellow-500";
            textAlert = "text-black";
            break
        default:
            colorAlert = "bg-green-500";
            textAlert = "text-white";
            break;
    }

    let alertIcon;
    if (alertType == 2 || alertType == 0){
        alertIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30"><path d="M0 0h32v32H0z" fill="none" /> <path fill="currentColor" d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14s14-6.3 14-14S23.7 2 16 2m-1.1 6h2.2v11h-2.2zM16 25c-.8 0-1.5-.7-1.5-1.5S15.2 22 16 22s1.5.7 1.5 1.5S16.8 25 16 25" /></svg>
    } else{
        alertIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.15 9.6L10 16.75l-3.2-3.2l.7-.71l2.5 2.5l6.44-6.45zM11.5 3c5.25 0 9.5 4.25 9.5 9.5S16.75 22 11.5 22S2 17.75 2 12.5S6.25 3 11.5 3m0 1C6.81 4 3 7.81 3 12.5S6.81 21 11.5 21s8.5-3.81 8.5-8.5S16.19 4 11.5 4"/></svg>;
    }

    return (
        <div className={`w-auto p-3 ${colorAlert} fixed bottom-2 right-5 z-50 shadow-md rounded-md border-[0.8px] border-gray-300 ${textAlert} justify-between item-center gap-3 ${isModalAlertOpen ? "flex animate-modal-show" : "hidden"}`}>
            <p className="flex gap-2">
                {alertIcon}
                {msg}
            </p>
            <button className="flex justify-center items-center bg-transparent text-white w-6 h-6 rounded-md shadow-sm active:translate-y-0.5 transition duration-75" onClick={closeAlertModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275 -.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
            </button>
        </div>
    )
}


export {ModalAlertMsg, ModalDelete};