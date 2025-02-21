'use client'
import React from 'react';;
import Icon from '../../../../components/common/icon';
import Link from 'next/link';
import SetupPament from './setup-pament';
import { Switch } from 'antd';

const Payouts = () => {
    const [isChecked, setIsChecked] = React.useState(true);

    const handleToggle = (checked) => {
        setIsChecked(checked);
    };
    return (
        <div className=" flex xl:flex-row flex-col gap-20">
            <div className="xl:w-1/2 mt-6">
                <div className=" ">
                    <h2 className="text-main text-sh mb-6">Guest contributions</h2>
                    <p className="text-p text-wrap ">
                        To show their appreciation for great hospitality, guests can send an optional financial contribution to a host after completing a stay or an Airbnb Experience. You can choose to automatically allow or decline future contributions from guests.
                    </p>
                </div>
                <div className="w-full mx-auto  ">
                    <div className="flex justify-between items-center  pb-6 border-b my-10 ">
                        <h3 className='text-p'>Allow contributions</h3>
                        <Switch
                            checked={isChecked}
                            onChange={handleToggle}
                            checkedChildren="✔"
                            unCheckedChildren="✖"
                        />
                    </div>
                    <p className="text-s text-wrap text-[#6a6a6a]">
                        100% of all contributions will be deposited into your payout account, unless you have an account balance. Your payout is subject to the{' '}
                        <Link className='underline text-black font-semibold' href="#" target="_blank">
                            Payment Terms of Service
                        </Link>. Please note that contributions may not be tax deductible or eligible for tax credits.
                    </p>
                    <p className="text-gray-600">
                        To learn more about guest contributions visit the{' '}
                        <Link className='underline text-black font-semibold' href="#" target="_blank">
                            Help Center
                        </Link>.
                    </p>
                </div>
            </div>
            <div className='xl:w-1/2 '>
                <div className="border rounded-md p-4 basis-[30%] sm:w-[350px] w-full  h-fit">
                    <Icon name="payment" />
                    <h4 className="mt-4 text-p">Don't want to keep a contribution?</h4>
                    <p className="text-gray-600 mb-4 text-wrap">
                        If you’ve already received a contribution that you don’t want to keep, consider making a donation of the same amount to your charity of choice.
                    </p>
                    <p className="text-gray-600 mb-4 text-wrap">Need some ideas? Here are some non-profit organizations working to help with the COVID-19 crisis:</p>
                    <ul className="flex flex-col gap-3">
                       
                            <Link href="https://internationalmedicalcorps.org/" target="_blank" className="text-black font-semibold underline">International Medical Corps</Link>
                       
                     
                            <Link href="https://www.rescue.org/" target='_blank' className="text-black font-semibold underline">International Rescue Committee</Link>
                        
                      
                            <Link href="https://www.ifrc.org/who-we-are/international-red-cross-and-red-crescent-movement" target='_blank' className="text-black font-semibold underline text-wrap">The International Federation of Red Cross and Red Crescent Societies</Link>
                        
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Payouts;