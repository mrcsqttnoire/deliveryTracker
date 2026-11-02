
import truck from "../assets/icons/truck.svg"
import  {Carte}  from "../components/Livraison/carte"
import { LivreurDetailMin } from "../components/livreur/livreur.min"
import { DetailColis } from "../components/Livraison/detailColis"
import { LivraisonProvider } from "../provider/LivraisonProvider"
import { MapProvider } from "@vis.gl/react-maplibre"
import { useLivraison } from "../provider/CustomizedHooks"
import { lazy, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const FormStep = lazy(()=> import("./Clients/livraisonAddons"))


type RouteParams = {
  id: string
}
export default function PublicLayout () {
  const location = useLocation()
  const page = location.pathname
  const navigate = useNavigate()
  const {id} = useParams<RouteParams>()
  useEffect(()=>{
    getSelectedLivraison(id ?? '', navigate)
  }, [])
  const {getSelectedLivraison, maLivraison} = useLivraison()
  return <>
   <LivraisonProvider>
    <MapProvider>
      <main className="flex flex-col gap-4">
        { !page.includes("admin") && maLivraison && !maLivraison.client &&
          <FormStep id={id ?? ''}/>
        }
        <section className="container-custom py-4 flex flex-col justify-center gap-4 shadow-md rounded-b-xl ">
            <div className="flex items-center gap-2">
              <img src={truck} alt="livraison-icon" className="bg-primary-300 p-3 rounded-full" />
              <h3 className="font-heading text-2xl font-bold capitalize text-neutral font">Votre livraison</h3>
            </div>
            <div className="p-4 bg-linear-to-tr from-gradient-left to-gradient-right h-27 flex flex-col justify-center gap-4 rounded-xl">
                  <h5 className="font-body font-bold text-tertiary text-lg">En route vers vous </h5>
                <div className="flex flex-col gap-2">
                  <div className="w-full h-1.5 bg-[#E2E8F8] rounded-xl">
                    <div className={twMerge("w-1/2 h-full bg-tertiary origin-left rounded-xl",
                      maLivraison?.status === 'en_attente' && 'w-1/9',
                      maLivraison?.status === 'en_route' && 'w-1/2',
                      maLivraison?.status === 'livree' && 'w-full',
                      )}></div>
                  </div>
                  <div className="flex justify-between text-tertiary font-body font-bold text-[15px] tracking-[1px]">
                    <p>Préparé</p>
                    <p>En route</p>
                    <p className="text-mist-500">Livré</p>
                  </div>
                </div>
            </div>
        </section>
        <section className="flex flex-col gap-4">
            { 
              <Carte 
                latitude={maLivraison?.destination?.latitude}
                longitude={maLivraison?.destination?.longitude}
                repere={maLivraison?.destination?.repere}
                lieu={maLivraison?.destination?.lieu}
                heure_l={maLivraison?.heure_livraison}
          />}
          <LivreurDetailMin photo={maLivraison?.livreur_photo ?? ""}
            nom={maLivraison?.livreur_nom ?? ""} 
            prenom={maLivraison?.livreur_prenom ?? ""} 
            tel={maLivraison?.livreur_telephone ?? ""} 
            status={maLivraison?.status}
          />
          <DetailColis 
            designation={maLivraison?.designation ?? "Il n'y a pas des informations qui sont avec votre colis"} 
            photos={maLivraison?.photos}/>
        </section>
      </main>
    </MapProvider>
   </LivraisonProvider>
  </>
}
