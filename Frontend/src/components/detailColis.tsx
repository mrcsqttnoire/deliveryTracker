import { twMerge, type ClassNameValue } from "tailwind-merge"

type photoType = {
    path: string,
}

interface DetailColisProps {
    designation: string,
    photos?: photoType[] | null,
}

export function DetailColis ({designation, photos}: DetailColisProps) {

    const transformStyles: ClassNameValue = [
        "rotate-0 translate-y-0",
        "-rotate-6 -translate-x-2 md:-rotate-3",
        "rotate-12 translate-x-3 md:rotate-6"
    ];

  return <>
    <div className="container-custom" >
        <div className="p-4 flex justify-between items-center rounded-xl shadow-xl">
            <div className="w-2/3 flex flex-col items-start" >
                <h1 className="font-heading font-semibold text-xl md:text-2xl">Détail du colis</h1>
                <p className="font-body font-normal text-md md:text-lg text-secondary">{designation}</p>
            </div>
            <div className="w-2/6 center relative h-32 md:w-64 lg:w-78 xl:w-96 lg:h-36">
                {photos && photos.map((p, index) => (
                    <img key={index} src={p.path} alt="none" className={twMerge(`absolute w-32 h-32 md:w-64 lg:w-78 xl:w-96 lg:h-36 object-cover rounded-xl`, transformStyles[index % transformStyles.length])}/>
                ))}
            </div>
        </div>
    </div>
  </>
}
