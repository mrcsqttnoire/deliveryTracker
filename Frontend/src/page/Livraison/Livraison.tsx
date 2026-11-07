import { AlertCircle, CircleCheckBig, CirclePlus, Search } from "lucide-react";
import { CardLivraison } from "../../components/Livraison/cardLivraison";
import { HeadPage } from "../../components/shared/headPage";
import { Filter } from "../../components/shared/filter";
import { useLivraison, useUser, useUtilities } from "../../provider/CustomizedHooks";
import { useEffect } from "react";
import { Info } from "../../components/shared/info";
import { Alert } from "../../components/shared/alert";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function Livraison () {
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()
    const {livraisons, getLivraisons, searchLivraison, filterLivraison} = useLivraison()
    const {isCopied, message} = useUtilities()
    const {isProprietaire} = useUser()

    useEffect(()=>{
        const search = searchParams.get('search')
        const status = searchParams.get('status')
        if (search?.trim()){
            const t = setTimeout(()=>{
                searchLivraison(search)
            }, 200)
            console.log(search)
            return () => clearTimeout(t)
        } else if (status?.trim()){
            filterLivraison(status, navigate)
        } else {
            getLivraisons()
        }   
    }, [searchParams, location])
    const historique = Boolean(location.pathname.includes("historiques"))
    return <>
        <section className="container-custom py-4 bg-bg-principale">
            <div className="relative flex flex-col gap-3 sm:gap-4">
                <HeadPage 
                    title="Mission du jour"
                    desc="Delivery Tracker"
                    btn_title="Nouvelle livraison"
                ><CirclePlus/> 
                </HeadPage>
                <div className="w-auto sticky top-4 z-50">
                    {isCopied &&
                        <Alert 
                            className="bg-livree-bg/50 w-auto text-livree flex items-center gap-2 justify-self-center  backdrop-blur-xl  animate-scaling ">
                            <CircleCheckBig className="shrink-0"/>
                            Lien copié dans le presse papier
                        </Alert>
                    }
                    {message &&
                        <Alert 
                            className={twMerge(" w-auto flex items-center gap-2 justify-self-center  backdrop-blur-xl  animate-scaling ", message.includes("succès") && "bg-livree-bg/50 text-livree")}>
                            {message.includes("succès") && <CircleCheckBig className="shrink-0"/>}
                            {!message.includes("succès") && <AlertCircle className="shrink-0"/>}
                            {message}
                        </Alert>
                    }
                </div>
                <div className="relative h-12 ">
                    <Search className="absolute top-1/2 -translate-y-1/2 left-4 z-10"/>
                    <input 
                        onChange={(e)=>setSearchParams( e.target.value && `search=${e.target.value}`)}
                        type="text" 
                        value={searchParams.get('search') ?? ''}
                        name="livraison-search" 
                        className="absolute top-0 left-0 pl-14 h-12 bg-[#F0F3FF] w-full font-body font-medium rounded-xl inset-shadow-sm " 
                        placeholder="Rechercher par client, livreur, status, destination ou repère"/>
                </div>
                {isProprietaire && <Filter />}
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <CardLivraison data={livraisons}></CardLivraison>
                </div> */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-body font-semibold text-[16px}">
                        {isProprietaire ? "Liste des livraison" : "Liste des livraisons à faire"}
                    </h3>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {!historique && livraisons && livraisons?.filter((l)=>l.status !== "livree").map((livraison) => (
                        <CardLivraison key={livraison.id} data={livraison}/>
                    ))}
                    {(isProprietaire || historique) && livraisons && livraisons?.filter((l)=>l.status === "livree").map((livraison) => (
                        <CardLivraison key={livraison.id} data={livraison}/>
                    ))}
                    </div>
                    {livraisons !== null && livraisons.length === 0 && (
                        <Info>Vous n'avez pas encore des courses</Info>
                    )}
                </div>

            </div>
        </section>
    </>
}
