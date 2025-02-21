"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import ListingCard from './listing-card';
import { Form, Modal } from 'antd';

interface Listing {
    id: number;
    category: string;
    title: string;
    img: string;
    rate: string;

}

const Listing: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current && (swiperRef.current as any).swiper) {
            (swiperRef.current as any).swiper.update();
        }
    }, []);

    const goNext = () => {
        if (swiperRef.current && (swiperRef.current as any).swiper) {
            (swiperRef.current as any).swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (swiperRef.current && (swiperRef.current as any).swiper) {
            (swiperRef.current as any).swiper.slidePrev();
        }
    };

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    const listings: Listing[] = [
        { id: 1, category: 'Home', title: 'Beautiful 4Br Beachfront', img: 'https://a0.muscache.com/im/pictures/b89af63c-5ec3-46dd-be67-879b682cf1d1.jpg?im_w=1200', rate: '4.96' },
        { id: 2, category: 'Home', title: 'Beautiful 4Br Beachfront', img: 'https://a0.muscache.com/im/pictures/b89af63c-5ec3-46dd-be67-879b682cf1d1.jpg?im_w=1200', rate: '4.96' },
        { id: 3, category: 'Home', title: 'Beautiful 4Br Beachfront', img: 'https://a0.muscache.com/im/pictures/b89af63c-5ec3-46dd-be67-879b682cf1d1.jpg?im_w=1200', rate: '4.96' },
        { id: 4, category: 'Home', title: 'Beautiful 4Br Beachfront', img: 'https://a0.muscache.com/im/pictures/b89af63c-5ec3-46dd-be67-879b682cf1d1.jpg?im_w=1200', rate: '4.96' },
        { id: 5, category: 'Home', title: 'Beautiful 4Br Beachfront', img: 'https://a0.muscache.com/im/pictures/b89af63c-5ec3-46dd-be67-879b682cf1d1.jpg?im_w=1200', rate: '4.96' },
        { id: 6, category: 'Home', title: 'Beautiful 4Br Beachfront', img: 'https://a0.muscache.com/im/pictures/b89af63c-5ec3-46dd-be67-879b682cf1d1.jpg?im_w=1200', rate: '4.96' },
        { id: 7, category: 'Home', title: 'Beautiful 4Br Beachfront', img: 'https://a0.muscache.com/im/pictures/b89af63c-5ec3-46dd-be67-879b682cf1d1.jpg?im_w=1200', rate: '4.96' },
        { id: 8, category: 'Home', title: 'Beautiful 4Br Beachfront', img: 'https://a0.muscache.com/im/pictures/b89af63c-5ec3-46dd-be67-879b682cf1d1.jpg?im_w=1200', rate: '4.96' },
        { id: 9, category: 'Home', title: 'Beautiful 4Br Beachfront', img: 'https://a0.muscache.com/im/pictures/b89af63c-5ec3-46dd-be67-879b682cf1d1.jpg?im_w=1200', rate: '4.96' },
        { id: 10, category: 'Home', title: 'Beautiful 4Br Beachfront', img: 'https://a0.muscache.com/im/pictures/b89af63c-5ec3-46dd-be67-879b682cf1d1.jpg?im_w=1200', rate: '4.96' },
        { id: 11, category: 'Home', title: 'Beautiful 4Br Beachfront', img: 'https://a0.muscache.com/im/pictures/b89af63c-5ec3-46dd-be67-879b682cf1d1.jpg?im_w=1200', rate: '4.96' },
        { id: 12, category: 'Home', title: 'Beautiful 4Br Beachfront', img: 'https://a0.muscache.com/im/pictures/b89af63c-5ec3-46dd-be67-879b682cf1d1.jpg?im_w=1200', rate: '4.96' },
    ];

    return (
        <>
            <div className='border-y py-8 mt-8 w-full'>
                <div className='flex justify-between items-center w-full mb-8'>
                    <h2 className='text-title_sss'>Rachel & Stu’s listings</h2>
                    <div className='flex gap-4 w-fit'>
                        <button className='text-title_sm border rounded-full' onClick={goPrev}><RiArrowLeftSLine /></button>
                        <button className='text-title_sm border rounded-full' onClick={goNext}><RiArrowRightSLine /></button>
                    </div>
                </div>
                <div className='w-full mb-6'>
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={10}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                            },
                            640: {
                                slidesPerView: 3,
                            },
                        }}
                        className=''
                    >
                        {listings.map((data) => (
                            <SwiperSlide key={data.id} className='bg-white rounded-md w-full'>
                                <ListingCard data={data} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <span onClick={() => setOpen(true)} className='underline text-h3 cursor-pointer'>View all {listings.length} listings</span>
            </div>

            <Modal
                className='2xl:!w-[50%] lg:!w-[70%] !h-fit !rounded-xl'
                open={open}
                onCancel={() => setOpen(false)}
                centered
                title={<p className='text-title_md mt-12'>Rachel & Stu’s listings</p>}
                footer={null}
            >
                <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  h-[80vh] overflow-auto gap-6 mt-6 pe-5 '>
                    {listings.map((data) => (
                        <SwiperSlide key={data.id} className='bg-white rounded-md w-full'>
                            <ListingCard data={data} />
                        </SwiperSlide>
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default Listing;
