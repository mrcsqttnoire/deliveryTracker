import { useNavigate } from "react-router-dom";
import { useUser } from "../../provider/CustomizedHooks";
import { ChevronLeft, ChevronRight, CircleCheckBig, LockKeyhole, User } from "lucide-react";
import { Button } from "../shared/button";

interface UserProps {
    role: "proprietaire" | "livreur"
    btn?: "Se connecter" | "Enregistrer"
    r_path: "/auth/signin/" | "/livreurs/create"
}


export default function UserProfile({role, btn="Se connecter", r_path="/auth/signin/"}: UserProps){
    const navigate = useNavigate()

    const {
        username, setUsername,
        password, setPassword,
        message,
        s_inscrire,
    } = useUser()

    return <>
        <form onSubmit={(e)=>s_inscrire(e, {role}, navigate)} className="center w-full flex-col gap-4 bg-white p-4 rounded-xl shadow-lg">
            <p className="">{message}</p>    
            <div className="w-full flex justify-between">
                <h4 className="flex  gap-2 items-center font-heading font-bold text-xl self-start">
                    <CircleCheckBig />
                    Créons votre profile
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
            <div className="flex flex-col gap-1.5 w-full text-neutral">
                <label htmlFor="password" className="font-body font-semibold text-md">Mot de passe</label>
                <div className="relative w-full h-12">
                    <LockKeyhole  className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                    <input type="password" id="password" value={password} className="w-full font-body bg-white shadow-sm/10 h-full pl-[calc(32px+24px)] rounded-xl focus" name="password" placeholder="Entrez votre mot de passe ici" required onChange={(e)=>setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-col gap-1.5 w-full text-neutral">
                <label htmlFor="conf_password" className="font-body font-semibold text-md">Mot de passe</label>
                <div className="relative w-full h-12">
                    <LockKeyhole  className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                    <input type="password" id="conf_password" value={password} className="w-full font-body bg-white shadow-sm/10 h-full pl-[calc(32px+24px)] rounded-xl focus" name="password" placeholder="Entrez votre mot de passe ici" required onChange={(e)=>setPassword(e.target.value)}/>
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
