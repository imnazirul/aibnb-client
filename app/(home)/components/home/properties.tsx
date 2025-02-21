"use client"

import React, {useEffect} from 'react';
import {useFetch} from "../../../../helpers/hooks";
import {fetchFindProperty} from "../../../../helpers/backend";
import {useSearchParams} from "next/navigation";
import {addQueryToUrl, toAssetUrl} from "../../../../helpers/utils";
import Image from "next/image";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import Link from "next/link";
import Map from "./map";
import {formatPrice, getDiscountPrice} from "../../../../helpers/property";
import dayjs from "dayjs";
import ImageSlider from "../../../../components/common/image-slider";

const Properties = ({map}: {
    map?: boolean
}) => {
    const params = useSearchParams()
    const [data, getProperties, {loading}] = useFetch(fetchFindProperty, {
        limit: 20
    }, false)

    useEffect(() => {
        if (!map) {
            getProperties({
                tab: params.get('tab') || undefined,
                location: params.get('location') || undefined,
                from: params.get('from') || undefined,
                to: params.get('to') || undefined,
                guests: params.get('guests') || undefined,
                children: params.get('children') || undefined,
                pets: params.get('pets') || undefined,
                infants: params.get('infants') || undefined,
            })
        }
    }, [params]);

    const ref = React.useRef(null)

    useEffect(() => {
        let children = ref?.current?.children
        for (let i = 0; i < children?.length; i++) {
            window.setTimeout(() => {
                children[i]?.classList.remove('show')
            }, 100 + i * 75)
        }
    }, [data]);


    return (
        <div className={`property-list ${map ? 'with-map' : 'container'}`}>
            <div className="relative flex gap-8 justify-end ">
                <div
                    className={`flex-grow ${map ? 'md:h-[calc(100vh-160px)] overflow-y-auto no-scroll-bar' : ''} py-8`}>
                    <div ref={ref}
                         className={`grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 ${map ? '' : 'lg:grid-cols-3 xl:grid-cols-5'} gap-6 z-0`}>
                        {(loading) ? (
                            <>
                                {Array(20).fill(10).map((_, index) => (
                                    <div key={index} className="relative z-0">
                                        <PropertySkeleton/>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {data?.map((property: any, index: number) => (
                                    <Property key={index} property={property}/>
                                ))}
                            </>
                        )}
                    </div>

                    {(!loading && !data?.length) && (
                        <div className="text-center w-full py-12">
                            <p className="text-lg">No properties found</p>
                        </div>
                    )}

                </div>


                {map && (
                    <div
                        className="hidden md:block w-2/5 flex-shrink-0 flex-grow-0 sticky top-48 h-[calc(100vh-230px)] search-map rounded-md overflow-hidden mt-8">
                        <Map
                            data={data}
                            getData={getProperties}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Properties;


const Property = ({property}) => {
    const searchParams = useSearchParams()


    return (
        <Link
            href={addQueryToUrl({}, `/property/${property.uid}`)}
            className="skeleton show">
            <div className="absolute">
                <PropertySkeleton/>
            </div>
            <div>
                <ImageSlider
                    images={property.images}
                    className="h-60 object-cover mb-2 rounded-md"
                />
                <p className="font-medium">{property?.title}</p>
                <p className="text-gray-700 truncate">{property?.location?.name}</p>
                <p className="font-medium">${formatPrice(getDiscountPrice(dayjs(), property))} night</p>
            </div>
        </Link>
    )

}

const PropertySkeleton = () => {
    return (
        <SkeletonTheme baseColor="#f4f4f4" highlightColor="#f9f9f9">
            <div className="leading-none">
                <Skeleton className="mb-2 rounded-md" height={240}/>
            </div>
            <Skeleton className="mb-1" width="70%"/>
            <Skeleton className="mb-1" width="90%"/>
            <Skeleton className="mb-1" width="30%"/>
        </SkeletonTheme>
    )
}