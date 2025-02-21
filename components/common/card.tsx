"use client";
import { Carousel } from 'antd';
import Link from 'next/link';
import React, { useRef } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Icon from './icon';
import { MdLocationPin } from "react-icons/md";

const MainCard = () => {
    const item = {
        _id: 1,
        type: 'hotel',
        category: {
            name: 'Apartment'
        },
        city: 'New York',
        country: 'USA',
        images: ['128.png', '106.png', '130.png'],
        title: 'Hotel Relax Ali Baba',
        price: 2000,
        location: 'Jeddah - An Nuzhah Dis',
        bedrooms: 3,
        bathrooms: 2,
        rooms: 4,
        rate: 4.5,
        agent: {
            name: 'John Doe',
        }
    };
    const carouselRef = useRef(null);

    return (
        <div className=' group card'>
            <div className='relative'>
                <div onClick={() => carouselRef.current.prev()} className='card-arrow-left group-hover:opacity-100'>
                    <AiOutlineLeft></AiOutlineLeft>
                </div>
                <div onClick={() => carouselRef.current.next()} className='card-arrow-right group-hover:opacity-100'>
                    <AiOutlineRight></AiOutlineRight>
                </div>
                <div className={`card-type`}>
                    {item?.type}
                </div>
                <div className={`absolute rounded right-2 top-2  px-3 py-2 text-white`}>
                    <Icon name="heart" />
                </div>
                <div className='relative -z-50 ant-carousel'>
                    <Carousel autoplay ref={carouselRef} >
                        {
                            item?.images?.map((item, index) => <div key={index} className='w-full h-[256px]'>
                                <img className='w-full rounded-t-md object-contain' src={item} alt='' />
                            </div>)
                        }
                    </Carousel>
                </div>
            </div>
            <div className='py-2'>
                <div className='flex items-center justify-between'>
                    <Link href={`#`}>
                        <h1 className='text-c1 cursor-pointer capitalize group-hover:text-primary'>
                            {item?.title?.length > 25 ? item?.title.slice(0, 25) + '...' : item?.title}
                        </h1>
                    </Link>
                    <div className='flex justify-center items-center gap-0.5'>
                        <Icon name='star-primary' />
                        <span className='md:mt-0 text-secondaryText font-[14px]'>{item?.rate}</span>
                    </div>
                </div>
                <p className='pt-1 text-secondaryText flex items-center gap-1'>
                    <MdLocationPin className='w-4 h-4' />
                    {
                        item?.location?.length > 150 ? item?.location.slice(0, 150) + '...' : item?.location
                    }
                </p>
            </div>

            <div className=''>
                <div className='flex flex-col justify-between gap-1 pb-3'>
                    <div className='flex items-center'>
                        <span className='text-primary text-h4'>$24.0</span>
                        <span className='text-secondaryText text-s ml-1'>/Night</span>
                        <del className='text-error ml-2.5'>$20</del>
                    </div>
                    <div className='flex'>
                        <span className='text-secondaryText'>Jul 20-25</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainCard;