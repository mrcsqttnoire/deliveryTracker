import { createContext, useContext, type FormEvent } from "react"
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

  s_inscrire: (e: FormEvent, role: RoleType, nav: NavigateFunction) => void
}

export const UserContext = createContext<ContextType | null>(null)

export function useUser() {
    const context : ContextType | null = useContext(UserContext)

    if (context == null){ throw new Error("Aucun provider chargé")}

    return context
}


type LivraisonType = {
    transformStyles: ClassNameValue[]
}

export const LivraisonContext = createContext<LivraisonType | null>(null)

export function useLivraison() {
    const context : LivraisonType | null = useContext(LivraisonContext)

    if (context == null) throw new Error("Aucun provider chargé")

    return context
}