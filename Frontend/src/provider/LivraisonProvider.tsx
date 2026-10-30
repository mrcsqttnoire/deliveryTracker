import { useState, type FormEvent, type ReactNode } from "react";
import type { ClassNameValue } from "tailwind-merge";
import { LivraisonContext, useCompression, useLoading, useUtilities, type Livraisons } from "./CustomizedHooks";
import api from "../api";
import axios from "axios";
import type { NavigateFunction } from "react-router-dom";
import { isBefore, isSunday, parse } from "date-fns";
// import api from "../api";

interface LivraisonProviderProps {
    children: ReactNode
}

const transformStyles: ClassNameValue[] = [
    "rotate-0 translate-y-0",
    "-rotate-6 -translate-x-2 md:-rotate-3",
    "rotate-12 translate-x-3 md:rotate-6"
]

const route = "tracking-api/livraison/"


export function LivraisonProvider({children}: LivraisonProviderProps){

    const [designation, setDesignation] = useState<string>("")
    const [dateLivraison, setDateLivraison] = useState<string>("")
    const [heureLivraison, setHeureLivraison] = useState<string>("")
    const [livreurAssigne, setLivreurAssigne] = useState<string>("")
    const {setMessage} = useUtilities()
    const {setIsLoading} = useLoading()
    const {compressedImg, setCompressedImg} = useCompression()
    const [livraisons, setLivraisons] = useState<Livraisons[]>([])
    
    const createLivraison = async (e: FormEvent<HTMLFormElement>, nav: NavigateFunction) => {
        setIsLoading(true)
        e.preventDefault()
        
        if(!designation || !dateLivraison || !heureLivraison || !livreurAssigne){
            setMessage("Veuillez compléter tous les champs s'il vous plait!")
            setIsLoading(false)
            return
        }

        const dateHeure = parse(
            `${dateLivraison} ${heureLivraison}`,
            "yyyy-MM-dd HH:mm",
            new Date()
        )

        if(isBefore(dateHeure, new Date)){
            setMessage("La date ne peut pas être dans le passé")
            setIsLoading(false)
            return
        }

        if(isSunday(dateHeure)){
            setMessage("Nous ne travaillons pas le dimanche")
            setIsLoading(false)
            return
        }
        
        try {
            const data = new FormData()
            data.append('designation', designation)
            data.append('date_livraison', dateLivraison)
            data.append('heure_livraison', heureLivraison)
            data.append('livreur', livreurAssigne)
            compressedImg?.forEach((img)=>{
                data.append('uploaded_photos', img)
            })
            const res = await api.post(
                route,
                data
            )
            if (res.status === 201){
                setMessage("Livraison créée avec succès. Vous allez être redirigé!")
                await new Promise(r => setTimeout(r, 2000))
                viderChamp()
                nav("/livraisons")
            }
        } catch (err) {
            if (axios.isAxiosError(err)){
                const data = err.response?.data
                if (data.detail){
                    setMessage(data?.detail ?? JSON.stringify(data) ?? "Erreur lors de la création du compte")
                }
            } else {
                setMessage("Une erreur inattendue est survenue")
            }
        } finally {
            setIsLoading(false)
        }

    }

    const viderChamp = () => {
        setDesignation("")
        setDateLivraison("")
        setHeureLivraison("")
        setLivreurAssigne("")
        setMessage("")
        setCompressedImg([])
    }

    // const getLivraisons = async () => {

    // }

    return <>
        <LivraisonContext.Provider value={{
            transformStyles,
            designation, setDesignation,
            dateLivraison, setDateLivraison, 
            heureLivraison, setHeureLivraison,
            livreurAssigne, setLivreurAssigne, 
            livraisons, setLivraisons,
            viderChamp,
            createLivraison,  
        }}>
            {children}
        </LivraisonContext.Provider>
    </>
}