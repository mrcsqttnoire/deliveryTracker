import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CardSkeletonProps {
    count?: number
}

export function CardSkeleton({count}: CardSkeletonProps) {
    return <>
        <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 gap-4">{            
            Array(count).fill(null).map((_,idx) => (
                <div key={idx} className=" flex flex-col gap-3 bg-white h-auto rounded-xl shadow-md p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                        <Skeleton circle width={40} height={40} />
                        <div className="flex flex-col">
                            <Skeleton width={120} height={12} />
                            <Skeleton width={90} height={12} />
                        </div>
                        </div>
                        <Skeleton width={80} height={20} borderRadius={12} />
                    </div>
                    <div className="bg-input flex justify-between items-center px-4 py-2 rounded-xl">
                        <div className="flex flex-col">
                        <Skeleton width={150} height={12} />
                        <Skeleton width={100} height={12} />
                        </div>
                        <div className="flex flex-col items-end">
                        <Skeleton width={60} height={12} />
                        <Skeleton width={90} height={12} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Skeleton height={48} borderRadius={12} containerClassName="flex-1/2" />
                        <Skeleton height={48} borderRadius={12} containerClassName="flex-1/2" />
                    </div>
                </div>
            ))
        }</div>
    </>
}