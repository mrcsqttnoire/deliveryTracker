import { useState, type ReactNode } from "react";
import { DetailContext } from "./CustomizedHooks";

export interface ClientProviderProps {
    children: ReactNode
}

export function AddDetailProvider ({children}: ClientProviderProps) {

    const [nom_client, setNomClient] = useState<string>("")
    const [prenom_client, setPrenomClient] = useState<string>("")
    const [telephone_client, setTelephoneClient] = useState<string>("") 
    const [repere, setRepere] = useState<string>("") 

    return <>
        <DetailContext.Provider value={{
            nom_client, setNomClient,
            prenom_client, setPrenomClient,
            telephone_client, setTelephoneClient,
            repere, setRepere
        }}>
            {children}
        </DetailContext.Provider>
    </>
}
