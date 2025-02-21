"use client";
import React, { useState } from 'react';
import TabView from '../../(host)/host/reservations/item/tab';
import { ConfigProvider, Tabs } from 'antd';
import Payments from './item/payments';
import Payouts from './item/payouts';
import GuestContribute from './item/guest-contribute';

const page = () => {
    const [current, setCurrent] = useState('payments')

    return (
        <div>
            <h2 className='text-main text-xlRegular mb-6'>Payments & payouts</h2>
            <div className=' payment-tabs'>
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
                                                className={`rounded-md text-p2 px-4 py-2 cursor-pointer ${current === 'payments' ? ' bg-secondary' : 'text-main'}`}
                                                onClick={() => setCurrent('payments')}
                                            >
                                                Payments
                                            </span>
                                        </>,
                                        children: (
                                            <Payments />
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: <>
                                            <span
                                                className={`rounded-md text-p2 px-4 py-2 cursor-pointer ${current === 'payouts' ? 'bg-secondary' : 'text-main'}`}
                                                onClick={() => setCurrent('payouts')}
                                            >
                                                Payouts
                                            </span> </>,
                                        children: (
                                            <Payouts />
                                        ),
                                    },
                                    {
                                        key: '3',
                                        label: <>
                                            <span
                                                className={`rounded-md text-p2 px-4 py-2 cursor-pointer ${current === 'guest_contribute' ? 'bg-secondary' : 'text-main'}`}
                                                onClick={() => setCurrent('guest_contribute')}
                                            >
                                                Guest contributions
                                            </span> </>,
                                        children: (
                                            <GuestContribute />
                                        ),
                                    },
                                    
                                ]}
                            />

                        </ConfigProvider>
                    </div>
                </TabView>
            </div>
        </div>
    );
};

export default page;