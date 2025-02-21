import {MainSearch} from "../components/home/search";
import Tabs from "./tabs";
import Properties from "../components/home/properties";
import React, {Suspense} from "react";

const Search = () => {


    return (
        <Suspense fallback={<></>}>
            <div
                className="fixed md:sticky top-0 md:top-[72px] z-20 bg-white"
            >
                <MainSearch isStuck={true}/>
                <div className="hidden md:block">
                    <Tabs/>
                </div>
            </div>
            <Properties map={true}/>
        </Suspense>
    )
}

export default Search;