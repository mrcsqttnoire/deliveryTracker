import { Bike, CheckCheck, CircleDot, Dot, HeartHandshake, Hourglass, Store, UserGroup } from "lucide-react";
import { CardLivraison } from "../components/Livraison/cardLivraison";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
// import { Button } from "../components/shared/button";

export function Dashboard () {
    return <>
        <section className="container-custom py-4 bg-principale min-h-full">
            <div className="flex flex-col gap-10 ">
                <div>
                    <div className=" bg-white p-4 rounded-xl ">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 text-secondary">
                                <Store />
                                <p className="font-body font-medium uppercase">Boutique active</p>
                            </div>
                            <h4 className="font-heading font-semibold text-neutral text-4xl ">Statistiques de vos activités</h4>
                            <div className="flex gap-2 text-secondary -mt-1">
                                <HeartHandshake className="text-primary/70"/>
                                <p className="font-body">Bienvenue dans votre boutique</p>
                            </div>
                        </div>
                    </div>
                    {/* <Button className="flex text-sm md:text-lg md:w-1/2 md:justify-self-end">
                        Nouvelle livraison
                    </Button> */}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-4">
                    <div className="bg-white p-4 rounded-xl shadow-xl hover:-translate-y-0.5 duration-300">
                        <div className="flex justify-between items-center">
                            <h5 className="font-body font-bold text-secondary">En attente</h5>
                            <div className="w-10 h-10 bg-en_attent-bg place-content-center rounded-full">
                                <Hourglass size={20} className="text-en_attente shrink-0 justify-self-center"/>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 my-2">
                            <h4 className="font-heading font-semibold text-5xl text-neutral">4</h4>
                            <p className="font-body font-medium text-secondary text-lg">colis</p>
                        </div>
                        <div className="flex items-center gap-3 text-en_attente">
                            <CircleDot size={16} className=""/>
                            <p className=" font-body font-bold">A expédier</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-xl  hover:-translate-y-0.5 duration-300">
                        <div className="flex justify-between items-center">
                            <h5 className="font-body font-bold text-secondary">En route</h5>
                            <div className="w-10 h-10 bg-en_route-bg place-content-center rounded-full">
                                <Bike size={20} className="text-en_route shrink-0 justify-self-center"/>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 my-2">
                            <h4 className="font-heading font-semibold text-5xl text-neutral">6</h4>
                            <p className="font-body font-medium text-secondary text-lg">livreurs</p>
                        </div>
                        <div className="flex items-center gap-3 text-en_route">
                            <CircleDot size={16} className=""/>
                            <p className=" font-body font-bold">Géolocalisé</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-xl  hover:-translate-y-0.5 duration-300">
                        <div className="flex justify-between items-center">
                            <h5 className="font-body font-bold text-secondary">Livrées</h5>
                            <div className="w-10 h-10 bg-livree-bg place-content-center rounded-full">
                                <CheckCheck size={20} className="text-livree shrink-0 justify-self-center"/>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 my-2">
                            <h4 className="font-heading font-semibold text-5xl text-neutral">18</h4>
                            <p className="font-body font-medium text-secondary text-lg">réussies</p>
                        </div>
                        <div className="flex items-center gap-3 text-livree">
                            <CircleDot size={16} className=""/>
                            <p className=" font-body font-bold">Succès 100%</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-xl  hover:-translate-y-0.5 duration-300">
                        <div className="flex justify-between items-center">
                            <h5 className="font-body font-bold text-secondary">Livreurs</h5>
                            <div className="w-10 h-10 bg-primary/15 place-content-center rounded-full">
                                <UserGroup size={20} className="text-primary shrink-0 justify-self-center"/>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 my-2">
                            <h4 className="font-heading font-semibold text-5xl text-neutral">3</h4>
                            <p className="font-body font-medium text-secondary text-lg">disponibles</p>
                        </div>
                        <div className="flex items-center gap-3 text-primary">
                            <CircleDot size={16} className=""/>
                            <p className=" font-body font-bold">Libre (comme l'air)</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6" >
                    <div className="flex justify-between">
                        <h4 className="font-heading font-bold text-2xl text-neutral">Course recente</h4>
                        <a href="/livraison" className="text-primary font-body font-semibold">Tout voir</a>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <NavLink to={"/"} className={(active)=>(twMerge("bg-white py-4 px-8 text-center font-body font-semibold shadow-sm/15 rounded-4xl", active ? "bg-neutral text-white" : ""))}>
                            Toutes
                        </NavLink >
                        <NavLink to={""} className={(active)=>(twMerge("bg-white py-4 px-8 text-center text-secondary font-body font-semibold shadow-sm/15 rounded-4xl"))}>
                            En cours
                        </NavLink >
                        <NavLink to={""} className={(active)=>(twMerge("bg-white py-4 px-8 text-center text-secondary font-body font-semibold shadow-sm/15 rounded-4xl"))}>
                            En attentes
                        </NavLink >
                    </div>
                    <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 gap-4">
                        <CardLivraison></CardLivraison>
                        <CardLivraison></CardLivraison>
                        <CardLivraison></CardLivraison>
                    </div>
                </div>
            </div>
        </section>
    </>
}
