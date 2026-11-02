import { useState, type ReactNode } from "react";
import { LivreurContext, useLoading, useUtilities, type Livreur } from "./CustomizedHooks";
import api from "../api";
import axios from "axios";


interface LivreurProviderProps {
    children: ReactNode
}

export function LivreurProvider ({children}: LivreurProviderProps) {

    // const [nomLivreur, setNomLivreur] = useState<String>("")
    // const [prenomLivreur, setNomLivreur] = useState<String>("")
    // const [nomLivreur, setNomLivreur] = useState<String>("")
    // const [nomLivreur, setNomLivreur] = useState<String>("")

    const {setIsLoading} = useLoading()
    const {setMessage} = useUtilities()
    const [livreursList, setLivreursList] = useState<Livreur[] | null>(null)
    const [livreurAssigne, setLivreurAssigne] = useState<Livreur | null>(null)

    const route = "tracking-api/livreur/"
    const getLivreurs = async () => {
        await api.get(route)
            .then((res) => res.data)
            .then((data) =>{
                setLivreursList(data)
            })
            .catch((err) => console.log(err))
        }

    async function deleteLivreur(uuid: string) {
        setIsLoading(true)
        if (!uuid) {
            setMessage("Séléctionner le livreur à supprimer")
            setIsLoading(false)
            return
        }
        try{
            const route = `/tracking-api/livreur/${uuid}/`
            const res = await api.delete(route)
            if(res && res.status === 204){
                setMessage("Livreur est supprimé avec succès!")
                return new Promise(r => setTimeout(r, 500))
                // nav(0)
            }
        } catch (err) {
            if (axios.isAxiosError(err)){
                console.log(err)
                setMessage("Erreur lors de la suppression de ce livreur")
            } else {
                console.log(err)
            }
        } finally {
            setIsLoading(false)
        }

    }

    return <LivreurContext.Provider
        value={{
            livreursList,
            livreurAssigne,
            setLivreurAssigne,
            getLivreurs,
            deleteLivreur,
        }}
    >
        {children}
    </LivreurContext.Provider>
}
