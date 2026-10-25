import { Bike, Box, LayoutGridCircles, Users } from "lucide-react";

export function Navigation () {
  return <>
      <nav className="container-custom w-full h-16 grid grid-cols-4 items-center fixed inset-x-0 bottom-0 responsive-nav z-50 bg- text-secondary backdrop-blur-md rounded-t-xl shadow-[0_-10px_25px_rgba(0,0,0,0.15)] ">
        <a href="/" className="center nav">
          <LayoutGridCircles strokeWidth={3}/>
          Dahboard
        </a>
        <a href="/livraisons/" className="center nav">
          <Box strokeWidth={3}/>
          Livraisons
        </a>
        <a href="/livreurs" className="center nav">
          <Bike strokeWidth={3}/>
          Livreurs
        </a>
        <a href="/clients/" className="center nav">
          <Users strokeWidth={3}/>
          Clients
        </a>
      </nav>
  </>
}
