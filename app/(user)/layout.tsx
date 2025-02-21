"use client";

import React, {useEffect, useState} from "react";
import "../../styles/host.scss"
import {fetchUser} from "../../helpers/backend";
import MainLoader, {hideLoader} from "../../components/common/loader";
import {usePathname, useRouter} from "next/navigation";
import Footer from "../(home)/components/layout/footer";
import Header from "../(home)/components/layout/header";
import Icon from "../../components/common/icon";
import Link from "next/link";
import {CgMenuRound} from "react-icons/cg";
import {Drawer} from "antd";
import '../../styles/user.scss'

interface LayoutProps {
    children: React.ReactNode;
}


const Layout = ({children}: LayoutProps) => {
    const router = useRouter();
    const page = usePathname();
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchUser({}).then(({error, data}) => {
            if (error === false && data.role === "user") {
                hideLoader();
                setUser(data);
            } else {
                router.push("/");
            }
        });
    }, []);

    const links = [
        {title: "Personal information", href: "/account", icon: "user-id"},
        {title: "Password & security", href: "#", icon: "security"},
        {title: "Payment & payout", href: "/payments", icon: "payment-layout"},
        {title: "Taxes", href: "/taxes", icon: "notes"},
        {title: "Notifications", href: "#", icon: "bell"},
        {title: "Privacy & Sharing", href: "#", icon: "eye"},
        {title: "Travel work", href: "#", icon: "suitcase"},
        {title: "Professional tools", href: "#", icon: "chart-2"},
        {title: "Referral credit & Coupon", href: "#", icon: "gift"},
        {title: "Other setting", href: "#", icon: "settings"},
    ]

    if (!user) {
        return (
            <>
                <MainLoader/>
            </>
        );
    }

    return (
        <>
            <Header/>
            <div>
                <div className="container my-12  mx-auto">
                    <div className="md:flex mt-[32px]">
                        <div className="user-sidebar">
                            <div className="p-4">
                                <div className="flex items-center justify-between space-x-2 ">
                                    <h1 className="text-main">Hi, {user?.name}</h1>
                                    <div className=''>
                                        <Link href='/profile' className='text-main underline text-h4 left-1'>
                                            Go to profile
                                        </Link>
                                    </div>
                                </div>


                            </div>
                            <ul className="mt-2">
                                {
                                    links.map((link, index) => (
                                        <li
                                            key={index}
                                            className={`list text-h4
                                    ${page === link.href
                                                ? "text-black "
                                                : "text-main"
                                            }`}
                                        >
                                            <Link
                                                className="flex cursor-pointer items-center gap-4 hover:text-black"
                                                href={link.href}
                                            >
                                                <span className="mr-2 text-[20px]">
                                                    <Icon name={link?.icon} className="icon"/>
                                                </span>
                                                <span className="text-h4">{link.title}</span>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <CgMenuRound className="text-3xl mx-2 my-1.5 md:my-0 block lg:hidden cursor-pointer"
                                     onClick={showDrawer}/>


                        <div className="md:px-10 px-2 w-full dashboard-shadow rounded overflow-x-auto">
                            {children}
                        </div>
                    </div>
                </div>
                <Drawer placement="left" title="" onClose={onClose} open={open}>
                    <ul className="flex flex-col gap-4 mb-8">
                        {
                            links.map((link, index) => (
                                <li
                                    key={index}
                                    className={`list text-h4
                                    ${page === link.href
                                        ? "text-main"
                                        : "text-primary"
                                    }`}
                                >
                                    <Link
                                        className="flex cursor-pointer items-center py-2 px-4"
                                        href={link.href}
                                    >
                                        <span className="mr-2 text-[20px]">
                                            <Icon name={link?.icon} className="icon"/>
                                        </span>
                                        <span className=" !font-medium text-base ">{link.title}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </Drawer>
            </div>
            <Footer/>

        </>
    );
}

export default Layout;