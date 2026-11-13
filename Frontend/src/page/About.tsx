
// export interface IAProposProps {
// }

import { Package } from "lucide-react";


export default function About () {
    return <>
        <div className="container-custom center flex-col gap-8">
            <div className="flex flex-col gap-4 mt-4">
                <h2 className="font-heading font-semibold text-neutral text-2xl sm:text-4xl">Delivery Tracker</h2>
                <p className="px-4 py-6 bg-white font-body font-medium text-neutral text-sm sm:text-base rounded-xl">Vous avez déjà attendu un colis en vous demandant où il était ? Ou passé la journée à répondre <span className="text-secondary">"il arrive dans dix minutes"</span>  ? Delivery Tracker est là pour ça : la boutique, le livreur et le client voient la même chose, au même moment</p>
            </div>
            <div className=" flex flex-col gap-4 px-4 py-6 bg-white rounded-xl">
                <div className="flex justify-between items-center">
                    <h3 className="font-heading font-semibold text-neutral text-xl sm:text-2xl">Comment ça se passe</h3>
                    <p className="text-primary font-body font-medium">3 étapes</p>
                </div>
                <div>
                    <div className="flex gap-4">
                        <Package className="text-en_attente"/>
                        <div>
                            <h4 className="text-secondary font-body font-semibold text-lg sm:text-xl">1. La boutique prépare le colis</h4>
                            <p className="text-neutral font-body font-medium text-sm sm:text-base">Elle le décrit, ajoute quelques photos, choisit qui le livre et quand, puis envoie un lien au client</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
