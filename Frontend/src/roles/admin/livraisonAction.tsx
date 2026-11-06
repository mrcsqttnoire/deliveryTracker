import { Compass, Copy } from "lucide-react"
import { Button } from "../../components/shared/button"
import type { CardLivraisonProps } from "../interface"
import { useUtilities } from "../../provider/CustomizedHooks"


export const LivraisonActionAdmin = ({data}: CardLivraisonProps) => {
    const lien = window.location.origin.concat(`/livraison/suivi/${data.id}`)
    const lien_admin = window.location.origin.concat(`/livraison/admin-suivi/${data.id}`)
    const {copieTexte} = useUtilities()

    return <>
        <div className="flex gap-2 items-center font-body font-medium text-secondary/50">
            <button onClick={()=>copieTexte(lien)} className="p-2 hover:bg-livree-bg hover:text-livree rounded-full active:scale-95">
                <Copy className="w-6 shrink-0 " size={24}  />  
            </button>
            <a href={lien} className="break-all text-sm md:text[16px]">
                {lien}
            </a>
        </div>
        <Button className="w-auto flex-1 bg-input shrink-0 text-neutral justify-self-end self-center hover:bg-primary/10 hover:text-primary duration-75" noLoading>
            <a href={lien_admin} className="w-full center h-full gap-2">
                <Compass className="text-primary shrink-0"/>
                Suivi direct
            </a>
        </Button>  
    </>
}