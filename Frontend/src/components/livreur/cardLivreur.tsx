import { CircleCheckBig, Navigation, Phone, PhoneCall, Trash, UserKey, UserPen } from "lucide-react"
import { BadgeLivraison } from "../Livraison/badge"
import { Button } from "../shared/button"
import { useLivreur, useUtilities, type Livreur } from "../../provider/CustomizedHooks"
import { useNavigate } from "react-router-dom"

// type Livreur = {
//     id: string
//     nom: string
//     prenom: string
//     telephone: string
//     username: string
//     optimized_photo: string
//     photo: string
// }   
// type Status = {
//     status: "libre" | "occupe"
// }

interface CardLivreurProps {
    data: Livreur
}

export function CardLivreur ({data}: CardLivreurProps) {
    const navigate = useNavigate()
    const initials = `${data.nom.charAt(0)}${data.prenom.charAt(0)}`
    const {setShowDialog} = useUtilities()
    const {setLivreurAssigne} = useLivreur()

    const type = {
        libre: "livree",
        occupe: "en_route",
    }[data.status]

    const status = {
        libre: "Libre",
        occupe: "Occupé",
    }[data.status]
    
    const Assigner = () => {
        setLivreurAssigne(data)
        navigate('/livraisons/create')
    }

  return <>
    <div className="flex w-full flex-col gap-3 bg-white h-auto rounded-xl shadow-xl p-4 hover:-translate-y-0.5 duration-300">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="center w-12 h-12 rounded-full">
                    {data.optimized_photo ? (
                        <img src={data.optimized_photo} alt="profile" className="w-12 h-12 rounded-full object-cover"/>
                    ):
                        <p>{initials}</p>
                    }
                </div>
                <div>
                    <h3 className="font-heading font-semibold text-xl text-neutral">{data.nom} {data.prenom}</h3>
                    <div className="flex gap-2 items-center font-body font-medium text-secondary">
                        <UserKey size={18}/>
                        <p>{data.username}</p>
                    </div>
                </div>
            </div>
            <BadgeLivraison
                title={status}
                type={type ? type : "livree"}
            />
        </div>
        <div className="bg-input flex justify-between items-center px-4 py-2 rounded-xl">
            <div className="flex text-secondary items-center gap-2">
                <CircleCheckBig/>
                <div >
                    <h5 className="font-body font-bold text-sm">Course terminées</h5>
                    <p className="font-body font-bold text-neutral">5 livraison(s)</p>
                </div>
            </div>
            <div className="flex  text-secondary items-center gap-2">
                <Phone/>
                <div>
                    <h5 className="font-body font-bold text-sm">Téléphone</h5>
                    <p className="font-body font-bold text-neutral"> {data.telephone}</p>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-4 md:flex md:justify-around gap-1.5 justify-between w-full min-w-0">
            <a href={`tel:${data.telephone}`} >
                {/* <Button className="w-auto h-full bg-gradient-right text-primary hover:bg-gradient-right hover:opacity-85"> 
                    <PhoneCall size={18} />
                </Button> */}
                <Button 
                    className="md:w-10 flex-1 text-livree bg-gradient-right hover:bg-livree-bg hover:text-livree duration-100 ease-in"
                    noLoading={true}
                >
                    <PhoneCall className="shrink-0"/>
                </Button>
            </a>
            {/* <Button className="bg-gradient-right text-neutral hover:bg-gradient-right hover:opacity-85 duration-50">
                <Navigation className="text-primary"/>
                Assigner 
            </Button> */}
            <Button 
                fn={Assigner}
                className="w-auto flex-1  text-secondary bg-gradient-right hover:bg-en_attent-bg hover:text-en_attente duration-100 ease-in"
                noLoading={true}
            >
                <Navigation className="text-en_attente duration-75 shrink-0"/>
                <p className="hidden md:inline">Assigner</p>
            </Button>              
            <Button 
                fn={() => navigate('edit/'.concat(data.id))}
                className="md:w-10 flex-1  lg:flex-0 text-secondary bg-gradient-right hover:bg-en_route-bg hover:text-en_route duration-100 ease-in"
                noLoading={true}
            >
                <UserPen className="shrink-0"/>
            </Button>
            <Button 
                fn={() => setShowDialog({
                    isShow: true,
                    type: 'livreur',
                    data: data
                })}
                className="md:w-10 md:flex-0 flex-1 text-secondary bg-gradient-right hover:bg-primary/10 hover:text-primary duration-100 ease-in"
                noLoading={true}
            >
                <Trash className="shrink-0"/>
            </Button>
        </div>
    </div>
  </>
}
