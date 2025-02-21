import React from "react";
import 'animate.css/animate.css'
import "../styles/common.scss";
import {GeistSans} from "geist/font/sans";
import Providers from "../providers/userProvider"
import 'react-loading-skeleton/dist/skeleton.css'

export const metadata = {
    title: 'AirBnB',
    description: 'Find the perfect place to stay',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
    return (
        <html lang="en" className={GeistSans.variable}>
        <Providers>
            <body suppressHydrationWarning={true}>{children}</body>
        </Providers>
        </html>
    )
}
