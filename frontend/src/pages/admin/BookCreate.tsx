import TitlePage from "../../Components/TitlePage";
import { MainCard } from "../../Components/MainCard";
import { useLocation, useOutletContext } from "react-router";
import type { MainLayoutContext } from "../../Layouts/MainLayout";
import { ButtonAdd, ButtonSecondary } from "../../Components/Button";

const BookCreate = () => {
 const location = useLocation();
    const context = useOutletContext<MainLayoutContext>();

    const isCreate = location.pathname.includes('create');
    const isUpdated = location.pathname.includes('update');

    const validatedInput = () => {
       const isbnInpt = document.getElementById("isbnInpt") as HTMLInputElement | null;
        const titleInpt = document.getElementById("titleInpt") as HTMLInputElement | null;
        const authorInpt = document.getElementById("authorInpt") as HTMLInputElement | HTMLSelectElement | null;
        const categoryInpt = document.getElementById("categoryInpt") as HTMLInputElement | HTMLSelectElement | null;
        const yearInpt = document.getElementById("yearInpt") as HTMLInputElement | null;

        const isbnErr = document.getElementById("isbnErr");
        const titleErr = document.getElementById("titleErr");
        const authorErr = document.getElementById("authorErr");
        const categoryErr = document.getElementById("categoryErr");
        const yearErr = document.getElementById("yearErr");

        let isValid = true;

        // Helper untuk menampilkan atau menyembunyikan pesan error
        const setError = (el: HTMLElement | null, message?: string) => {
            if (!el) return;
            if (message) {
                el.textContent = message;
                el.classList.remove("hidden");
                isValid = false;
            } else {
                el.classList.add("hidden");
            }
        };

        const isbnVal = isbnInpt?.value.trim() ?? "";
        if (isbnVal === "") {
            setError(isbnErr, "ISBN wajib diisi.");
        } else {
            setError(isbnErr);
        }

        const titleVal = titleInpt?.value.trim() ?? "";
        if (titleVal === "") {
            setError(titleErr, "Judul buku wajib diisi.");
        } else {
            setError(titleErr);
        }

        const authorVal = authorInpt?.value.trim() ?? "";
        if (authorVal === "default") {
            setError(authorErr, "Author wajib dipilih.");
        } else {
            setError(authorErr);
        }

        const categoryVal = categoryInpt?.value.trim() ?? "";
        if (categoryVal === "default") {
            setError(categoryErr, "Kategori wajib dipilih.");
        } else {
            setError(categoryErr);
        }

        const yearVal = yearInpt?.value.trim() ?? "";
        const yearNum = Number(yearVal);
        const currentYear = new Date().getFullYear();

        if (yearVal === "") {
            setError(yearErr, "Tahun terbit wajib diisi.");
        } else if (!/^\d{4}$/.test(yearVal) || yearNum < 1000 || yearNum > currentYear) {
            setError(yearErr, `Tahun terbit harus berupa 4 digit angka (1000–${currentYear}).`);
        } else {
            setError(yearErr);
        }


        if (isValid){
            context?.openAlertModal("test", 0);
        }

    }


    return (
        <>
           <TitlePage>Create Books</TitlePage>
           
           <MainCard>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="isbnInpt">ISBN</label>
                        <input type="text" name="isbn" id="isbnInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="ISBN" required/>
                        <span className="text-sm text-red-500 hidden ms-1" id="isbnErr">ISBN is required!</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="titleInput">Title</label>
                        <input type="text" name="title" id="titleInput" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Title" required/>
                        <span className="text-sm text-red-500 hidden ms-1" id="titleErr">Title is required!</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="categoryInpt">Category</label>
                       <select name="category" id="categoryInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" defaultValue={"default"}>
                        <option value="default">Choose Category</option>
                       </select>
                        <span className="text-sm text-red-500 hidden ms-1" id="categoryErr">Choose Category!</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="authorsInpt">Authors</label>
                       <select name="authors" id="authorInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" defaultValue={"default"}>
                        <option value="default">Choose Author</option>
                       </select>
                        <span className="text-sm text-red-500 hidden ms-1" id="authorErr"></span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="descInpt">Description</label>
                       <textarea name="desc" id="descInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Description"></textarea>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="yearInpt">Year</label>
                        <input type="number" name="Year" id="yearInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Year" required/>
                        <span className="text-sm text-red-500 hidden ms-1" id="yearErr"></span>
                    </div>
                    <div className="flex justify-end gap-2">
                        <ButtonSecondary label="Back" link="../books"/>
                        <ButtonAdd label="Created" onAction={validatedInput}/>
                    </div>
                </div>
           </MainCard>
        </>
    )
}


export default BookCreate;