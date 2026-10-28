import { ClientSkeleton } from "./skeleton/client/ClientSkeleton";
import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import { lazy, useEffect, useState, type ReactNode } from "react"; 
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constanst";
import { jwtDecode } from "jwt-decode";
import api from "./api";
import { Loading, SuspenseLayout } from "./components/shared/loading";
import { LivraisonProvider } from "./provider/LivraisonProvider";
import { LayoutSkeleton } from "./skeleton/LayoutSkeleton";
import { LivreurSkeleton } from "./skeleton/livreur/LivreurSkeleton";
import { Dashboard } from "./page/Dashboard";

const AppLayout = lazy(() => import('./page/Applayout'))
const AuthLayout = lazy(() => import('./page/AuthLayout'))
const PublicLayout = lazy(() => import('./page/PublicLayout'))

const Livraison = lazy(() => import('./page/Livraison/Livraison'))
const NouvelleLivraison = lazy(() => import('./page/Livraison/nouvelleLivraison'))

const Livreur = lazy(() => import('./page/Livreurs/Livreur'))
const NouveauLivreur = lazy(() => import('./page/Livreurs/nouveauLivreur'))

const Clients = lazy(() => import('./page/Clients/Client'))

const UserForm = lazy(() => import('./components/Auth/userForm'))
const UserProfile = lazy(() => import('./components/Auth/userProfile'))
const FormLogin = lazy(() => import('./components/Auth/formAuth'))

type ProtectedRoutesProps = {
    children: ReactNode,
}

function ProtectedRoutes({children}: ProtectedRoutesProps){
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
    // const location = useLocation()

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

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

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <>
            <ProtectedRoutes>
                <SuspenseLayout fallback= {<LayoutSkeleton />}>
                    {<AppLayout/>}
                </SuspenseLayout>
            </ProtectedRoutes>
        </>,
        children:[
            {
                path: '',
                element: <Dashboard/>
            },
            {
                path: 'livraisons',
                element: <SuspenseLayout>
                    <Livraison/>
                </SuspenseLayout>
            },
            {
                path: 'livraisons/create',
                element: 
                <LivraisonProvider>
                    <SuspenseLayout>
                        <NouvelleLivraison/>
                    </SuspenseLayout>
                </LivraisonProvider>
            },
            {
                path: 'livreurs',
                element: 
                <SuspenseLayout fallback={<LivreurSkeleton/>}>
                    <Livreur/>
                </SuspenseLayout>
            },            
            {
                path: 'livreurs/create',
                element: 
                    <SuspenseLayout >
                        <NouveauLivreur/>
                    </SuspenseLayout>,
                children: [
                    {
                        path: '',
                        element: 
                            <SuspenseLayout>
                                <UserForm/>
                            </SuspenseLayout>
                    },
                    {
                        path: 'next',
                        element: 
                            <SuspenseLayout>
                                <UserProfile 
                                    role="livreur"
                                    btn="Enregistrer"
                                    r_path="/livreurs/create"
                                />
                            </SuspenseLayout>
                    },
                ]
            },
            {
                path: 'clients',
                element: 
                <SuspenseLayout fallback={<ClientSkeleton/>}>
                    <Clients />
                </SuspenseLayout>
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
                element: 
                    <UserProfile 
                        role="proprietaire"
                        r_path="/auth/signin/"
                    />
            },
        ]
    },
    {
        path: 'livraison/suivi/:id',
        element: <PublicLayout/>,
    }
])

