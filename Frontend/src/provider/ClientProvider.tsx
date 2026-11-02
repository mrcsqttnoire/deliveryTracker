import { useState, type ReactNode } from "react";
import { ClientContext, useLoading, useUtilities, type Client } from "./CustomizedHooks";
import api from "../api";
import type { NavigateFunction } from "react-router-dom";
import axios from "axios";

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

    async function deleteClient(uuid: string, nav: NavigateFunction ) {
        setIsLoading(true)
        if (!uuid) {
            setMessage("Séléctionner le client à supprimer")
            setIsLoading(false)
            return
        }
        try{
            const route = `/tracking-api/client/${uuid}/`
            const res = await api.delete(route)
            if(res && res.status === 204){
                await new Promise(r => setTimeout(r, 1000))
                nav(0)
                setMessage("Le client est supprimé avec succès!")
            }
        } catch (err) {
            if (axios.isAxiosError(err)){
                console.log(err)
                setMessage("Erreur lors de la suppression de ce client")
            } else {
                console.log(err)
            }
        } finally {
            setIsLoading(false)
        }

    }

    return <>
        <ClientContext.Provider value={{
            clients, setClients,
            getAllClients,
            deleteClient,
        }}>
            {children}
        </ClientContext.Provider>
    </>
}
