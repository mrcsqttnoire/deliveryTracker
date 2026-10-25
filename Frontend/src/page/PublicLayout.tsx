import photoLivreur from "../assets/img/livreur.png"
import truck from "../assets/icons/truck.svg"
import  {Carte}  from "../components/Livraison/carte"
import { LivreurDetailMin } from "../components/livreur/livreur.min"
import { DetailColis } from "../components/Livraison/detailColis"
import { LivraisonProvider } from "../provider/LivraisonProvider"

export function PublicLayout () {

  const photos = [
      {path: "/src/assets/img/test/billie-3.png"},
      {path: "/src/assets/img/test/billie-2.jpg"},
      {path: "/src/assets/img/test/billie-1.jpg"},
    ]


  return <>
   <LivraisonProvider>
    <main className="flex flex-col gap-4">
      <section className="container-custom py-4 flex flex-col justify-center gap-4 shadow-md rounded-b-xl ">
          <div className="flex items-center gap-2">
            <img src={truck} alt="livraison-icon" className="bg-primary-300 p-3 rounded-full" />
            <h3 className="font-heading text-2xl font-bold capitalize text-neutral font">Votre livraison</h3>
          </div>
          <div className="p-4 bg-linear-to-tr from-gradient-left to-gradient-right h-27 flex flex-col justify-center gap-4 rounded-xl">
                <h5 className="font-body font-bold text-tertiary text-lg">En route vers vous </h5>
              <div className="flex flex-col gap-2">
                <div className="w-full h-[6px] bg-[#E2E8F8] rounded-xl">
                  <div className="w-1/2 h-full bg-tertiary rounded-xl"></div>
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
        <Carte />
        <LivreurDetailMin photo={photoLivreur} nom="RANDRIANANTENAINA" prenom="Jean Nirina" tel="0333169049" />
        <DetailColis designation="Exmple de designation livraison" photos={photos}/>
      </section>
    </main>
   </LivraisonProvider>
  </>
}
