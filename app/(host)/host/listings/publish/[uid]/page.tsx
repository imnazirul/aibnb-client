"use client"
import React, { useEffect, useState } from 'react';
import { fetchProperty } from '../../../../../../helpers/backend';
import Property from '../../components/property';
import Icon from '../../../../../../components/common/icon';
import Button from '../../../../../../components/common/button';
import { useRouter } from 'next/navigation';

const ListingPublish = ({ params }) => {
    const [data, setData] = useState({})
    const router = useRouter();

    useEffect(() => {
        fetchProperty(params).then(({ error, data }) => {
            if (error) return
            setData(data)
        })
    }, [])

    console.log(data)

    const whatsNext = [
        {
            icon: 'calender',
            title: 'Set up your calendar',
            description: 'Choose which dates are available. Guests can start booking 24 hours after you publish.'
        },
        {
            icon: 'user-hands',
            title: 'Adjust you setting',
            description: 'Set house rules, select a cancellation policy, choose how guests can book, and more.'
        },
        {
            icon: 'edit-icon',
            title: 'Prepare for your first guest',
            description: 'Find tips in our Resource Center and access customer support.'
        }

    ]

    return (
        <div>
            <div className='flex flex-col gap-2 mb-10'>
                <h2 className='text-main text-xlMedium'>Yay! It’s time to publish.</h2>
                <span className='text-secondaryText text-p2'>Here's what we'll show to guests. Before you publish, make sure to review the details.</span>
            </div>
            <div className='flex flex-col gap-6'>
                <h2 className='text-title_md text-main'>
                    Thumbnail Preview
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[42px] items-start'>
                    <Property data={data} />
                    <div className='flex flex-col gap-4'>
                        <span className='text-title_md text-main mb-6'>What’s next?</span>
                        {
                            whatsNext.map((item, index) => (
                                <div key={index} className='flex gap-4'>
                                    <Icon name={item.icon} />
                                    <div className='flex flex-col'>
                                        <h2 className='text-main text-c1'>{item.title}</h2>
                                        <span className='text-secondaryText text-p2'>{item.description}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Button className='!bg-white !text-primary border border-primary flex justify-center items-center gap-2 w-[230px] md:self-start md:place-self-end'>
                        <Icon name={"eye-primary"} />
                        Preview Project
                    </Button>
                </div>
            </div>
            <div className='border-t mt-10 pt-6'>
                <div className="flex justify-between items-center">
                    <div className='text-main text-p underline !cursor-pointer'
                        onClick={() => router.back()}
                    >
                        Back
                    </div>
                    <div className="flex gap-x-6">
                        <Button className="text-primary border border-primary bg-white text-p h-14">Save and Exit</Button>

                        <Button className="text-white text-p lg:w-[140px] h-14"
                        // onClick={() => {
                        //     form.validateFields().then(value => {
                        //         if (current < steps.length - 1) {
                        //             next()
                        //         } else {
                        //             form.submit()
                        //         }
                        //     }).catch(e => {

                        //     })
                        // }}
                        >
                            Publish
                        </Button>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default ListingPublish;