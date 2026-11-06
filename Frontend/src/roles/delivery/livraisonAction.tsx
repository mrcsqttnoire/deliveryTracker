import { Bike, Map, PackageCheck, PackageOpen } from "lucide-react"
import { Button, SpinLoading } from "../../components/shared/button"
import type { CardLivraisonProps } from "../interface"
import { useNavigate } from "react-router-dom"
import { useLivraison, useLoading } from "../../provider/CustomizedHooks"


export const LivraisonActionDelivery = ({data}: CardLivraisonProps) => {
    const navigate = useNavigate()
    const {isLoading} = useLoading()
    const {demarrerUneCourse, terminerUneCourse} = useLivraison()
    const lien = window.location.origin.concat(`/livraison/delivery-suivi/${data.id}`)

    const demarrer = () => {
        if (!data.id?.trim()) return
        demarrerUneCourse(data.id, navigate)
    }

    const terminer = () => {
        if (!data.id?.trim()) return
        terminerUneCourse(data.id, navigate)
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
            {data.status == "en_attente" &&  <Button
                fn={demarrer}
                className="bg-en_route-bg flex-1 text-en_route justify-self-end hover:bg-en_route-bg hover:text-en_route duration-75"
                noLoading
                disable={isLoading}
            >
                {isLoading  && <SpinLoading className="text-en_route"/>}
                <Bike className="text-en_route shrink-0" />
            Démarer
            </Button>}
            {data.status === 'en_route' && 
                <>  
                    <Button
                        fn={terminer}
                        className="bg-livree-bg flex-1 text-livree  justify-self-end hover:bg-livree-bg hover:text-livee duration-75"
                        noLoading
                        disable={isLoading}
                    >
                        {isLoading && <SpinLoading className="text-livree" />}
                        <PackageCheck className="text-livree shrink-0" />
                        Terminer
                    </Button><Button
                        noLoading={true}
                        fn={() => navigate(`/carte/${data.id}`)}
                        className="bg-input w-10  text-neutral justify-self-end hover:bg-en_route-bg hover:text-en_route duration-75"
                    >
                            <Map className="shrink-0" />
                    </Button>
                </>
            }
        </div>
    </>
}