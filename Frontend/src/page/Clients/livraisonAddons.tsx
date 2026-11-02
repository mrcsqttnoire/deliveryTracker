import { BadgeInfoIcon, Check, ChevronLeft, ChevronRight, CircleCheckBig, FaceSlightlySmiling, IdCard, MapPinned, Phone, Search, Signpost, TruckElectric, X } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Button } from "../../components/shared/button";
import { twMerge } from "tailwind-merge";
import { useDetail, useLoading, useUtilities } from "../../provider/CustomizedHooks";
import { getDetailsPos, suggere, type Suggestion } from "../../map/nominatim";
import { useMap } from "@vis.gl/react-maplibre";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/shared/alert";

const Carte = lazy(()=>import("../../map/map"))

interface AddDetailProps {
    id: string
}

export default function AddDetailLivraison ({id}: AddDetailProps) {
    const navigate = useNavigate()
    const {marker, message, setMessage} = useUtilities()
    const [step, setStep] = useState<number>(1)
    const {
        repere, setRepere,
        nom_client, setNomClient, 
        prenom_client, setPrenomClient,
        telephone_client, setTelephoneClient,
        setLieu,
        AddDetail,
    } = useDetail()
    const {isLoading, setIsLoading} = useLoading()
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const {map_form} = useMap()

    useEffect(() => {
        if (query.trim().length < 3) { 
            setSuggestions([]);
            return
        }
        const t = setTimeout(async () => {
            setSuggestions(await suggere(query))
        }, 400)
        // console.log(suggestions)
        return () => clearTimeout(t) 
    }, [query])

    const switchStep = async () => {
        setIsLoading(true)
        if (!marker || marker.lat === undefined || marker.lng === undefined) {
            setMessage("Veuillez sélectionner un point sur la carte");
            setIsLoading(false);
            return;
        }
        try{
            const lieu = await getDetailsPos(marker.lat, marker.lng)
            setLieu(lieu)
            setStep(2)
        } catch (err) {
            console.log(err)
            setMessage("Impossible de récupérer la position, vérifiez votre connexion")
        } finally {
            setIsLoading(false)
        }
    }

    function choisir(s: Suggestion) {
        setQuery(s.nom)
        setSuggestions([])
        map_form?.flyTo({ center: [s.lng, s.lat], zoom: 16 })
    }

    return <>
        <form 
            onSubmit={(e)=>AddDetail(e, navigate, id)}
            className="bg-white/50 absolute h-screen top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center
             gap-4 container-custom py-8 backdrop-blur-sm z-50 md:w-4/5 rounded-xl"
        >
            <div className=" relative center flex-col gap-4 ">
                <div className={twMerge("center top-4 md:max-w-5/7 lg:max-w-3/7 z-50 bg-input p-4 rounded-xl", step === 1 && 'absolute w-11/12')}>              
                    <div className={("flex gap-4 justify-between")}>
                        <div>
                            <h4 className="font-heading font-semibold text-neutral text-xl md:text-2xl">
                                {step === 1 && "Pointez la déstination"}
                                {step === 2 && "Information supplémentaire"}
                            </h4>
                            <p className="font-body font-medium text-secondary text-sm md:text-lg break-normal">
                                {step === 1 && "Pointez le lieu ou on livrera votre colis"}
                                {step === 2 && "Veuillez compléter les champs suivants s'il vous plait"}
                            </p>
                        </div>
                        <div className={twMerge("flex justify-center items-center w-14 h-14 bg-en_route-bg rounded-full z-20",
                            step === 1 && "bg-primary/10"
                        )} >
                            {step === 1 && <MapPinned className="text-primary" size={24}/>}   
                            {step === 2 && <TruckElectric className="text-en_route" size={24}/>}   
                        </div>
                    </div>
                </div>
                {/* <div className="px-2"> */}
                    {message &&
                        <Alert 
                            className={twMerge("absolute md:max-w-5/7 lg:max-w-3/7 z-50 top-22 w-auto  flex items-center gap-2 justify-self-center  backdrop-blur-xl  animate-scaling ", message.includes("Merci") && "bg-livree-bg/50 text-livree ")}>
                            {message.includes("succès") && <CircleCheckBig className="shrink-0"/>}
                            {!message.includes("succès") && <BadgeInfoIcon className="shrink-0"/>}
                            {message}
                        </Alert>
                    }
                {/* </div> */}
                { step === 1 &&
                <div className="w-full h-100 h-[90vh] md:h-[90vh] relative overflow-hidden">

                    <div 
                        className="bg-linear-to-b from-transparent to-gradient-cart
                        w-full h-full absolute top-0 left-0 bg-red-30 rounded-xl z-10 
                        pointer-events-none" 
                    >
                    </div>
                    <div className="w-full h-full rounded-2xl object-cover">
                        <Suspense fallback={<Skeleton className="w-full h-full"/>}>
                            <Carte id="map_form"/>
                        </Suspense>
                    </div>

                    <div className="absolute w-full h-auto bottom-0 md:w-6/12 left-1/2 -translate-x-1/2 flex items-center justify-between z-50">
                        <div className=" z-20 w-full p-4">                    
                            <div className="relative h-12 shadow-xl text-neutral">
                                <Search className="absolute top-1/2 -translate-y-1/2 left-4 z-10"/>
                                <input 
                                    onChange={(e)=>setQuery(e.target.value)}
                                    type="text" 
                                    name="recherche" 
                                    className="absolute top-0 left-0 pl-[calc(32px+24px)] w-full h-12
                                    bg-white/90 focus backdrop-blur-xl font-body font-medium rounded-xl inset-shadow-sm "                           value={query}
                                    placeholder="Rechercher un quartier"/>
                                    {suggestions.length > 0 && (
                                        <ul className="absolute bottom-12 mb-2 font-heading  w-full bg-white/50 text-neutral rounded-xl shadow z-[999] backdrop-blur-md">              
                                        <div className="flex justify-between items-center px-4 bg-input py-2 rounded-tl-xl rounded-tr-xl text-secondary">
                                            <h5 className="">Suggéstions</h5>
                                            <div className="w-auto hover:bg-neutral/10 p-1 rounded-full duration-75">
                                                <X 
                                                    onClick={()=>setSuggestions([])}
                                                    className="justify-self-end  rounded-full shrink-0 "
                                                />
                                            </div>
                                        </div>                      
                                        {suggestions.map((s, i) => (
                                            <li key={i} onClick={() => choisir(s)} className="px-4 py-2 cursor-pointer hover:bg-white/50">
                                                {s.nom}
                                            </li>
                                            ))}
                                        </ul>
                                    )}
                            </div>
                        </div>
                        <div className=" w-auto pr-4 z-50  justify-self-end">
                            <Button
                                type="button"
                                disable = {!Boolean(marker)}
                                fn={switchStep} 
                                className="center bg-white w-12 text-primary backdrop-blur-x hover:bg-white/90 duration-75 disabled:bg-white/50"> 
                                {!isLoading && <ChevronRight className="shrink-0"/>}
                            </Button>
                        </div>
                    </div>
                </div>}

                { step === 2 && <>
                    <div className="bg-white px-8 py-4 flex flex-col md:grid-cols-2 gap-4 w-full md:max-w-5/7 lg:max-w-3/7 rounded-xl shadow-2xl">
                        <div className="flex flex-col gap-1.5 w-full text-neutral">
                            <label htmlFor="nom" className="font-body font-semibold text-md">Nom</label>
                            <div className="relative w-full h-12">
                                <IdCard  className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                                <input 
                                    type="text" 
                                    id="nom" 
                                    value={nom_client} 
                                    className="w-full font-body bg-white shadow-sm/10 
                                    h-full pl-[calc(32px+24px)] rounded-xl focus" 
                                    name="nom" 
                                    placeholder="Entrez votre nom ici" 
                                    required 
                                    onChange={(e)=>setNomClient(e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5 w-full text-neutral">
                            <label htmlFor="prenom" className="font-body font-semibold text-md">Prenom</label>
                            <div className="relative w-full h-12">
                                <FaceSlightlySmiling  className={twMerge("absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary")}/>
                                <input type="text" id="prenom" value={prenom_client} className={twMerge("w-full font-body bg-white shadow-sm/10 h-full pl-[calc(32px+24px)] rounded-xl focus")} name="prenom" placeholder="Entrez votre prénom ici" required onChange={(e)=>setPrenomClient(e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5 w-full text-neutral">
                            <label htmlFor="telephone" className="font-body font-semibold text-md">Téléphone</label>
                            <div className="relative w-full h-12">
                                <Phone  className={twMerge("absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary")}/>
                                <input 
                                    type="text" 
                                    id="telephone" 
                                    value={telephone_client} 
                                    className={twMerge("w-full font-body bg-white shadow-sm/10 h-full pl-[calc(32px+24px)] rounded-xl focus")} 
                                    name="telephone" 
                                    placeholder="Entrez votre prénom ici" 
                                    required 
                                    onChange={(e)=>setTelephoneClient(e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5 w-full text-neutral">
                            <label htmlFor="repere" className="font-body font-semibold text-md">Repère</label>
                            <div className="relative w-full h-12">
                                <Signpost  className="absolute top-1/2 -translate-y-1/2 left-4 Text-Black text-secondary"/>
                                <input 
                                    type="text"
                                    id="username" 
                                    value={repere} 
                                    className="w-full font-body bg-white shadow-sm/10 h-full
                                     pl-[calc(32px+24px)] rounded-xl focus" 
                                    name="repere" 
                                    placeholder="Donne nous un repère de position" 
                                    required 
                                    onChange={(e)=>setRepere(e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex w-full mt-2 gap-2">
                            <Button
                                type="button"
                                fn={() => setStep(1)} 
                                className="bg-input w-12 text-primary backdrop-blur-xl
                                 hover:bg-input/70 duration-75 disabled:bg-input/50"> 
                                <ChevronLeft className="shrink-0"/>
                            </Button>
                            <Button> 
                                Valider
                                <Check/>
                            </Button>
                        </div>
                    </div>
                </>
                }
            </div>
        </form>
    </>
}
