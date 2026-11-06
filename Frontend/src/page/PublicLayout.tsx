
import truck from "../assets/icons/truck.svg"
import  {Carte}  from "../components/Livraison/carte"
import { LivreurDetailMin } from "../components/livreur/livreur.min"
import { DetailColis } from "../components/Livraison/detailColis"
import { MapProvider } from "@vis.gl/react-maplibre"
import { useLivraison, type RouteParams } from "../provider/CustomizedHooks"
import { lazy, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { ClientDetailMin } from "../components/client/client.min"
import { Loading } from "../components/shared/loading"
import { useGetPosition } from "../map/polling"
import { Truck } from "lucide-react"

const FormStep = lazy(()=> import("./Clients/livraisonAddons"))



export default function PublicLayout () {
  const location = useLocation()
  const page = location.pathname
  const navigate = useNavigate()
  const {id} = useParams<RouteParams>()
  const {getSelectedLivraison, maLivraison, livraisonChargee} = useLivraison()
  useEffect(()=>{
      getSelectedLivraison(id ?? '', navigate)
  }, [])
  useGetPosition()
  if (!livraisonChargee) return <Loading/>
  if (!maLivraison) return <p>Livraison introuvable.</p>
  const Livraison = maLivraison[0]
  return <>{
    <MapProvider>
      <main className="flex flex-col gap-4">
        { !page.includes("admin") && Livraison && !Livraison.client &&
          <FormStep id={id ?? ''}/>
        }
        <section className="container-custom py-4 flex flex-col justify-center gap-4 shadow-md rounded-b-xl ">
            <div className="flex items-center gap-2">
              <div className="center bg-primary/10 p-2 rounded-full shrink-0">
                <Truck className="text-primary"/>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold capitalize text-neutral font">Votre livraison</h3>
            </div>
            <div className="p-4 bg-linear-to-tr from-gradient-left to-gradient-right h-27 flex flex-col justify-center gap-4 rounded-xl">
                <h5 className="font-body font-bold text-tertiary text-base sm:text-lg">En route vers vous </h5>
                <div className="flex flex-col gap-2">
                  <div className="w-full h-1.5 bg-[#E2E8F8] rounded-xl">
                    <div className={twMerge("w-1/2 h-full bg-tertiary origin-left rounded-xl",
                      Livraison?.status === 'en_attente' && 'w-1/9',
                      Livraison?.status === 'en_route' && 'w-1/2',
                      Livraison?.status === 'livree' && 'w-full',
                      )}></div>
                  </div>
                  <div className="flex justify-between text-tertiary font-body font-bold text-[15px] tracking-[1px]">
                    <p>Préparée</p>
                    <p>En route</p>
                    <p className={twMerge("text-mist-500", Livraison.status === 'livree' && "text-livree")}>Livrée</p>
                  </div>
                </div>
            </div>
        </section>
        <section className="flex flex-col gap-4">
          {<Carte data={Livraison}/>}
          <LivreurDetailMin data={Livraison}/>
          { (location.pathname.includes('delivery') || location.pathname.includes('admin')) &&
            <ClientDetailMin data={Livraison}/>
          }
          <DetailColis 
            designation={Livraison.designation.trim() ?? "Il n'y a pas des informations qui sont avec votre colis"} 
            photos={Livraison.photos}/>
        </section>
      </main>
    </MapProvider>}
  </>
}
