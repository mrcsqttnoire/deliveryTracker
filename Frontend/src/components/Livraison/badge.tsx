
import { twMerge, type ClassNameValue } from "tailwind-merge";

type badgeType = {
    title?: string,
    type: "en_attente" | "en_route" | "livree",
    className?: ClassNameValue,
}

export function BadgeLivraison ({title, type, className}: badgeType) {
    const status =  {
        en_attente: "En attente",
        en_route: "En route",
        livree: "Livrée",
    }[type];

  return <>
    <div className={twMerge("flex", type, className)}>
        <p>{title ? title : status}</p>
    </div>
  </>
}
