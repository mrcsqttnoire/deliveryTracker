import type { ReactNode } from "react";
import { UtilitiesContext } from "./CustomizedHooks";
import type { ClassNameValue } from "tailwind-merge";

interface UtilitiesProviderProps {
    children: ReactNode
}

export function UtilitiesProvider ({children}: UtilitiesProviderProps) {
    const Bg_profile_client: ClassNameValue[] = [
        "bg-livree-bg text-livree",
        "bg-en_route-bg text-en_route",
        "bg-en_attente-bg text-en_attente"
    ]
    return <>
        <UtilitiesContext.Provider value={{
            Bg_profile_client
        }}>
            {children}
        </UtilitiesContext.Provider>
    </>
}
