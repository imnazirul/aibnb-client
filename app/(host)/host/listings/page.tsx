"use client"

import {fetchProperties} from "../../../../helpers/backend";
import {useFetch} from "../../../../helpers/hooks";
import {useUser} from "../../../../contexts/user";
import React, {useEffect, useState} from "react";
import {FiGrid, FiPlus, FiSearch, FiX} from "react-icons/fi";
import Link from "next/link";
import {GoRows} from "react-icons/go";
import Image from "next/image";
import {toAssetUrl} from "../../../../helpers/utils";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import ImageSlider from "../../../../components/common/image-slider";
import { useRouter } from "next/navigation";

const Page = () => {
    const [data, getData, {loading}] = useFetch(fetchProperties)
    const [show, setShow] = useState('grid')
    const router = useRouter();

    const {user} = useUser();
    const isApproved = user?.host?.status === 'approved';

    const ref = React.useRef(null)
    useEffect(() => {
        let children = ref.current.children
        for (let i = 0; i < children.length; i++) {
            window.setTimeout(() => {
                children[i]?.classList.remove('show')
            }, 500 + i * 100)
        }
    }, [data]);


    return (
        <div className="container py-8">
            <div className="flex justify-between items-center gap-12 mb-4">
                <h1 className="text-2xl font-medium">Your Listing</h1>
                <div className="flex items-center justify-end gap-4 flex-grow">
                    <Search/>
                    <div
                        role="button"
                        onClick={() => setShow(show === 'grid' ? 'list' : 'grid')}
                        className="bg-gray-200 rounded-full p-3">
                        {show === 'grid' ? (
                            <GoRows className="text-gray-800" size={22}/>
                        ) : (
                            <FiGrid className="text-gray-800" size={22}/>
                        )}
                    </div>
                    <Link
                        href="/host/listings/add"
                        className={`bg-gray-200 rounded-full p-3 ${isApproved ? '' : 'opacity-50 pointer-events-none'}`}>
                        <FiPlus className="text-gray-800" size={22}/>
                    </Link>
                </div>
            </div>

            {loading && (
                <div className="grid py-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array(4).fill(10).map((_, index) => (
                        <div key={index} className="relative z-0">
                            <PropertySkeleton/>
                        </div>
                    ))}
                </div>
            )}

            {show === 'grid' && (
                <div
                    ref={ref}
                    className="grid py-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data?.['docs']?.map((property, index) => (
                        <Property key={index} data={property}/>
                    ))}
                </div>
            )}

            {show === 'list' && (
                <table className="w-full text-left my-6">
                    <thead>
                    <tr className="text-sm font-medium text-gray-700">
                        <th className="py-3">Listing</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.['docs']?.map((data, index) => (
                        <tr key={index} className="text-sm text-gray-500 font-medium hover:bg-gray-50 cursor-pointer"
                            onClick={() => router.push(`/host/listings/edit/${data.uid}`)}>
                            <td className="py-2 flex gap-6 items-center">
                                <Image
                                    height={700}
                                    width={700}
                                    src={toAssetUrl(data.images[0])}
                                    className="h-16 w-20 object-cover mb-2 rounded-md"
                                    alt=""
                                />
                                <p>{data?.title}</p>
                            </td>
                            <td>
                                {data?.location?.name}
                            </td>
                            <td className="capitalize">
                                {data?.status}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}




            {(data?.['docs']?.length || 0) === 0 && !loading && (
                <div className="text-center text-gray-500 mt-8 text-2xl py-16">
                    No listing found
                </div>
            )}
        </div>
    )
}

export default Page;


const Search = () => {
    const [show, setShow] = useState(false)


    return (
        <div className={`transition-all ${show ? 'flex-grow max-w-7xl' : ''}`}>
            {show ? (
                <div className="relative w-full">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"/>
                    <input className="border border-gray-500 py-2 px-10 rounded-full w-full outline-0"/>
                    <div
                        role="button"
                        onClick={() => setShow(false)}
                        className="absolute right-4 top-1/2 -translate-y-1/2">
                        <FiX className="text-gray-500"/>
                    </div>
                </div>
            ) : (
                <div
                    role="button"
                    onClick={() => setShow(true)}
                    className="bg-gray-200 rounded-full p-3">
                    <FiSearch className="text-gray-800" size={22}/>
                </div>
            )}
        </div>
    )
}


const Property = ({data}) => {
    return (
        <Link
            href={`/host/listings/edit/${data.uid}`}
            className="skeleton show">
            <div className="absolute">
                <PropertySkeleton/>
            </div>
            <div className="relative">
                <div className="absolute left-4 top-4 bg-white px-4 py-1.5 text-sm font-medium capitalize rounded-full">
                    {data?.status}
                </div>
                <ImageSlider
                    images={data.images}
                    width={700}
                    height={700}
                    className="h-72 object-cover mb-2 rounded-md"/>
                <p className="font-medium">{data?.title}</p>
                <p className="text-gray-700 text-sm truncate">{data?.location?.name}</p>
            </div>
        </Link>
    )
}

const PropertySkeleton = () => {
    return (
        <SkeletonTheme baseColor="#f4f4f4" highlightColor="#f9f9f9">
            <div className="leading-none">
                <Skeleton className="mb-2 rounded-md" height={288}/>
            </div>
            <Skeleton className="mb-1" width="70%"/>
            <Skeleton className="mb-1" width="90%"/>
        </SkeletonTheme>
    )
}