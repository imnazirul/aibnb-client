"use client";


import {useState} from "react";
import SearchBar from "../search/search-bar";


const Hero = () => {
    const [active, setActive] = useState(1);

    return (
        <div
            className="relative z-10 flex flex-col items-center h-full w-full text-white">

            {/*<div className="flex justify-center items-center gap-6 mb-8">*/}
            {/*    <button onClick={() => setActive(1)}*/}
            {/*            className={`py-[7px] px-[23px] text-xl font-bold ${active === 1 ? "bg-primary" : ""} rounded-[4px]`}>*/}
            {/*        Stay*/}
            {/*    </button>*/}
            {/*    <button onClick={() => setActive(2)}*/}
            {/*            className={`py-[7px] px-[23px] text-xl font-bold ${active === 2 ? "bg-primary" : ""} rounded-[4px]`}>*/}
            {/*        Experience*/}
            {/*    </button>*/}
            {/*</div>*/}
            <SearchBar isActiveHeader active={active}/>

        </div>
    );
};

export default Hero;