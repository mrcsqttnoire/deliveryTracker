import { Bike, Box, LayoutGridCircles, Users } from "lucide-react";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
import { twMerge, type ClassNameValue } from "tailwind-merge";

export function Navigation () {

  return <>
      <nav className="bg-white-500 container-custom w-full h-16 grid grid-cols-4 items-center fixed inset-x-0 bottom-0 responsive-nav z-50 bg- text-secondary backdrop-blur-md rounded-t-xl shadow-[0_-10px_25px_rgba(0,0,0,0.15)] " id="linkNav">
        <NavLink to="/" className={({isActive})=> `center nav ${isActive ? "active-nav" : "inactive-nav"}`}>
          <LayoutGridCircles strokeWidth={3}/>
          Dahboard
        </NavLink>
        <NavLink to="/livraisons" className={({isActive})=> `center nav ${isActive ? "active-nav" : "inactive-nav"}`}>
          <Box strokeWidth={3}/>
          Livraisons
        </NavLink>
        <NavLink to="/livreurs" className={({isActive})=> `center nav ${isActive ? "active-nav" : "inactive-nav"}`}>
          <Bike strokeWidth={3}/>
          Livreurs
        </NavLink>
        <NavLink to="/clients" className={({isActive})=> `center nav ${isActive ? "active-nav" : "inactive-nav"}`}>
          <Users strokeWidth={3}/>
          Clients
        </NavLink>
      </nav>
  </>
}
