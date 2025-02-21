import Image from 'next/image';
import React from 'react';

const Overview = () => {
    const data = [
        {
            title: 'Tell us about your place',
            description: 'Share some basic info, like where it is and how many guests can stay.',
            image: '/start.png'
        },
        {
            title: 'Make it stand out',
            description: 'Add 5 or more photos plus a title and description—we’ll help you out.',
            image: '/start1.png'
        },
        {
            title: 'Finish up and publish',
            description: 'Choose a starting price, verify a few details, then publish your listing.',
            image: '/start2.png'
        }
    ]
    return (
        <>
            <div className="md:flex gap-10 items-center text-main w-full">
                <h1 className='md:basis-1/2 text-xxxlMedium'>It’s easy to get started on Airbnb</h1>
                <div className="md:basis-1/2">
                    {
                        data.map((item, index) =>
                         <div key={index} className={`flex items-start gap-3 text-title_m pt-10 ${index === data?.length - 1 ? '' : 'pb-10 border-b'}`}>
                            <p>{index + 1}.</p>
                            <div className="flex items-start gap-5 md:gap-[60px]">
                                <div className="">
                                    <h1 className='mb-3'>{item?.title}</h1>
                                    <p className='text-h5 text-secondaryText'>{item?.description}</p>
                                </div>
                                <Image src={item?.image} width={120} height={120} alt='image' className='h-[120px]' />
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </>
    );
};

export default Overview;