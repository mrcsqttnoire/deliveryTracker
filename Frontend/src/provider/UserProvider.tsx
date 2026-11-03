import { useState, type FormEvent, type ReactNode } from "react";
import { useCompression, useLoading, UserContext, useUtilities, type RoleType } from "./CustomizedHooks";
import api from "../api";
import { type NavigateFunction } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constanst";
import { type User } from "./ModelsType";
import { DefaultUser } from "./DefaultValue";

interface UserProviderProps {
    children: ReactNode,
}

const route = "tracking-api/livreur/"
export function UserProvider({children}: UserProviderProps){
    const [photo, setPhoto] = useState<string>("")
    const [nom, setNom] = useState<string>("")
    const [prenom, setPrenom] = useState<string>("")
    const [telephone, setTelephone] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [conf_password, setConfPassword] = useState<string>("")
    const [userLogedIn, setUserLogedIn] = useState<User>(DefaultUser)
    const [isProprietaire, setIsProprietaire] = useState<boolean>(true)

    const {setMessage} = useUtilities()
    const {setIsLoading} = useLoading()
    const {
        compressedImg, setCompressedImg,
    } = useCompression()

    const resetUserForm = () => {
        setNom("")
        setPrenom("")
        setTelephone("")
        setUsername("")
        setPassword("")
        setConfPassword("")
        setMessage("")
        setCompressedImg([])
        setPhoto("")
    }
    const route_login = "/auth/jwt/create/"
    const seConnecter = async (e: React.FormEvent, navigate: NavigateFunction) => {
        e.preventDefault()
        try{
            if (username?.trim() && password?.trim()){
                if(password.length >= 8){
                    setIsLoading(true)
                    const res = await api.post(route_login, {username, password}, {skipAuth: true})
                    if(res &&res.status === 200){
                        const created_token = res.data.access
                        const refresh_token = res.data.refresh
                        localStorage.setItem(ACCESS_TOKEN, created_token)
                        localStorage.setItem(REFRESH_TOKEN, refresh_token)
                        navigate("/")
                    }
                } else {
                    setMessage("Votre mot de passe est trop court")
                }
            } else {
                setMessage("Veuiller remplir tous les champs!")
                return
            }
        } catch (error){
            console.log(error)
            setMessage("Impossible de se connecter")
        } finally {
            setIsLoading(false)
        }
    }


    const s_inscrire = async ( e: FormEvent, {role}: RoleType, nav: NavigateFunction) => { 
        e.preventDefault()
        const routes = `/tracking-api/${role}/`
        if(nom.trim() && telephone.trim() && prenom.trim() && username.trim() && password.trim()){
            if(password.length >= 8){
                if (conf_password.trim() == password.trim()){
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
                                data.append('photo', img)
                            })
                        }

                        let res
                        if (role === "proprietaire"){
                            res = await api.post(routes, data, {skipAuth: true})
                        } else {
                            res = await api.post(routes, data, {skipAuth: false}) 
                        }
                        
                        if (res.status === 201 && role === "proprietaire"){
                            alert("Votre compte a été créé avec succès")
                            nav("/auth/login/")
    
                        }else if (res.status === 201 && role === "livreur"){
                            // getLivreurs()
                            alert("Bienvenu dans notre boutique")
                            nav("/livreurs")
    
                        } else {
                            if (role === "livreur")
                                setMessage("Impossible d' enregistrer ce livreur")
                            setMessage("Impossible de créer votre compte")
                        }
                    } catch (err) {
                        if (axios.isAxiosError(err)) {
                            const data = err.response?.data;
                            setMessage(data?.detail ?? JSON.stringify(data) ?? "Erreur lors de la création du compte")
                        } else {
                            setMessage("Une erreur inattendue est survenue")
                        }
                    } finally {
                        setIsLoading(false)
                    }
                } else {
                    setMessage("Le mot de passe ne convient pas")
                    return
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


    const getOneLivreur = async (uuid: string, nav: NavigateFunction) => {
        if (!uuid.trim()){
            setMessage("Veuillez sélectionner un livreur")
            return
        }
        try{
            const res = await api.get(route.concat(`${uuid}/`))
            if (res && res.status === 200){
                const data = res.data
                // setLivreur(data)
                if (data){
                    setNom(data.nom)
                    setPrenom(data.prenom)
                    setTelephone(data.telephone)
                    setUsername(data.username)
                    setPhoto(data.optimized_photo)
                }
            }
        } catch (err) {
            if (axios.isAxiosError(err)){
                console.log(err)
                setMessage("Erreur lors du chargement de ce livreur")
                nav("/livreurs")
            } else {
                console.log(err)
            }
        } finally {
            setIsLoading(false)
        }
    }

    async function updateLivreur(e: FormEvent,uuid: string ,nav: NavigateFunction){
        e.preventDefault()
        if (!uuid.trim){
            setMessage("Choisir un livreur à modifier")
            return
        }
        const routes_update = `/tracking-api/livreur/${uuid}/`
        if (!nom.trim() || !telephone.trim() || !prenom.trim() || !username.trim()){
            setMessage("Veuillez remplir tous les champs!")
            return
        }
        try {
            setIsLoading(true)
            const data = new FormData()
            data.append('nom', nom)
            data.append('prenom', prenom)
            data.append('telephone', telephone)
            data.append('username', username)

            if(compressedImg && compressedImg.length > 0){
                // compressedImg.forEach((img) => {
                //     data.append('photo', img)
                // })
                data.append('photo', compressedImg[0])
            }
            const res = await api.put(
                routes_update,
                data
            )

            if (res && res.status === 200){
                setMessage("Livreur modifié avec succès. Vous allez être redirigé!")
                await new Promise(r => setTimeout(r, 2000))
                resetUserForm()
                nav("/livreurs")
            }

        } catch (err) {
            if (axios.isAxiosError(err)) {
                const data = err.response?.data;
                setMessage(data?.detail ?? JSON.stringify(data) ?? "Erreur lors de la modificaton de ce livreur")
            } else {
                setMessage("Une erreur inattendue est survenue")
            }
        } finally {
            setIsLoading(false)
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
                conf_password, setConfPassword,
                photo, setPhoto,
                userLogedIn, setUserLogedIn,
                isProprietaire, setIsProprietaire,
                seConnecter,
                s_inscrire,
                getOneLivreur,
                updateLivreur,
                resetUserForm,
            }}>
            {children}
        </UserContext.Provider>
    );
}
