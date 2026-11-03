import { twMerge } from "tailwind-merge"
import { PhoneCall } from "lucide-react";
import type { Livraisons } from "../../provider/ModelsType";

export interface ClientDetailMinProps {
    data: Livraisons
}

export function ClientDetailMin ({data}: ClientDetailMinProps) {
    const initials = `${data.client_nom.charAt(0)}${data.client_prenom.charAt(0)}`;
    const color_code =  {
        en_attente: "bg-en_attent-bg text-en_attente",
        en_route: "bg-en_route-bg text-en_route",
        livree: "bg-livree-bg text-livree",
    }[data.status]
    
    return <>
        <div className="container-custom">
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
                            {data.client_nom} {data.client_prenom}
                        </h4>
                        <p className="font-body font-normal text-secondary md:text-lg" > {data.client_telephone} </p>
                    </div>
                </div>
                <div>   
                <a href={`tel:${data.client_telephone}`} className="center gap-2 w-full bg-primary px-8 py-3
                                                text-white text-sm font-body font-bold rounded-xl
                                                cursor-pointer active:scale-95
                                                hover:opacity-70 duration-75"
                >
                    <PhoneCall size={18} strokeWidth={2}/>
                    Appeler
                </a>
                </div>
            </div>
        </div>
    </>
}
