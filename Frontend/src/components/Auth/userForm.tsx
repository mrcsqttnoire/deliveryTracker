import { BadgeInfo, ChevronRight, FaceSlightlySmiling, IdCard, Phone } from "lucide-react";
import { Button } from "../shared/button";
import { type FormEvent } from "react";
import { useUser } from "../../provider/CustomizedHooks";
import { useNavigate } from "react-router-dom";


export default function UserForm () {
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
                    <input type="text" id="nom" value={nom} className={("w-full font-body bg-white shadow-sm/10 h-full pl-[calc(32px+24px)] rounded-xl focus")} name="nom" placeholder="ex: RASOAMALALA" required onChange={(e)=>setNom(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-col gap-1.5 w-full text-neutral">
                <label htmlFor="prenom" className="font-body font-semibold text-md">Prénom</label>
                <div className="relative w-full h-12">
                    <FaceSlightlySmiling className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                    <input type="text" id="prenom" value={prenom} className={("w-full font-body bg-white shadow-sm/10 h-full pl-[calc(32px+24px)] rounded-xl focus")} name="prenom" placeholder="ex: Marie sophie" required onChange={(e)=>setPrenom(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-col gap-1.5 w-full text-neutral">
                <label htmlFor="telephone" className="font-body font-semibold text-md">Téléphone</label>
                <div className="relative w-full h-12">
                    <Phone  className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                    <input type="text" id="telephone" value={telephone} className={("w-full font-body bg-white shadow-sm/10 h-full pl-[calc(32px+24px)] rounded-xl focus")} name="telephone" placeholder="ex: 0333169049" required onChange={(e)=>setTelephone(e.target.value)}/>
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
