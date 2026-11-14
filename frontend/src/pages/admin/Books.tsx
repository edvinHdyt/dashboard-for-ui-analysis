import TitlePage from "../../Components/TitlePage";
import { MainCard } from "../../Components/MainCard";
import DataTable, {type TableColumn} from "react-data-table-component";
import { ButtonAdd, ButtonDeleteBulk } from "../../Components/Button";
import { useOutletContext } from "react-router";
import { useEffect } from "react";
import type { MainLayoutContext } from "../../Layouts/MainLayout";
import Select from "react-select/base";

const bookStatus = {
    Tersedia: "Tersedia",
    Dipinjam: "Dipinjam"
} as const;

type BookStatus = (typeof bookStatus)[keyof typeof bookStatus];

interface BooksInterface{
    id:string,
    isbn:number,
    title: string,
    author: string,
    status: BookStatus
}


const Books = () => {
    const context = useOutletContext<MainLayoutContext>();

    const deleteOneData = () => {
        context.openDeleteConfirmModal();

    }

    useEffect(() => {
        console.log(context.isDataDelete);
    }, [context.isDataDelete]);

    
    const iconWidth = "1.4em";
    const columns:TableColumn<BooksInterface>[] = [
        {
            name: 'ISBN',
            selector: (row) => row.isbn,
            sortable:true,
            grow: 2
        },
        { 
            name: 'Title',
            selector: row => row.title,
            grow: 1,
            wrap: true
        },
        {
            name: 'Authors',
            selector: row => row.author
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
            cell: (row) => (
                <span
                className={`px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                    row.status === bookStatus.Tersedia
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-amber-100 text-amber-700 border border-amber-200"
                }`}
                >
                {row.status}
                </span>
            )
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-medium bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconWidth} viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" fill-rule="evenodd" d="M21.455 5.416a.75.75 0 0 1-.096.943l-9.193 9.192a.75.75 0 0 1-.34.195l-3.829 1a.75.75 0 0 1-.915-.915l1-3.828a.8.8 0 0 1 .161-.312L17.47 2.47a.75.75 0 0 1 1.06 0l2.829 2.828a1 1 0 0 1 .096.118m-1.687.412L18 4.061l-8.518 8.518l-.625 2.393l2.393-.625z" clip-rule="evenodd" />
                            <path fill="currentColor" d="M19.641 17.16a44.4 44.4 0 0 0 .261-7.04a.4.4 0 0 1 .117-.3l.984-.984a.198.198 0 0 1 .338.127a46 46 0 0 1-.21 8.372c-.236 2.022-1.86 3.607-3.873 3.832a47.8 47.8 0 0 1-10.516 0c-2.012-.225-3.637-1.81-3.873-3.832a46 46 0 0 1 0-10.67c.236-2.022 1.86-3.607 3.873-3.832a48 48 0 0 1 7.989-.213a.2.2 0 0 1 .128.34l-.993.992a.4.4 0 0 1-.297.117a46 46 0 0 0-6.66.255a2.89 2.89 0 0 0-2.55 2.516a44.4 44.4 0 0 0 0 10.32a2.89 2.89 0 0 0 2.55 2.516c3.355.375 6.827.375 10.183 0a2.89 2.89 0 0 0 2.55-2.516" />
                        </svg>

                    </button>
                    <button className="px-3 py-1 text-xs font-medium bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors cursor-pointer" onClick={deleteOneData}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconWidth} viewBox="0 0 16 16">
                            <path d="M0 0h16v16H0z" fill="none" />
                            <path fill="currentColor" d="M12.099 14.11a1 1 0 0 1-.995.89H4.897a1 1 0 0 1-.995-.89L3 6h10zM10 1a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v1H2V4a1 1 0 0 1 1-1h2V2a1 1 0 0 1 1-1zm0 1H6v1h4z" />
                        </svg>
                    </button>
                </div>
            ),
            grow: 0.6,
        }
    ];

    const customStyle = {
        table: {
            style:{
                border: '1px solid #eeee'
            }
        },
        headRow: {
            style: {
                backgroundColor: '#0c3e45',
                fontWeight: 700,
                fontSize: '14.5px',
                borderBottom: '1px solid #e5e7eb',
                color: '#ffff',
            },
            cells: {
                style: {
                    border: '0.8px solid #9999'
                }
            }
        },
        rows: {
            style: {
                fontSize: '14px',
            },
            selectedHighlightStyle: {
                backgroundColor: '#e0eaff',
            },
        },
        cells: {
            style: {
                border: '0.8px solid #eeee'
            },
        },
    }

    const data = [
        { id: "1", isbn: 5123, title: "bookA", author: "lorem", status: bookStatus.Tersedia },
        { id: "2", isbn: 5123, title: "bookA", author: "lorem", status: bookStatus.Dipinjam },
    ];

    const handleSelectedRowsChange = (state: { selectedRows: BooksInterface[] }) => {
        // state.selectedRows berisi array objek data mentah yang tercentang
        console.log(state.selectedRows)
    };

    return(
        <>
           <TitlePage>Books</TitlePage>

           <MainCard>
                <div className="flex w-full flex-col gap-2">

                    <div className="flex justify-end gap-2 flex-wrap-reverse">
                        <div className="flex gap-2 items-center">
                            <label htmlFor="Search">Search</label>
                            <input type="text" className="px-2 py-2 border-slate-700 border rounded-md outline-teal-600 active:border" placeholder="Search"/>
                        </div>
                        <ButtonDeleteBulk label="Delete Selected">
                            <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconWidth} viewBox="0 0 16 16">
                                <path d="M0 0h16v16H0z" fill="none" />
                                <path fill="currentColor" d="M12.099 14.11a1 1 0 0 1-.995.89H4.897a1 1 0 0 1-.995-.89L3 6h10zM10 1a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v1H2V4a1 1 0 0 1 1-1h2V2a1 1 0 0 1 1-1zm0 1H6v1h4z" />
                            </svg>
                        </ButtonDeleteBulk>
                        <ButtonAdd link={"create"} label={"Add Books"}/>
                    </div>
                    <DataTable columns={columns} data={data} pagination customStyles={customStyle} selectableRows onSelectedRowsChange={handleSelectedRowsChange}/>
                </div>
           </MainCard>
        </>
    )
}


export default Books;