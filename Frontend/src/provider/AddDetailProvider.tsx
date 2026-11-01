import { useState, type FormEvent, type ReactNode } from "react";
import { DetailContext, useLoading, useUtilities } from "./CustomizedHooks";
import axios from "axios";
import type { NavigateFunction } from "react-router-dom";
import api from "../api";

export interface ClientProviderProps {
    children: ReactNode
}
export function AddDetailProvider ({children}: ClientProviderProps) {
    
    const [nom_client, setNomClient] = useState<string>("")
    const [prenom_client, setPrenomClient] = useState<string>("")
    const [telephone_client, setTelephoneClient] = useState<string>("") 
    const [repere, setRepere] = useState<string>("") 
    const [lieu, setLieu] = useState<string>("") 
    const {setIsLoading} = useLoading()
    const {marker, setMarker, setMessage} = useUtilities()
    
    async function AddDetail(e: FormEvent<HTMLFormElement>, nav: NavigateFunction, uuid: string="") {
        e.preventDefault()
        setIsLoading(true)

        if(!uuid.trim()) {
            setMessage("Redemandez le lien de suivi de votre livraison à ton propriétaire")
            setIsLoading(false)
            return
        }
        if (!marker || marker.lat === undefined || marker.lng === undefined) {
            setMessage("Veuillez sélectionner la destination s'il vous plaît")
            setIsLoading(false)
            return
        }
        if (!nom_client.trim() || !prenom_client.trim() || !telephone_client.trim() || !repere.trim()){
            setMessage("Veuillez compléter tous les champs s'il vous plait")
            setIsLoading(false)
            return
        }

        const destination = {
            "latitude": Number(marker.lat.toFixed(6)),
            "longitude": Number(marker.lng.toFixed(6)),
            "lieu": lieu,
            "repere": repere,
        }
        const client = {
            "nom": nom_client,
            "prenom": prenom_client,
            "telephone": telephone_client,
        }

        try{
            const routes = `/tracking-api/details-livraison/${uuid}`
            // console.log(routes)
            const res = await api.put(
                routes,
                {
                    "destination": destination,
                    "client": client
                },
                {skipAuth: true}
            )
            if (res && res.status === 200){
                setMessage("Merci d'avoir nous donner vos informations")
                await new Promise(r => setTimeout(r, 2000))
                viderChamp()
                nav(0)
            }
        } catch (err) {
            if (axios.isAxiosError(err)){
                console.log(err)
                setMessage("Erreur lors de la validation, veuillez ressayer plus tard ou signalez votre propriétaire")
            } else {
                console.log(err)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const viderChamp = () => {
        setNomClient("")
        setPrenomClient("")
        setTelephoneClient("")
        setRepere("")
        setLieu("")
        setMarker(null)
    }

    return <>
        <DetailContext.Provider value={{
            nom_client, setNomClient,
            prenom_client, setPrenomClient,
            telephone_client, setTelephoneClient,
            lieu, setLieu,
            repere, setRepere,
            AddDetail,
            viderChamp,
        }}>
            {children}
        </DetailContext.Provider>
    </>
}
