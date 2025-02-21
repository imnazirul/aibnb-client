module.exports = {
    reactStrictMode: false,
    transpilePackages: ["geist"],
    env: {
        google_map: 'AIzaSyDIkOy2b--fTHoMju1muXyYXR2r0GJtutU',
        backend_url:
            process.env.NODE_ENV === "production"
                ? "https://backend.airbnb.appstick.com.bd/"
                : "https://backend.airbnb.appstick.com.bd/",
        socket_io_url:
            process.env.NODE_ENV === "production"
                ? "https://backend.airbnb.appstick.com.bd/"
                : "https://backend.airbnb.appstick.com.bd/",
        asset_url: "https://backend.airbnb.appstick.com.bd/",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "backend.airbnb.appstick.com.bd",
                port: '',
                pathname: "/assets/**",
            },
            {
                protocol: "https",
                hostname: "appstick-resources.s3.ap-southeast-1.amazonaws.com",
                port: '',
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "appstick.s3.ap-southeast-1.amazonaws.com",
                port: '',
                pathname: "/**",
            }
        ],
    },
}