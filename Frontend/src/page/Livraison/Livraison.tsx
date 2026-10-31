import { CirclePlus, Info, Search } from "lucide-react";
import { CardLivraison } from "../../components/Livraison/cardLivraison";
import { HeadPage } from "../../components/shared/headPage";
import { Filter } from "../../components/shared/filter";
import { useLivraison } from "../../provider/CustomizedHooks";
import { useEffect } from "react";

export default function Livraison () {
    const {livraisons, getLivraisons} = useLivraison()

    useEffect(()=>{
        getLivraisons()
    }, [])

    return <>
        <section className="container-custom py-4 bg-bg-principale">
            <div className="flex flex-col gap-4">
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
                <Filter />
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <CardLivraison data={livraisons}></CardLivraison>
                </div> */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-body font-semibold text-[16px}">Liste des livraison</h3>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {livraisons && livraisons?.map((livraison, index) => (
                        <CardLivraison key={livraison.id} data={livraison} index={index} />
                    ))}
                    </div>
                    {livraisons !== null && livraisons.length === 0 && (
                        <Info>Vous n'avez pas encore des courses</Info>
                    )}
                </div>
            </div>
        </section>
    </>
}
