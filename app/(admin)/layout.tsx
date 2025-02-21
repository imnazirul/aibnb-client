"use client"

import React, {useEffect} from "react";
import "../../styles/admin.scss"
import {FaHome, FaPrint, FaShoppingBag, FaWrench} from "react-icons/fa";
import {FaBoxArchive} from "react-icons/fa6";
import Sidebar from "../../components/admin/layout/sidebar";
import Header from "../../components/admin/layout/header";
import MainLoader, {hideLoader} from "../../components/common/loader";
import {fetchUser} from "../../helpers/backend";
import {useRouter} from "next/navigation";

interface LayoutProps {
    children: React.ReactNode;
}


const Layout = ({children}: LayoutProps) => {
    const {push} = useRouter()

    useEffect(() => {
        hideLoader()
        fetchUser({}).then(({data}) => {
            if (!data?.role || data?.role !== 'admin') {
                push('/')
            }
        })
    }, [])


    return (
        <>
            <MainLoader/>
            <div className="dashboard">
                <Sidebar title="Dashboard" menu={menu}/>
                <Header title="Dashboard"/>
                <div className="content">
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Layout;


const menu = [
    {
        menu: "Menu",
    },
    {
        label: "Dashboard",
        href: "/admin",
        icon: <FaHome/>
    },
    {
        label: "Properties",
        icon: <FaBoxArchive/>,
        child: [
            {
                label: "Properties",
                href: "/admin/properties",
                childHrefs: [
                    '/admin/property/:uid',
                ]
            },
            {
                label: "Hosts",
                href: "/admin/hosts",
                childHrefs: [
                    '/admin/host/:uid',
                ]
            },
            {
                label: "Categories",
                href: "/admin/categories",
            },
            {
                label: "Tags",
                href: "/admin/tags",
            },
            {
                label: "Extra Features",
                href: "/admin/extras",
            },

        ]
    },
    {
        label: "Amenities",
        icon: <FaBoxArchive/>,
        child: [
            {
                label: "Amenities",
                href: "/admin/amenities",
                childHrefs: [
                    '/admin/amenities/add',
                    '/admin/amenities/:uid',
                ]
            },
            {
                label: "Categories",
                href: "/admin/amenities/categories",
            }
        ]
    },
    {
        label: "Bookings",
        icon: <FaShoppingBag/>,
        href: "/admin/bookings",
    },
    {
        label: "Reports",
        icon: <FaPrint/>,
        href: "/admin/reports",
    },
    {
        label: "Settings",
        href: "/admin/settings",
        icon: <FaWrench/>
    },
]