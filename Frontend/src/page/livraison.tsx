import { CirclePlus, Search } from "lucide-react";
import { Button } from "../components/shared/button";
import { CardLivraison } from "../components/Livraison/cardLivraison";
import { useNavigate } from "react-router-dom";

export function Livraison () {
    const navigate = useNavigate()
    function createLivraison(){
        navigate("create")
    }
  return <>
    <section className="container-custom-main rounded-xl shadow-xl py-4 bg-bg-principale">
        <div className="flex flex-col gap-4 ">
            <div className="grid grid-cols-2 ">
                <div>
                    <p className="font-body font-medium text-secondary">Delivery Tracker</p>
                    <h4 className="font-heading font-semibold text-neutral text-2xl">Mission du jour</h4>
                </div>
                <Button fn={createLivraison} className="flex text-sm md:text-lg ">
                    <CirclePlus/>
                    Nouvelle livraison
                </Button>
            </div>
            <div className="relative h-12 ">
                <Search className="absolute top-1/2 -translate-y-1/2 left-4 z-10"/>
                <input type="text" name="livraison-search" className="absolute top-0 left-0 pl-[calc(32px+24px)] h-12 bg-[#F0F3FF] w-full font-body font-medium rounded-xl inset-shadow-sm " placeholder="Rechercher une livraison"/>
            </div>
            <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 gap-4">
                <CardLivraison></CardLivraison>
                <CardLivraison></CardLivraison>
                <CardLivraison></CardLivraison>
            </div>
        </div>
    </section>
  </>
}
