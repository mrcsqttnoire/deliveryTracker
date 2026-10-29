import { useEffect, useState, type ReactNode } from "react"; 
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constanst";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { LayoutSkeleton } from "../skeleton/LayoutSkeleton";
import { Navigate } from "react-router-dom";

type ProtectedRoutesProps = {
    children: ReactNode,
}

export function ProtectedRoutes({children}: ProtectedRoutesProps){
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
    // const location = useLocation()

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN)
            try{
                const res = await api.post(
                    "/auth/jwt/refresh/", 
                    {'refresh' : refreshToken},
                    {skipAuth : true}
                )
                if (res.status === 200){
                    localStorage.setItem(ACCESS_TOKEN, res.data.access)
                    setIsAuthorized(true)
                }else {
                    setIsAuthorized(false)
                }
            } catch (e) {
                console.log(e)
                setIsAuthorized(false)
            }
    }

    const auth = async () => {
        const token: string | null = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
            return
        }
        const decoded_token = jwtDecode(token)
        const now: number = Date.now() / 1000
        if(decoded_token.exp && decoded_token.exp < now){
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }

    }

    if(isAuthorized === null){
        // if (location.pathname == "/clients"){
        //     // console.log("ok")
        //     return <LayoutSkeleton/>
        // }
        // if (location.pathname == "/livreurs"){
        //     return <LivreurSkeleton/>
        // }
        // return <>
        //     <div className="center flex-col h-dvh">
        //             <Loading/>
        //     </div>
        // </>
        return <LayoutSkeleton/>
    }

    return isAuthorized ? children : <Navigate to="auth/login/"/>
}