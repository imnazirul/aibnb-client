import React from 'react';
import Image from "next/image";
import {toAssetUrl} from "../../../helpers/utils";
import {getServerData} from "../../../helpers/server";
import Link from "next/link";
import TabLink from "../../../app/(home)/components/home/tab_link";

const Categories = async () => {
    const data = await getServerData('/property/filters', {
        tags: ['property_filter']
    })
    return (
        <div className="border-t sticky top-[72px]">
            <div className="container flex gap-8 py-4 bg-white">
                {data?.data?.map((category, index) => (
                    TabLink({
                        label: category.name,
                        icon: category.icon,
                        slug: category.slug
                    })
                ))}
            </div>
        </div>
    );
}

export default Categories;
