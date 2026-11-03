import { Bike, HeartHandshake } from "lucide-react"

export interface IAppProps {}

export function HeadDashboardDelivery() {
    return <>
        <div className=" bg-white p-4 rounded-xl ">
            <div className="flex flex-col gap-2">
            <div className="flex gap-2 text-secondary">
                <Bike />
                <p className="font-body font-medium uppercase">Espace livreur</p>
            </div>
            <h4 className="font-heading font-semibold text-neutral text-4xl ">
                Statistiques de vos activités
            </h4>
            <div className="flex gap-2 text-secondary -mt-1">
                <HeartHandshake className="text-primary/70" />
                <p className="font-body">Bienvenue et bonne course</p>
            </div>
            </div>
        </div>
    </>
}
