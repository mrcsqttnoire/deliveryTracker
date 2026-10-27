import { Outlet } from "react-router-dom";
import { SwitchMode } from "../components/Auth/switchMode";
import { Truck } from "lucide-react";
import bg_livraison  from "../assets/img/livraison_img.jpg"
import { useEffect } from "react";
import { useUser } from "../provider/CustomizedHooks";

export default function AuthLayout () {

  const {resetUserForm} = useUser()

  useEffect(() => {
      resetUserForm()
  }, [])

  return <>
    <main className="flex flex-col items-center justify-center h-screen">
        <div className="container-custom center ">
          <div className="w-full flex flex-col gap-8  md:max-w-5/7 lg:max-w-3/7">
              <div className="relative w-full h-50 rounded-xl ">
                <div className="flex gap-4 absolute bottom-4 left-4">
                  <div className="flex justify-center items-center w-14 h-14 bg-primary rounded-xl z-20" >
                      <Truck className="text-white shadow-xl"/>
                  </div>
                  <div className="flex flex-col z-20">
                    <h4 className="font-heading font-semibold text-xl text-white">Delivery Tracker</h4>
                    <p className="font-body font-medium text-[#EBF1FF]">Gestion et éxpédition des colis</p>
                  </div>
                </div>
                <div className="">
                  <div className="bg-linear-to-b from-transparent to-gradient-cart-800 w-full h-full absolute top-0 left-0 bg-red-30 rounded-xl z-10 shadow-xl"></div>
                  <img src={bg_livraison} alt="bg-livraison" className="absolute top-0 w-full h-50 object-cover rounded-xl "/>
                </div>
              </div>
              <SwitchMode/>
              <Outlet />
          </div>
        </div>
    </main>
  </>
}
