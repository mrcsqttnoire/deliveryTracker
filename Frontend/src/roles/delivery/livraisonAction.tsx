import { Bike, Map, PackageOpen } from "lucide-react"
import { Button } from "../../components/shared/button"
import type { CardLivraisonProps } from "../interface"
import { useNavigate } from "react-router-dom"
import { useLivraison } from "../../provider/CustomizedHooks"


export const LivraisonActionDelivery = ({data}: CardLivraisonProps) => {
    const navigate = useNavigate()
    const {demarrerUneCourse} = useLivraison()
    const lien = window.location.origin.concat(`/livraison/delivery-suivi/${data.id}`)

    const demarrer = async () => {
        if (!data.id?.trim()) return
        demarrerUneCourse(data.id, navigate)
    }
    
    return  <>
        <a href={lien} className="flex-1">
            <Button
                className=" bg-input flex-1 text-neutral justify-self-end self-center hover:bg-primary/10 hover:text-primary duration-75"
                noLoading
            >
                <PackageOpen className="text-primary shrink-0" />
                Voir infos
            </Button>
        </a>
        <div className="flex flex-1 gap-2 justify-between">
            <Button
                fn={demarrer}
                className="flex-1 bg-input flex-1 text-neutral justify-self-end hover:bg-en_route-bg hover:text-en_route duration-75"
                noLoading
            >
                <Bike className="text-en_route shrink-0" />
            Démarer
            </Button>
            {data.status === 'en_route' && <Button
                fn={()=>navigate(`/carte/${data.id}`)}
                className="bg-input w-10  text-neutral justify-self-end hover:bg-en_route-bg hover:text-en_route duration-75"
            >
                <Map className="shrink-0"/>
            </Button>}
        </div>
    </>
}