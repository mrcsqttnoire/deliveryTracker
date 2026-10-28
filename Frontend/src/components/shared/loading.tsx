import { Suspense,  type ReactNode } from "react"
import logo  from "../../assets/img/logo.png"

interface SuspenseProps {
  children: ReactNode
  fallback?: ReactNode
}

export function SuspenseLayout ({ children, fallback }: SuspenseProps) {
    return <>
        <Suspense fallback= {fallback ?? <Loading/>}>
          {children}
        </Suspense>
    </>
}

export function Loading (){
  return <>
    <div className="center min-h-full">
      <div className="center flex-col">
        <img src={logo} alt="delivery tracker" className="w-12 animate-bounce"/>
        <div className="flex gap-1 font-heading animate-pulse md:text-xl">
            <p>Bienvenue sur</p>
            <p className="font-bold">Delivery</p>
            <p className="text-primary">Tracker</p>
        </div>  
      </div>
    </div>
  </>
}


