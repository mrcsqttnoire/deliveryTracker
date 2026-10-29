import { useEffect, useState, type ReactNode } from "react";
import { LivreurContext, type Livreur } from "./CustomizedHooks";
import api from "../api";


interface LivreurProviderProps {
    children: ReactNode
}

export function LivreurProvider ({children}: LivreurProviderProps) {

    const [livreursList, setLivreursList] = useState<Livreur[] | null>(null)

    const route = "tracking-api/livreur"
    const getLivreurs = async () => {
        await api.get(route)
            .then((res) => res.data)
            .then((data) =>{
                setLivreursList(data)
            })
            .catch((err) => console.log(err))
        }
        
        useEffect(() => {
            getLivreurs()
            // console.log(livreursList)
    }, [])

        // useEffect(() => {
        //     console.log(livreursList);
        // }, [livreursList]);

    return <LivreurContext.Provider
        value={{
            livreursList
        }}
    >
        {children}
    </LivreurContext.Provider>
}
