"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Icon from '../../../../components/common/icon';
import { ConfigProvider, Dropdown, Tabs } from 'antd';
import TabView from './item/tab';
import Upcoming from './item/upcoming';
import Completed from './item/completed';
import Canceled from './item/canceled';
import All from './item/all';
import { useFetch } from '../../../../helpers/hooks';
import { fetchBookings } from '../../../../helpers/backend';


const page = () => {
    const router = useRouter();
    const [current, setCurrent] = useState('upcoming')
    const [bookings, getBookings] = useFetch(fetchBookings, {
        for: 'owner'
    })

    let menu: any = [
        {
            key: 1,
            label: (
                <div className='text-p2 font-semibold underline'>
                    Download CSV file…
                </div>
            )
        },
        {
            key: 2,
            label: (
                <div className='text-p2 font-semibold underline'>
                    Sync your reservations…
                </div>
            )
        },
    ]



    return (
        <div className='p-6'>
            <div className="pb-4">
                <div className="flex items-center justify-between space-x-5 ">
                    <div onClick={() => router.back()} className='cursor-pointer'>
                        <MdOutlineKeyboardArrowLeft className='h-8 w-8 hover:bg-secondary rounded-full' />
                    </div>

                    <div className='flex items-center gap-2.5'>
                        <button className='text-black border border-black px-4 py-1.5 rounded-md flex items-center gap-2'><Icon name="setting-filter" />Filter</button>
                        <Dropdown
                            rootClassName="export-dropdown"
                            trigger={['click']}
                            menu={{
                                items: [
                                    ...menu,
                                ]
                            }}
                            placement="bottomLeft"
                        >
                            <div
                                role="button"
                                className="border border-black rounded-md px-4 py-1.5 text-black flex items-center gap-2">
                                Export
                                <IoIosArrowDown />
                            </div>
                        </Dropdown>
                        <button className='text-black border border-black px-4 py-1.5 rounded-md'>Print</button>
                    </div>
                </div>
            </div>

            <h2 className='text-xlMedium text-main font-semibold'>Reservations</h2>

            <div className='border-b'>
                <TabView value={current} current={current}>
                    <div className="py-8">

                        <ConfigProvider
                            theme={{
                                components: {
                                    Tabs: {
                                        itemColor: '#000000',
                                        itemHoverColor: '#000000',
                                        itemSelectedColor: '#000000',
                                        itemActiveColor: '#000000',
                                        inkBarColor: '#000000',

                                    },
                                },
                            }}>
                            <Tabs
                                defaultActiveKey="1"
                                items={[
                                    {
                                        key: '1',
                                        label: <>
                                            <span
                                                className={`rounded-md text-p2 px-4 py-2 cursor-pointer ${current === 'upcoming' ? ' bg-secondary' : 'text-main'}`}
                                                onClick={() => setCurrent('upcoming')}
                                            >
                                                Upcoming
                                            </span>
                                        </>,
                                        children: (
                                            <Upcoming bookings={bookings} />
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: <>
                                            <span
                                                className={`rounded-md text-p2 px-4 py-2 cursor-pointer ${current === 'completed' ? 'bg-secondary' : 'text-main'}`}
                                                onClick={() => setCurrent('completed')}
                                            >
                                                Completed
                                            </span> </>,
                                        children: (
                                            <Completed bookings={bookings} />
                                        ),
                                    },
                                    {
                                        key: '3',
                                        label: <>
                                            <span
                                                className={`rounded-md text-p2 px-4 py-2 cursor-pointer ${current === 'canceled' ? 'bg-secondary' : 'text-main'}`}
                                                onClick={() => setCurrent('canceled')}
                                            >
                                                Canceled
                                            </span> </>,
                                        children: (
                                            <Canceled bookings={bookings} />
                                        ),
                                    },
                                    {
                                        key: '4',
                                        label: <>
                                            <span
                                                className={`rounded-md text-p2 px-4 py-2 cursor-pointer ${current === 'all' ? 'bg-secondary' : 'text-main'}`}
                                                onClick={() => setCurrent('all')}
                                            >
                                                All
                                            </span> </>,
                                        children: (
                                            <All bookings={bookings} />
                                        ),
                                    },
                                ]}
                            />

                        </ConfigProvider>
                    </div>
                </TabView>
            </div>
            <p className='text-center text-p2 py-6'>How can we make it easier to manage your reservations? <span className='inline-block underline text-p cursor-pointer'>Share your feedback</span></p>
        </div>
    );
};

export default page;