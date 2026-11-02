import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUser, useUtilities, type RouteParams } from "../../provider/CustomizedHooks";
import { ChevronLeft, ChevronRight, CircleCheckBig, LockKeyhole, ShieldCheck, User } from "lucide-react";
import { Button } from "../shared/button";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { twMerge } from "tailwind-merge";
import { Alert } from "../shared/alert";

interface UserProps {
    role: "proprietaire" | "livreur"
    btn?: "Se connecter" | "Enregistrer"
    r_path: "/auth/signin/" | "/livreurs/create" | "/livreurs/edit/:id"
}


export default function UserProfile({role, btn="Se connecter", r_path="/auth/signin/"}: UserProps){
    const location = useLocation()
    const navigate = useNavigate()
    const isEdit = Boolean(location.pathname.includes('edit'))
    const {id} = useParams<RouteParams>()

    const [isPassword, setIsPassword] = useState<boolean>(true)
    const {message, setMessage} = useUtilities()

    const {
        username, setUsername,
        password, setPassword,
        conf_password, setConfPassword,
        s_inscrire,
        updateLivreur,
    } = useUser()

    const check_password = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setConfPassword(val)
        setIsPassword((val == password))
    }

    useEffect(() => {
        setIsPassword(conf_password !== "" && conf_password === password)
        if (conf_password == password){
            setMessage("")
        }
        }, [conf_password, password])

    const submitAction = (e: FormEvent<HTMLFormElement>) => {
        if (isEdit){
            updateLivreur(e ,id ?? '', navigate)
        } else {
            s_inscrire(e, {role}, navigate)
        }
    }

    return <>
        <form onSubmit={(e)=>submitAction(e)} className="center w-full flex-col gap-4 bg-white p-4 rounded-xl shadow-lg">
            { !isEdit &&
                <Alert className={twMerge( (message) ? `` : "hidden")}>
                    {message}
                </Alert>   
            }  
            <div className="w-full flex justify-between">
                <h4 className="flex  gap-2 items-center font-heading font-bold text-xl self-start">
                    <CircleCheckBig />
                    {isEdit ? "Modification de votre profile":"Créons votre profile"}
                </h4>
                <div className="flex items-center text-secondary" onClick={()=>{navigate(r_path)}}>
                    <ChevronLeft className="cursor-pointer"/>
                    <p>2/2</p>
                </div>
            </div>
            <div className="flex flex-col gap-1.5 w-full text-neutral">
                <label htmlFor="username" className="font-body font-semibold text-md">Email</label>
                <div className="relative w-full h-12">
                    <User  className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                    <input type="email" id="username" value={username} className="w-full font-body bg-white shadow-sm/10 h-full pl-[calc(32px+24px)] rounded-xl focus" name="username" placeholder="Veuillez entrer votre email" required onChange={(e)=>setUsername(e.target.value)}/>
                </div>
            </div>
            <div className={twMerge("flex flex-col gap-1.5 w-full text-neutral", isEdit && "opacity-50")}>
                <label htmlFor="password" className="font-body font-semibold text-md">Mot de passe</label>
                <div className="relative w-full h-12">
                    <LockKeyhole  className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                    <input 
                        type="password" 
                        disabled={isEdit}
                        id="password" 
                        value={password} 
                        className="w-full font-body bg-white shadow-sm/10 
                        h-full pl-[calc(32px+24px)] rounded-xl focus " 
                        name="password" 
                        placeholder={isEdit ? "Non modifiable":"Entrez votre mot de passe ici" }
                        required 
                        onChange={(e)=>setPassword(e.target.value)}/>
                        
                </div>
            </div>
            <div className={twMerge("flex flex-col gap-1.5 w-full text-neutral", isEdit && "opacity-50")}>
                <label htmlFor="conf_password" className="font-body font-semibold text-md">Confirmation du mot de passe</label>
                <div className="relative w-full h-12">
                    <ShieldCheck  className={twMerge("absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary", !isPassword ? 'text-primary' : '')}/>
                    <input 
                        type="password" 
                        disabled={isEdit}
                        id="conf_password" 
                        value={conf_password} 
                        className={twMerge("w-full font-body bg-white shadow-sm/10 h-full pl-[calc(32px+24px)] rounded-xl focus", !isPassword ? 'invalid' : ' ')} 
                        name="password" 
                        placeholder={isEdit ? "Non modifiable":"confirmez votre mot de passe ici" }
                        aria-invalid={isPassword} 
                        required 
                        onChange={(e)=>check_password(e)}/>
                </div>
            </div>
            <div className="w-full mt-2">
                <Button> 
                    {btn}
                    <ChevronRight/>
                </Button>
            </div>
        </form>
    </>
}   
