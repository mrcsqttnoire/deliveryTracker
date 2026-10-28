import type { ReactNode } from "react";
import { twMerge, type ClassNameValue } from "tailwind-merge";

interface AlertProps {
    children: ReactNode
    className?: ClassNameValue
}

export function Alert ({children, className}: AlertProps) {
  return <>
    <p className={twMerge("font-body font-medium bg-primary/10 text-primary px-4 py-2 rounded-xl", className)}>     
        {children}
    </p>
  </>
}
