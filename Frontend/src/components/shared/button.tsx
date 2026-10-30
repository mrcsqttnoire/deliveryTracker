import type { ReactNode } from "react"
import { twMerge, type ClassNameValue } from "tailwind-merge"
import { useLoading } from "../../provider/CustomizedHooks"

type btnType = {
    children: ReactNode,
    type?: "submit" | "reset" | "button",
    className?: ClassNameValue,
    id?: string
    noLoading?: boolean
    disable?: boolean
    fn?: () => void,
}

export function Button ({children, type="submit", className, fn, id, noLoading=false, disable=false}: btnType) {
  const {isLoading} = useLoading()
  return <>
    <button onClick={fn} type={type}  className={twMerge("center gap-2 w-full bg-primary px-8 py-3 text-white font-body font-bold rounded-xl cursor-pointer hover:bg-primary/90 duration-50 disabled:bg-primary/65 active:scale-95", className)} id={id} disabled={isLoading || disable}>
        {!noLoading && isLoading && <SpinLoading/>}
        {children}
    </button>
  </>
}


interface SpinLoadingProps{
  className?: ClassNameValue
}

export function SpinLoading ({className}: SpinLoadingProps) {
  return <>
    <svg className={twMerge("mr-3 -ml-1 size-5 animate-spin text-white ", className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" fill="currentColor" strokeWidth={4}></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </>
}