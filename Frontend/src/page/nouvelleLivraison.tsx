import { Bike, Box, ImagePlus, Trash, TruckElectric, X } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "../components/shared/button";
import { useLivraison } from "../provider/CustomizedHooks";
import { twMerge } from "tailwind-merge";

export function NouvelleLivraison () {

    const {transformStyles} = useLivraison()

    const [images, setImages] = useState<File[]>([])

    const saveImg = (e:ChangeEvent<HTMLInputElement>)=>{
        const files = e.currentTarget.files
        if(!files) return

        setImages((oldImg)=>[
            ...oldImg, 
            ...Array.from(files)
        ])
    }

    const deleteImg = ()=>{
        const temp: File[] = []
        setImages(temp)
        // alert("ok")

    }

    function createLivreur(e: FormEvent) {
        e.preventDefault()
    }

  return <>
    <form onSubmit={(e)=> createLivreur(e)} className="container-custom grid grid-cols-1 gap-4">
        <div className="flex p-4 justify-between items-center bg-[#F0F3FF] w-full font-body font-medium rounded-xl inset-shadow-sm ">
            <div>
                <h4 className="font-heading font-semibold text-neutral text-2xl">Nouvelle course</h4>
                <p className="font-body font-medium text-secondary">Créer une nouvelle livraison</p>
            </div>
            <div className="flex justify-center items-center w-14 h-14 bg-en_route-bg rounded-full z-20" >
                <TruckElectric className="text-en_route" size={24}/>   
            </div>
        </div>
        <div className="flex flex-col gap-4 px-4 py-6 rounded-xl shadow-xl bg-white text-neutral font-body">
            <div className="flex items-center gap-2">
                <Box className="text-primary"/>
                <h4 className="font-heading font-semibold  text-2xl">Détails du colis</h4>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="designation" className="font-body font-semibold text-md text-neutral">Désignation de la marchandise</label>
                <textarea name="designation" id="designation" className="w-full bg-principale min-h-18 max-h-18 px-4 py-2 rounded-xl shadow-sm focus" placeholder="Ex: Vêtements, 1 paire de chaussure" required></textarea>
            </div> 
            <div className="grid grid-cols-2 justify-center items-center relative w-full"> 
                <div className="relative h-32 md:w-full md:h-38 lg:h-46">
                    {(images && images.map((img, index) => (
                        <img key={index} src={URL.createObjectURL(img)} alt="none" className={twMerge(`absolute md:top-1/2 md:-translate-y-1/2 w-32 h-32 md:w-64 lg:w-78 xl:w-96 lg:h-36 object-cover justify-self-center md:place-content-center rounded-xl`, transformStyles[index % transformStyles.length])}/>
                    )))}
                </div>       
                <div className="flex flex-col gap-4">
                    <label htmlFor="image" className="center w-full h-14 border-1 border-neutral border-dashed rounded-xl ">
                        <ImagePlus className=""/>
                        <input id="image" type="file" multiple onChange={saveImg} accept="image/*" hidden/>
                    </label>
                    <label htmlFor="delete" className="center w-full h-14 border-1 border-primary border-dashed rounded-xl ">
                        <Trash className="text-primary"/>
                        <input id="delete" type="button" multiple onClick={deleteImg} accept="image/*" hidden/>
                    </label>
                </div>
            </div> 
        </div>
        <div className="flex flex-col gap-4 px-4 py-6 rounded-xl shadow-xl bg-white text-neutral font-body">
            <div className="flex items-center gap-2">
                <Bike className="text-primary"/>
                <h4 className="font-heading font-semibold  text-2xl">Livreur & Crénau horaire</h4>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="livreur" className="font-body font-semibold text-md text-neutral">Assigner un livreur</label>
                <select name="livreur" id="livreur" className="w-full bg-principale min-h-12 max-h-18 px-4 py-2 rounded-xl shadow-sm focus" required> 
                    <option className="text-secondary" value="">Veuiller choisir un livreur</option>
                    <option className="text-secondary" value=""></option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="font-body font-semibold text-md text-neutral">Date souhaiter</label>
                    <input type="date" name="date_livraison" id="date" className="w-full bg-principale min-h-12 max-h-18 px-4 py-2 rounded-xl shadow-sm focus" required /> 
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="heure" className="font-body font-semibold text-md text-neutral">Heure limite</label>
                    <input type="time" name="heure_livraison" id="heure" className="w-full bg-principale min-h-12 max-h-18 px-4 py-2 rounded-xl shadow-sm focus" required />
                </div>
            </div>
        </div>
        <div className="flex justify-center  md:justify-end items-center gap-4  bg-white rounded-xl p-4 rounded-xl shadow-xl">
            <Button className="bg-[#F0F3FF] text-secondary w-auto h-12 place-self-center">
                <X size={24}/>
            </Button>
            <Button className="text-white w-auto h-12 -self-center text-sm md:text-lg font-semibold font-body">
                Créer la course
            </Button>
        </div>
    </form>
  </>
}
