import { Bike, MapPinned, Package, Store, User, UserGroup } from "lucide-react";


export default function About () {
    return <>
        <div className="container-custom center flex-col gap-2">
            <div className="flex flex-col gap-4 mt-4">
                <h2 className="font-heading font-semibold text-neutral text-2xl sm:text-4xl">Delivery Tracker</h2>
                <p className="px-4 py-6 bg-white font-body font-normal text-secondary text-sm sm:text-base rounded-xl">Vous avez déjà attendu un colis en vous demandant où il était ? Ou passé la journée à répondre <span className="text-secondary">"il arrive dans dix minutes"</span>  ? Delivery Tracker est là pour ça : la boutique, le livreur et le client voient la même chose, au même moment</p>
            </div>
            <div className=" flex flex-col gap-4 px-4 py-6">
                <div className="flex justify-between items-center">
                    <h3 className="font-heading font-semibold text-neutral text-xl sm:text-2xl">Comment ça se passe</h3>
                    <p className="text-primary font-body font-normal">3 étapes</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="flex flex-col gap-2 bg-en_attent-bg/50 justify-center md:justify-start px-5 py-3 rounded-xl shadow-lg hover:-translate-y-0.5 duration-300">
                        <div className="flex justify-between items-start">
                            <h4 className="md:pr-7 text-en_attente font-body font-bold text-lg sm:text-xl">
                                La boutique prépare le colis
                            </h4>
                            <Package className="text-en_attente shrink-0"/>
                        </div>
                        <p className="md:tùext-center. text-secondary font-body font-normal text-sm sm:text-base">
                            Elle le décrit, ajoute quelques photos, choisit qui le livre et quand, puis envoie un lien au client
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 bg-en_route-bg/50 justify-center md:justify-start px-5 py-3 rounded-xl shadow-lg hover:-translate-y-0.5 duration-300">
    
                        <div className="flex justify-between items-start">
                            <h4 className="md:pr-7 text-en_route font-body font-bold text-lg sm:text-xl">
                                Le client choisit la destination
                            </h4>
                            <MapPinned className="text-en_route shrink-0"/>
                        </div>
                        <p className="text-secondary font-body font-normal text-sm sm:text-base">
                            Il ouvre le lien, sans créer de compte, et pose un repère sur la carte. Un quartier à chercher, un point à ajuster du doigt, un mot pour aider le livreur à le trouver
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 bg-livree-bg/50 justify-center md:justify-start px-5 py-3 rounded-xl shadow-lg hover:-translate-y-0.5 duration-300">
                    
                        <div className="flex justify-between items-start">
                            <h4 className="md:pr-7 text-livree font-body font-bold text-lg sm:text-xl">
                                Le livreur livre les colis
                            </h4>
                            <Bike className="text-livree shrink-0"/>
                        </div>
                        <p className="text-secondary font-body font-normal text-sm sm:text-base">
                            Quand il démarre la course, sa position s’actualise toutes les quelques secondes. Le client regarde son colis se rapprocher sur la carte
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 px-4 py-6">
                <div className="flex items-center gap-4 text-neutral">
                    <UserGroup/>
                    <h3 className="font-heading font-semibold  text-xl sm:text-2xl">Pour qui ?</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-2.5 p-4 bg-white rounded-xl shadow-lg hover:-translate-y-0.5 duration-300">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-input/80 p-2.5 rounded-xl">
                                <Store className="text-primary"/>
                            </div>
                            <h4 className="font-body font-semibold text-neutral text-lg sm:text-xl">Boutique</h4>
                        </div>
                        <p className="font-body font-normal text-secondary ">
                            Si vous tenez une boutique, vous gardez tout au même endroit : vos livreurs, vos clients, vos livraisons. Plus besoin de jongler entre les messages et les appels
                        </p>
                    </div>
                    <div className="flex flex-col gap-2.5 p-4 bg-white rounded-xl shadow-lg hover:-translate-y-0.5 duration-300">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-input/80 p-2.5 rounded-xl">
                                <Bike className="text-en_route"/>
                            </div>
                            <h4 className="font-body font-semibold text-neutral text-lg sm:text-xl">Livreur</h4>
                        </div>
                        <p className="font-body font-normal text-secondary ">
                            Si vous livrez, vous retrouvez vos courses du jour, vous démarrez d’un geste, et vous appelez le client d’un seul appui si vous êtes perdu
                        </p>
                    </div>
                    <div className="flex flex-col gap-2.5 p-4 bg-white rounded-xl shadow-lg hover:-translate-y-0.5 duration-300">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-input/80 p-2.5 rounded-xl">
                                <User className="text-livree"/>
                            </div>
                            <h4 className="font-body font-semibold text-neutral text-lg sm:text-xl">Client</h4>
                        </div>
                        <p className="font-body font-normal text-secondary ">
                            Si vous attendez un colis, un lien suffit. Pas d’application à télécharger, pas de compte à créer
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
}
