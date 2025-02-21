"use client";

import {FiHeart, FiMessageSquare, FiSearch, FiUser} from "react-icons/fi";
import Link from "next/link";

const Footer = () => {

    const menu = [
        {
            label: 'Explore',
            icon: <FiSearch/>,
            link: '/'
        },
        {
            label: 'Wishlist',
            icon: <FiHeart/>,
            link: '/wishlist'
        },
        {
            label: 'Messages',
            icon: <FiMessageSquare/>,
            link: '/messages'
        },
        {
            label: 'Account',
            icon: <FiUser/>,
            link: '/profile'
        },
    ]


    return (
        <>
            <div className="p-8 md:p-4"/>
            <footer className="fixed left-0 bottom-0 md:hidden w-full bg-white px-4 z-10">
                <div className="container flex justify-between items-center p-4 border-t">
                    {menu.map((item, index) => (
                        <Link
                            href={item.link}
                            key={index}>
                            <div className="flex flex-col items-center gap-1">
                                {item.icon}
                                <p className="text-xs">{item.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </footer>
            <footer className="fixed bottom-0 w-full bg-white p-2.5 border-t hidden md:block">
                <div className=" container flex">
                    <p className=" text-sm text-gray-500">© 2021 All rights reserved</p>
                </div>
            </footer>
        </>
    )
}
export default Footer;