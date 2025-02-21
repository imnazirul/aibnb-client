"use client"
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";



const GuidBooking = () => {
    const swiperRef = useRef(null);
    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.update();
        }
    }, []);

    const goNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };


    const listings = [
        { id: 1, color: '#E1F7F1', title: 'Guidebook for Tambon Ban Tai ' },
        { id: 2, color: '#ECF2FE', title: 'Guidebook for Tambon Ban Tai ' },
        { id: 3, color: '#FEEFF1', title: 'Guidebook for Tambon Ban Tai ' },
        { id: 4, color: '#FCF1DC', title: 'Guidebook for Tambon Ban Tai ' },
    ]
    return (
        <div className=' py-8   w-full '>
            <div className='flex justify-between items-center w-full mb-8'>
                <h2 className='text-title_sss'>Rachel & Stu's Guidebooks</h2>
                <div className=' flex gap-4 w-fit '>
                    <button className='text-title_sm  border rounded-full' onClick={goPrev}><RiArrowLeftSLine /></button>
                    <button className='text-title_sm  border rounded-full' onClick={goNext}><RiArrowRightSLine /></button>
                </div>
            </div>
            <div className=' w-full mb-6'>
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
                    {
                        listings?.map(data => (
                            <SwiperSlide key={data?.id} className=' bg-white  rounded-md w-full'>
                                <div className={`h-[200px] rounded-md p-2 flex items-end`} style={{ backgroundColor: data?.color }}>
                                    <h2 className='text-c1'>{data?.title}</h2>
                                </div>
                            </SwiperSlide>
                        )
                        )
                    }

                </Swiper>
            </div>
        </div>
    );
};

export default GuidBooking;



