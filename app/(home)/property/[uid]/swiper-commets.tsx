import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { Rate } from 'antd';

const SwiperComments = ({comments}) => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            className="mySwiper p-3"
        >
            {
                comments?.map(comment => (
                    <SwiperSlide key={comment.id} className=' shadow-sm bg-white border rounded-md'>
                        <div className=' w-full p-5  '>
                            <div key={comment.id} className='flex flex-col gap-3'>
                                <div>
                                    <div>
                                        <Rate value={comment?.rating} className='text-black text-[10px]' /> . <span>{comment?.date}</span>
                                    </div>
                                    <h1 className='line-clamp-3 h-[80px] '>{comment?.comment}</h1>
                                </div>
                                <div className='flex items-center gap-3 mt-[60px]'>
                                    <div className='w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center'>
                                        <Image src={comment?.img} width={500} height={200} alt='icon' className='w-[32px] h-[32px] rounded-full' />
                                    </div>
                                    <div>
                                        <h2 className='text-base font-medium capitalize'>{comment?.name}</h2>
                                        <p className='text-sm'>{comment?.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default SwiperComments;