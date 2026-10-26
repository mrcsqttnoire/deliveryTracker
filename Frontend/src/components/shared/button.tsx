import type { ReactNode } from "react"
import { twMerge, type ClassNameValue } from "tailwind-merge"
import { Loading } from "./loading"
import api from "../../api"
import { useUser } from "../../provider/CustomizedHooks"

type btnType = {
    children: ReactNode,
    type?: "submit" | "reset" | "button",
    className?: ClassNameValue,
    id?: string
    fn?: () => void,
}

export function Button ({children, type="submit", className, fn, id}: btnType) {
  const {isLoading} = useUser()
  return <>
    <button onClick={fn} type={type}  className={twMerge("center gap-2 w-full bg-primary px-8 py-3 text-white font-body font-bold rounded-xl cursor-pointer hover:bg-primary/90 duration-50 disabled:bg-primary/70", className)} id={id} disabled={isLoading}>
        {isLoading && <SpinLoading/>}
        {children}
    </button>
  </>
}


export function SpinLoading () {
  return <>
    <svg className="mr-3 -ml-1 size-5 animate-spin text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" fill="currentColor" strokeWidth={4}></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </>
}