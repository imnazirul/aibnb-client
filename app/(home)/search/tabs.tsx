"use client"

import TabLink from "../components/home/tab_link";
import React, {useEffect} from "react";
import {useFetch} from "../../../helpers/hooks";
import {fetchPropertyFilters} from "../../../helpers/backend";

const Tabs = () => {

    const [elements, getElements] = useFetch(fetchPropertyFilters, {}, false)

    useEffect(() => {
        getElements()
    }, []);


    return (
        <div className="sticky-tabs overflow-y-auto no-scroll-bar">
            <div className=" flex items-center gap-8 px-8 bg-white relative">
                <TabLink
                    label="Your Search"
                    icon="local/icons/home.png"
                    slug=""
                />

                <hr className="border-l border-gray-600 w-0.5 border-t-0  h-10"/>
                {elements?.map((tab, index) => (
                    <TabLink
                        key={index}
                        label={tab.name}
                        icon={tab.icon}
                        slug={tab.slug}
                    />
                ))}
            </div>
        </div>
    );
}

export default Tabs;