"use client";
import React, { useState } from 'react';
import TabView from '../../(host)/host/reservations/item/tab';
import { ConfigProvider, Tabs } from 'antd';
import Taxpayers from './item/taxpayers';
import TaxDocuments from './item/tax-documents';


const page = () => {
    const [current, setCurrent] = useState('taxpayers')

    return (
        <div>
            <h2 className='text-main text-xlRegular mb-6 text-[#222222]'>Taxes</h2>
            <div className='payment-tabs'>
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
                                                className={`rounded-md text-p2 px-4 py-2 cursor-pointer ${current === 'taxpayers' ? ' bg-secondary' : 'text-main'}`}
                                                onClick={() => setCurrent('taxpayers')}
                                            >
                                                Taxpayers
                                            </span>
                                        </>,
                                        children: (
                                            <Taxpayers />
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: <>
                                            <span
                                                className={`rounded-md text-p2 px-4 py-2 cursor-pointer ${current === 'tax-documents' ? 'bg-secondary' : 'text-main'}`}
                                                onClick={() => setCurrent('tax-documents')}
                                            >
                                                Tax documents
                                            </span> </>,
                                        children: (
                                            <TaxDocuments />
                                        ),
                                    }                                    
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