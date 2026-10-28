import { Outlet } from "react-router-dom";
import { Header } from "../components/shared/header";
import { Navigation } from "../components/shared/navigation";

export default function AppLayout () {
  return <>
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header/>
      <main className="scrollbar-custom min-h-0 flex-1 scroll-smooth overflow-y-auto overscroll-y-contain pb-20">
        <Outlet />  
        {/* <div className="h-16"></div> */}
      </main>
    </div>
    <Navigation/>
  </>
}
