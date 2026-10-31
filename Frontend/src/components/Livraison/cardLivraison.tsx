import { Bike, Calendar, Clock, Compass, Link, Navigation } from "lucide-react";
import { BadgeLivraison } from "./badge";
import { Button } from "../shared/button";
import type { Livraisons } from "../../provider/CustomizedHooks";
import { useEffect, useState } from "react";
import { getDetailsPos } from "../../map/nominatim";

interface CardLivraisonProps {
    data: Livraisons
    index: number
}

export function CardLivraison ({data, index}: CardLivraisonProps) {
    const lien = window.location.origin.concat(`/livraison/suivi/${data.id}`)
    const nom = data.client_nom ?? null
    const prenom = data.client_prenom ?? null
    const nom_complet = (nom || prenom) && nom.concat(` ${prenom}`)

    const [lieu, setLieu] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            if (data.destination_lat && data.destination_long){
                getDetailsPos(data.destination_lat, data.destination_long).then(setLieu)
            }
        }, index * 1200)
        return () => clearTimeout(timer)
    }, [data.destination_lat, data.destination_long])

    return <> 
        <div className="flex flex-col gap-4 bg-white h-auto rounded-xl shadow-xl p-4 hover:-translate-y-0.5 duration-300">
            <div className="flex justify-between">
                <h5 className="font-body font-bold text-2xl">{nom_complet ?? "En attente du client..."}</h5>
                <BadgeLivraison type={data.status} />
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                    <Navigation className="text-[#004C6C]"/>
                    <p className="font-body font-medium text-neutral">{lieu}</p>
                    <p className="font-body font-medium text-secondary">{data.destination_repere}</p>
                </div>
                <div className="bg-neutral-light flex gap-2 items-center text-secondary p-3 rounded-xl mt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-en_route-bg text-en_route place-content-center rounded-full">
                            <Bike className="justify-self-center"/>
                        </div>
                        <div>
                            <p className=" text-lgfont-body font-medium text-secondary">Livreur assigné</p>
                            <p className="text-neutral text-lg font-body font-bold">{data.livreur_prenom}</p>
                        </div>
                    </div>
                    <div className="flex-1 ">
                        <div className="w-auto flex gap-2 justify-self-end ">
                            <p className="font-body font-bold">{data.date_livraison}</p>
                            <Calendar/>
                        </div>
                        <div className="w-auto flex gap-2 justify-self-end mt-2">
                            <p className="font-body font-bold">{data.heure_livraison}</p>
                            <Clock/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <a href={lien} className="flex gap-2 items-center font-body font-medium text-secondary/50">
                    <Link className="w-6 shrink-0" size={24}/>  
                    <span className="break-all ">
                        {lien}
                </span>
                </a>
                <Button className="w-auto bg-input text-neutral justify-self-end self-center hover:bg-primary/10 hover:text-primary duration-75" noLoading>
                    <Compass className="text-primary"/>
                    Suivi direct
                </Button>   
            </div>
        </div>
    </>
}