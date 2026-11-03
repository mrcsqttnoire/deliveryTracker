import { Navigation } from "lucide-react";
import { BadgeLivraison } from "./badge";
import { useUser, type Livraisons } from "../../provider/CustomizedHooks";
import { ACTION_LIVRAISON, CARD_LIVRAISON } from "../../roles/control";

interface CardLivraisonProps {
    data: Livraisons
}

export function CardLivraison ({data}: CardLivraisonProps) {
    const { userLogedIn} = useUser()
    const nom = data.client_nom ?? null
    const prenom = data.client_prenom ?? null
    const nom_complet = (nom || prenom) && nom.concat(` ${prenom}`)

    const InfoSupp = CARD_LIVRAISON[userLogedIn.role]
    const Action = ACTION_LIVRAISON[userLogedIn.role]

    return <> 
        <div className="flex flex-col gap-4 bg-white h-auto rounded-xl shadow-xl p-4 hover:-translate-y-0.5 duration-300">
            <div className="flex justify-between">
                <h5 className="font-body font-bold text-xl md:text-2xl">{nom_complet ?? "En attente du client..."}</h5>
                <BadgeLivraison type={data.status} />
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                    <Navigation className="text-[#004C6C]"/>
                    <p className="font-body font-medium text-neutral">{data.destination_lieu }</p>
                    <p className="font-body font-medium text-secondary">{data.destination_repere ?? "Donner le lien de cette livraison au client dédié"}</p>
                </div>
            </div>
            <InfoSupp data={data}/>
            <div className="grid grid-cols-2 md:flex gap-2 justify-between">
                <Action data={data}/>
            </div>
        </div>
    </>
}



