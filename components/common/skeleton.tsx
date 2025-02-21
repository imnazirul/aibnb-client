import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import React from "react";

const LoadingSkeleton = ({className, height, width}: any) => {
    return (
        <SkeletonTheme baseColor="#f4f4f4" highlightColor="#f9f9f9">
            <div className="leading-none">
                <Skeleton className={className} height={height} width={width}/>
            </div>
        </SkeletonTheme>
    )
}

export default LoadingSkeleton;