import type { ReactNode } from "react"
import TitlePage from "../../Components/TitlePage";
import { MainCard } from "../../Components/MainCard";
import { ButtonAdd, ButtonSecondary } from "../../Components/Button";
import { useLocation, useOutletContext } from "react-router";
import type { MainLayoutContext } from "../../Layouts/MainLayout";

const AuthorCreate = ():ReactNode => {
    const location = useLocation();
    const context = useOutletContext<MainLayoutContext>();

    const isCreate = location.pathname.includes('create');
    const isUpdated = location.pathname.includes('update');

    const validatedInput = () => {
        const nameInput = document.getElementById("nameInput") as HTMLInputElement;
        const nameErr = document.getElementById("nameErr");

        if (nameInput.value == ""){
            nameErr?.classList.remove('hidden');
        }

        context?.openAlertModal("test", 0);
    }


    return (
        <>
           <TitlePage>Create Author</TitlePage>
           
           <MainCard>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="Name">Name</label>
                        <input type="text" name="name" id="nameInput" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Name" required/>
                        <span className="text-sm text-red-500 hidden ms-1" id="nameErr">Name is required!</span>
                    </div>
                    <div className="flex justify-end gap-2">
                        <ButtonSecondary label="Back" link="../authors"/>
                        <ButtonAdd label="Created" onAction={validatedInput}/>
                    </div>
                </div>
           </MainCard>
        </>
    )
}

export default AuthorCreate;