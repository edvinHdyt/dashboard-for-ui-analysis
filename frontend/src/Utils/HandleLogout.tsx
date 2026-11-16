import { useNavigate } from "react-router";
import { removeCryptoStorage } from "./StorageHandle";
import api from "./Api";
import { useEffect, useRef } from "react";


const HandleLogout = () => {
    const navigate = useNavigate();
    const called = useRef(false);

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        api.post("/logout")
        .then((res)=>{
            console.log(res)
            localStorage.setItem('status', res.data.message);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            removeCryptoStorage("auth");
            navigate("/auth", { replace: true });
        });
    }, [navigate]);


    return (<></>)
};

export {HandleLogout};