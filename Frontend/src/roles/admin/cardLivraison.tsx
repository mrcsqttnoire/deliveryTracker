import { Bike, Calendar, Clock } from "lucide-react"
import type { CardLivraisonProps } from "../interface"

export const InfoSuppAdmin = ({data}: CardLivraisonProps) => {
    return <>
        <div className="bg-neutral-light flex gap-2 items-center text-secondary p-3 rounded-xl mt-2">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-en_route-bg text-en_route place-content-center rounded-full">
                    <Bike className="justify-self-center"/>
                </div>
                <div>
                    <p className=" text-lgfont-body font-medium text-secondary">Livreur assigné</p>
                    <p className="text-neutral text-[16px] md:text-lg font-body font-bold ">{data.livreur_prenom}</p>
                </div>
            </div>
            <div className="flex-1 ">
                <div className="w-auto flex gap-2 justify-self-end ">
                    <p className="font-body font-bold text-sm">{data.date_livraison}</p>
                    <Calendar/>
                </div>
                <div className="w-auto flex gap-2 justify-self-end mt-2">
                    <p className="font-body font-bold text-sm md:text[16px]">{data.heure_livraison}</p>
                    <Clock/>
                </div>
            </div>
        </div>
    </>
}