import { User, LockKeyhole, ChevronRight, BadgeInfo } from "lucide-react";
import { Button } from "../shared/button";
import { useEffect, useState } from "react";
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constanst";
import { useNavigate } from "react-router-dom";
import { useLoading, useUser } from "../../provider/CustomizedHooks";

type User = {
    nom: string,
    username: string,
    password: string,
}


export function FormLogin () {
    const navigate = useNavigate()
    const route = "/auth/jwt/create/"

    const [username, setUsername] =  useState<string>("")
    const [password, setPassword] =  useState<string>("")
    const [message, setMessage] = useState<string | null>("")
    const {setIsLoading} = useLoading()

    const {resetUserForm} = useUser()

    useEffect(() => {
        resetUserForm()
     }, [])

    const seConnecter = async (e: React.FormEvent) => {
        e.preventDefault()
        try{
            if (username?.trim() && password?.trim()){
                if(password.length >= 8){
                    setIsLoading(true)
                    const res = await api.post(route, {username, password})
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
  return <>
    <form onSubmit={seConnecter} className="center w-full flex-col gap-4 bg-white p-4 rounded-xl shadow-lg">
        <p className="">{message}</p>   
        <h4 className="flex  gap-2 items-center font-heading font-bold text-xl self-start">
            <BadgeInfo />
            Entrez votre identification
        </h4>
        <div className="flex flex-col gap-1.5 w-full text-neutral">
            <label htmlFor="username" className="font-body font-semibold text-md">Email</label>
            <div className="relative w-full h-12">
                <User className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                <input type="email" id="username" value={username} className="w-full font-body bg-input h-full pl-[calc(32px+24px)] rounded-xl focus" name="username" placeholder="Veuillez entrer votre email" required onChange={(e)=>setUsername(e.target.value)}/>
            </div>
        </div>
        <div className="flex flex-col gap-1.5 w-full text-neutral">
            <label htmlFor="password" className="font-body font-semibold text-md">Mot de passe</label>
            <div className="relative w-full h-12">
                <LockKeyhole className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                <input type="password" id="password" value={password} className="w-full font-body bg-input h-full pl-[calc(32px+24px)] rounded-xl focus" name="password" placeholder="Entrez votre mot de passe ici" required onChange={(e)=>setPassword(e.target.value)}/>
            </div>
        </div>
        <div className="w-full mt-2">
            <Button> 
                Se connecter
                <ChevronRight/>
            </Button>
        </div>
    </form>
  </>
}
