
// import map from "../../assets/img/map.png"
// import { MapPublic } from "../../map/map"
import { lazy, Suspense, useEffect, useState } from "react"
import { getUserLocation, type UserLocation } from "../../map/customMapHook"
import { useMap } from "@vis.gl/react-maplibre"
import Skeleton from "react-loading-skeleton"
const MapPublic = lazy(() => import("../../map/map"))

interface CarteProps {
  latitude?: string
  longitude?: string
  repere?: string
  lieu?: string
  heure_l?: string
}

export function Carte ({latitude, longitude, repere, lieu, heure_l}: CarteProps) {
  const [location, setLocation] = useState<UserLocation | null>(null)

  const {map_public} = useMap()

  useEffect(()=>{
    const fetchLocation = async ()=>{
      const coords = await getUserLocation()
        .catch((err)=>console.log(err))
      setLocation(coords ?? null)
    }
    fetchLocation()
  }, [map_public])

  useEffect(() => {
    if (!location || !map_public) return
    if(!latitude?.trim() || !longitude?.trim()){
      map_public.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 16,
      })
      return
    }
    map_public.flyTo({
      center: [parseFloat(longitude), parseFloat(latitude)],
      zoom: 16,
    })
  }, [location, map_public, longitude, latitude])
  return <>
    <div className="container-custom ">
      <div className="h-full w-full relative flex justify-center ">
        <div className="w-full h-100 md:h-[420px] relative overflow-hidden">
          <div className="bg-linear-to-b from-transparent to-gradient-cart w-full h-full absolute top-0 left-0 bg-red-30 rounded-xl z-10 pointer-events-none" ></div>
          {/* <img src={map} alt="carte" className="w-full h-full rounded-2xl object-cover "/> */}
          <div className="w-full h-full rounded-2xl object-cover">
            <Suspense fallback={<Skeleton className="w-full h-full"/>}>
              <MapPublic id="map_public"/>
            </Suspense>
          </div>
        </div>
        <div className="bg-white p-4 absolute w-11/12 bottom-4 flex items-center justify-between rounded-xl z-20">
          <div className="text-neutral font-body font-semibold">
            <img src="" alt="" className="w-8" />
            <div className="flex gap-2 ">
              {/* <p>Analakely</p> */}
              {/* <MoveRight /> */}
              <p>Livraison à {lieu}</p>
            </div>
            <p className="text-secondary">Repère : {repere}</p>
          </div>
          <div className="bg-gradient-right px-2 py-1 text-secondary font-body font-semibold rounded-md">
            <p>{heure_l}</p>
          </div>
        </div>
      </div>
    </div>
  </>
}
