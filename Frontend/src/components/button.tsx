import type { ReactNode } from "react"

type btnType = {
    children: ReactNode,
}

export function Button ({children}: btnType) {
  return <>
    <button className="bg-primary px-8 py-3 text-white font-body font-bold rounded-xl">
        {children}
    </button>
  </>
}
