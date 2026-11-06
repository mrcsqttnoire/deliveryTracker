import { useState, type FormEvent, type ReactNode } from "react";
import type { ClassNameValue } from "tailwind-merge";
import { LivraisonContext, useCompression, useLoading, usePosition, useUser, useUtilities} from "./CustomizedHooks";
import api from "../api";
import axios from "axios";
import type { NavigateFunction } from "react-router-dom";
import { isBefore, isSunday, parse } from "date-fns";
import { LIVRAISON_ROUTES } from "../api_routes";
import type { Livraisons } from "./ModelsType";
import { getUserLocation } from "../map/customMapHook";
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
const public_route = "tracking-api/list-livraison/"


export function LivraisonProvider({children}: LivraisonProviderProps){

    const [designation, setDesignation] = useState<string>("")
    const [dateLivraison, setDateLivraison] = useState<string>("")
    const [heureLivraison, setHeureLivraison] = useState<string>("")
    const [livreurAssigne, setLivreurAssigne] = useState<string>("")
    const {setMessage} = useUtilities()
    const {setIsLoading} = useLoading()
    const {compressedImg, setCompressedImg} = useCompression()
    const [livraisons, setLivraisons] = useState<Livraisons[]>([])

    const [maLivraison, setMaLivraison] = useState<Livraisons[]>([])
    const [livraisonChargee, setLivraisonChargee] = useState(false)
    const {isProprietaire, userLogedIn} = useUser()
    const {sendPosition} = usePosition()

    
    const createLivraison = async (e: FormEvent<HTMLFormElement>, nav: NavigateFunction) => {
        e.preventDefault()
        if (!isProprietaire){
            setMessage("Vous n'avez pas le droit de créer une livraison")
            return
        }
        if(!designation || !dateLivraison || !heureLivraison || !livreurAssigne){
            setMessage("Veuillez compléter tous les champs s'il vous plait!")
            return
        }

        const dateHeure = parse(
            `${dateLivraison} ${heureLivraison}`,
            "yyyy-MM-dd HH:mm",
            new Date()
        )

        if(isBefore(dateHeure, new Date)){
            setMessage("La date ne peut pas être dans le passé")
            return
        }

        if(isSunday(dateHeure)){
            setMessage("Nous ne travaillons pas le dimanche")
            return
        }
        
        try {     
            setIsLoading(true)
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

    
    const listRoute = userLogedIn ? LIVRAISON_ROUTES[userLogedIn.role] : null

    const getLivraisons = async () => {
        if (!listRoute) return
        setIsLoading(true)
        try{
            const res = await api.get(listRoute)
            if (res && res.status === 200){
                const data = res.data
                setLivraisons(data)    
            }
        } catch (err) {
            if (axios.isAxiosError(err)){
                setMessage(err.response?.data.detail ?? "Erreur lors du chargement des données")
            } else {
                console.log(err)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const getSelectedLivraison = async (id: string, nav: NavigateFunction) => {
        setLivraisonChargee(false)
        setIsLoading(true)
        try{
            if (!id.trim()){
                nav("/")
            }
            const res = await api.get(`${public_route}${id}`,{skipAuth: true})
            if (res && res.status === 200){
                const data = res.data
                // console.log(data)
                setMaLivraison(Array.isArray(data) ? data : [data])
                // setLivraisons(data)    
            }
        } catch (err) {
            if (axios.isAxiosError(err)){
                setMessage(err.response?.data.detail ?? "Erreur lors du chargement des données")
            } else {
                console.log(err)
            }
        } finally {
            setIsLoading(false)
            setLivraisonChargee(true)
        }
    }

    const filterLivraison = async (filter: string, nav: NavigateFunction) => {
        try{
            if (!listRoute) return
            setIsLoading(true)
            if (!filter) nav(0)
            const res = await api.get(listRoute?.concat(`?status__iexact=${filter}`))
            const data = res.data
            setLivraisons(data)
        } catch (err) {
            if (axios.isAxiosError(err)){
                setMessage(err.response?.data.detail ?? "Erreur lors du chargement des données")
            } else {
                console.log(err)
            }
        } finally {
            setIsLoading(false)
            setLivraisonChargee(true)
        }
    }

    async function demarrerUneCourse(uuid: string, nav: NavigateFunction){
        if (!uuid.trim()){
            setMessage("Veuillez choisir la livraison à démarre!")
            return
        }
        setIsLoading(true)
        const route_demarer = `tracking-api/livraison/${uuid}/demarrer/`
        try {
            const position = await getUserLocation()
            if (!position) {
                setMessage("Impossible de récupérer votre position, vérifiez votre connexion")
                setIsLoading(false)
                return
            }
            await api.post(route_demarer)
            // console.log(position)
            await sendPosition(uuid, position)
            setMessage("Course démarée avec succès, vous allez être rredirigé")
            nav(`/carte/${uuid}`)
        } catch (err) {
            if (axios.isAxiosError(err)){
                const message = err.response?.data.detail
                setMessage(message)
            } else {
                console.log(err)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return <>
        <LivraisonContext.Provider value={{
            transformStyles,
            designation, setDesignation,
            dateLivraison, setDateLivraison, 
            heureLivraison, setHeureLivraison,
            livreurAssigne, setLivreurAssigne, 
            livraisons, setLivraisons,
            viderChamp, maLivraison,
            livraisonChargee,
            filterLivraison,
            createLivraison, getLivraisons,
            getSelectedLivraison,
            demarrerUneCourse,
        }}>
            {children}
        </LivraisonContext.Provider>
    </>
}