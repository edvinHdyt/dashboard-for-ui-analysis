import { useEffect, useState, type ReactNode } from "react"
import TitlePage from "../../Components/TitlePage";
import { MainCard } from "../../Components/MainCard";
import { ButtonAdd, ButtonSecondary } from "../../Components/Button";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router";
import type { MainLayoutContext } from "../../Layouts/MainLayout";
import createFormValidator from "../../Utils/FormValidator";
import api from "../../Utils/Api";
import type { AuthorsInterface } from "./Authors";


const AuthorCreate = ():ReactNode => {
    const location = useLocation();
    const context = useOutletContext<MainLayoutContext>();
    const {setError, isValid} = createFormValidator();
    const [isSubmit, setIsSubmit] = useState(false);
    const [authorData, setAuthorData]  = useState<AuthorsInterface>();
    const [authorName, setAuthorName]  = useState("");

    const isUpdated = location.pathname.includes('update');

    const navigate = useNavigate();

    const validatedInput = () => {
        setIsSubmit(true);
        const nameInput = document.getElementById("nameInput") as HTMLInputElement;
        const nameErr = document.getElementById("nameErr");

        const nameVal = nameInput.value;
        if (nameVal == ""){
            setError(nameErr, "Name wajib diisi!");
        }else{
            setError(nameErr);
        }

        if (isValid()){
            if (!isUpdated){
                createProccedd(nameVal);
            } else {
                updateProcced(nameVal);
            }
        } else{
            setIsSubmit(false);
        }
    }

    const updateProcced = (name:string) => {
        const data = {
            name,
        }

        if(authorData!= undefined){
            api.patch(`/author/update/${authorData.id}`, data)
            .then((res) => {
                const data = res.data;
                context?.openAlertModal(data.message, 1);
    
                navigate('/admin/authors');
            })
            .catch((err) => {
                const error = err.message;
    
                context.openAlertModal(error, 0);
            }).finally(() => {
                setIsSubmit(false);
            })
        } else {
            context.openAlertModal('Terjadi Kesalahan', 0);
            setIsSubmit(false);
        }
    }

    const createProccedd = (name: string) => {
        const data = {
            name,
        }

        api.post("/author/create", data)
        .then((res) => {
            const data = res.data;
            context?.openAlertModal(data.message, 1);

            navigate('/admin/authors');
        })
        .catch((err) => {
            const error = err.message;

            context.openAlertModal(error, 0);
        }).finally(() => {
            setIsSubmit(false);
        })
    }

    const {id} = useParams();

    useEffect(() => {
        if (isUpdated){
            api.get(`/author/get/${id}`)
            .then((res) => {
                const data = res.data.data;
                setAuthorData(data);
                setAuthorName(data.name);
            }).catch(() => {
                context.openAlertModal('Terjadi Kesalahan', 0);
                navigate('/admin/authors');
            })
    
        }
    }, [])


    return (
        <>
           <TitlePage>{!isUpdated ? "Create ": "Update "} Author</TitlePage>
           
           <MainCard>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="Name">Name</label>
                        <input type="text" name="name" id="nameInput" className="w-full border px-3 py-2 rounded-sm outline-teal-500 border-slate-600" placeholder="Name" required defaultValue={authorName}/>
                        <span className="text-sm text-red-500 hidden ms-1" id="nameErr">Name is required!</span>
                    </div>
                    <div className="flex justify-end gap-2">
                        <ButtonSecondary label="Back" link="../authors"/>
                        <ButtonAdd label={isUpdated ? "Update" : "Created"} onAction={validatedInput} status={isSubmit}/>
                    </div>
                </div>
           </MainCard>
        </>
    )
}

export default AuthorCreate;