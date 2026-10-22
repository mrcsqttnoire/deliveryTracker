import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Applayout";
import { PublicLayout } from "./components/PublicLayout";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Layout/>
        </>,
        children:[
            {}
        ]
    },
    {
        path: 'livraison/suivi/:id',
        element: <PublicLayout/>,
        // children: [
        //     {
        //         path: ':id',
        //         element: <DetailLivraison />
        //     }
        // ]
    }
])

