'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import SearchBar from '../home/search/search-bar';

const Banner = ({ tab1, tab2, bg }) => {
    const [active, setActive] = useState(1);

    return (
        <div className='w-full h-[200px] relative '>
            <Image src={bg} width={500} height={400} alt='banner' className='w-full h-full absolute' />
            <div className='bg-black/70 w-full h-full relative '>
                <div className='container  h-full flex items-end justify-center '>
                    <div className='w-fit  h-fit  relative top-8  z-20'>
                        <div className="flex gap-6 mb-10 text-white justify-center">
                            <button onClick={() => setActive(1)}
                                className={`py-[7px] px-[23px] text-xl font-bold ${active === 1 ? "bg-primary" : ""} rounded-[4px]`}>
                                {tab1}
                            </button>
                            <button onClick={() => setActive(2)}
                                className={`py-[7px] px-[23px] text-xl font-bold ${active === 2 ? "bg-primary" : ""} rounded-[4px]`}>
                                {tab2}
                            </button>
                        </div>
                        <SearchBar isActiveHeader active={active} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;