import { useState, type ReactNode } from "react";
import { LoadingContext } from "./CustomizedHooks";

interface LoaderProps {
    children: ReactNode,
}

export function LoadingProvider ({children}: LoaderProps) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    return <>
        <LoadingContext.Provider
            value={{
                isLoading, setIsLoading
            }}
        >
            {children}
        </LoadingContext.Provider>
    </>
}
