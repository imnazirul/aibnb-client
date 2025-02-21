"use client"

import Image from "next/image";
import {addQueryToUrl, toAssetUrl} from "../../../../helpers/utils";
import Link from "next/link";
import React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import dayjs from "dayjs";

const TabLink = ({label, icon, slug}) => {
    const router = useRouter()
    const params = useSearchParams()
    let active = (params.get('tab') || '') === slug

    return (
        <>
            <a
                role="button"
                onClick={() => {
                    router.push(addQueryToUrl({
                        tab: slug || ''
                    }), {
                        scroll: false
                    })
                    if(window.scrollY > 0) {
                        window.scrollTo({
                            top: 5,
                        })
                    }
                }}
                className={`flex flex-shrink-0 py-4 flex-col items-center ${active ? 'border-b-2 border-gray-900' : ''}`}>
                <Image
                    crossOrigin="anonymous"
                    src={toAssetUrl(icon)}
                    height={24}
                    width={24}
                    className="h-6 object-cover mb-2 rounded-md"
                    alt=""/>
                <p className="text-sm font-medium">{label}</p>
            </a>
        </>
    )
}

export default TabLink