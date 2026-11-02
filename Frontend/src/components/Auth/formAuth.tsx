import { User, LockKeyhole, ChevronRight, BadgeInfo } from "lucide-react";
import { Button } from "../shared/button";
import { useEffect} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUser, useUtilities } from "../../provider/CustomizedHooks";
import { Alert } from "../shared/alert";
import { twMerge } from "tailwind-merge";

type User = {
    nom: string,
    username: string,
    password: string,
}


export default function FormLogin () {
    const navigate = useNavigate()
    const location = useLocation()
    const isLivreur = Boolean(location.pathname.includes("livreur"))
    const route_page = !isLivreur ? 'livreur' : '/auth/login'

    // const [username, setUsername] =  useState<string>("")
    // const [password, setPassword] =  useState<string>("")
    const {message} = useUtilities()
    const {
        username, setUsername,
        password, setPassword,
        seConnecter
    } = useUser()

    const {resetUserForm} = useUser()

    useEffect(() => {
        resetUserForm()
     }, [])


  return <>
    <form onSubmit={(e)=>seConnecter(e, navigate)} className="center w-full flex-col gap-4 bg-white p-4 rounded-xl shadow-lg">
        <Alert className={twMerge( message ? `` : "hidden")}>{message}</Alert> 
        <div className="flex items-center gap-2 self-start">       
            <BadgeInfo />
            <div>
                <h4 className="flex  gap-2 items-center font-heading font-bold text-xl ">
                    Entrez votre identification
                </h4>
                {isLivreur && <p className="text-secondary font-body text-sm self-start">
                    Demandez au près de votre propriétaire
                </p>}
            </div>
        </div>   
        <div className="flex flex-col gap-1.5 w-full text-neutral">
            <label htmlFor="username" className="font-body font-semibold text-md">Email</label>
            <div className="relative w-full h-12">
                <User className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                <input type="email" id="username" value={username} className="w-full font-body bg-white shadow-sm/10 h-full pl-[calc(32px+24px)] rounded-xl focus" name="username" placeholder="Veuillez entrer votre email" required onChange={(e)=>setUsername(e.target.value)}/>
            </div>
        </div>
        <div className="flex flex-col gap-1.5 w-full text-neutral">
            <label htmlFor="password" className="font-body font-semibold text-md">Mot de passe</label>
            <div className="relative w-full h-12">
                <LockKeyhole className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                <input type="password" id="password" value={password} className="w-full font-body bg-white shadow-sm/10 h-full pl-[calc(32px+24px)] rounded-xl focus" name="password" placeholder="Entrez votre mot de passe ici" required onChange={(e)=>setPassword(e.target.value)}/>
            </div>
        </div>
        <div className="center flex-col gap-4 w-full mt-2">
            <Button> 
                Se connecter
                <ChevronRight/>
            </Button>
            <NavLink 
                to={route_page}
                className={"active:scale-95"}
            >
                <p className="text-primary font-body font-light">
                    {!isLivreur && 'Je suis un livreur'}
                    {isLivreur && 'Je suis un propriétaire'}
                </p>
            </NavLink>
        </div>
    </form>
  </>
}
