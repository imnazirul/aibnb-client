'use client'
import React from 'react';;

import Link from 'next/link';
import Icon from '../../../../../components/common/icon';


const Payouts = () => {
    return (
        <div className=" flex xl:flex-row flex-col gap-20">
            <div className=" xl:w-1/2 mt-6">
                <div className="basis-[50%] ">
                    <h2 className="text-main text-sh mb-6">Your payments</h2>
                    <p className="text-p text-[#6a6a6a] w-[80%]  text-wrap">
                        Once you have a reservation, this is where you can come to track your payments and refunds.
                    </p>
                </div>
            </div>
            <div className='xl:w-1/2'>
                <div className="border rounded-md p-4 basis-[30%] sm:w-[350px] w-ful h-fit">
                    <h1 className='text-h3'>Need help?</h1>
                    <div className='mt-4 flex flex-col gap-3'>
                        <Link href={'#'}>
                            <p className='text-sb flex justify-between items-center'><span className='underline'>How do payment plans work?</span><Icon name="arrow-right" /></p>
                        </Link>
                        <Link href={'#'}>
                            <p className='text-sb flex justify-between items-center'><span className='underline'>How do I pay for my long-term reservation?</span><Icon name="arrow-right" /></p>
                        </Link>
                        <Link href={'#'}>
                            <p className='text-sb flex justify-between items-center'><span className='underline'>Where can I find my payment?</span><Icon name="arrow-right" /></p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payouts;