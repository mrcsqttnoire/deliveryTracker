import { Bike, Image, CloudUpload } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import { twMerge, type ClassNameValue } from "tailwind-merge";
import { Outlet } from "react-router-dom";
import { useCompression, useUser } from "../../provider/CustomizedHooks";
import { SpinLoading } from "../../components/shared/button";

export default function NouveauLivreur () {
    // const [images, setImages] = useState<File[]>([])
    const [background, setBackground] = useState<ClassNameValue>("bg-neutral-light")
    const {resetUserForm} = useUser()
    const {
        compressedImg,
        images, setImages,
        inCompressing,
        CompresseImg
    } = useCompression()

    useEffect(() => {
        resetUserForm()
     }, [])

    const saveImg = async (e:ChangeEvent<HTMLInputElement>)=>{
        const files = e.currentTarget.files
        if(!files) return
        
        await CompresseImg(e)
        setImages(Array.from(files))
        setBackground("bg-neutral-light/40")
    }

  return <>
    <div className="container-custom grid grid-cols-1 gap-4">
        <div className="flex p-4 justify-between items-center bg-[#F0F3FF] w-full font-body font-medium rounded-xl inset-shadow-sm ">
            <div>
                <h4 className="font-heading font-semibold text-neutral text-2xl">Nouveau livreur</h4>
                <p className="font-body font-medium text-secondary">Embaucher un nouveau livreur</p>
            </div>
            <div className="flex justify-center items-center w-14 h-14 bg-en_route-bg rounded-full z-20" >
                <Bike className="text-en_route" size={24}/>   
            </div>
        </div>
        <div className="grid grid-cols-1-col md:grid-cols-2 gap-4">
            <div className="relative">
                {images && images.map((img, index) => (
                    <img key={index} src={URL.createObjectURL(img)} alt="none" className="absolute top-1/2 -translate-y-1/2 w-full h-full object-cover rounded-xl -z-50"/>
                )) }
                <div className={twMerge("flex flex-col gap-4 justify-center items-center text-center text-neutral w-full h-60 md:h-full bg-neutral-light rounded-xl backdrop-blur-lg z-90", background)}>
                    <div className="relative center w-20 h-20 bg-white rounded-full">
                        {(compressedImg && compressedImg.map((img, index) => (
                            <img key={index} src={URL.createObjectURL(img)} alt="none" className="absolute top-1/2 -translate-y-1/2 w-full h-full object-cover rounded-full z-20"/>
                        )))}
                        <Image size={32} className="absolute top-1/2 -translate-y-1/2 text-secondary"/>
                    </div>
                    <div className="center flex-col z-20">
                        <p className="font-body font-semibold ">Photo d'identité du livreur</p>
                        <p className="font-body font-medium text-secondary drop-shadow-2xl">Veuillez assurer que le visage soit dégagé</p>
                        <label htmlFor="photo" className="h-10 w-auto px-4 center gap-2 mt-2 bg-white text-primary rounded-xl aria-disabled:bg-white/50 aria-disabled:text-primary/50 cursor-pointer hover:scale-98 duration-75 ease-in" aria-disabled={inCompressing}>
                            <CloudUpload />
                            <p className="font-body font-bold ">Choisir une image</p>
                            <input 
                                onChange={saveImg} 
                                type="file" 
                                id="photo" 
                                hidden
                                disabled={inCompressing}
                                />
                            {inCompressing && <SpinLoading className="text-primary/50 ml-1"/>}
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    </div>
  </>
}
