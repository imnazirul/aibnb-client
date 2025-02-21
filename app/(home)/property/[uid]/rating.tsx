
'use client'
import { Progress } from 'antd';
import React from 'react';
import Icon from '../../../../components/common/icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const OverRating = ({ guests }) => {
    return (
        <>
            <div className="hidden lg:block">
                <div className='mt-6 '>
                    <h3 className="font-semibold mb-2">Overall rating</h3>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                            <span>{rating}</span>
                            <Progress
                                percent={rating === 5 ? 85 : rating === 4 ? 20 : rating === 3 ? 10 : rating === 2 ? 5 : 0}
                                showInfo={false}
                                strokeColor="#222222"
                                size="small"
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-4 guests">
                    {guests.map((rating) => (
                        <div key={rating.id} className="flex justify-between items-center border-b">
                            <div className='flex gap-x-2 items-center py-4'>
                                <Icon name={rating.icon} />
                                <span className="text-h4">{rating.name}</span>
                            </div>
                            <span className='text-h4'>{rating.rating}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* small device  */}
            <div className='lg:hidden '>
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                       
                    }}
                    className="mySwiper bg-gray-50 border-b !flex !items-center">
                    <SwiperSlide>
                        <div className=" py-3 ">
                            <h3 className="lg:text-sb text-xxt line-clamp-1">Overall rating</h3>
                            <div className="mt-2">
                                {[5, 4, 3, 2, 1].map((rating, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <p className='text-xxs'>{rating}</p>
                                        <Progress
                                            percent={rating === 5 ? 85 : rating === 4 ? 20 : rating === 3 ? 10 : rating === 2 ? 5 : 0}
                                            showInfo={false}
                                            strokeColor="#222222"
                                            size="small"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>
                    {
                        guests?.map(guest => (
                            <SwiperSlide>
                                <div key={guest.id} className=" border-s px-2 h-[140px] py-3 ">
                                    <div className="">
                                        <h3 className="lg:text-sb text-xxt line-clamp-1 ">{guest.name}</h3>
                                        <h1 className="text-h4 mt-2">{guest.rating}</h1>
                                    </div>
                                    <div className="mt-7">
                                        <Icon name={guest?.icon} className="title_md" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </>
    );
};

export default OverRating;