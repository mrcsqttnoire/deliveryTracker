import { CircleCheckBig, EllipsisVertical, Navigation, Phone, PhoneCall, UserKey } from "lucide-react"
import  billie  from "../../assets/img/test/billie-1.jpg"
import { BadgeLivraison } from "../Livraison/badge"
import { Button } from "../shared/button"

export function CardLivreur () {
  return <>
    <div className="flex flex-col gap-3 bg-white h-auto rounded-xl shadow-xl p-4 hover:-translate-y-0.5    duration-300">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div >
                    <img src={billie} alt="profile" className="w-12 h-12 rounded-full"/>
                </div>
                <div>
                    <h3 className="font-heading font-semibold text-xl text-neutral">Faly R.</h3>
                    <div className="flex gap-2 items-center font-body font-medium text-secondary">
                        <UserKey size={18}/>
                        <p>faly@gmail.com</p>
                    </div>
                </div>
            </div>
            <BadgeLivraison
                title="Libre"
                type="livree"
            />
        </div>
        <div className="bg-input flex justify-between items-center px-4 py-2 rounded-xl">
            <div className="flex text-secondary items-center gap-2">
                <CircleCheckBig/>
                <div >
                    <h5 className="font-body font-bold text-sm">Course terminées</h5>
                    <p className="font-body font-bold text-neutral">5 livraison(s)</p>
                </div>
            </div>
            <div className="flex  text-secondary items-center gap-2">
                <Phone/>
                <div>
                    <h5 className="font-body font-bold text-sm">Téléphone</h5>
                    <p className="font-body font-bold text-neutral"> 0333169523</p>
                </div>
            </div>
        </div>
        <div className="flex gap-2">
            <Button className="w-auto bg-gradient-right text-primary hover:bg-gradient-right hover:opacity-85"> 
                <PhoneCall size={18} />
            </Button>
            <Button className="bg-gradient-right text-neutral hover:bg-gradient-right hover:opacity-85 duration-50">
                <Navigation className="text-primary"/>
                Assigner 
            </Button>
            <Button className="w-auto bg-gradient-right text-neutral hover:bg-gradient-right hover:opacity-85"> 
                <EllipsisVertical size={18} />
            </Button>
        </div>
    </div>
  </>
}
