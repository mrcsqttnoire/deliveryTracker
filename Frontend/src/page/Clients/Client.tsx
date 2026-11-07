import { CircleCheckBig, Search } from "lucide-react";
import { CardClient } from "../../components/client/cardClient";
import { useEffect } from "react";
import { useClient, useLoading, useUtilities } from "../../provider/CustomizedHooks";
import { ClientSkeleton } from "../../skeleton/client/ClientSkeleton";
import { Info } from "../../components/shared/info";
import { Alert } from "../../components/shared/alert";
import { useSearchParams } from "react-router-dom";
export default function Clients () {
    const [searchParams, setSearchParams] = useSearchParams()
    const {clients, getAllClients, searchClient} = useClient()
    const {isLoading} = useLoading()
    const {message} = useUtilities()
    // useEffect(()=>{
    //   getAllClients()
    // }, [])

    useEffect(()=>{
      const search = searchParams.get('search')
      if (search?.trim()){
        const t = setTimeout(()=>{
          searchClient(search)
        }, 200)
        return () => clearTimeout(t)
      } else {
        getAllClients()
      }
    }, [searchParams])
    return <>
    { !isLoading &&        
      <section className="container-custom py-4 bg-principale min-h-full">
          <div className="flex flex-col gap-4 ">
              <div className="w-auto sticky top-4 z-50">
                { message &&
                    <Alert 
                        className="bg-livree-bg/50 w-auto text-livree flex items-center gap-2 justify-self-center  backdrop-blur-xl  animate-scaling ">
                        <CircleCheckBig className="shrink-0"/>
                        {message}
                    </Alert>
                }
              </div>
              <div className="relative h-12 ">
                  <Search className="absolute top-1/2 -translate-y-1/2 left-4 z-10"/>
                  <input 
                    onChange={(e)=>setSearchParams(e.target.value && `search=${e.target.value}`)}
                    type="text" 
                    name="livraison-search" 
                    value={searchParams.get('search') ?? ''}
                    className="absolute top-0 left-0 pl-14 h-12 bg-[#F0F3FF] w-full font-body font-medium rounded-xl inset-shadow-sm " 
                    placeholder="Recherche par nom, prenom ou téléphone"/>
              </div>
              <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 gap-4">
                { clients && clients.map((c)=>(
                  <CardClient key={c.id} data={c}/>
                ))
                }
              </div>
              {clients !== null && clients.length === 0 && (
                  <Info>Vous n'avez pas encore des clients</Info>
              )}
          </div>
      </section>}
      { isLoading &&
        <ClientSkeleton/>
      }
    </>
}
