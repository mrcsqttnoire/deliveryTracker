import { Button } from "../shared/button"

interface LivreurProps{
    photo: string
    nom: string
    prenom: string
    tel: string
}
export function LivreurDetailMin ({photo, prenom, tel}: LivreurProps) {
  return <>
    <div className="container-custom">
        <div className="p-4 flex justify-between items-center rounded-xl shadow-xl" >
            <div className="flex items-center gap-2">
                <img src={photo} alt="photo livreur" className="w-14 h-14 object-cover " />
                <div>
                    <h4 className="font-heading font-semibold text-neutral text-xl ">{prenom}</h4>
                    <p className="font-body font-normal text-secondary text-md md:text-lg" > {tel} </p>
                </div>
            </div>
            <div>   
                <Button>Appeler</Button>
            </div>
        </div>
    </div>
        
  </>
}
