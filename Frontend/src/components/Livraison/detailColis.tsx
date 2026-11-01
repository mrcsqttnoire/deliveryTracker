import { twMerge } from "tailwind-merge"
import { useLivraison, type PhotoType } from "../../provider/CustomizedHooks"



interface DetailColisProps {
    designation: string,
    photos?: PhotoType[] | null,
}

export function DetailColis ({designation, photos}: DetailColisProps) {

    const {transformStyles} =  useLivraison()

  return <>
    <div className="container-custom" >
        <div className="p-4 flex gap-2 justify-between items-center rounded-xl shadow-xl">
            <div className="w-2/3 flex flex-col items-start" >
                <h1 className="font-heading font-semibold text-xl md:text-2xl">Détail du colis</h1>
                <p className="font-body font-normal text-md md:text-lg text-secondary break-all">{designation}</p>
            </div>
            <div className="w-2/6 center relative h-32 md:w-64 lg:w-78 xl:w-96 md:h-38 lg:h-46">
                {photos && photos.map((p, index) => (
                    <img key={index} src={p.lien} alt="none" className={twMerge(`absolute w-32 h-32 md:w-64 lg:w-78 xl:w-96 lg:h-36 object-cover rounded-xl`, transformStyles[index % transformStyles.length])}/>
                ))}
                {
                    !Boolean(photos == null) && <p className="text-secondary font-body">Il n'y a pas des photos du colis envoyé</p>
                }
            </div>
        </div>
    </div>
  </>
}
