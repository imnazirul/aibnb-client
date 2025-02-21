import React from "react";
import "../../styles/home.scss"
import Header from "./components/layout/header";
import "../../styles/auth.scss";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header/>
            {children}
        </>
    );
}

export default Layout;