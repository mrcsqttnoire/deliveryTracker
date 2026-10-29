import { BadgeInfo } from 'lucide-react';
import * as React from 'react';

export interface InfoProps {
    children: React.ReactNode
}

export function Info ({children}: InfoProps) {
    return <>
        <div className="flex gap-2 justify-center items-center">
            <BadgeInfo className="text-en_attente"/>
            <p className="font-body text-lg text-secondary" >{children}</p>  
        </div>
    </>
}
