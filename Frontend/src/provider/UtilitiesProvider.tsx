import { useState, type ReactNode } from "react";
import { UtilitiesContext, type CoordType, type ModalType } from "./CustomizedHooks";
import type { ClassNameValue } from "tailwind-merge";

interface UtilitiesProviderProps {
    children: ReactNode
}
const defaultModal: ModalType = {
    isShow: false,
    type: 'client',
    data: null
}
export function UtilitiesProvider ({children}: UtilitiesProviderProps) {
    
    const [message, setMessage] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false)
    const [marker, setMarker] = useState<CoordType | null>(null)
    const [showDialog, setShowDialog] = useState<ModalType>(defaultModal)

    async function copieTexte(texte: string) {
        setIsCopied(true)
        await navigator.clipboard.writeText(texte)
            .then(()=>{
                setTimeout(()=>{
                    setIsCopied(false)
                }, 2000)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const Bg_profile_client: ClassNameValue[] = [
        "bg-livree-bg text-livree",
        "bg-en_route-bg text-en_route",
        "bg-en_attente-bg text-en_attente"
    ]
    return <>
        <UtilitiesContext.Provider value={{
            Bg_profile_client,
            message, setMessage,
            isOpen, setIsOpen,
            isCopied, copieTexte,
            marker, setMarker,
            showDialog, setShowDialog,
        }}>
            {children}
        </UtilitiesContext.Provider>
    </>
}
