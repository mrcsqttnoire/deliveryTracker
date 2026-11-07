import { useState, type ReactNode } from "react";
import { ClientContext, useLoading, useUtilities, type Client } from "./CustomizedHooks";
import api from "../api";
import axios from "axios";

export interface ClientProviderProps {
    children: ReactNode
}

const routes = "/tracking-api/client/"
export function ClientProvider ({children}: ClientProviderProps) {
    const {setIsLoading} = useLoading()
    const {setMessage} = useUtilities()
    const [clients, setClients] = useState<Client[] | null>(null)

    async function getAllClients() {
        setIsLoading(true)
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

    async function deleteClient(uuid: string) {
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
                setMessage("Le client est supprimé avec succès!")
                return new Promise(r => setTimeout(r, 500))
                // nav(0)
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

    async function searchClient(search: string) {
        try {
            const res = await api.get(routes.concat(`?search=${search}`))
            const data = res.data
            setClients(data)
        } catch (err) {
            if (axios.isAxiosError(err)){
                setMessage(err.response?.data.detail ?? "Erreur lors du chargement des données")
            } else {
                console.log(err)
            }
        }
    }

    return <>
        <ClientContext.Provider value={{
            clients, setClients,
            getAllClients,
            deleteClient,
            searchClient
        }}>
            {children}
        </ClientContext.Provider>
    </>
}
