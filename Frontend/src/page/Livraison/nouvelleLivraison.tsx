import { Bike, Box, CircleCheckBig, ImagePlus, Trash, TruckElectric, X } from "lucide-react";
import { useEffect } from "react";
import { Button, SpinLoading } from "../../components/shared/button";
import { useCompression, useLivraison, useLivreur, useUtilities } from "../../provider/CustomizedHooks";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/shared/alert";
import { format, isAfter, isBefore, parse } from "date-fns";

export default function NouvelleLivraison () {
    const navigate = useNavigate()
    const {
        compressedImg,
        inCompressing,
        setCompressedImg,
        CompresseImg, deleteImg
    } = useCompression()
    const {
        designation, setDesignation,
        dateLivraison, setDateLivraison,
        heureLivraison, setHeureLivraison,
        setLivreurAssigne,
        viderChamp,
        transformStyles, createLivraison
    } = useLivraison()

    const {message, setMessage} = useUtilities()

    const reset = ()=>{
        deleteImg()
        viderChamp()
        setCompressedImg(null)
    }

    const {
        livreursList,
        getLivreurs
    } = useLivreur()

    useEffect(()=>{
        getLivreurs()
        viderChamp()
    }, [])

    useEffect(()=>{
        const dateHeure = parse(
            `${dateLivraison} ${heureLivraison}`,
            "yyyy-MM-dd HH:mm",
            new Date()
        )
        if(isBefore(dateHeure, new Date)){
            setMessage("On ne peut pas faire une livraison dans le passé")
        }
        if(isAfter(dateHeure, new Date)){
            setMessage("")
        }
    }, [dateLivraison, heureLivraison])


  return <>
    <form onSubmit={(e)=> createLivraison(e, navigate)} className="container-custom grid grid-cols-1 gap-4">
        <div className="flex p-4 justify-between items-center bg-[#F0F3FF] w-full font-body font-medium rounded-xl inset-shadow-sm ">
            <div>
                <h4 className="font-heading font-semibold text-neutral text-2xl">Nouvelle course</h4>
                <p className="font-body font-medium text-secondary">Créer une nouvelle livraison</p>
            </div>
            <div className="flex justify-center items-center w-14 h-14 bg-en_route-bg rounded-full z-20" >
                <TruckElectric className="text-en_route" size={24}/>   
            </div>
        </div>
        {message && !message.includes("passé") &&
             <Alert 
                className={twMerge(message.includes("succès") && "bg-livree-bg/50 text-livree flex items-center gap-2 sticky top-4 justify-self-center w-11/12 backdrop-blur-xl z-50 animate-scaling ")}>
                <CircleCheckBig className="shrink-0"/>
                {message}
            </Alert>
        }
        <div className="flex flex-col gap-4 px-4 py-6 rounded-xl shadow-xl bg-white text-neutral font-body">
            <div className="flex items-center gap-2">
                <Box className="text-primary"/>
                <h4 className="font-heading font-semibold  text-2xl">Détails du colis</h4>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="designation" className="font-body font-semibold text-md text-neutral">Désignation de la marchandise</label>
                <textarea onChange={(e)=>{setDesignation(e.target.value)}} name="designation" id="designation" className="w-full bg-principale min-h-18 max-h-18 px-4 py-2 rounded-xl shadow-sm focus" placeholder="Ex: Vêtements, 1 paire de chaussure" required>{designation}</textarea>
            </div> 
            <div className="grid grid-cols-2 justify-center items-center relative w-full"> 
                <div className={twMerge("relative h-32 md:w-full md:h-38 lg:h-46", !compressedImg && "place-content-center")}>
                    {(compressedImg && compressedImg.map((img, index) => (
                        <img key={index} src={URL.createObjectURL(img)} alt="none" className={twMerge(`absolute md:top-1/2 md:-translate-y-1/2 w-32 h-32 md:w-64 lg:w-78 xl:w-96 lg:h-36 object-cover justify-self-center md:place-content-center rounded-xl`, transformStyles[index % transformStyles.length])}/>
                    )))}
                    {
                        !compressedImg && !inCompressing && 
                        <p className="text-center text-secondary">choisir des images</p>
                    }
                    {
                        inCompressing &&
                        <p className=" flex text-center text-secondary font-body font-medium">
                            <SpinLoading className="text-primary"/>
                            Compression...
                        </p>
                    }
                </div>       
                <div className="flex flex-col gap-4">
                    <label htmlFor="image" className="center w-full h-14 border-1 border-neutral border-dashed rounded-xl ">
                        <ImagePlus className=""/>
                        <input id="image" type="file" multiple onChange={(e)=>CompresseImg(e,true)} accept="image/*" hidden/>
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
                {message && message.includes("passé") &&
                    <Alert>{message}</Alert>
                }
                <label htmlFor="livreur" className="font-body font-semibold text-md text-neutral">Assigner un livreur</label>
                <select onChange={(e)=>setLivreurAssigne(e.target.value)} name="livreur" id="livreur" className="w-full bg-principale min-h-12 max-h-18 px-4 py-2 rounded-xl shadow-sm focus" required> 
                    <option className="text-secondary" value="">Veuiller choisir un livreur</option>
                    {
                        livreursList && livreursList.map((lv) => (
                            <option key={lv.id} className="text-secondary" value={lv.id}>
                                <p>{lv.prenom}</p>
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="font-body font-semibold text-md text-neutral">Date souhaiter</label>
                    <input 
                        onChange={(e)=>setDateLivraison(e.target.value)} 
                        type="date" 
                        min={format(new Date, 'yyyy-MM-dd')} 
                        name="date_livraison" 
                        id="date" 
                        className="w-full bg-principale min-h-12 max-h-18 px-4 py-2 rounded-xl shadow-sm focus valid:border-primary" 
                        value={dateLivraison} 
                        required 
                    /> 
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="heure" className="flex justify-between items-baseline font-body font-semibold text-md text-neutral">
                        Heure limite
                        <span className="text-secondary text-sm">08:00 - 16:00</span>
                    </label>
                    <input 
                        onChange={(e)=>setHeureLivraison(e.target.value)} 
                        type="time" 
                        min="08:00" 
                        max="16:00" 
                        step={900}
                        name="heure_livraison" 
                        id="heure" 
                        className="w-full bg-principale min-h-12 max-h-18 px-4 py-2 rounded-xl shadow-sm focus" 
                        value={heureLivraison} 
                        required />
                </div>
            </div>
        </div>
        <div className="flex justify-center  md:justify-end items-center gap-4  bg-white rounded-xl p-4 rounded-xl shadow-xl">
            <Button 
                fn={reset} 
                type="reset" 
                className="bg-[#F0F3FF] text-secondary w-auto h-12 place-self-center hover:opacity-75 hover:bg-input disabled:bg-[#F0F3FF]/75"
                noLoading={true}
            >
                <X size={24}/>
            </Button>
            <Button 
                className="text-white w-auto h-12 -self-center text-sm md:text-lg font-semibold font-body" 
                disable={Boolean(message && message.includes("passé"))}>
                Créer la course
            </Button>
        </div>
    </form>
  </>
}
