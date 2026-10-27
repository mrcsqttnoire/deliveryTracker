import { CirclePlus, Search } from "lucide-react";
import { CardLivraison } from "../../components/Livraison/cardLivraison";
import { HeadPage } from "../../components/shared/headPage";

export default function Livraison () {
  return <>
    <section className="container-custom-main rounded-xl shadow-xl py-4 bg-bg-principale">
        <div className="flex flex-col gap-4 ">
            <HeadPage 
                title="Mission du jour"
                desc="Delivery Tracker"
                btn_title="Nouvelle livraison"
            ><CirclePlus/> 
            </HeadPage>
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
