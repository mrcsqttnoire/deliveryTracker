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

    message: string
    setMessage: (value: string) => void

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

type LivraisonType = {
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

    setManyFile: (val: boolean) => void
    CompresseImg: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CompressionContext = createContext<CompressionType | null>(null)

export function useCompression(){
    const context: CompressionType | null = useContext(CompressionContext)

    if(context == null) throw new Error("Aucun provider chargé")

        return context
}

// ----------------------------------------ù
type UtilitiesType = {
    Bg_profile_client: ClassNameValue[]
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
}

export const LivreurContext = createContext<LivreurContextType | null>(null)

export function useLivreur(){
    const context: LivreurContextType | null = useContext(LivreurContext)

    if (context === null) throw new Error("Aucun provider chargé")

    return context
}