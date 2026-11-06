import { Marker, useMap } from "@vis.gl/react-maplibre";
import MapSuivi from "../../map/map_suivi";
import { useEffect } from "react";
import { useLivraison, usePosition } from "../../provider/CustomizedHooks";
import PinLivreur, { BoxMarker, LivraisonIci } from "../../map/pin_marker";
import { Map } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserLocation } from "../../map/customMapHook";

export default function CartePageDemarre () {
    const navigate = useNavigate()
    const {affiche_all} = useMap()
    const {id} = useParams()
    const {lastPosition, setLastPosition, getLastPosition} = usePosition()
    const {
        livraisons, getLivraisons,
        maLivraison, getSelectedLivraison
    } = useLivraison()

    useEffect(()=>{
        const loadData = async () => {
            if (id?.trim()){
                getSelectedLivraison(id, navigate)
                getLastPosition(id)
            } else {
                getLivraisons()
                const position = await getUserLocation()
                setLastPosition(position)
            }
        }
        loadData()
    }, [affiche_all])
    
    const data = id?.trim() ? maLivraison : livraisons
    const destinations = data.filter(
        (l) => (l.destination_lat ?? l.destination?.latitude) != null
    )
    useEffect(() => {
        if (!affiche_all || destinations.length === 0 || !lastPosition) return
        const lngs = destinations.map((l) => Number(l.destination_long ?? l.destination?.longitude))
        const lats = destinations.map((l) => Number(l.destination_lat  ?? l.destination?.latitude))
        
        if(lastPosition){
            lngs.push(Number(lastPosition.longitude))
            lats.push(Number(lastPosition.latitude))
        }

        affiche_all.fitBounds(
            [
                [Math.min(...lngs), Math.min(...lats)], 
                [Math.max(...lngs), Math.max(...lats)],
            ],
            {
                padding: { top: 60, bottom: 60, left: 40, right: 40 },
                maxZoom: 16,
                duration: 3500,
            }
        )
    }, [affiche_all, destinations, lastPosition])
    return <>
        <div className="container-custom flex flex-col gap-2 items-center pt-4 w-full h-full"> 
            <div className="flex p-4 justify-between items-center bg-[#F0F3FF] w-full font-body font-medium rounded-xl inset-shadow-sm ">
                <div>
                    <h4 className="font-heading font-semibold text-neutral text-2xl">Vue de carte de vos course</h4>
                    <p className="font-body font-medium text-secondary">Visualisez tous en un seul coup</p>
                </div>
                <div className="flex justify-center items-center w-14 h-14 bg-en_route-bg rounded-full z-20" >
                    <Map className="text-en_route" size={24}/>   
                </div>
            </div>
            <MapSuivi
                id="affiche_all"
                rotate={true}
            >
                {   data &&
                    data.filter((l)=>l.status !== "livree").map((l)=>(
                        <Marker
                            key={l.id}
                            latitude={Number(l.destination_lat ?? l.destination?.latitude)}
                            longitude={(Number(l.destination_long ?? l.destination?.longitude))}
                            anchor="bottom"
                        >
                            <div className="flex flex-col items-center">
                                <LivraisonIci
                                    hidden_ping={true}
                                />
                                <BoxMarker />
                            </div>
                        </Marker>
                    ))
                }
                {   lastPosition &&
                    <Marker
                        latitude={Number(lastPosition.latitude)}
                        longitude={(Number(lastPosition.longitude))}
                        anchor="bottom"
                    >

                        <div className="flex flex-col items-center">
                            <LivraisonIci
                                className="bg-blue-600"
                                hidden_ping={true}
                            >
                                Vous
                            </LivraisonIci>
                            <PinLivreur />
                        </div>
                    </Marker>
                }
            </MapSuivi>
        </div>
    </>
}
