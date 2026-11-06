import { Bike, House, Package } from "lucide-react";
import { useUtilities } from "../provider/CustomizedHooks";
import type { ReactNode } from "react";
import { twMerge, type ClassNameValue } from "tailwind-merge";

interface LivraisonIciProps {
  children?: ReactNode
  className?: ClassNameValue
  hidden_ping?: boolean
}
export function LivraisonIci({children, className, hidden_ping=false}: LivraisonIciProps) {
  return (
    <>
      <div className="flex flex-col  justify-center items-center">
        {
          <div className="flex flex-col items-center drop-shadow-lg">
            <div className={"flex flex-col items-center animate-pin-float"}>
              <div className={twMerge(" rounded-xl bg-primary px-3 py-1.5 text-sm font-semibold text-white", className)}>
                {children ?? "Livraison ici"}
              </div>
              <div className={twMerge("h-0 w-0 border-x-8 border-t-8 border-x-transparent border-t-primary" )}/>
            </div>
            <span className={twMerge("mt-1 h-2 w-2 rounded-full bg-primary ring-4 ring-primary/30 animate-ping")} hidden={hidden_ping} />
          </div>
        }
      </div>
    </>
  );
}

export function PinPointer() {
  const { marker } = useUtilities();
  return (
    <>
      <div
        key={marker && `${marker.lat}-${marker.lng}`}
        className="relative flex flex-col items-center animate-pin-drop"
      >
        <div className="flex flex-col items-center pb-2 animate-pin-float motion-reduce:animate-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white bg-primary text-white">
            <House size={20} />
          </div>
          <div className="-mt-1 h-3 w-3 rotate-45 border-b-[3px] border-r-[3px] border-white bg-primary z-10" />
        </div>
        <span className="pointer-events-none absolute bottom-0 left-1/2 h-2 w-6 rounded-full bg-black blur-[2px] animate-shadow-float motion-reduce:animate-none" />
      </div>
    </>
  );
}

export function BoxMarker() {
    return <>
        {<div className="relative flex h-12 w-12 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-primary/25 animate-ping" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-primary text-white shadow-xl">
                    <Package size={22} />
                </div>
        </div>}
    </>
}


export default function PinLivreur({ nom }: { nom?: string }) {
  return (
    <div className="relative flex flex-col items-center">
      {nom && (
        <span className="mb-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-neutral shadow">
          {nom}
        </span>
      )}
      <div className="relative flex h-12 w-12 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-xl">
          <Bike size={22} />
        </div>
      </div>
    </div>
  )
}