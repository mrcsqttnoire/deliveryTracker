import { LucideLogOut, User } from "lucide-react";
import { twMerge, type ClassNameValue } from "tailwind-merge";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constanst";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SpinLoading } from "./button";
import { useUtilities } from "../../provider/CustomizedHooks";

interface OptionsProps {
    className?: ClassNameValue
}
export function Options ({className}: OptionsProps) {
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const {setIsOpen} = useUtilities()
    const nav = useNavigate()

    const logout = async () => {
        setIsLoad(true)

        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        
        await new Promise(r => setTimeout(r, 2000))
        setIsOpen(false)
        setIsLoad(false)
        // console.log("logout")
        nav("/auth/login")
    }

    return <>
        <div className={twMerge("flex flex-col gap-2 bg-principale/70 p-4  w-auto h-auto backdrop-blur-md  shadow-xl rounded-xl z-50 origin-top-right menu-deroulant", className)}>
            <button className="place-content-start flex gap-2 text-neutral rounded-lg py-2 px-4 font-bod hover:bg-secondary/10">
                <User className="text-secondary shrink-0"/>
                Profile
            </button>
            <div className="w-full border-t-[1px] border-secondary/50"></div>
            <button onClick={logout} className={twMerge("place-content-start flex gap-2 text-neutral rounded-lg py-2 px-4 font-body hover:bg-primary/10 disabled:opacity-50")} disabled={isLoad}>
                {isLoad ? <SpinLoading className="text-primary"/> : <LucideLogOut className="text-primary shrink-0"/> }
                Déconnecter
            </button>
        </div>
    </>
}
