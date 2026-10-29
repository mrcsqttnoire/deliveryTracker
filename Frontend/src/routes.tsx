import { ClientSkeleton } from "./skeleton/client/ClientSkeleton";
import { createBrowserRouter } from "react-router-dom";
import { lazy} from "react"; 

import { SuspenseLayout } from "./components/shared/loading";
import { LivraisonProvider } from "./provider/LivraisonProvider";
import { LayoutSkeleton } from "./skeleton/LayoutSkeleton";
import { LivreurSkeleton } from "./skeleton/livreur/LivreurSkeleton";
import { Dashboard } from "./page/Dashboard";
import { ProtectedRoutes } from "./security/ProtectedRoutes";

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

