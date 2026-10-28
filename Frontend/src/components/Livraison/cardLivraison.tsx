import { Bike, Calendar, Clock, Compass, Link, Navigation } from "lucide-react";
import { BadgeLivraison } from "./badge";
import { Button } from "../shared/button";


export function CardLivraison () {
  return <> 
    <div className="flex flex-col gap-4 bg-white h-auto rounded-xl shadow-xl p-4 hover:-translate-y-0.5 duration-300">
        <div className="flex justify-between">
            <h5 className="font-body font-bold text-2xl">Hery Rakoto</h5>
            <BadgeLivraison type="en_attente" />
        </div>
        <div className="flex flex-col gap-1">
            <div className="flex gap-2">
                <Navigation className="text-[#004C6C]"/>
                <p className="font-body font-medium text-neutral">Analakely</p>
                <p className="font-body font-medium text-secondary">face pharmacie métropole</p>
            </div>
            <div className="bg-neutral-light flex gap-2 items-center text-secondary p-3 rounded-xl mt-2">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-en_route-bg text-en_route place-content-center rounded-full">
                        <Bike className="justify-self-center"/>
                    </div>
                    <div>
                        <p className=" text-lgfont-body font-medium text-secondary">Livreur assigné</p>
                        <p className="text-neutral text-lg font-body font-bold">Faly</p>
                    </div>
                </div>
                <div className="flex-1 ">
                    <div className="w-auto flex gap-2 justify-self-end ">
                        <p className="font-body font-bold">02/11/2026</p>
                        <Calendar/>
                    </div>
                    <div className="w-auto flex gap-2 justify-self-end mt-2">
                        <p className="font-body font-bold">11:00</p>
                        <Clock/>
                    </div>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2">
            <a href="http://localhost:5173/livraison/suivi/oz2e-fe3e-12sdd" className="flex gap-2 items-center font-body font-medium    text-secondary/50">
                <Link className="w-6 shrink-0" size={24}/>  
                <span className="break-all ">
                    http://localhost:5173/livraison/suivi/oz2e-fe3e-12sdd
              </span>
            </a>
            <Button className="w-auto bg-input text-neutral justify-self-end self-center hover:bg-primary/10 hover:text-primary duration-75">
                <Compass className="text-primary"/>
                Suivi direct
            </Button>   
        </div>
    </div>
  </>
}
