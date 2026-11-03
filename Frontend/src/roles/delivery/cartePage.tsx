import { Marker, useMap } from "@vis.gl/react-maplibre";
import MapSuivi from "../../map/map_suivi";
import { useEffect } from "react";
import { useLivraison } from "../../provider/CustomizedHooks";
import { BoxMarker, LivraisonIci } from "../../map/pin_marker";
import { Map } from "lucide-react";

export default function CartePageDemarre () {
    const {affiche_all} = useMap()
    const {livraisons, getLivraisons} = useLivraison()

    useEffect(()=>{
        getLivraisons()
    }, [affiche_all])

    useEffect(() => {
    if (!affiche_all) return
    const lngs = livraisons.map((l) => Number(l.destination_long))
    const lats = livraisons.map((l) => Number(l.destination_lat))

    affiche_all.fitBounds(
        [
            [Math.min(...lngs), Math.min(...lats)], 
            [Math.max(...lngs), Math.max(...lats)],
        ],
        {
            padding: { top: 60, bottom: 60, left: 40, right: 40 },
            maxZoom: 16,
            duration: 1000,
        }
    )
    }, [affiche_all, livraisons])
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
            >
                {   livraisons &&
                    livraisons.map((l)=>(
                        <>
                            <Marker
                                latitude={Number(l.destination_lat)}
                                longitude={(Number(l.destination_long))}
                                anchor="bottom"
                            >
                                <div className="flex flex-col items-center">
                                    <LivraisonIci/>
                                    <BoxMarker />
                                </div>

                            </Marker>
                        </>
                    ))
                }
            </MapSuivi>
        </div>
    </>
}
