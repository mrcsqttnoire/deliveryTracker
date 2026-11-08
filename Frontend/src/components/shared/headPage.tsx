import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useClient, useUser } from "../../provider/CustomizedHooks";

interface HeadPageProps {
    children: ReactNode
    desc: string
    title: string
    btn_title: string
}

export function HeadPage ({children,desc, title, btn_title}: HeadPageProps) {
    const {isProprietaire} = useUser()
    const {setSelectedClient} = useClient()
    const navigate = useNavigate()
    function createPage(){
        setSelectedClient(null)
        navigate("create")
    }

  return <>
    <div className="grid grid-cols-2 items-center">
        <div>
            <p className="font-body font-medium text-secondary text-base">{desc}</p>
            <h4 className="font-heading font-semibold text-neutral text-xl sm:text-2xl">{title}</h4>
        </div>
        {   isProprietaire && 
            <Button noLoading={true} fn={createPage} className="flex text-sm md:text-lg md:w-1/2 md:justify-self-end    ">
                <span>{children}</span>
                <p className="">{btn_title}</p>
            </Button>
        }
    </div>
  </>
}
