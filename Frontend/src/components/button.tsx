import type { ReactNode } from "react"
import { twMerge, type ClassNameValue } from "tailwind-merge"

type btnType = {
    children: ReactNode,
    type?: "submit" | "reset" | "button",
    className?: ClassNameValue,
    onClick?: ()=>{},
}

export function Button ({children, type="submit", className, onClick}: btnType) {
  return <>
    <button onClick={()=>onClick} type={type}  className={twMerge("center gap-2 w-full bg-primary px-8 py-3 text-white font-body font-bold rounded-xl", className)}>
        {children}
    </button>
  </>
}
