import { PhoneCall } from "lucide-react"
import { twMerge } from "tailwind-merge"

interface LivreurProps{
    photo: string
    nom: string
    prenom: string
    tel: string
    status?: string
}
export function LivreurDetailMin ({photo, nom,  prenom, tel, status}: LivreurProps) {
    let color_code
    if (status){
        color_code =  {
            en_attente: "bg-en_attent-bg text-en_attente",
            en_route: "bg-en_route-bg text-en_route",
            livree: "bg-livree-bg text-livree",
        }[status]
    }

    const initials = `${nom.charAt(0)}${prenom.charAt(0)}`;

    return <>
        <div className="container-custom">
            <div className="p-4 flex justify-between items-center rounded-xl shadow-xl" >
                <div className="flex items-center gap-2">
                    <div className={twMerge("center w-14 h-14 rounded-full font-heading font-bold",
                        color_code
                    )}>
                        {photo && <img src={photo} alt="photo livreur" className="w-14 h-14 object-cover rounded-full" />}
                        {!photo && initials}
                    </div>
                    <div>
                        <h4 className="font-heading font-semibold text-neutral text-lg md:text-xl break-normal"> {nom} {prenom}</h4>
                        <p className="font-body font-normal text-secondary text-md md:text-lg" > {tel} </p>
                    </div>
                </div>
                <div>   
                <a href={`tel:${tel}`} className="center gap-2 w-full bg-primary px-8 py-3
                                                text-white font-body font-bold rounded-xl
                                                cursor-pointer active:scale-95
                                                hover:opacity-70 duration-75"
                >
                    <PhoneCall strokeWidth={1}/>
                    Appeler
                </a>
                </div>
            </div>
        </div>
    </>
}
