import Skeleton from "react-loading-skeleton";
import { CardSkeleton } from "../../components/skeleton/cardSkeleton";
import { LayoutSkeleton } from "../LayoutSkeleton";

export function LivreurSkeleton () {
    return <>
            <section className="container-custom py-4 bg-principale min-h-full">
                <div className="flex flex-col gap-4 ">
                    <div className="grid grid-cols-2 ">
                        <div>
                            <Skeleton width={190} height={12}/>
                            <Skeleton width={140} height={28}/>
                        </div>
                        <div className="justify-self-end">
                            <Skeleton width={120} height={48}/>
                        </div>
                    </div>
                    <div className="bg-input h-20 p-2 grid grid-cols-3 gap-1 rounded-xl">
                        <Skeleton height={60} borderRadius={10}/>
                        <Skeleton height={60} borderRadius={10}/>
                        <Skeleton height={60} borderRadius={10}/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Skeleton height={48}/>
                        <CardSkeleton count={6}/>
                    </div>
                </div>
            </section>
    </>
}
