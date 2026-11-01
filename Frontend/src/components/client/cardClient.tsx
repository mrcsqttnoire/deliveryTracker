import { Package, PackagePlus, Phone, PhoneCall, RotateCwClock, Trash } from "lucide-react"

import { Button } from "../shared/button"
import type { Client } from "../../provider/CustomizedHooks"

interface CardClientProps {
    data: Client
}

export function CardClient ({data}: CardClientProps) {
    const initials = `${data.nom.charAt(0)}${data.prenom.charAt(0)}`;
    return <>
        <div className="flex flex-col gap-3 bg-white h-auto rounded-xl shadow-xl p-4 hover:-translate-y-0.5 duration-300">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="center w-12 h-12 rounded-full bg-livree-bg shrink-0">
                        <p className="font-heading font-semibold text-xl text-livree">{initials}</p>
                    </div>
                    <div>
                        <h3 className="font-heading font-semibold text-xl text-neutral">{`${data.nom} ${data.prenom}`}</h3>
                        <div className="flex gap-2 items-center font-body font-medium text-secondary">
                            <Phone size={18}/>
                            <p>{data.telephone}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button 
                        className="w-10 text-secondary bg-gradient-right hover:bg-en_route-bg hover:text-en_route duration-100 ease-in"
                        noLoading={true}
                    >
                        <RotateCwClock className="shrink-0"/>
                    </Button>
                    <Button 
                        className="w-3 text-secondary bg-gradient-right hover:bg-primary/10 hover:text-primary duration-100 ease-in"
                        noLoading={true}
                    >
                        <Trash className="shrink-0"/>
                    </Button>
                </div>
            </div>
            <div className="bg-input flex justify-between items-center px-4 py-2 rounded-xl">
                <div className="flex text-secondary items-center gap-2">
                    <Package/>
                    <div >
                        <h5 className="font-body font-bold text-sm">Commandes</h5>
                        <p className="font-body font-bold text-neutral">{data.livraison_count} livraison(s)</p>
                    </div>
                </div>
                {/* <div className="flex  text-secondary items-center gap-2">
                    <MapPin/>
                    <div>
                        <h5 className="font-body font-bold text-sm">Sécteur</h5>
                        <p className="font-body font-bold text-neutral"> Analakely</p>
                    </div>
                </div> */}
            </div>
            <div className="flex gap-2">
                <Button 
                    noLoading={true}
                    fn={()=>navigator.clipboard.writeText(data.telephone)}
                    className=" bg-gradient-right text-neutral hover:bg-gradient-right hover:opacity-85">
                    <PhoneCall className="w-5 md:w-6 shrink-0 text-primary" />
                    Copier numéro
                </Button>
                <Button 
                    noLoading={true}
                    className="bg-gradient-right text-neutral hover:bg-gradient-right hover:opacity-85 duration-50">
                    <PackagePlus className="w-5 md:w-6 shrink-0 text-primary"/>
                    Nouvelle course 
                </Button>
            </div>
        </div>
    </>
}
