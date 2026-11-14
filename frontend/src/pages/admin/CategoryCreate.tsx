import type { ReactNode } from "react";
import TitlePage from "../../Components/TitlePage";
import { MainCard } from "../../Components/MainCard";
import { ButtonAdd, ButtonSecondary } from "../../Components/Button";
import { useLocation, useOutletContext } from "react-router";
import type { MainLayoutContext } from "../../Layouts/MainLayout";

const CategoryCreate = ():ReactNode => {
    const location = useLocation();
    const context = useOutletContext<MainLayoutContext>();

    const isCreate = location.pathname.includes('create');
    const isUpdated = location.pathname.includes('update');

    const validatedInput = () => {
        const categoryInpt = document.getElementById("categoryInpt") as HTMLInputElement;
        console.log(categoryInpt.value);
        const categoryErr = document.getElementById("categoryErr");

        if (categoryInpt.value == ""){
            categoryErr?.classList.remove('hidden');
        }else{
            categoryErr?.classList.add("hidden");
        }

        context?.openAlertModal("test", 0);
    }


    return (
        <>
           <TitlePage>Create Category</TitlePage>
           
           <MainCard>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="Name">Category</label>
                        <input type="text" name="name" id="categoryInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Category" required/>
                        <span className="text-sm text-red-500 hidden ms-1" id="categoryErr">Category is required!</span>
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


export default CategoryCreate;