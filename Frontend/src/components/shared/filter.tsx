
import { NavLink, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function Filter () {
    const [searchParams] = useSearchParams()
    const status = searchParams.get('status')
    return <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            <NavLink 
                to={{   
                }} 
                className={()=>(twMerge("bg-white py-4 px-8 text-sm text-center font-body font-semibold shadow-sm/15 rounded-4xl", !status && "bg-neutral text-white"))}>
                Toutes
            </NavLink >
            <NavLink 
                to={{
                    search: "?status=en_route"
                }} 
                className={()=>(twMerge("bg-white py-4 px-8 text-sm text-center text-secondary font-body font-semibold shadow-sm/15 rounded-4xl", status === "en_route" && "bg-neutral text-white"))}>
                En cours
            </NavLink >
            <NavLink 
                to={{
                    search: "?status=en_attente"
                }} 
                className={()=>(twMerge("bg-white py-4 px-8 text-sm text-center text-secondary font-body font-semibold shadow-sm/15 rounded-4xl", status === "en_attente" && "bg-neutral text-white"))}>
                En attentes
            </NavLink >
            <NavLink 
                to={{
                    search: "?status=livree"
                }} 
                className={()=>(twMerge("bg-white py-4 px-8 text-sm text-center text-secondary font-body font-semibold shadow-sm/15 rounded-4xl", status === "livree" && "bg-neutral text-white"))}>
                Livrée
            </NavLink >
        </div>
    </>
}
