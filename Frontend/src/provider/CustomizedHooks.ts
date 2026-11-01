import { createContext, useContext, type ChangeEvent, type FormEvent } from "react"
import type { NavigateFunction } from "react-router-dom";
import type { ClassNameValue } from "tailwind-merge";

export type RoleType = {
    role: "proprietaire" | "livreur"
}

type ContextType = {
    nom: string
    setNom: (value: string) => void

    prenom: string;
    setPrenom: (value: string) => void

    telephone: string
    setTelephone: (value: string) => void

    username: string
    setUsername: (value: string) => void

    password: string
    setPassword: (value: string) => void

    conf_password: string
    setConfPassword: (value: string) => void

    resetUserForm: () => void
    s_inscrire: (e: FormEvent, role: RoleType, nav: NavigateFunction) => void
  
}

export const UserContext = createContext<ContextType | null>(null)

export function useUser() {
    const context : ContextType | null = useContext(UserContext)

    if (context == null){ throw new Error("Aucun provider chargé")}

    return context
}

// -----------------------------------------------

export type PhotoType = {
    id: number
    lien: string
}

export type DestinationType = {
    latitude: string
    longitude: string
    repere: string
    lieu: string
}

export type Livraisons = {
    id: string
    designation: string
    date_livraison: string
    heure_livraison: string
    livreur: string
    livreur_photo: string
    livreur_nom: string
    livreur_prenom: string
    livreur_telephone: string
    client: string
    client_nom: string
    client_prenom: string
    destination_lat: string
    destination_long: string
    destination_repere: string
    destination: DestinationType
    status: string
    photos: PhotoType[]
}

type LivraisonType = {
    designation: string
    setDesignation: (val: string) => void

    dateLivraison: string
    setDateLivraison: (val: string) => void

    heureLivraison: string
    setHeureLivraison: (val: string) => void 

    livreurAssigne: string
    setLivreurAssigne: (val: string) => void

    livraisons: Livraisons[]
    maLivraison: Livraisons | null

    setLivraisons: (val: []) => void
    getLivraisons: () => void
    createLivraison: (e: FormEvent<HTMLFormElement>, nav: NavigateFunction) => void
    getSelectedLivraison: (id: string, nav: NavigateFunction) => void

    viderChamp: () => void

    transformStyles: ClassNameValue[]
}

export const LivraisonContext = createContext<LivraisonType | null>(null)

export function useLivraison() {
    const context : LivraisonType | null = useContext(LivraisonContext)

    if (context == null) throw new Error("Aucun provider chargé")

    return context
}

// ------------------------------------------

type LoadingType = {
    isLoading: boolean, 
    setIsLoading: (val: boolean) => void
}

export const LoadingContext = createContext<LoadingType | null>(null)

export function useLoading(){
    const context: LoadingType | null = useContext(LoadingContext)

    if(context == null) throw new Error("Aucun provider chargé")

        return context
}

// -------------------------------------------
type CompressionType = {
    images: File[] | null
    setImages: (val: File[] | null) => void

    compressedImg: File[] | null,
    setCompressedImg: (val: File[] | null) => void

    inCompressing: boolean

    CompresseImg: (e: ChangeEvent<HTMLInputElement>, manyFile?: boolean) => void
    deleteImg: ()=>void
}

export const CompressionContext = createContext<CompressionType | null>(null)

export function useCompression(){
    const context: CompressionType | null = useContext(CompressionContext)

    if(context == null) throw new Error("Aucun provider chargé")

        return context
}

// ----------------------------------------ù
export type CoordType = {
    lng: number
    lat: number
}


type UtilitiesType = {
    message: string
    setMessage: (value: string) => void

    Bg_profile_client: ClassNameValue[]
    isOpen: boolean
    setIsOpen: (val: boolean)=>void

    isCopied: boolean
    copieTexte: (texte: string)=>void

    marker: CoordType | null
    setMarker: (co: CoordType | null) => void
}

export const UtilitiesContext = createContext<UtilitiesType | null>(null)

export function useUtilities(){
    const context: UtilitiesType | null = useContext(UtilitiesContext)

    if(context == null) throw new Error("Aucun provider chargé")

        return context
}

// ----------------------------------------

export type Livreur = {
    id: string,
    nom: string,
    prenom: string,
    telephone: string,
    username: string,
    optimized_photo: string,
    photo: string,
    status: string
}   

type LivreurContextType = {
    livreursList: Livreur[] | null
    getLivreurs: () => void
}

export const LivreurContext = createContext<LivreurContextType | null>(null)

export function useLivreur(){
    const context: LivreurContextType | null = useContext(LivreurContext)

    if (context === null) throw new Error("Aucun provider chargé")

    return context
}

//-----------------------------------------
// export type Client = {
//     id: string,
//     nom: string,
//     prenom
// }

type DetailContextType = {
    repere: string, 
    setRepere: (val: string) => void,

    nom_client: string
    setNomClient: (val: string) => void

    prenom_client: string
    setPrenomClient: (val: string) => void

    lieu: string
    setLieu: (val: string) => void

    telephone_client: string
    setTelephoneClient: (val:string) => void

    AddDetail: (e: FormEvent<HTMLFormElement>, nav: NavigateFunction, uuid: string) => void
    viderChamp: () => void
}

export const DetailContext = createContext<DetailContextType | null>(null)

export function useDetail(){
    const context: DetailContextType | null = useContext(DetailContext)

    if (context === null) throw new Error("Aucun provider chargé")

    return context
}

//---------------------------------
export type Client = {
    id: string
    nom: string
    prenom: string
    telephone: string
    livraison_count: string
}

type ClientContextType = {
    clients: Client[] | null
    setClients: (val: Client[] | null) => void

    getAllClients: () => void
}

export const ClientContext = createContext<ClientContextType | null>(null)

export function useClient(){
    const context: ClientContextType | null = useContext(ClientContext)

    if (context === null) throw new Error("Aucun provider chargé")

    return context
}
