'use client'
import React from 'react';;
import Icon from '../../../../components/common/icon';
import Link from 'next/link';
import SetupPament from './setup-pament';

const Payouts = () => {
    return (
        <div className=" flex xl:flex-row flex-col gap-20">
            <div className="xl:w-1/2 mt-6">
                <div className="">
                    <SetupPament />
                </div>
            </div>
            <div className='xl:w-1/2'>
                <div className="border rounded-md p-4 sm:w-[350px] w-ful h-fit">
                    <h1 className='text-h3'>Need help?</h1>
                    <div className='mt-4 flex flex-col gap-3'>
                        <Link href={'#'}>
                            <p className='text-sb flex justify-between items-center'><span className='underline'>When you'll get your payout</span><Icon name="arrow-right" /></p>
                        </Link>
                        <Link href={'#'}>
                            <p className='text-sb flex justify-between items-center'><span className='underline'>How payouts work</span><Icon name="arrow-right" /></p>
                        </Link>
                        <Link href={'#'}>
                            <p className='text-sb flex justify-between items-center'><span className='underline'>Go to your transaction history</span><Icon name="arrow-right" /></p>
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Payouts;