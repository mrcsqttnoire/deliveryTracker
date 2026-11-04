import { useState, type ReactNode } from "react"
import { PositionContext, useUtilities } from "./CustomizedHooks"
import api from "../api"
import axios from "axios"
import type { UserLocation } from "./ModelsType"

export interface PosiitonProviderProps {
    children: ReactNode
}

export function PosiitonProvider ({children}:PosiitonProviderProps) {
    const [lastPosition, setLastPosition] = useState<UserLocation | null>(null)
    const {setMessage} = useUtilities()

    function sendPosition(uuid: string, position: UserLocation): Promise<any> {
        return new Promise((resolve, reject)=>{
            if (!uuid.trim()) reject() 
            const route_send = `tracking-api/delivery/position/${uuid}/`
            try { 
                const lastPosition = api.post(
                    route_send,
                    {
                        "latitude": position.latitude.toFixed(6),
                        "longitude": position.longitude.toFixed(6)
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

    async function getLastPosition(uuid: string) {
        const rout_get = `tracking-api/delivery/position/${uuid}/`
        // return new Promise((resolve, reject)=>{
        //     try {
        //         const res = api.get(rout_get)
        //         resolve(res)
        //     } catch (err) {
        //         if (axios.isAxiosError(err)){
        //             const message = err.response?.data.detail
        //             setMessage(message)
        //             reject(new Error(message))
        //         } else {
        //             console.log(err)
        //             reject(new Error("Une erreur inatendue est survenue"))
        //         }
        //     }
        // })
        const res = await api.get(rout_get)
        if(res && res.status === 200){
            const data = res.data
            setLastPosition(data)
        } 
    }

    return <>
        <PositionContext.Provider value={{
            lastPosition, setLastPosition,
            sendPosition, getLastPosition
        }}>
            {children}
        </PositionContext.Provider>
    </>
}
