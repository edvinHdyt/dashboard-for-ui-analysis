import TitlePage from "../../Components/TitlePage";
import { MainCard } from "../../Components/MainCard";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router";
import type { MainLayoutContext } from "../../Layouts/MainLayout";
import { ButtonAdd, ButtonSecondary } from "../../Components/Button";
import  Select from "react-select";
import type { MultiValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import type{ AuthorsInterface } from "./Authors";
import type { CategoryInterface } from "./Category";
import api from "../../Utils/Api";
import createFormValidator from "../../Utils/FormValidator";
import axios from "axios";
import { behaviorStore } from "../../Utils/behaviorStore";

const animatedComponents = makeAnimated();

export interface SelectElement{
    value: string,
    label:string
}

interface LaravelBookErrorResponse{
    message: string;
    errors?: {
        isbn?: string[];
        title?: string[];
        category?: string[];
        authors?: string[];
        publisher?: string[];
        year?: string[];
        description?: string[];
    }
}

interface BooksInterfaceUpdate{
    id:string,
    isbn:string,
    title: string,
    author: AuthorsInterface,
    publisher: string,
    category?: CategoryInterface[],
    year?: number,
    description?: string,
}



const BookCreate = () => {
    const location = useLocation();
    const isUpdated = location.pathname.includes('update');
    const [authors, setAuthorDatas] = useState<SelectElement[]>();
    const [categories, setCategoryDatas] = useState<SelectElement[]>();
    const [bookData, setBookData] = useState<BooksInterfaceUpdate>();
    const context = useOutletContext<MainLayoutContext>();
    const [selectedCategories, setSelectedCategories] = useState<MultiValue<SelectElement>>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string>();
    const {setError,resetErrors,  isValid} = createFormValidator();
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();


    const manageCategoriSelected = (selected: MultiValue<SelectElement>) => {
        setSelectedCategories(selected);
    }

    const manageAuthorSelected = (selected: SingleValue<SelectElement>):void => {
        setSelectedAuthors(selected?.value);
    }

    useEffect(()=>{
        api.get("/category/get")
        .then((res) =>{
            const datas = res.data.data;
            const categoryDatas:SelectElement[] = [];

            datas.map((data:CategoryInterface) => {
                categoryDatas.push({
                    value: data.id,
                    label: data.category
                });
            });
            
            setCategoryDatas(categoryDatas);

        }).catch((err) => {
            context?.openAlertModal(err.message, 0);
        });
    },[]);

    useEffect(()=>{
        api.get("/author/get")
        .then((res) =>{
            const datas = res.data.data;
            const authors:SelectElement[] = [];

            datas.map((data:AuthorsInterface) => {
                authors.push({
                    value: data.id,
                    label: data.name
                });
            });
            
            setAuthorDatas(authors);
        }).catch((err) => {
            context?.openAlertModal(err.message, 0);
        });

    },[]);

    const {id} = useParams();

    useEffect(() => {
        if (isUpdated){
            api.get(`/book/get/${id}`)
            .then((res) => {
                const data = res.data.data;
                const category:SelectElement[] = []
                data.categories.forEach((elm:CategoryInterface) => {
                    category.push({value:elm.id, label: elm.category});
                });

                setSelectedCategories(category);
                setBookData(data);
                setSelectedAuthors(data.author.id);
                
            }).catch(() => {
                context.openAlertModal('Terjadi Kesalahan', 0);
                navigate('/admin/books');
            })
            
        }
    }, []);
    
    const validatedInput = () => {
        setIsSubmit(true);
       const isbnInpt = document.getElementById("isbnInpt") as HTMLInputElement | null;
        const titleInpt = document.getElementById("titleInpt") as HTMLInputElement | null;
        const descInpt = document.getElementById("descInpt") as HTMLInputElement | null;
        const publisherInpt = document.getElementById("publisherInpt") as HTMLInputElement | null;
        const yearInpt = document.getElementById("yearInpt") as HTMLInputElement | null;

        const isbnErr = document.getElementById("isbnErr");
        const titleErr = document.getElementById("titleErr");
        const authorErr = document.getElementById("authorErr");
        const categoryErr = document.getElementById("categoryErr");
        const publisherErr = document.getElementById("publisherErr");
        const yearErr = document.getElementById("yearErr");

        const isbnVal = isbnInpt?.value.trim() ?? "";
        if (isbnVal === "") {
            setError(isbnErr, "ISBN wajib diisi.");
        } else {
            resetErrors(['isbnErr']);
            setError(isbnErr);
        }

        const titleVal = titleInpt?.value.trim() ?? "";
        if (titleVal === "") {
            setError(titleErr, "Judul buku wajib diisi.");
        } else {
            resetErrors(['titleErr']);
            setError(titleErr);
        }

         const publisherVal = publisherInpt?.value.trim() ?? "";
        if (publisherVal === "") {
            setError(publisherErr, "Publisher buku wajib diisi.");
        } else {
            resetErrors(['publisherErr'])
            setError(publisherErr);
        }

        if (selectedAuthors === undefined) {
            setError(authorErr, "Author wajib dipilih.");
        } else {
            resetErrors(['authorErr'])
            setError(authorErr);
        }

        if (selectedCategories.length === 0) {
            setError(categoryErr, "Kategori wajib dipilih.");
        } else {
            resetErrors(['categoryErr'])
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
            resetErrors(['yearErr'])
            setError(yearErr);
        }
        
        if (isValid()){
            if (!isUpdated){
                createProccedd(isbnVal, titleVal, publisherVal, parseInt(yearVal), descInpt?.value);
            } else {
                updateProcced(isbnVal, titleVal, publisherVal, parseInt(yearVal), descInpt?.value);
            }
        } else{
            behaviorStore.addAttempt();
            behaviorStore.addError();
            setIsSubmit(false);
        }

    }

    const ErrorBookHandle = (err:Error) =>{
        if (axios.isAxiosError<LaravelBookErrorResponse>(err)) {
            const status = err.response?.status;
            const responseData = err.response?.data;

            // Jika error validasi dari Laravel (422)
            if (status === 422 && responseData?.errors) {
                const errors = responseData.errors;

                // Tampilkan pesan error ke masing-masing <span> jika ada
                if (errors.isbn?.[0]) {
                    setError(document.getElementById("isbnErr"), errors.isbn[0]);
                }
                if (errors.title?.[0]) {
                    setError(document.getElementById("titleErr"), errors.title[0]);
                }
                if (errors.category?.[0]) {
                    setError(document.getElementById("categoryErr"), errors.category[0]);
                }
                if (errors.authors?.[0]) {
                    setError(document.getElementById("authorErr"), errors.authors[0]);
                }
                if (errors.description?.[0]) {
                    setError(document.getElementById("descErr"), errors.description[0]);
                }
                if (errors.publisher?.[0]) {
                    setError(document.getElementById("publisherErr"), errors.publisher[0]);
                }
                if (errors.year?.[0]) {
                    setError(document.getElementById("yearErr"), errors.year[0]);
                }
            }
        }
    }

    const createProccedd = (isbn:string, title:string, publisher:string, year:number, description?:string) => {
        const categoyIds:string[]= [];
        selectedCategories.forEach((elm) => {
            categoyIds.push(elm.value);
        })
        
        const data = {
            isbn,
            title,
            description,
            author_id: selectedAuthors,
            category_ids: categoyIds,
            publisher,
            year
        }

        api.post("/book/create", data)
        .then((res) => {
            const data = res.data;
            context?.openAlertModal(data.message, 1);
            behaviorStore.trackFeature();
            behaviorStore.addAttempt();
            navigate('/admin/books');
        })
        .catch((err) => {
            const error = err.message;
            ErrorBookHandle(err);
            behaviorStore.addError();
            behaviorStore.addAttempt();
            context.openAlertModal(error, 0);
        }).finally(() => {
            setIsSubmit(false);
        })
    }


    const updateProcced = (isbn:string, title:string, publisher:string, year:number, description?:string) => {
        const categoyIds:string[]= [];
        selectedCategories.forEach((elm) => {
            categoyIds.push(elm.value);
        })
        
        const data = {
            isbn,
            title,
            description,
            author_id: selectedAuthors,
            category_ids: categoyIds,
            publisher,
            year
        }

        if(bookData != undefined){
            api.patch(`/book/update/${bookData.id}`, data)
            .then((res) => {
                const data = res.data;
                context?.openAlertModal(data.message, 1);
                behaviorStore.trackFeature();
                behaviorStore.addAttempt();
                navigate('/admin/books');
            })
            .catch((err) => {
                const error = err.message;
                ErrorBookHandle(err);
                behaviorStore.addError();
                behaviorStore.addAttempt();
                context.openAlertModal(error, 0);
            }).finally(() => {
                setIsSubmit(false);
            })
        }
    }

    return (
        <>
           <TitlePage>{!isUpdated ? "Create ": "Update "} Books</TitlePage>
           
           <MainCard>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="isbnInpt">ISBN</label>
                        <input type="text" name="isbn" id="isbnInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="ISBN" required defaultValue={bookData?.isbn}/>
                        <span className="text-sm text-red-500 hidden ms-1" id="isbnErr">ISBN is required!</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="titleInput">Title</label>
                        <input type="text" name="title" id="titleInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Title" required defaultValue={bookData?.title}/>
                        <span className="text-sm text-red-500 hidden ms-1" id="titleErr">Title is required!</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="categoryInpt">Category</label>
                       <Select 
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={categories}
                        onChange={manageCategoriSelected}
                        value={selectedCategories}
                        defaultValue={selectedCategories}
                       />
                        <span className="text-sm text-red-500 hidden ms-1" id="categoryErr">Choose Category!</span>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="authorsInpt">Authors</label>
                       <Select
                       closeMenuOnSelect={true}
                       components={animatedComponents}
                       isMulti={false}
                       options={authors}
                       key={bookData?.author.id}
                       defaultValue={authors?.find((a) => a.value == bookData?.author.id)}
                       onChange={manageAuthorSelected}
                       />
                        <span className="text-sm text-red-500 hidden ms-1" id="authorErr"></span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="descInpt">Description</label>
                       <textarea name="desc" id="descInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Description" defaultValue={bookData?.description}></textarea>
                        <span className="text-sm text-red-500 hidden ms-1" id="descErr"></span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="publisherInpt">Publisher</label>
                        <input type="text" name="publisher" id="publisherInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Publisher" required defaultValue={bookData?.publisher}/>
                        <span className="text-sm text-red-500 hidden ms-1" id="publisherErr">Publisher is required!</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="yearInpt">Year</label>
                        <input type="number" name="Year" id="yearInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Year" required defaultValue={bookData?.year}/>
                        <span className="text-sm text-red-500 hidden ms-1" id="yearErr"></span>
                    </div>
                    <div className="flex justify-end gap-2">
                        <ButtonSecondary label="Back" link="../books"/>
                        <ButtonAdd label={isUpdated ? "Update" : "Created"} onAction={validatedInput} status={isSubmit}/>
                    </div>
                </div>
           </MainCard>
        </>
    )
}


export default BookCreate;