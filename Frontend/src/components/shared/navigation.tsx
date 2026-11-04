import { Bike, Box, ClockFading, LayoutGridCircles, Map, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../provider/CustomizedHooks";
import { useSendPosition } from "../../map/polling";

export function Navigation () {
  const {isProprietaire} = useUser()
  useSendPosition()
  return <>
    <footer className="container-custom w-full">
      <nav className="bg-white-500 w-full h-16 grid grid-cols-4 items-center fixed inset-x-0 md:left-1/2 md:-translate-x-1/2 bottom-0 responsive-nav z-50 bg- text-secondary backdrop-blur-md rounded-t-xl shadow-[0_-10px_25px_rgba(0,0,0,0.15)] md:w-4/7 xl:w-3/7" id="linkNav">
        <NavLink to="/" className={({isActive})=> `center nav hover:scale-110  hover:-translate-y-1 duration-300 ease-in-out ${isActive ? "active-nav" : "inactive-nav"} `}>
          <LayoutGridCircles strokeWidth={3}/>
          Dahboard
        </NavLink>
        <NavLink to="/livraisons" className={({isActive})=> `center nav hover:scale-110 hover:-translate-y-1 duration-200 ease-in-out ${isActive ? "active-nav" : "inactive-nav"}`}>
          <Box strokeWidth={3}/>
          Livraisons
        </NavLink>

        { isProprietaire && 
          <>
            <NavLink to="/livreurs" className={({isActive})=> `center nav hover:scale-110 hover:-translate-y-1 duration-200 ease-in-out ${isActive ? "active-nav" : "inactive-nav"}`}>
              <Bike strokeWidth={3}/>
              Livreurs
            </NavLink>
            <NavLink to="/clients" className={({isActive})=> `center nav hover:scale-110 hover:-translate-y-1 duration-200 ease-in-out ${isActive ? "active-nav" : "inactive-nav"}`}>
              <Users strokeWidth={3}/>
              Clients
            </NavLink>
          </>
        }
        { !isProprietaire && 
          <>
            <NavLink to="/carte" className={({isActive})=> `center nav hover:scale-110 hover:-translate-y-1 duration-200 ease-in-out ${isActive ? "active-nav" : "inactive-nav"}`}>
              <Map strokeWidth={3}/>
              Carte
            </NavLink>
            <NavLink to="/clients" className={({isActive})=> `center nav hover:scale-110 hover:-translate-y-1 duration-200 ease-in-out ${isActive ? "active-nav" : "inactive-nav"}`}>
              <ClockFading strokeWidth={3}/>
              Historique
            </NavLink>
          </>
        }
      </nav>
    </footer>
  </>
}
