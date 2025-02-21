"use client";
import React, { useEffect, useState } from "react";
import "../../styles/host.scss"
import { fetchUser } from "../../helpers/backend";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Footer from "../(home)/components/layout/footer";
import Header from "../(home)/components/layout/header";
import Link from "next/link";
import '../../styles/user.scss'
import { FaCheck } from "react-icons/fa";
import Button from "../../components/common/button";

interface LayoutProps {
    children: React.ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const path = usePathname();
    const [info, setInfo] = useState(false);
    const [user, setUser] = useState(null);
    const [verify, setVerify] = useState(false);

    useEffect(() => {
        fetchUser({}).then(({ error, data }) => {
            if (error === false && data.role === "user") {
                setUser(data);
            } else {
                router.push("/");
            }
        });
    }, []);

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default Layout;