"use client"

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {FaBars, FaBell, FaUser} from "react-icons/fa";
import {useUser} from "../../../../contexts/user";
import {Dropdown} from "antd";

const Header = () => {
    const {user} = useUser()

    return (
        <header className="flex justify-between items-center px-6 py-4 border-b">
            <Link
                href="/host"
            >
                <img
                    src="/logo_1.png"
                    alt=""
                    className="h-8"/>
            </Link>
            <div className="hidden md:flex gap-2">
                <NavLink label="Today" href="/host"/>
                <NavLink label="Calender" href="/host/calendar"/>
                <NavLink label="Listings" href="/host/listings"/>
                <NavLink label="Messages" href="/host/messages"/>
            </div>

            <div
                className="hidden md:flex gap-4 items-center"
            >
                <div className="bg-gray-200 rounded-full p-3">
                    <FaBell className="text-gray-800"/>
                </div>
                <UserMenu/>
            </div>
        </header>
    )
}

export default Header;



const NavLink = ({label, href}) => {
    const pathname = usePathname()
    const isActive = pathname === href
    return (
        <div>
            <Link
                className={`text-sm font-medium px-4 py-1.5 rounded-full hover:bg-gray-100 ${isActive ? 'text-black' : 'text-secondaryText'}`}
                href={href}>
                {label}
            </Link>
            {isActive && <div className="h-0.5 w-4 mx-auto bg-black mt-0.5"/>}
        </div>
    )
}

const UserMenu = () => {
    const router = useRouter();
    const {user} = useUser()

    const userLogout = () => {
        localStorage.removeItem('token')
        router.push('/')
        window.location.reload()
    }


    return (
        <div className="relative">
            <Dropdown
                rootClassName="user-dropdown"
                trigger={['click']}
                menu={{
                    items: [
                        {
                            key: 1,
                            label: (
                                <Link href="/profile">
                                    Profile
                                </Link>
                            )
                        },
                        {
                            key: 2,
                            label: (
                                <Link href="/account">
                                    Account
                                </Link>
                            )
                        },
                        {
                            type: 'divider',
                        },
                        {
                            key: 3,
                            label: (
                                <Link href="/">
                                    Switch to Traveling
                                </Link>
                            )
                        },
                        {
                            key: 4,
                            label: (
                                <div onClick={userLogout}>
                                    Logout
                                </div>
                            )
                        }

                    ]
                }}
            >
                <div
                    role="button">
                    <div className="bg-gray-200 rounded-full p-3">
                        <FaUser className="text-gray-800"/>
                    </div>
                </div>
            </Dropdown>
        </div>
    )
}