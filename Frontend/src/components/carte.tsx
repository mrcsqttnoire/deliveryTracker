import map from "../assets/img/map.png"
import { Button } from "./button"

export function Carte () {
  return <>
    <div className="container-custom ">
      <div className="h-full w-full relative flex justify-center ">
        <div className="w-full h-80 md:h-[420px] relative overflow-hidden">
          <div className="bg-linear-to-b from-transparent to-gradient-cart w-full h-full absolute top-0 left-0 bg-red-30 rounded-xl" ></div>
          <img src={map} alt="carte" className="w-full h-full rounded-2xl object-cover "/>
        </div>
        <div className="bg-white p-4 absolute w-11/12 bottom-4 flex items-center justify-between rounded-xl">
          <div className="text-neutral font-body font-semibold">
            <img src="" alt="" className="w-8" />
            <div className="flex gap-4 ">
              <p>Analakely</p>
              <img src="" alt="" />
              <p>Ambohijatovo</p>
            </div>
            <p className="text-secondary">Repère : Jovena Ambohijatovo</p>
          </div>
          <div className="bg-gradient-right px-2 py-1 text-secondary font-body font-semibold rounded-md">
            <p>1.8km</p>
          </div>
        </div>
      </div>
    </div>
  </>
}
