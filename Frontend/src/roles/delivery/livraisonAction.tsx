import { Bike, PackageOpen } from "lucide-react"
import { Button } from "../../components/shared/button"
import type { CardLivraisonProps } from "../interface"


export const LivraisonActionDelivery = ({data}: CardLivraisonProps) => {
    
    const lien = window.location.origin.concat(`/livraison/suivi/${data.id}`)
    return  <>
        <a href={lien} className="flex-1">
            <Button
                className=" bg-input text-neutral justify-self-end self-center hover:bg-primary/10 hover:text-primary duration-75"
                noLoading
            >
                <PackageOpen className="text-primary shrink-0" />
                Voir infos
            </Button>
        </a>
        <Button
            className="flex-1 bg-input shrink-0 text-neutral justify-self-end hover:bg-en_route-bg hover:text-en_route duration-75"
            noLoading
        >
            <Bike className="text-en_route shrink-0" />
        Démarer
        </Button>
    </>
}