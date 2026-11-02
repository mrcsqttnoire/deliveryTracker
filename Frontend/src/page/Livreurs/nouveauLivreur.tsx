import { Bike, Image, CloudUpload, CircleCheckBig, CircleAlert } from "lucide-react";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { twMerge, type ClassNameValue } from "tailwind-merge";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCompression, useUser, useUtilities, type RouteParams } from "../../provider/CustomizedHooks";
import { SpinLoading } from "../../components/shared/button";
import { Alert } from "../../components/shared/alert";

export default function NouveauLivreur () {
    // const [images, setImages] = useState<File[]>([])
    const navigate = useNavigate()
    const location = useLocation()
    const [background, setBackground] = useState<ClassNameValue>("bg-neutral-light")
    const {getOneLivreur} = useUser()
    const isEdit = Boolean(location.pathname.includes('edit'))
    const {resetUserForm, photo} = useUser()
    const {id} = useParams<RouteParams>()
    const {compressedImg,inCompressing,CompresseImg} = useCompression()
    const {message} = useUtilities()

    useEffect(() => {
        if (!isEdit){
            resetUserForm()
            return
        }
        getOneLivreur(id ?? '', navigate)
    }, [])
     
    const ImgUrl = useMemo(() => (
        compressedImg?.[0] ? URL.createObjectURL(compressedImg[0]) : null
    ),[compressedImg])

    useEffect(()=>{
        if (ImgUrl) URL.revokeObjectURL(ImgUrl)
    }, [compressedImg])
    
    const ImgAffiche = ImgUrl ?? photo
    useEffect(()=>{
        setBackground(ImgAffiche ? "bg-neutral-light/40" : "bg-neutral-light")
    }, [ImgAffiche])


    const saveImg = async (e:ChangeEvent<HTMLInputElement>)=>{
        const files = e.currentTarget.files
        if(!files) return
        
        CompresseImg(e)
    }

    return <>
        <div className="container-custom grid grid-cols-1 gap-4">
            <div className="flex p-4 justify-between items-center bg-[#F0F3FF] w-full font-body font-medium rounded-xl inset-shadow-sm ">
                <div>
                    <h4 className="font-heading font-semibold text-neutral text-2xl">
                        {isEdit ? 'Modification du livreur':'Nouveau livreur'}
                    </h4>
                    <p className="font-body font-medium text-secondary">
                        {isEdit ? 'Des informations fausses ?' : 'Embaucher un nouveau livreur'}
                    </p>
                </div>
                <div className="flex justify-center items-center w-14 h-14 bg-en_route-bg rounded-full z-20" >
                    <Bike className="text-en_route" size={24}/>   
                </div>
            </div>                    
            {message &&
                <Alert 
                    className={twMerge("w-auto sticky top-4 flex items-center gap-2 justify-self-center  backdrop-blur-xl  animate-scaling z-50", message.includes("succès") && 'bg-livree-bg/50 text-livree')}>
                    {   message.includes("succès") && 
                        <CircleCheckBig className="shrink-0"/>
                    }
                    {   !message.includes("succès") && 
                        <CircleAlert className="shrink-0"/>
                    }
                    {message}
                </Alert>
            }
            <div className="grid grid-cols-1-col md:grid-cols-2 gap-4">
                <div className="relative">
                    {ImgAffiche && 
                        <img src={ImgAffiche} alt="none" className="absolute top-1/2 -translate-y-1/2 w-full h-full object-cover rounded-xl -z-50"/>
                    }
                    <div className={twMerge("flex flex-col gap-4 justify-center items-center text-center text-neutral w-full h-60 md:h-full  md:h-ful rounded-xl backdrop-blur-lg z-90", background)}>
                        <div className="relative center w-20 h-20 bg-white rounded-full">
                            {ImgAffiche &&
                                <img src={ImgAffiche} alt="none" className="absolute top-1/2 -translate-y-1/2 w-full h-full object-cover rounded-full z-20"/>
                            }
                            <Image size={32} className="absolute top-1/2 -translate-y-1/2 text-secondary"/>
                        </div>
                        <div className="center flex-col z-20">
                            <p className="font-body font-semibold ">
                                Photo d'identité du livreur
                            </p>
                            <p className="font-body font-medium text-secondary drop-shadow-2xl">
                                Veuillez assurer que le visage soit dégagé
                            </p>
                            <label htmlFor="photo" className="h-10 w-auto px-4 center gap-2 mt-2
                                bg-white text-primary rounded-xl aria-disabled:bg-white/50
                                aria-disabled:text-primary/50 cursor-pointer hover:scale-98 duration-75 ease-in" 
                                aria-disabled={inCompressing}
                            >
                                <CloudUpload />
                                <p className="font-body font-bold ">{inCompressing ? "Compression..." : "Choisir une image"}</p>
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
