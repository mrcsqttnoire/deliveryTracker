import { Bike, CheckCheck, CircleDot, Hourglass, UserGroup } from "lucide-react";
import { useLivraison, useLivreur, useUser } from "../provider/CustomizedHooks";
import { useEffect, useMemo } from "react";
import { HEADER_DASHBOARD } from "../roles/control";
import { twMerge } from "tailwind-merge";
import MapSuivi from "../map/map_suivi";
import { Marker, useMap } from "@vis.gl/react-maplibre";
import { BoxMarker, LivraisonIci } from "../map/pin_marker";
export function Dashboard () {
    const {isProprietaire, userLogedIn} = useUser()
    const { livraisons, getLivraisons} = useLivraison()
    const {livreursList, getLivreurs} = useLivreur()
    const {dashboard_map} = useMap()

    useEffect(()=>{
        if (isProprietaire) getLivreurs()
        getLivraisons()
    }, [])

    const lv_en_attente = livraisons.filter((lv)=>lv.status === 'en_attente').length ?? 0
    const lv_livree = livraisons.filter((lv)=>lv.status === 'livree').length ?? 0
    const lvr_en_route = livreursList?.filter((lv)=>lv.status === 'occupe').length ?? 0
    const lvr_dispo = livreursList?.filter((lv)=>lv.status === 'libre').length ?? 0
    
    const HeadDashboard = HEADER_DASHBOARD[userLogedIn.role]
    
    const destinations = useMemo(() => livraisons.flatMap((livraison) => {
        const tabLatitude = livraison.destination_lat ?? livraison.destination?.latitude
        const tabLongitude = livraison.destination_long ?? livraison.destination?.longitude
        if (tabLatitude == null || tabLatitude === "" || tabLongitude == null || tabLongitude === "") return []
        const latitude = Number(tabLatitude)
        const longitude = Number(tabLongitude)
        return Number.isFinite(latitude) && Number.isFinite(longitude)
            ? [{ id: livraison.id, latitude, longitude }]
            : []
    }), [livraisons])
    useEffect(() => {
        if (!dashboard_map || destinations.length === 0) return

        const lats = destinations.map((destination) => destination.latitude)
        const lngs = destinations.map((destination) => destination.longitude)
        dashboard_map.fitBounds(
            [
                [Math.min(...lngs), Math.min(...lats)], 
                [Math.max(...lngs), Math.max(...lats)],
            ],
            {
                padding: { top: 40, bottom: 40, left: 20, right: 20 },
                maxZoom: 17,
                duration: 3500,
            }
        )
    }, [dashboard_map, destinations])

    return <>
        <section className="container-custom py-4 bg-principale min-h-full">
            <div className="flex flex-col justify-center gap-5 md:gap-10 ">
                <div>
                    <HeadDashboard/>
                </div>
                <div className={twMerge("grid grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-4", !isProprietaire && "lg:grid-cols-2")}>
                    <div className="bg-white p-4 rounded-xl shadow-xl hover:-translate-y-0.5 duration-300">
                        <div className="flex justify-between items-center">
                            <h5 className="font-body font-bold text-secondary text-sm sm:text-base">En attente</h5>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-en_attent-bg place-content-center rounded-full">
                                <Hourglass size={20} className="text-en_attente shrink-0 justify-self-center"/>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 my-2">
                            <h4 className="font-heading font-semibold text-4xl sm:text-5xl text-neutral">{lv_en_attente}</h4>
                            <p className="font-body font-medium text-secondary text-base sm:text-lg">colis</p>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-3 text-en_attente">
                            <CircleDot size={16} className="hidden sm:inline"/>
                            <p className=" font-body font-bold text-base sm:text-lg">A expédier</p>
                        </div>
                    </div>
                    { isProprietaire &&
                        <div className="bg-white p-4 rounded-xl shadow-xl  hover:-translate-y-0.5 duration-300">
                            <div className="flex justify-between items-center">
                                <h5 className="font-body font-bold text-secondary text-sm sm:text-base">En route</h5>
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-en_route-bg place-content-center rounded-full">
                                    <Bike size={20} className="text-en_route shrink-0 justify-self-center"/>
                                </div>
                            </div>
                            <div className="flex items-end gap-2 my-2">
                                <h4 className="font-heading font-semibold text-4xl sm:text-5xl text-neutral">{lvr_en_route}</h4>
                                <p className="font-body font-medium text-secondary text-base sm:text-lg">livreurs</p>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-3 text-en_route">
                                <CircleDot size={16} className="hidden sm:inline"/>
                                <p className=" font-body font-bold text-base sm:text-lg">Géolocalisé</p>
                            </div>
                        </div>
                    }
                    <div className="bg-white p-4 rounded-xl shadow-xl  hover:-translate-y-0.5 duration-300">
                        <div className="flex justify-between items-center">
                            <h5 className="font-body font-bold text-secondary text-sm sm:text-base">Livrées</h5>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-livree-bg place-content-center rounded-full">
                                <CheckCheck size={20} className="text-livree shrink-0 justify-self-center"/>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 my-2">
                            <h4 className="font-heading font-semibold text-4xl sm:text-5xl text-neutral">{lv_livree}</h4>
                            <p className="font-body font-medium text-secondary text-base sm:text-lg">réussies</p>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-3 text-livree">
                            <CircleDot size={16} className="hidden sm:inline"/>
                            <p className=" font-body font-bold text-base sm:text-lg">Succès 100%</p>
                        </div>
                    </div>
                    {   isProprietaire &&
                        <div className="bg-white p-4 rounded-xl shadow-xl  hover:-translate-y-0.5 duration-300">
                            <div className="flex justify-between items-center">
                                <h5 className="font-body font-bold text-secondary">Livreurs</h5>
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/15 place-content-center rounded-full">
                                    <UserGroup size={20} className="text-primary shrink-0 justify-self-center"/>
                                </div>
                            </div>
                            <div className="flex items-end gap-2 my-2">
                                <h4 className="font-heading font-semibold text-4xl sm:text-5xl text-neutral">{lvr_dispo}</h4>
                                <p className="font-body font-medium text-secondary text-base sm:text-lg">disponibles</p>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-3 text-primary">
                                <CircleDot size={16} className="hidden sm:inline"/>
                                <p className=" font-body font-bold text-base sm:text-lg">Libre </p>
                            </div>
                        </div>
                    }
                </div>
                <div className="flex flex-col gap-6" >
                    {/* <div className="flex justify-between">
                        <h4 className="font-heading font-bold text-xl sm:text-2xl text-neutral">Course recente</h4>
                        <a href="/livraison" className="text-primary font-body font-semibold">Tout voir</a>
                    </div> */}
                    {isProprietaire &&  <div className="relative h-100 w-full">
                        <MapSuivi
                            id="dashboard_map"
                            rotate={true}
                        >
                            {   livraisons &&
                                livraisons.filter((l)=>l.status !== "livree").flatMap((l)=>{
                                    const rawLatitude = l.destination_lat ?? l.destination?.latitude
                                    const rawLongitude = l.destination_long ?? l.destination?.longitude
                                    if (rawLatitude == null || rawLatitude === "" || rawLongitude == null || rawLongitude === "") return []
                                    const latitude = Number(rawLatitude)
                                    const longitude = Number(rawLongitude)
                                    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return []
                                    return [(
                                    <Marker
                                        key={l.id}
                                        latitude={latitude}
                                        longitude={longitude}
                                        anchor="bottom"
                                    >
                                        <div className="flex flex-col items-center">
                                            <LivraisonIci
                                                hidden_ping={true}
                                            />
                                            <BoxMarker />
                                        </div>
                                    </Marker>
                                    )]
                                })
                            }
                        </MapSuivi>
                    </div>}
                </div>
            </div>
        </section>
    </>
}
