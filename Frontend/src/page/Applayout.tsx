import { Outlet } from "react-router-dom";
import { Header } from "../components/shared/header";
import { Navigation } from "../components/shared/navigation";
import { Options } from "../components/shared/option";
import { useUtilities } from "../provider/CustomizedHooks";
import { twMerge } from "tailwind-merge";

export default function AppLayout () {
  const {isOpen} = useUtilities()

  return <>
      <div className="flex h-dvh flex-col overflow-hidden">
        <Header/>
        <div className="relative container-custom z-50">
          <Options className={twMerge("absolute right-4 z-50", isOpen && "is-open")}/>
        </div>
        <main className="scrollbar-custom min-h-0 flex-1 scroll-smooth overflow-y-auto overscroll-y-contain pb-20">
          <Outlet />  
          {/* <div className="h-16"></div> */}
        </main>
      </div>
      <Navigation/>
  </>
}
