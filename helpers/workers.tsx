"use client"

import {useEffect} from "react";

const ServiceWorker = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/workers/asset.js')
                .then((registration) => console.log('scope is: ', registration.scope));
        }
    }, []);


    return (
        <></>
    )
}

export default ServiceWorker;