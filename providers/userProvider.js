"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import UserContext from "../contexts/user";
import { fetchUser } from "../helpers/backend";


const Providers = ({ children }) => {
    const [user, setUser] = useState({});
    const router = useRouter();
    useEffect(() => {
        getUser().then(() => {})
    }, [])

    const getUser = async () => {
        const { data, error } = await fetchUser();
        if (error === false) {
            setUser(data);
        } else {
            // router.push("/");
            setUser({});
        }
    };


    return (
        <UserContext.Provider value={{ user, setUser, getUser }}>
            <SkeletonTheme color="#0F172A" highlightColor="#444">
                {children}
            </SkeletonTheme>
        </UserContext.Provider>
    )
}

export default Providers;