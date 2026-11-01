import { useState, type ReactNode } from "react";
import { ClientContext, useLoading, useUtilities, type Client } from "./CustomizedHooks";
import api from "../api";

export interface ClientProviderProps {
    children: ReactNode
}

export function ClientProvider ({children}: ClientProviderProps) {
    const {setIsLoading} = useLoading()
    const {setMessage} = useUtilities()
    const [clients, setClients] = useState<Client[] | null>(null)

    async function getAllClients() {
        setIsLoading(true)
        const routes = "/tracking-api/client/"
        try {
            const res = await api.get(routes)
            if(res && res.status === 200){
                const data = res.data
                setClients(data)
            }
        } catch (err) {
            console.log(err)
            setMessage("Erreur lors du chargement des données")
        } finally {
            setIsLoading(false)
        }
    }
    return <>
        <ClientContext.Provider value={{
            clients, setClients,
            getAllClients,
        }}>
            {children}
        </ClientContext.Provider>
    </>
}
