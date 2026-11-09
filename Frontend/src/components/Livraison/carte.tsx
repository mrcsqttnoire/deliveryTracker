
// import map from "../../assets/img/map.png"
// import { MapPublic } from "../../map/map"
import { lazy, Suspense, useEffect, useState } from "react"
import { getUserLocation } from "../../map/customMapHook"
import { Marker, useMap } from "@vis.gl/react-maplibre"
import Skeleton from "react-loading-skeleton"
import type { Livraisons, UserLocation } from "../../provider/ModelsType"
import { usePosition, useUtilities } from "../../provider/CustomizedHooks"
import PinLivreur, { LivraisonIci } from "../../map/pin_marker"
import { CircleCheck } from "lucide-react"
const MapSuivi = lazy(() => import("../../map/map_suivi"))

interface CarteProps {
  data: Livraisons
}

export function Carte ({data}: CarteProps) {
  const lat = Number(data.destination?.latitude)
  const lng = Number(data.destination?.longitude)
  const {setMarker, marker} = useUtilities()
  const {lastPosition} = usePosition()
  const [location, setLocation] = useState<UserLocation | null>(null)
  const {map_suivi} = useMap()
  useEffect(()=>{
    const fetchLocation = async ()=>{
      const coords = await getUserLocation()
        .catch((err)=>console.log(err))
      setLocation(coords ?? null)
    }
    fetchLocation()
  }, [map_suivi])
  
  useEffect(() => {
    if (!map_suivi) return 

    setMarker({
      lat: lat,
      lng: lng
    })

    if (lastPosition){
      const fitLat = [lat, lastPosition?.latitude]
      const fitLng = [lng, lastPosition?.longitude]
      map_suivi.fitBounds(
        [
          [Math.min(...fitLng), Math.min(...fitLat)],
          [Math.max(...fitLng), Math.max(...fitLat)]
        ],
        {
          padding: { top: 20, bottom: 100, left: 40, right: 40 },
          maxZoom: 16.5,
          duration: 3500,
        }
      )
    } else {
      map_suivi.flyTo({
        center: [lng, lat],
        zoom: 17,
        pitch: 70, bearing: -20, duration: 2500,
      })
    }

    if (location){
      if(!Number.isFinite(lat) || !Number.isFinite(lng)){
        map_suivi.flyTo({
          center: [location.longitude, location.latitude],
          zoom: 17,
          
          duration: 1000,
        })
        return
      }
    }
  }, [location, map_suivi, lat, lng])
  return <>
    <div className="container-custom ">
      <div className="h-full w-full relative flex justify-center ">
        <div className="w-full h-100 md:h-105 relative overflow-hidden">
          <div className="bg-linear-to-b from-transparent to-gradient-cart w-full h-full absolute top-0 left-0 bg-red-30 rounded-xl z-10 pointer-events-none" ></div>
          {/* <img src={map} alt="carte" className="w-full h-full rounded-2xl object-cover "/> */}
          <div className="w-full h-full rounded-2xl object-cover">
            <Suspense fallback={<Skeleton className="w-full h-full"/>}>
              <MapSuivi id="map_suivi">
                { marker && 
                  <Marker 
                      latitude={marker.lat} 
                      longitude={marker.lng}
                      anchor="bottom"
                  > 
                      <LivraisonIci className={data.status === "livree" && "bg-livree-bg text-livree flex items-center gap-2"}>
                        {data.status === "livree" && <CircleCheck></CircleCheck>}
                        {data.status === "livree" ? "livraison terminée" : "livraison ici"}
                      </LivraisonIci>
                  </Marker>
                }
                { lastPosition && 
                  <Marker 
                      latitude={lastPosition.latitude} 
                      longitude={lastPosition.longitude}
                      anchor="bottom"
                  > 
                      <PinLivreur/>
                  </Marker>
                }
              </MapSuivi>
            </Suspense>
          </div>
        </div>
        <div className="bg-white/70 p-4 absolute w-11/12 bottom-4 flex items-center justify-between rounded-xl z-20 backdrop-blur-xl">
          <div className="text-neutral font-body font-semibold">
            <img src="" alt="" className="w-8" />
            <div className="flex gap-2 ">
              {/* <p>Analakely</p> */}
              {/* <MoveRight /> */}
              <p>Livraison à {data.destination?.lieu}</p>
            </div>
            <p className="text-secondary">Repère : {data.destination?.repere}</p>
          </div>
          <div className="bg-gradient-right px-2 py-1 text-secondary font-body font-semibold rounded-md">
            <p>{data.heure_livraison}</p>
          </div>
        </div>
      </div>
    </div>
  </>
}
