import { twMerge } from "tailwind-merge"
import { PhoneCall } from "lucide-react";
import type { Livraisons } from "../../provider/ModelsType";
import type { Client } from "../../provider/CustomizedHooks";

export interface ClientDetailMinProps {
    data: Livraisons | Client
}

export function ClientDetailMin ({data}: ClientDetailMinProps) {
    const isLivraison = "date_livraison" in data
    const color_code =  {
        en_attente: "bg-en_attent-bg text-en_attente",
        en_route: "bg-en_route-bg text-en_route",
        livree: "bg-livree-bg text-livree",
    }[isLivraison ? data.status : "en_attente"]
    
    const initials = isLivraison ? 
        `${data.client_nom.charAt(0)}${data.client_prenom.charAt(0)}` :
        `${data.nom.charAt(0)}${data.prenom.charAt(0)}`
        
    return <>
        <div className={twMerge(isLivraison && "container-custom")}>
            <div className="bg-input px-4 py-2 rounded-t-xl">
                <h4 className="font-heading font-semibold text-secondary text-xl">Client</h4>
            </div>
            <div className="p-4 flex justify-between items-center rounded-xl shadow-xl" >
                <div className="flex items-center gap-2">
                    <div className={twMerge(" shrink-0 center w-14 h-14 rounded-full font-heading font-bold",
                        color_code
                    )}>
                        <p className={twMerge("font-heading font-semibold text-xl")}>{initials}</p>
                    </div>
                    <div>
                        <h4 className="font-heading font-semibold text-neutral md:text-xl break-normal"> 
                            <span className="hidden sm:inline">
                                {isLivraison ? data.client_nom : data.nom}
                            </span> { isLivraison ? data.client_prenom : data.prenom}
                        </h4>
                        <p className="font-body font-normal text-secondary md:text-lg" > 
                            {isLivraison ? data.client_telephone : data.telephone} 
                        </p>
                    </div>
                </div>
                <div>   
                <a  href={`tel:${isLivraison ? data.client_telephone : data.telephone}`} 
                    className="center gap-2 w-full bg-primary px-8 py-3
                            text-white text-sm font-body font-bold rounded-xl
                            cursor-pointer active:scale-95 hover:opacity-70 duration-75"
                >
                    <PhoneCall size={18} strokeWidth={2}/>
                    <span className="hidden sm:inline">Appeler</span>
                </a>
                </div>
            </div>
        </div>
    </>
}
