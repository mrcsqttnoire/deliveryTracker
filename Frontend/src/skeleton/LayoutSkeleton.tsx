import type { ReactNode } from "react";
import Skeleton from "react-loading-skeleton";
import { Loading } from "../components/shared/loading";

interface LayoutSkeletonProps {
    children?: ReactNode
}

export function LayoutSkeleton ({children}: LayoutSkeletonProps) {
    return <>
        <header className="bg-white-500 container-custom sticky top-0 shadow-2xl py- rounded-xl">
            <div className='flex justify-between py-3 '>
                <div className='flex items-center gap-4 '>
                    <Skeleton width={45} height={45} />
                    <Skeleton width={130} height={20} />
                </div>
                <Skeleton circle width={48} height={48}/>
            </div>
        </header>
        {children}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 center flex-col h-screen">
                <Loading/>
        </div>
        <footer className="container-custom w-full z-99">
            <nav className="bg-white-500 w-full h-16 grid grid-cols-4 items-center fixed inset-x-0 md:left-1/2 md:-translate-x-1/2 bottom-0 responsive-nav z-50 bg- text-secondary backdrop-blur-md rounded-t-xl shadow-[0_-10px_25px_rgba(0,0,0,0.15)] md:w-4/7 xl:w-3/7">
                <div className="center nav" >
                    <Skeleton width={24} height={24}/>
                    <Skeleton width={90} height={12} />
                </div>
                <div className='center nav'>
                    <Skeleton width={24} height={24}/>
                    <Skeleton width={90} height={12} />
                </div>
                <div className="center nav" >
                    <Skeleton width={24} height={24}/>
                    <Skeleton width={90} height={12} />
                </div>
                <div className="center nav" >
                    <Skeleton width={24} height={24}/>
                    <Skeleton width={90} height={12} />
                </div>
            </nav>
        </footer>
    </>
}
