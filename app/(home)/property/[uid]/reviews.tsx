'use client'
import {Progress} from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import Icon from '../../../../components/common/icon';
import Comments from './comments';
import ReviewModal from './review-modal';
import SwiperComments from './swiper-commets';

const Reviews = () => {
    const [open, setOpen] = useState(false)
    const guests = [
        { id: 1, rating: '4.5', name: "Cleanliness", icon: "clean" },
        { id: 2, rating: '4.9', name: "Accuracy", icon: "accuracy" },
        { id: 3, rating: '5.0', name: "Check-in", icon: "checkIn" },
        { id: 4, rating: '4.5', name: "Communication", icon: "accuracy" },
        { id: 5, rating: '5.0', name: "Location", icon: "address" },
        { id: 6, rating: '4.7', name: "Value", icon: "value" },
    ]
    const comments = [
        { id: 1, name: 'nijam khan', address: 'Barisal, Mathabaria', img: '/sign.png', date: 'May 10, 2023', comment: 'Beautiful Residential Unit!', time: 'Stayed one night', rating: 5.0 },
        { id: 2, name: 'Rakib khan', address: 'Barisal, Mathabaria', img: '/sign.png', date: 'May 10, 2023', comment: 'Beautiful Residential Unit!', time: 'Stayed one night', rating: 5.0 },
        { id: 3, name: 'salman khan', address: 'Barisal, Mathabaria', img: '/sign.png', date: 'May 10, 2023', comment: 'The place and the location are amazing in terms of cleanliness, amenities and decoration.Definitely worth the visit!', time: 'Stayed one night', rating: 5.0 },
        { id: 4, name: 'Shakil khan', address: 'Barisal, Mathabaria', img: '/sign.png', date: 'May 10, 2023', comment: 'Beautiful Residential Unit!', time: 'Stayed one night', rating: 5.0 },
        { id: 5, name: 'imran khan', address: 'Barisal, Mathabaria', img: '/sign.png', date: 'May 10, 2023', commnt: 'Beautiful Residential Unit! Airbnb is not accurate. You need to use the address provided to you via', time: 'Stayed one night', rating: 5.0 },
        { id: 6, name: 'labu khan', address: 'Barisal, Mathabaria', img: '/sign.png', date: 'May 10, 2023', comment: 'The place is perfect, but the address on Airbnb is not accurate. You need to use the address provided to you via Whats App', time: 'Stayed one night', rating: 5.0 },
        { id: 7, name: 'labu khan', address: 'Barisal, Mathabaria', img: '/sign.png', date: 'May 10, 2023', comment: 'The place is perfect, but the address on Airbnb is not accurate. You need to use the address provided to you via Whats App', time: 'Stayed one night', rating: 5.0 },
        { id: 8, name: 'labu khan', address: 'Barisal, Mathabaria', img: '/sign.png', date: 'May 10, 2023', comment: 'The place is perfect, but the address on Airbnb is not accurate. You need to use the address provided to you via Whats App', time: 'Stayed one night', rating: 5.0 },
        { id: 9, name: 'labu khan', address: 'Barisal, Mathabaria', img: '/sign.png', date: 'May 10, 2023', comment: 'The place is perfect, but the address on Airbnb is not accurate. You need to use the address provided to you via Whats App', time: 'Stayed one night', rating: 5.0 },
        { id: 10, name: 'labu khan', address: 'Barisal, Mathabaria', img: '/sign.png', date: 'May 10, 2023', comment: 'The place is perfect, but the address on Airbnb is not accurate. You need to use the address provided to you via Whats App', time: 'Stayed one night', rating: 5.0 },

        { id: 11, name: 'labu khan', address: 'Barisal, Mathabaria', img: '/sign.png', date: 'May 10, 2023', comment: 'The place is perfect, but the address on Airbnb is not accurate. You need to use the address provided to you via Whats App', time: 'Stayed one night', rating: 5.0 },
        { id: 12, name: 'labu khan', address: 'Barisal, Mathabaria', img: '/sign.png', date: 'May 10, 2023', comment: 'The place is perfect, but the address on Airbnb is not accurate. You need to use the address provided to you via Whats App', time: 'Stayed one night', rating: 5.0 },
    ]

    return (
        <div className='property-section py-10'>
            <div className='guest_content'>
                <Image src={"/p1.avif"} width={500} height={500} alt='logo' className='guest-img ' />
                <h1 className='text-d1'>4.96</h1>
                <Image src={"/p2.avif"} width={500} height={500} alt='logo' className='guest-img' />
            </div>
            <div className='guest-favorite'>
                <h2 className='lg:text-title_sss md:text-cs text-h4 mb-2'>Guest favorite</h2>
                <p className='lg:text-h5 md:text-p2 text-xxs text-center text-[#6a6a6a] '>One of the most loved homes on Airbnb based on ratings, reviews, and reliability </p>
            </div>

            <div className="over_rating ">
                <div className="progress ">
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
                <div className="guests">
                    {guests?.map(guest => (
                        <div key={guest.id} className="guest-item ">
                            <div className="">
                                <h3 className="lg:text-sb text-xxt line-clamp-1 ">{guest.name}</h3>
                                <h1 className="text-h4 mt-2">{guest.rating}</h1>
                            </div>
                            <div className="mt-auto">
                                <Icon name={guest?.icon} className="title_md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-10'>
                <div className='comments'>
                    <Comments comments={comments?.slice(0, 6)} />
                </div>
                <div className='swiper-comments'>
                    <SwiperComments comments={comments}/>
                </div>
                {
                    comments?.length < 6 ? null : <button type='button' className='button' onClick={() => setOpen(true)}>Show all {comments?.length} reviews</button>
                }
            </div>
            <ReviewModal open={open} setOpen={setOpen} guests={guests} comments={comments} />
        </div>
    );
};

export default Reviews;



