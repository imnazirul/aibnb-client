import {getServerData} from "../../../../helpers/server";
import TabLink from "./tab_link";
import React from "react";

const Tabs = async () => {
    const data = await getServerData('/property/filters', {
        tags: ['property_filter']
    })
    return (
        <div className="sticky-tabs overflow-y-auto no-scroll-bar">
            <div className="container flex gap-8 bg-white relative">
                {data?.data?.map((tab, index) => (
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