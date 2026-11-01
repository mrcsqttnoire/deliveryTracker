import { useEffect, type ReactNode } from "react";
import { twMerge, type ClassNameValue } from "tailwind-merge";
import { useUtilities } from "../../provider/CustomizedHooks";

interface AlertProps {
    children: ReactNode
    className?: ClassNameValue
}

export function Alert ({children, className}: AlertProps) {
  const {message,setMessage} = useUtilities()
  useEffect(()=>{
    const wait = async () => {
      await new Promise((t)=>{
        setTimeout(t, 3000)
      })
      setMessage("")
    }
    if (message.trim()) wait()
  }, [message])
  return <>
    <p className={twMerge("font-body font-medium bg-primary/10 text-primary px-4 py-2 rounded-xl", className)}>     
        {children}
    </p>
  </>
}
