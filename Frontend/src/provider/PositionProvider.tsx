import { useState, type ReactNode } from "react"
import { PositionContext, useUtilities } from "./CustomizedHooks"
import api from "../api"
import axios from "axios"

export interface PosiitonProviderProps {
    children: ReactNode
}

export function PosiitonProvider ({children}:PosiitonProviderProps) {
    const [lastPosition, setLastPosition] = useState<GeolocationPosition | null>(null)
    const {setMessage} = useUtilities()

    function sendPosition(uuid: string, position: GeolocationPosition): Promise<any> {
        const route_send = `tracking_api/delivery/position/${uuid}/`
        return new Promise((resolve, reject)=>{
            try { 
                const lastPosition = api.post(
                    route_send,
                    {
                        "latitude": position.coords.latitude,
                        "longitude": position.coords.longitude
                    }
                )
                setLastPosition(position)
                resolve(lastPosition)
            }
            catch (err) {
                if (axios.isAxiosError(err)){
                    const message = err.response?.data.detail
                    setMessage(message)
                    reject(new Error(message))
                } else {
                    console.log(err)
                    reject(new Error("Une erreur inatendue est survenue"))
                }
            }
        })
    }

    return <>
        <PositionContext.Provider value={{
            lastPosition, setLastPosition,
            sendPosition,
        }}>
            {children}
        </PositionContext.Provider>
    </>
}
