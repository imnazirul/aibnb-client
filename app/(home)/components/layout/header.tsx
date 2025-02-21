'use client';

import { FaBars, FaUser } from "react-icons/fa";
import Link from "next/link";
import { Dropdown } from "antd";
import { useUser } from "../../../../contexts/user";
import AuthModal from "../../../../components/auth/auth-modal";
import { useState } from "react";
import Welcome from "../../../../components/auth/welcome";
import Login from "../../../../components/auth/login";
import SignUp from "../../../../components/auth/signup";
import ForgetPassword from "../../../../components/auth/forget-pass";
import { useRouter } from "next/navigation";

const Header = () => {

    const { user } = useUser()

    return (
        <>
            <header className="hidden md:block sticky top-0 bg-white z-10">
                <div className="container">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <Link
                                href="/"
                            >
                                <img
                                    src="/logo_1.png"
                                    alt=""
                                    className="h-10" />
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            {user?.role === 'admin' && (
                                <Link href="/admin">Go to Admin</Link>
                            )}
                            {user?.role === 'user' && (
                                <Link href="/host">Switch to hosting</Link>
                            )}

                            <UserMenu />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;


const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [current, setCurrent] = useState('welcome')
    const [userValue, setUserValue] = useState();
    const { user } = useUser()


    let menu: any = [
        {
            key: 1,
            label: (
                <div onClick={() => { setIsOpen(true); setCurrent('welcome') }}>
                    Login
                </div>
            )
        },
        {
            key: 2,
            label: (
                <div onClick={() => { setIsOpen(true); setCurrent('welcome') }}>
                    Signup
                </div>
            )
        },
    ]

    if (user?.role === 'admin') {
        menu = [
            {
                key: 1,
                label: (
                    <Link href="/admin">
                        Console
                    </Link>
                )
            },
        ]
    }

    if (user?.role === 'user') {
        menu = [
            {
                key: 1,
                label: (
                    <Link href="/account">
                        Account
                    </Link>
                )
            },
            {
                key: 2,
                label: (
                    <Link href="/profile">
                        Profile
                    </Link>
                )
            },
            {
                key: 3,
                label: (
                    <Link href="/bookings">
                        My Bookings
                    </Link>
                )
            },
        ]
    }


    return (
        <div className="relative z-30">
            <Dropdown
                rootClassName="user-dropdown"
                trigger={['click']}
                menu={{
                    items: [
                        ...menu,
                        {
                            type: 'divider',
                        },
                        {
                            key: 10,
                            label: 'Gift Cards'
                        },
                        {
                            key: 11,
                            label: 'Help Center'
                        },
                        ...(!!user?._id ? [
                            {
                                key: 12,
                                label: (
                                    <a onClick={() => {
                                        localStorage.removeItem('token')
                                        window.location.reload()
                                    }}>
                                        Logout
                                    </a>
                                )
                            },
                        ] : [])

                    ]
                }}
            >
                <div
                    role="button"
                    className="border border-gray-700 rounded-full px-4 py-2.5 text-gray-700 flex items-center gap-2.5">
                    <FaBars />
                    <FaUser />
                </div>
            </Dropdown>

            <AuthModal open={isOpen} setOpen={setIsOpen}
                title={
                    current === 'welcome' && "Log in or sign up" ||
                    current === 'login' && "Log in" ||
                    current === 'signup' && "Sign up" ||
                    current === 'forgetPass' && "Forgot password"
                }
                maskClosable={false}
            >
                <div className="pt-4">
                    {
                        current === 'welcome' &&
                        <Welcome setCurrent={setCurrent} setUserValue={setUserValue} userValue={userValue} />
                    }
                    {
                        current === 'login' &&
                        <Login userValue={userValue} setOpen={setIsOpen} setCurrent={setCurrent} />
                    }
                    {
                        current === 'signup' &&
                        <SignUp userValue={userValue} setIsOpen={setIsOpen} />
                    }
                    {
                        current === 'forgetPass' &&
                        <ForgetPassword setIsOpen={setIsOpen} />
                    }
                </div>
            </AuthModal>

        </div >
    )
}