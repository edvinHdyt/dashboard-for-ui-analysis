
const Status = ({msg, type}: {msg:string, type:number}) =>{
    let colorClass:string;

    switch (type) {
        case 1:
            colorClass= "text-emerald-600";
            break;
        case 2:
            colorClass= "text-amber-600";
            break;
        case 3:
            colorClass= "text-sky-600";
            break;
        default:
            colorClass= "text-rose-600";
            break;
    }
    
    return (
        <span className={`font-semibold ${colorClass}`}>
            {msg}
        </span>
    );

}

export {Status};