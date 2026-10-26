import { LogIn, Store } from "lucide-react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";


export function SwitchMode () {
  return (
    <div className="flex p-2 gap-2 w-full bg-input h-18 rounded-xl text-sm shadow-xl">
      <NavLink to="login" className={({isActive}) => twMerge('center btn-primary', isActive ? 'active' : 'inActive')} >
        <LogIn />
        Connexion
      </NavLink>
      <NavLink to="signin" className={({isActive}) => twMerge('center btn-primary', isActive ? 'active' : 'inActive')}>
        <Store/>
        Créer boutique
      </NavLink>
    </div>
  );
}
