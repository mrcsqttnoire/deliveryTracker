import { Calendar, Clock } from "lucide-react"
import type { CardLivraisonProps } from "../interface"



export const InfoSuppDelivery = ({data}: CardLivraisonProps) => {
    return <>
        <div className="bg-neutral-light flex gap-2 items-center text-secondary p-3 rounded-xl mt-2">
            <div className=" flex flex-1 justify-between items-center ">
                <div className="w-auto flex gap-2 items-center ">
                    <Calendar/>
                    <p className="font-body font-bold text-sm">{data.date_livraison}</p>
                </div>
                <div className="w-auto flex gap-2 items-center">
                    <p className="font-body font-bold text-sm md:text-base">{data.heure_livraison}</p>
                    <Clock/>
                </div>
            </div>
        </div>
    </>
}