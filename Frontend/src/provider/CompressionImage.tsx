import { useState, type ChangeEvent, type ReactNode } from "react";
import { CompressionContext } from "./CustomizedHooks";
import imageCompression from "browser-image-compression";

interface CompressionImageProps {
    children: ReactNode
}

export function CompressionImage ({children}: CompressionImageProps) {
    const [images, setImages] = useState<File[] | null>(null);
    const [compressedImg, setCompressedImg] = useState<File[] | null>(null);
    const [inCompressing, setInCompressing] = useState<boolean>(false);
    
    const CompresseImg = async (e: ChangeEvent<HTMLInputElement>, manyFile: boolean = false) => {
        setInCompressing(true)
        const imageFiles = e.currentTarget.files
        if (!imageFiles) return

        const options = {
            maxSizeMB: 1,           
            maxWidthOrHeight: 1024, 
            useWebWorker: true,
        };

        try{
            const promesse = Array.from(imageFiles).map((img) => imageCompression(img, options))
            const compresedFiles = await Promise.all(promesse)

            
            if (manyFile){
                setCompressedImg((oldImg) => {
                    const oldImgs = oldImg ? oldImg : []
                    return [...oldImgs, ...compresedFiles]
                })
            } else {
                setCompressedImg(compresedFiles)
            }
            console.log()
            setInCompressing(false)

        } catch(err){
            console.error("Erreur lors de la compression :", err);
            setInCompressing(false);
        }
    }

    const deleteImg = ()=>{
        setCompressedImg(null)
        // alert("ok")
    }

    return <>
        <CompressionContext.Provider value={{
            images, setImages,
            compressedImg, setCompressedImg,
            inCompressing,
            deleteImg,
            CompresseImg
        }}>
            {children}
        </CompressionContext.Provider>
    </>
    }
