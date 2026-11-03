import { createContext, useContext, type ChangeEvent, type FormEvent } from "react"
import type { NavigateFunction } from "react-router-dom";
import type { ClassNameValue } from "tailwind-merge";
import type { Livraisons, Livreur, User } from "./ModelsType";

export type RouteParams = {
  id: string
}

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

    photo: string
    setPhoto: (val: string) => void

    userLogedIn: User
    setUserLogedIn: (val: User) => void

    isProprietaire: boolean
    setIsProprietaire: (val: boolean) => void

    resetUserForm: () => void
    s_inscrire: (e: FormEvent, role: RoleType, nav: NavigateFunction) => void
    seConnecter: (e: FormEvent, navigate: NavigateFunction) => void

    getOneLivreur: (uuid: string, nav: NavigateFunction) => void
    updateLivreur: (e: FormEvent,uuid: string,  nav: NavigateFunction) => void
  
}

export const UserContext = createContext<ContextType | null>(null)

export function useUser() {
    const context : ContextType | null = useContext(UserContext)

    if (context == null){ throw new Error("Aucun provider chargé")}

    return context
}

// -----------------------------------------------






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
    livraisonChargee: boolean

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

export type ModalType<T = any> = {
    isShow: boolean
    type: 'client' | 'livreur'
    data: T | null
}

type UtilitiesType<T = any> = {
    message: string
    setMessage: (value: string) => void

    Bg_profile_client: ClassNameValue[]
    isOpen: boolean
    setIsOpen: (val: boolean)=>void

    isCopied: boolean
    copieTexte: (texte: string)=>void

    marker: CoordType | null
    setMarker: (co: CoordType | null) => void

    showDialog: ModalType<T>
    setShowDialog: (val: ModalType<T>) => void
}

export const UtilitiesContext = createContext<UtilitiesType<any> | null>(null)

export function useUtilities<T = any>(){
    const context: UtilitiesType | null = useContext(UtilitiesContext)

    if(context == null) throw new Error("Aucun provider chargé")

        return context as UtilitiesType<T>
}

// ----------------------------------------

  

type LivreurContextType = {
    livreursList: Livreur[] | null
    livreurAssigne: Livreur | null
    setLivreurAssigne: (val: Livreur) => void
    getLivreurs: () => void
    deleteLivreur: (uuid: string, nav: NavigateFunction) => Promise<any>
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
    deleteClient: (uuid: string, nav: NavigateFunction) => Promise<any>
}

export const ClientContext = createContext<ClientContextType | null>(null)

export function useClient(){
    const context: ClientContextType | null = useContext(ClientContext)

    if (context === null) throw new Error("Aucun provider chargé")

    return context
}
