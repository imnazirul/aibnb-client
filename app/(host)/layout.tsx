import React from 'react';
import '../../styles/host.scss';
import MainLoader from '../../components/common/loader';
import Header from "./components/layout/header";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div>
            <MainLoader/>
            <Header/>
            {children}
        </div>
    );
};

export default Layout;