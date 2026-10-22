import truck from "../assets/icons/truck.svg"
import  {DetailLivraison}  from "./carte"

export function PublicLayout () {
  return <>
   <main className="flex flex-col gap-1">
    <section className="container-custom flex flex-col justify-center gap-4 shadow-md rounded-b-xl ">
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
    <section>
      <DetailLivraison />
    </section>
   </main>
  </>
}
