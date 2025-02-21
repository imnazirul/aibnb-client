"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import Image from 'next/image';
import { Modal } from 'antd';

interface Review {
    id: number;
    title: string;
    name: string;
    profile: string;
    date: string;
    review: string;
}

const Review: React.FC = () => {
    const swiperRef = useRef(null);
    const [open, setOpen] = useState(false);

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

    const reviews = [
        { id: 1, title: 'The GEM, Romantic Beachfront Home Hin Kong', name: 'nijam khan', profile: '/sign.png', date: 'May 10, 2023', review: 'We more than enjoyed our stay at the Gem! Everything was perfectly prepared, super clean and optimally organized. We liked the attention to detail the best 😍 Really a beautiful place to stay! The restaurant recommendations were great! Rachel communicates perfectly and informed you very well! The role rental and taxi also worked out great! Thank you for a very nice stay❤️ we would come back any time!' },
        { id: 2, title: 'The GEM, Romantic Beachfront Home Hin Kong', name: 'Rakib khan', profile: '/sign.png', date: 'May 10, 2023', review: 'We more than enjoyed our stay at the Gem! Everything was perfectly prepared, super clean and optimally organized. We liked the attention to detail the best 😍 Really a beautiful place to stay! The restaurant recommendations were great! Rachel communicates perfectly and informed you very well! The role rental and taxi also worked out great! Thank you for a very nice stay❤️ we would come back any time!' },
        { id: 3, title: 'The GEM, Romantic Beachfront Home Hin Kong', name: 'salman khaa', profile: '/sign.png', date: 'May 10, 2023', review: 'We more than enjoyed our stay at the Gem! Everything was perfectly prepared, super clean and optimally organized. We liked the attention to detail the best 😍 Really a beautiful place to stay! The restaurant recommendations were great! Rachel communicates perfectly and informed you very well! The role rental and taxi also worked out great! Thank you for a very nice stay❤️ we would come back any time!' },
        { id: 4, title: 'The GEM, Romantic Beachfront Home Hin Kong', name: 'Shakil khaa', profile: '/sign.png', date: 'May 10, 2023', review: 'Beautiful Residential Unit!' },
        { id: 5, title: 'The GEM, Romantic Beachfront Home Hin Kong', name: 'imran khan', profile: '/sign.png', date: 'May 10, 2023', review: 'We more than enjoyed our stay at the Gem! Everything was perfectly prepared, super clean and optimally organized. We liked the attention to detail the best 😍 Really a beautiful place to stay! The restaurant recommendations were great! Rachel communicates perfectly and informed you very well! The role rental and taxi also worked out great! Thank you for a very nice stay❤️ we would come back any time!' },
        { id: 6, title: 'The GEM, Romantic Beachfront Home Hin Kong', name: 'labu khan', profile: '/sign.png', date: 'May 10, 2023', review: 'We more than enjoyed our stay at the Gem! Everything was perfectly prepared, super clean and optimally organized. We liked the attention to detail the best 😍 Really a beautiful place to stay! The restaurant recommendations were great! Rachel communicates perfectly and informed you very well! The role rental and taxi also worked out great! Thank you for a very nice stay❤️ we would come back any time!' },
        { id: 7, title: 'The GEM, Romantic Beachfront Home Hin Kong', name: 'labu khan', profile: '/sign.png', date: 'May 10, 2023', review: 'We more than enjoyed our stay at the Gem! Everything was perfectly prepared, super clean and optimally organized. We liked the attention to detail the best 😍 Really a beautiful place to stay! The restaurant recommendations were great! Rachel communicates perfectly and informed you very well! The role rental and taxi also worked out great! Thank you for a very nice stay❤️ we would come back any time!' },
        { id: 8, title: 'The GEM, Romantic Beachfront Home Hin Kong', name: 'labu khan', profile: '/sign.png', date: 'May 10, 2023', review: 'We more than enjoyed our stay at the Gem! Everything was perfectly prepared, super clean and optimally organized. We liked the attention to detail the best 😍 Really a beautiful place to stay! The restaurant recommendations were great! Rachel communicates perfectly and informed you very well! The role rental and taxi also worked out great! Thank you for a very nice stay❤️ we would come back any time!' },
        { id: 9, title: 'The GEM, Romantic Beachfront Home Hin Kong', name: 'labu khan', profile: '/sign.png', date: 'May 10, 2023', review: 'We more than enjoyed our stay at the Gem! Everything was perfectly prepared, super clean and optimally organized. We liked the attention to detail the best 😍 Really a beautiful place to stay! The restaurant recommendations were great! Rachel communicates perfectly and informed you very well! The role rental and taxi also worked out great! Thank you for a very nice stay❤️ we would come back any time!' },
        { id: 10, title: 'The GEM, Romantic Beachfront Home Hin Kong', name: 'labu khan', profile: '/sign.png', date: 'May 10, 2023', review: 'We more than enjoyed our stay at the Gem! Everything was perfectly prepared, super clean and optimally organized. We liked the attention to detail the best 😍 Really a beautiful place to stay! The restaurant recommendations were great! Rachel communicates perfectly and informed you very well! The role rental and taxi also worked out great! Thank you for a very nice stay❤️ we would come back any time!' },
        { id: 11, title: 'The GEM, Romantic Beachfront Home Hin Kong', name: 'labu khan', profile: '/sign.png', date: 'May 10, 2023', review: 'We more than enjoyed our stay at the Gem! Everything was perfectly prepared, super clean and optimally organized. We liked the attention to detail the best 😍 Really a beautiful place to stay! The restaurant recommendations were great! Rachel communicates perfectly and informed you very well! The role rental and taxi also worked out great! Thank you for a very nice stay❤️ we would come back any time!' },
        { id: 12, title: 'The GEM, Romantic Beachfront Home Hin Kong', name: 'labu khan', profile: '/sign.png', date: 'May 10, 2023', review: 'We more than enjoyed our stay at the Gem! Everything was perfectly prepared, super clean and optimally organized. We liked the attention to detail the best 😍 Really a beautiful place to stay! The restaurant recommendations were great! Rachel communicates perfectly and informed you very well! The role rental and taxi also worked out great! Thank you for a very nice stay❤️ we would come back any time!' },
    ]
    return (
        <div>
            <div className='border-y py-8  w-full '>
                <div className='flex justify-between items-center w-full mb-8'>
                    <h2 className='text-title_sss'>Rachel & Stu’s reviews</h2>
                    <div className=' flex gap-4 w-fit '>
                        <button className={`text-title_sm border rounded-full`} onClick={goPrev}><RiArrowLeftSLine /></button>
                        <button className={`text-title_sm border rounded-full`} onClick={goNext}><RiArrowRightSLine /></button>
                    </div>
                </div>
                <div className=' w-full mb-6'>
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={10}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 2,
                            },

                        }}


                        className=''
                    >
                        {
                            reviews?.map(review => (
                                <SwiperSlide key={review.id} className=' shadow-sm bg-white border rounded-md w-full'>
                                    <div className=' w-fit p-5  '>
                                        <div key={review.id} className='flex flex-col gap-3'>
                                            <h1 className='line-clamp-3 h-[70px] '>{review?.review}</h1>
                                            <div className='flex items-center gap-3 mt-[30px]'>
                                                <div className='w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center'>
                                                    <Image src={review?.profile} width={500} height={200} alt='icon' className='w-[32px] h-[32px] rounded-full' />
                                                </div>
                                                <div>
                                                    <h2 className='text-base font-medium capitalize'>{review?.name}</h2>
                                                    <p className='text-sm'>{review?.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                            )
                        }

                    </Swiper>
                </div>
                <span onClick={() => setOpen(true)} className='underline text-p cursor-pointer '>Show more reviews</span>
                <p className='mt-14'>Some info has been automatically translated. <span className='underline cursor-pointer'>Show original</span></p>
            </div>

            <Modal
                className='2xl:!w-[30%] rounded-lg'
                open={open}
                onCancel={() => setOpen(false)}
                centered
                title={<p className='text-title_md mt-10 '>{reviews?.length} reviews</p>}
                footer={null}>
                <div className='w-full mt-6 lg:h-[80vh] h-[60vh] overflow-auto pe-4'>
                    <h3 className='text-p border-b pb-3'>From guests {reviews?.length}</h3>
                    {
                        reviews?.map(review => (
                            <div className=' mt-0 border-b py-5'>
                                <h2 className='text-h4 '>{review?.title}</h2>
                                <div className='flex items-center gap-3 mt-6'>
                                    <div className='w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center'>
                                        <Image src={review?.profile} width={500} height={200} alt='icon' className='w-[32px] h-[32px] rounded-full' />
                                    </div>
                                    <div>
                                        <h2 className='text-base font-medium capitalize'>{review?.name}</h2>
                                        <p className='text-sm'>{review?.date}</p>
                                    </div>
                                </div>
                                <p className='mt-5 text-p1 line-clamp-4'>{review?.review}</p>
                            </div>
                        ))
                    }

                </div>
            </Modal>
        </div>
    );
};

export default Review;




