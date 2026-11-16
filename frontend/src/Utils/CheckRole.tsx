import type { AuthStorage } from "./Api";


const isSuperAdmin = (authData:AuthStorage):boolean => {
    const role = authData.user.role;

    if(role == "Super Admin"){
        return true;
    }

    return false;
}

const isAdmin = (authData:AuthStorage):boolean => {
    const role = authData.user.role;

    if(role == "Admin"){
        return true;
    }

    return false;
}


const isMember = (authData:AuthStorage):boolean => {
    const role = authData.user.role;

    if(role == "Member"){
        return true;
    }

    return false;
}

export {isAdmin, isSuperAdmin, isMember};