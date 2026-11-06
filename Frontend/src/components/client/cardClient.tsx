import { Package, PackagePlus, Phone, PhoneCall, RotateCwClock, Trash } from "lucide-react"

import { Button } from "../shared/button"
import { useUtilities, type Client } from "../../provider/CustomizedHooks"

interface CardClientProps {
    data: Client
}

export function CardClient ({data}: CardClientProps) {
    const initials = `${data.nom.charAt(0)}${data.prenom.charAt(0)}`
    const {setShowDialog} = useUtilities<Client>()
    return <>
        <div className="flex flex-col gap-3 bg-white h-auto rounded-xl shadow-xl p-4 hover:-translate-y-0.5 duration-300">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="center w-12 h-12 rounded-full bg-livree-bg shrink-0">
                        <p className="font-heading font-semibold text-xl text-livree">{initials}</p>
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-heading font-semibold text-lg min-w-0 sm:text-2xl text-neutral "><span className="hidden sm:inline">{data.nom}</span> {data.prenom}</h3>
                        <div className="flex gap-2 items-center font-body font-medium text-secondary">
                            <Phone size={18} className="hidden sm:inline"/>
                            <p className="min-w-0">{data.telephone}</p>
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
                        fn={() => setShowDialog({
                            isShow: true,
                            type: 'client',
                            data: data
                        })}
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
            <div className="flex gap-2 items-center flex-wrap">
                <a href={`tel:${data.telephone}`} className="flex-1 h-full">
                    <Button 
                        noLoading={true}
                        fn={()=>navigator.clipboard.writeText(data.telephone)}
                        className="h-full bg-gradient-right text-neutral hover:bg-gradient-right hover:opacity-85">
                        <PhoneCall className="w-5 md:w-6 shrink-0 text-primary" />
                        Appeler
                    </Button>
                </a>
                <Button 
                    noLoading={true}
                    className="bg-gradient-right flex-1 text-neutral hover:bg-gradient-right hover:opacity-85 duration-50">
                    <PackagePlus className="w-5 md:w-6 shrink-0 text-primary"/>
                    Nouvelle course 
                </Button>
            </div>
        </div>
    </>
}
