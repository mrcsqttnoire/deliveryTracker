import { Search } from "lucide-react";
import { CardClient } from "../../components/client/cardClient";
export default function Clients () {
  return <>
      <section className="container-custom py-4 bg-principale min-h-full">
        <div className="flex flex-col gap-4 ">
            <div className="relative h-12 ">
                <Search className="absolute top-1/2 -translate-y-1/2 left-4 z-10"/>
                <input type="text" name="livraison-search" className="absolute top-0 left-0 pl-[calc(32px+24px)] h-12 bg-[#F0F3FF] w-full font-body font-medium rounded-xl inset-shadow-sm " placeholder="Rechercher une livraison"/>
            </div>
            <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 gap-4">
              <CardClient></CardClient>
              <CardClient></CardClient>
              <CardClient></CardClient>
              <CardClient></CardClient>
            </div>
        </div>
    </section>
  </>
}
