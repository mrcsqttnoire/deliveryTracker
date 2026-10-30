import { UserPlus } from "lucide-react";
import { HeadPage } from "../../components/shared/headPage";
import { CardLivreur } from "../../components/livreur/cardLivreur";
import { useLivreur, type Livreur } from "../../provider/CustomizedHooks";
import { Info } from "../../components/shared/info";
import { useEffect } from "react";



export default function Livreur () {
  // const [livreurLibre, setLivreurLibre] = useState<Livreur[] | null>(null)
  // const [livreurOcc, setLivreurOcc] = useState<Livreur[] | null>(null)
  const {
    livreursList,
    getLivreurs
  } = useLivreur()

  useEffect(()=>{
    getLivreurs()
    
  }, [])
  
  const livreurLibre = livreursList?.filter((lv) => lv.status === "libre") ?? []
  const livreurOcc = livreursList?.filter((lv) => lv.status === "occupe") ?? []

  return <>
    <section className="container-custom py-6 bg-bg-principale min-h-full">
      <div className="flex flex-col gap-4 ">
        <div>
          <HeadPage
              title="Vos Livreurs"
              desc="Delivery Tracker"
              btn_title="Nouveau Livreur"
          ><UserPlus/> 
          </HeadPage>
        </div>
        <div className="bg-input h-20 p-2 grid grid-cols-3 gap-1 rounded-xl">
          <div className="bg-white text-neutral place-content-center text-center rounded-xl">
            <p className="font-heading font-semibold text-xl">{livreursList?.length ?? 0}</p>
            <h5 className="font-body font-bold text-sm text-secondary">INSCRITS</h5>
          </div>
          <div className="bg-livree-bg font-he text-livree place-content-center text-center rounded-xl ">
            <p className="font-heading font-semibold text-xl">{livreurLibre?.length ?? 0}</p>
            <h5 className="font-body font-bold text-sm">LIBRES</h5>
          </div>
          <div className="bg-en_route-bg text-en_route place-content-center text-center rounded-xl">
            <p className="font-heading font-semibold text-xl">{livreurOcc?.length ?? 0}</p>
            <h5 className="font-body font-bold text-sm">EN COURSE</h5>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-body font-semibold text-[16px}">Liste des livreurs</h3>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {livreursList && livreursList?.map((livreur) => (
              <CardLivreur key={livreur.id} data={livreur} />
            ))}
          </div>
            {livreursList !== null && livreursList.length === 0 && (
              <Info>Vous n'avez pas encore embauché de livreur</Info>
            )}
        </div>
      </div>
    </section>
  </>
}
