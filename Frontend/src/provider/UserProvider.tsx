import { useState, type FormEvent, type ReactNode } from "react";
import { useCompression, useLoading, UserContext, type RoleType } from "./CustomizedHooks";
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
    const {
        setImages,
        compressedImg, setCompressedImg,
    } = useCompression()

    const resetUserForm = () => {
        setNom("")
        setPrenom("")
        setTelephone("")
        setUsername("")
        setPassword("")
        setMessage("")
        setCompressedImg([])
        setImages([])
    }

    const s_inscrire = async ( e: FormEvent, {role}: RoleType, nav: NavigateFunction) => { 
        e.preventDefault()
        const routes = `/tracking-api/${role}/`

        if(nom.trim() && telephone.trim() && prenom.trim() && username.trim() && password.trim()){
            if(password.length >= 8){
                setIsLoading(true)
                try{

                    const data = new FormData()
                    data.append('nom', nom)
                    data.append('prenom', prenom)
                    data.append('telephone', telephone)
                    data.append('username', username)
                    data.append('password', password)

                    if(compressedImg && compressedImg.length > 0){
                        compressedImg.forEach((img) => {
                            data.append('photo', img, img.name)
                        })
                    }

                    let res = await api.post(routes, data, {skipAuth: false})
                    if (role == "proprietaire"){
                        res = await api.post(routes, data, {skipAuth: true})
                    }

                    if (res.status == 201 && role == "proprietaire"){
                        alert("Votre compte a été créé avec succès")
                        nav("/auth/login/")

                    }else if (res.status == 201 && role == "livreur"){
                        alert("Bienvenu dans notre boutique")
                        nav("/livreurs")

                    } else {
                        if (role == "livreur")
                            setMessage("Impossible d' enregistrer ce livreur")
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
                resetUserForm,
            }}>
            {children}
        </UserContext.Provider>
    );
}
