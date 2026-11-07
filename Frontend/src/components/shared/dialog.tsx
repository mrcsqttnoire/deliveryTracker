import { Trash, X } from "lucide-react";
import billi from "../../assets/img/test/billie-3.png";
import { Button, SpinLoading } from "./button";
import { useClient, useLivreur, useLoading, useUtilities } from "../../provider/CustomizedHooks";
import { useNavigate } from "react-router-dom";


export function Dialog () {
    const navigate = useNavigate()
    const {showDialog, setShowDialog} = useUtilities()
    const {isLoading} = useLoading()
    const {deleteClient} = useClient()
    const {deleteLivreur} = useLivreur()

    const annuler = () => setShowDialog({
                        isShow: false,
                        type: 'client',
                        data: null
                    })

    const supprimer = async () => {
        if (showDialog.type === 'client'){  
            await deleteClient(showDialog.data.id, navigate)
        } else {
            await deleteLivreur(showDialog.data.id, navigate)
        }
        annuler()
        navigate(0)
    }

    return <>
        <div className="fixed bottom-16 left-0 right-0
         flex flex-col gap-2 bg-white/10 p-4 rounded-t-2xl
         md:bottom-1/2 md:left-1/2 md:right-auto md:-translate-x-1/2 md:translate-1/2 md:rounded-xl
         md:origin-center
          animate-slideIn origin-bottom backdrop-blur-xl shadow-xl">
            <div className="flex justify-between items-center">
                <div className={("p-4 bg-primary/20 text-primary rounded-full")}>
                    <Trash size={24} strokeWidth={2} className="shrink-0"/>
                </div>
                <button 
                    onClick={annuler}
                    className="hover:bg-input/90 p-2 rounded-full duration-75" 
                >
                    <X className="shrink-0 text-neutral"/>
                </button>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <h4 className="font-heading text-neutral font-bold text-2xl">Confirmer la suppression</h4>
                    <p className="text-secondary font-body font-medium">
                        Êtes-vous sûr de vouloir supprimer ce {showDialog.type} ? Cette action et irreversible et immédiate 
                    </p>
                    {showDialog.type === 'client' && <span className="text-primary"> et toutes ses livraisons seront supprimées </span>}
                </div>
                <div className="flex flex-col gap-2 bg-input p-4 rounded-xl">
                    <h5 className="uppercase font-body font-bold text-secondary">élément ciblé</h5>
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-full">
                            <img src={billi} alt="" className="object-cover rounded-full" />
                        </div>
                        <div className="flex flex-col justify-center font-body">
                            <h4 className="text-neutral font-semibold text-xl">{showDialog.data.nom} {showDialog.data.prenom}</h4>
                            {showDialog.type === 'client' && 
                            <p className="text-secondary">{showDialog.data.livraison_count} livraisons commandées</p>}
                            {showDialog.type === 'livreur' && 
                            <p className="text-secondary">{showDialog.data.livraison_count} Livraisons terminées</p>}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        disable={isLoading}
                        noLoading={true}
                        fn={supprimer}
                    >   
                        {!isLoading && <Trash/>}
                        {isLoading && <SpinLoading/>}
                        Supprimer
                    </Button>
                    <Button
                        disable={isLoading}
                        noLoading={true}
                        fn={annuler}
                        className="bg-input text-secondary hover:bg-input hover:opacity-85 duration-75"
                    >
                        Annuler
                    </Button>
                </div>
            </div>
        </div>
    </>
}
