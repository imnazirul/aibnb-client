import Properties from "./components/home/properties";
import Tabs from "./components/home/tabs";
import Search from "./components/home/search";
import Footer from "./components/layout/footer";
import React, {Suspense} from "react";

const Page =  () => {

    return (
        <Suspense fallback={<></>}>
            <div
                className="fixed md:sticky top-0 md:top-[70px] z-20 bg-white w-full"
            >
                <Search/>
                <Tabs/>
            </div>
            <Properties/>
            <Footer/>
        </Suspense>
    );
};

export default Page;
