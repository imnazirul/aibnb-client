"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const HostMenu = () => {
    const pathname = usePathname();

    const menu = [
        { label: "Overview", href: "/host" },
        { label: "Calendar", href: "/host/calendar" },
        { label: "Listings", href: "/host/listings" },
        { label: "Reservations", href: "/host/reservations" },
        { label: "Message", href: "/host/message" },
    ];

    const isActive = (href: string) => href === pathname ? "text-primary border-b-2 border-primary" : "text-secondaryText";
    const ref = useRef<HTMLDivElement>(null);
    const border = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let find = menu.findIndex(item => item.href === pathname);
        let item = ref.current?.children[find] as HTMLElement;
        if (!!item && !!border.current) {
            border.current.style.width = `${item.offsetWidth}px`;
            border.current.style.left = `${item.offsetLeft}px`;
        }
    }, [pathname]);

    return (
        <div className="mb-10 pb-1 border-b relative">
            <div className="container overflow-x-auto sm:overflow-visible">
                <div ref={ref} className="flex items-center gap-6">
                    {menu.map((item, index) => (
                        <div key={index} className={`font-medium text-lg ${isActive(item.href)}`}>
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div ref={border} className="border-b-2 border-primary absolute transition-all" /> */}
        </div>
    );
};

export default HostMenu;
