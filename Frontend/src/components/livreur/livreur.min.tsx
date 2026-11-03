import { PhoneCall } from "lucide-react"
import { twMerge } from "tailwind-merge"
import type { Livraisons } from "../../provider/ModelsType"

interface LivreurProps{
    data: Livraisons
}
export function LivreurDetailMin ({data}: LivreurProps) {
    const color_code =  {
            en_attente: "bg-en_attent-bg text-en_attente",
            en_route: "bg-en_route-bg text-en_route",
            livree: "bg-livree-bg text-livree",
        }[data.status]

    const initials = `${data.livreur_nom.charAt(0)}${data.livreur_prenom.charAt(0)}`;

    return <>
        <div className="container-custom">
            <div className="bg-input px-4 py-2 rounded-t-xl">
                <h4 className="font-heading font-semibold text-secondary text-xl">Livreur</h4>
            </div>
            <div className="p-4 flex justify-between items-center rounded-b-xl shadow-xl" >
                <div className="flex items-center gap-2">
                    <div className={twMerge("center w-14 h-14 rounded-full font-heading font-bold",
                        color_code
                    )}>
                        {data.livreur_photo && <img src={data.livreur_photo} alt="photo livreur" className="w-14 h-14 object-cover rounded-full shrink-0" />}
                        {!data.livreur_photo && initials}
                    </div>
                    <div>
                        <h4 className="font-heading font-semibold text-neutral md:text-xl break-normal"> {data.livreur_nom} {data.livreur_prenom}</h4>
                        <p className="font-body font-normal text-secondary  md:text-lg" > {data.livreur_telephone} </p>
                    </div>
                </div>
                <div>   
                <a href={`tel:${data.livreur_telephone}`} className="center gap-2 w-full bg-primary px-8 py-3
                                                text-white text-sm font-body font-bold rounded-xl
                                                cursor-pointer active:scale-95
                                                hover:opacity-70 duration-75"
                >
                    <PhoneCall size={18}/>
                    Appeler
                </a>
                </div>
            </div>
        </div>
    </>
}
