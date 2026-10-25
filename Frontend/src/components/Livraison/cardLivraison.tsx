import { Link, Navigation, UserRoundArrowLeft } from "lucide-react";
import { BadgeLivraison } from "./badge";
import { Button } from "../shared/button";


export function CardLivraison () {
  return <> 
    <div className="flex flex-col gap-4 bg-white h-auto rounded-xl shadow-xl p-4">
        <div className="flex justify-between">
            <h5 className="font-body font-bold text-2xl">Hery Rakoto</h5>
            <BadgeLivraison type="en_attente" />
        </div>
        <div className="flex flex-col gap-1">
            <div className="flex gap-2">
                <Navigation className="text-[#004C6C]"/>
                <p className="font-body font-medium text-neutral">Analakely</p>
                <p className="font-body font-medium text-secondary">(repère: face pharmacie métropole)</p>
            </div>
            <div className="bg-neutral-light flex gap-2 text-secondary p-3 rounded-xl">
                <UserRoundArrowLeft strokeWidth={3} />
                <p className="font-body font-medium text-neutral">Livreur : </p>
                <p className="text-neutral font-body font-bold">Faly</p>
                <div className="flex-1">
                    <p className="w-auto justify-self-end">0333169049</p>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2">
            <a href="http://localhost:5173/livraison/suivi/oz2e-fe3e-12sdd" className="flex gap-2 items-center font-body font-medium text-secondary">
                <Link className="w-6 shrink-0" size={24}/>  
                <span className="break-all">
                    http://localhost:5173/livraison/suivi/oz2e-fe3e-12sdd
              </span>
            </a>
            <Button className="w-auto justify-self-end self-center">Suivi direct</Button>   
        </div>
    </div>
  </>
}
