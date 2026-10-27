import type { ReactNode } from "react";
import type { ClassNameValue } from "tailwind-merge";
import { LivraisonContext } from "./CustomizedHooks";

interface LivraisonProviderProps {
    children: ReactNode
}

export function LivraisonProvider({children}: LivraisonProviderProps){

    const transformStyles: ClassNameValue[] = [
        "rotate-0 translate-y-0",
        "-rotate-6 -translate-x-2 md:-rotate-3",
        "rotate-12 translate-x-3 md:rotate-6"
    ]

    return <>
        <LivraisonContext.Provider value={{transformStyles}}>
            {children}
        </LivraisonContext.Provider>
    </>
}