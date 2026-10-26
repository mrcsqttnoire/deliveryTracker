import { useState, type FormEvent, type ReactNode } from "react";
import { useLoading, UserContext, type RoleType } from "./CustomizedHooks";
import api from "../api";
import { type NavigateFunction } from "react-router-dom";
import axios from "axios";

interface UserProviderProps {
    children: ReactNode,
}


export function UserProvider({children}: UserProviderProps){
    
    const [nom, setNom] = useState<string>("")
    const [prenom, setPrenom] = useState<string>("")
    const [telephone, setTelephone] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [message, setMessage] = useState<string>(" ")
    const {setIsLoading} = useLoading()

    const s_inscrire = async ( e: FormEvent, role: RoleType, nav: NavigateFunction) => { 
        const routes = `/tracking-api/${role.role}/`
        e.preventDefault()
        if(nom.trim() && telephone.trim() && prenom.trim() && username.trim() && password.trim()){
            if(password.length >= 8){
                setIsLoading(true)
                try{
                    const res = await api.post(routes, {nom, prenom, telephone, username, password}, {skipAuth: true})

                    if (res.status == 201 && role.role == "proprietaire"){
                        nav("/auth/login/")

                    }else if (res.status == 201 && role.role == "livreur"){
                        nav("livreurs")

                    } else {
                        if (role.role == "livreur")
                            setMessage("Impossible de enregistrer ce livreur")
                        setMessage("Impossible de créer votre compte")
                    }
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        const data = err.response?.data;
                        setMessage(data?.detail ?? JSON.stringify(data) ?? "Erreur lors de la création du compte");
                    } else {
                        setMessage("Une erreur inattendue est survenue");
                    }
                } finally {
                    setIsLoading(false)
                }
            } else {
                setMessage("Votre mot de passe est trop courte")
                return
            }
        } else {
            setMessage("Veuillez remplir tous les champs!")
            return
        }
    }

    return (
        <UserContext.Provider 
            value={{ 
                nom, setNom,
                prenom, setPrenom,
                telephone, setTelephone,
                username, setUsername,
                password, setPassword,
                message, setMessage,
                s_inscrire,
            }}>
            {children}
        </UserContext.Provider>
    );
}
