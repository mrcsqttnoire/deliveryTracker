import { useEffect, useRef } from "react";
import type { UserLocation } from "../provider/ModelsType";
import { useUser, useLivraison, usePosition } from "../provider/CustomizedHooks";
import { getUserLocation } from "./customMapHook";


export function Haversine(a: UserLocation, b: UserLocation) {
    const R = 6371000
    const rad = (d: number) => (d * Math.PI) / 180
    const dLat = rad(b.latitude - a.latitude)
    const dLng = rad(b.longitude - a.longitude)
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLng / 2) ** 2
    const c = 2 * Math.asin(Math.sqrt(x))
    return R * c
}

export function useSendPosition() {
    const {isProprietaire} = useUser()
    const {maLivraison} = useLivraison()
    const {sendPosition, setLastPosition} = usePosition()
    const lastPos = useRef<UserLocation | null>(null)

    const livraisonId = maLivraison.find((l) => l.status === "en_route")?.id

    useEffect(()=>{
        if (isProprietaire || !livraisonId) return
        let actif = true

        const boucle = async () => {
            while(actif){
                try{
                    const positon = await getUserLocation()
                    if (actif && positon.accuracy <= 5000){
                        const d =  lastPos.current ? Haversine(positon, lastPos.current) : Infinity
                        console.log(d)
                        if (d > 10){
                            await sendPosition(livraisonId, positon)
                            setLastPosition(positon)
                        }
                        lastPos.current = positon
                    }
                } catch (err) { console.log(err)}
                await new Promise((r) => setTimeout(r, 5000))
            }
        }
        boucle()
        return () => { actif = false }
    }, [isProprietaire, livraisonId])
}

