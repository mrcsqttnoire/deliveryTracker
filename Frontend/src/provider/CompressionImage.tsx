import { useState, type ChangeEvent, type ReactNode } from "react";
import { CompressionContext } from "./CustomizedHooks";
import imageCompression from "browser-image-compression";

interface CompressionImageProps {
    children: ReactNode
}

export function CompressionImage ({children}: CompressionImageProps) {
    const [images, setImages] = useState<File[] | null>(null);
    const [compressedImg, setCompressedImg] = useState<File[] | null>(null);
    const [manyFile, setManyFile] = useState<boolean>(false);
    const [inCompressing, setInCompressing] = useState<boolean>(false);
    
    const CompresseImg = async (e: ChangeEvent<HTMLInputElement>) => {
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

    return <>
        <CompressionContext.Provider value={{
            images, setImages,
            compressedImg, setCompressedImg,
            inCompressing,
            setManyFile,
            CompresseImg
        }}>
            {children}
        </CompressionContext.Provider>
    </>
    }
