import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface HeadPageProps {
    children: ReactNode
    desc: string
    title: string
    btn_title: string
}

export function HeadPage ({children,desc, title, btn_title}: HeadPageProps) {

    const navigate = useNavigate()
    function createPage(){
        navigate("create")
    }

  return <>
    <div className="grid grid-cols-2 ">
        <div>
            <p className="font-body font-medium text-secondary">{desc}</p>
            <h4 className="font-heading font-semibold text-neutral text-2xl">{title}</h4>
        </div>
        <Button fn={createPage} className="flex text-sm md:text-lg md:w-1/2 md:justify-self-end">
            {children}
            {btn_title}
        </Button>
    </div>
  </>
}
