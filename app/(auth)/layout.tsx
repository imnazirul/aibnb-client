import React from "react";
import Header from "../(home)/components/layout/header";
import Footer from "../(home)/components/layout/footer";
import "../../styles/auth.scss";


interface LayoutProps {
    children: React.ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default Layout;