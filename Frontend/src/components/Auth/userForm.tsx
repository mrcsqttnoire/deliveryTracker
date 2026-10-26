import { BadgeInfo, ChevronLeft, ChevronRight, CircleCheckBig, FaceSlightlySmiling, IdCard,LockKeyhole,Phone, User, } from "lucide-react";
import { Button } from "../shared/button";
import { type FormEvent } from "react";
import { useUser } from "../../provider/CustomizedHooks";
import { useNavigate } from "react-router-dom";
import { twMerge, type ClassNameValue } from "tailwind-merge";

// type UserType = {
//     nom: string,
//     prenom: string,
//     telephone: string,
//     username: string,
//     password: string,
// }
type StyleProps = {
    inputClassName?: ClassNameValue;
}


export function UserForm ({inputClassName}: StyleProps) {
    const navigate = useNavigate()

    const {
        nom, setNom,
        prenom, setPrenom,
        telephone, setTelephone,

        message,
     } = useUser()

     function nextPage(e:FormEvent){
        e.preventDefault()
        navigate("next")
     }

  return <>
        <form onSubmit={(e) => nextPage(e)} className="center w-full  flex-col gap-4 bg-white p-4 rounded-xl shadow-lg">
            <p className="">{message}</p>   
            <div className="w-full flex justify-between">
                <h4 className="flex  gap-2 items-center font-heading font-bold text-xl self-start">
                    <BadgeInfo />
                    Commencons par vos informations
                </h4>
                <p className="text-secondary">1/2</p>
            </div>
            <div className="flex flex-col gap-1.5 w-full text-neutral">
                <label htmlFor="nom" className="font-body font-semibold text-md">Nom</label>
                <div className="relative w-full h-12">
                    <IdCard className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                    <input type="text" id="nom" value={nom} className={twMerge("w-full font-body bg-input h-full pl-[calc(32px+24px)] rounded-xl focus", inputClassName)} name="nom" placeholder="ex: RASOAMALALA" required onChange={(e)=>setNom(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-col gap-1.5 w-full text-neutral">
                <label htmlFor="prenom" className="font-body font-semibold text-md">Prénom</label>
                <div className="relative w-full h-12">
                    <FaceSlightlySmiling className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                    <input type="text" id="prenom" value={prenom} className={twMerge("w-full font-body bg-input h-full pl-[calc(32px+24px)] rounded-xl focus", inputClassName)} name="prenom" placeholder="ex: Marie sophie" required onChange={(e)=>setPrenom(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-col gap-1.5 w-full text-neutral">
                <label htmlFor="telephone" className="font-body font-semibold text-md">Téléphone</label>
                <div className="relative w-full h-12">
                    <Phone  className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                    <input type="text" id="telephone" value={telephone} className={twMerge("w-full font-body bg-input h-full pl-[calc(32px+24px)] rounded-xl focus", inputClassName)} name="telephone" placeholder="ex: 0333169049" required onChange={(e)=>setTelephone(e.target.value)}/>
                </div>
            </div>
            <div className="w-full mt-2">
                <Button> 
                    Suivant
                    <ChevronRight/>
                </Button>
            </div>
        </form>
  </>
}

interface UserProps  {
    role: "proprietaire" | "livreur";
    btn?: "Se connecter" | "Enregistrer";
}


export function UserProfile({role, btn="Se connecter"}: UserProps){
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
                <div className="flex items-center text-secondary" onClick={()=>{navigate("/livreurs/create")}}>
                    <ChevronLeft className="cursor-pointer"/>
                    <p>2/2</p>
                </div>
            </div>
            <div className="flex flex-col gap-1.5 w-full text-neutral">
                <label htmlFor="username" className="font-body font-semibold text-md">Email</label>
                <div className="relative w-full h-12">
                    <User  className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                    <input type="email" id="username" value={username} className="w-full font-body bg-input h-full pl-[calc(32px+24px)] rounded-xl focus" name="username" placeholder="Veuillez entrer votre email" required onChange={(e)=>setUsername(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-col gap-1.5 w-full text-neutral">
                <label htmlFor="password" className="font-body font-semibold text-md">Mot de passe</label>
                <div className="relative w-full h-12">
                    <LockKeyhole  className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                    <input type="password" id="password" value={password} className="w-full font-body bg-input h-full pl-[calc(32px+24px)] rounded-xl focus" name="password" placeholder="Entrez votre mot de passe ici" required onChange={(e)=>setPassword(e.target.value)}/>
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
