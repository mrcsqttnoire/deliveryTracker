import Skeleton from "react-loading-skeleton";
import { CardSkeleton } from "../../components/skeleton/cardSkeleton";

export function ClientSkeleton () {
    return <>
        <section className="container-custom py-4 bg-principale min-h-full">
            <div className="flex flex-col gap-4">
                <Skeleton height={48}/>
                <CardSkeleton count={6}/>
            </div>
        </section>
    </>
}
