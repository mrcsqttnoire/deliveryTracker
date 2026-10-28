import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function Filter () {
    return <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <NavLink to={"/"} className={({isActive})=>(twMerge("bg-white py-4 px-8 text-sm text-center font-body font-semibold shadow-sm/15 rounded-4xl", isActive ? "bg-neutral text-white" : ""))}>
                Toutes
            </NavLink >
            <NavLink to={"teste"} className={({isActive})=>(twMerge("bg-white py-4 px-8 text-sm text-center text-secondary font-body font-semibold shadow-sm/15 rounded-4xl", isActive ? "bg-neutral text-white" : ""))}>
                En cours
            </NavLink >
            <NavLink to={"f"} className={({isActive})=>(twMerge("bg-white py-4 px-8 text-sm text-center text-secondary font-body font-semibold shadow-sm/15 rounded-4xl", isActive ? "bg-neutral text-white" : ""))}>
                En attentes
            </NavLink >
            <NavLink to={"f"} className={({isActive})=>(twMerge("bg-white py-4 px-8 text-sm text-center text-secondary font-body font-semibold shadow-sm/15 rounded-4xl", isActive ? "bg-neutral text-white" : ""))}>
                Livrée
            </NavLink >
        </div>
    </>
}
