import { Outlet } from "react-router-dom";
import { Header } from "../components/shared/header";
import { Navigation } from "../components/shared/navigation";

export function AppLayout () {
  return <>
    <body className="h-screen">      
      <Header title="Livraison"/>
      <main className="center flex-col gap-4">
        <Navigation/>
        <Outlet />  
      </main>
    </body>
  </>
}
