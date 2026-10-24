import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "./page/Applayout";
import { PublicLayout } from "./page/PublicLayout";
import { useEffect, useState, type ReactNode } from "react"; 
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constanst";
import { jwtDecode } from "jwt-decode";
import api from "./api";
import { AuthLayout } from "./page/AuthLayout";
import { FormLogin } from "./components/formAuth";
import { UserForm, UserProfile } from "./components/userForm";
import { Livraison } from "./page/livraison";
import { NouvelleLivraison } from "./page/nouvelleLivraison";

type ProtectedRoutesProps = {
    children: ReactNode,
}

function ProtectedRoutes({children}: ProtectedRoutesProps){
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    })

    const refreshToken = async () => {
        const refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN)
            try{
                const res = await api.post("/auth/jwt/refresh/", {
                    'refresh' : refreshToken
                })
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
            return <div className="center h-dvh">Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="auth/login/"/>
}

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <>
            <ProtectedRoutes>
                <AppLayout/>
            </ProtectedRoutes>
        </>,
        children:[
            {
                path: 'livraison',
                element: <Livraison />
            },
            {
                path: 'livraison/create',
                element: <NouvelleLivraison/>
            }
        ]
    },
    {
        path: 'auth',
        element: <>
            <AuthLayout />
        </>,
        children:[
            {
                path: 'login',
                element: <FormLogin/>
            },
            {
                path: 'signin',
                element: <UserForm/>
            },
            {
                path: 'signin/next',
                element: <UserProfile role="proprietaire"/>
            },
        ]
    },
    {
        path: 'livraison/suivi/:id',
        element: <PublicLayout/>,
    }
])

