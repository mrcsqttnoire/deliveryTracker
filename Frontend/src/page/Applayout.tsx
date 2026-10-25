import { Outlet } from "react-router-dom";
import { Header } from "../components/shared/header";
import { Navigation } from "../components/shared/navigation";

export function AppLayout () {
  return <>
    <div className="h-screen ">      
      <Header title="Livraison"/>
      <main className="center flex-col gap-4">
        <Outlet />  
        <div className="h-16"></div>
      </main>
      <Navigation/>
    </div>
  </>
}
