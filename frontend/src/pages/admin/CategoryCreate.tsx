import { useEffect, useState, type ReactNode } from "react";
import TitlePage from "../../Components/TitlePage";
import { MainCard } from "../../Components/MainCard";
import { ButtonAdd, ButtonSecondary } from "../../Components/Button";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router";
import type { MainLayoutContext } from "../../Layouts/MainLayout";
import createFormValidator from "../../Utils/FormValidator";
import type { CategoryInterface } from "./Category";
import api from "../../Utils/Api";
import axios from "axios";
import { behaviorStore } from "../../Utils/behaviorStore";

interface LaravelCategoryErrorResponse{
    message: string;
    errors?:{
        category?: string
    }
}

const CategoryCreate = ():ReactNode => {
    const location = useLocation();
    const context = useOutletContext<MainLayoutContext>();
    const {setError, resetErrors, isValid} = createFormValidator();
    const [isSubmit, setIsSubmit] = useState(false);

    const [categoryData, setCategoryData]  = useState<CategoryInterface>();
    const [categoryName, setCategoryName]  = useState("");
    const navigate = useNavigate();

    const isUpdated = location.pathname.includes('update');

    const validatedInput = () => {
        setIsSubmit(true);
        const categoryInpt = document.getElementById("categoryInpt") as HTMLInputElement;
        const categoryErr = document.getElementById("categoryErr");

        const categoryVal = categoryInpt.value;
        if (categoryVal == ""){
            setError(categoryErr, "Category wajib diisi!");
        }else{
            resetErrors(['categoryErr']);
            setError(categoryErr);
        }

        if (isValid()){
            if (!isUpdated){
                createProccedd(categoryVal);
            } else {
                updateProcced(categoryVal);
            }
        } else{
            behaviorStore.addAttempt();
            behaviorStore.addError();
            setIsSubmit(false);
        }
    }

    const ErrorCategoryHandler = (err:Error) =>{
        if (axios.isAxiosError<LaravelCategoryErrorResponse>(err)) {
            const status = err.response?.status;
            const responseData = err.response?.data;

            // Jika error validasi dari Laravel (422)
            if (status === 422 && responseData?.errors) {
                const errors = responseData.errors;

                // Tampilkan pesan error ke masing-masing <span> jika ada
                if (errors.category?.[0]) {
                    setError(document.getElementById("categoryErr"), errors.category[0]);
                }
            }
        }
    }

    const createProccedd = (category: string) => {
        const data = {
            category,
        }

        api.post("/category/create", data)
        .then((res) => {
            const data = res.data;
            context?.openAlertModal(data.message, 1);
            behaviorStore.trackFeature();
            behaviorStore.addAttempt();
            navigate('/admin/categories');
        })
        .catch((err) => {
            const error = err.message;
            ErrorCategoryHandler(err);
            behaviorStore.addError();
            behaviorStore.addAttempt();
            context.openAlertModal(error, 0);
        }).finally(() => {
            setIsSubmit(false);
        });
    }
    const updateProcced = (category:string) => {
        const data = {
            category,
        }

        if(categoryData!= undefined){
            api.patch(`/category/update/${categoryData.id}`, data)
            .then((res) => {
                const data = res.data;
                context?.openAlertModal(data.message, 1);
                behaviorStore.trackFeature();
                behaviorStore.addAttempt();
        
                navigate('/admin/categories');
            })
            .catch((err) => {
                const error = err.message;
                ErrorCategoryHandler(err);
                behaviorStore.addError();
                behaviorStore.addAttempt();

                context.openAlertModal(error, 0);
            }).finally(() => {
                setIsSubmit(false);
            })
        } else {
            context.openAlertModal('Terjadi Kesalahan', 0);
            setIsSubmit(false);
        }
    }

    const {id} = useParams();

    useEffect(() => {
        if (isUpdated){
            api.get(`/category/get/${id}`)
            .then((res) => {
                const data = res.data.data;
                setCategoryData(data);
                setCategoryName(data.category);
            }).catch(() => {
                context.openAlertModal('Terjadi Kesalahan', 0);
                navigate('/admin/category');
            })
    
        }
    }, [])



    return (
        <>
           <TitlePage>{!isUpdated ? "Create ": "Update "} Category</TitlePage>
           
           <MainCard>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="Name">Category</label>
                        <input type="text" name="name" id="categoryInpt" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Category" required defaultValue={categoryName}/>
                        <span className="text-sm text-red-500 hidden ms-1" id="categoryErr">Category is required!</span>
                    </div>
                    <div className="flex justify-end gap-2">
                        <ButtonSecondary label="Back" link="../categories"/>
                        <ButtonAdd label={isUpdated ? "Update" : "Created"} onAction={validatedInput} status={isSubmit}/>
                    </div>
                </div>
           </MainCard>
        </>
    )
}


export default CategoryCreate;