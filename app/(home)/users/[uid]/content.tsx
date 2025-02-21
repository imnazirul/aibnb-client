'use client'
import React from 'react';
import AboutItem from './about-item';
import UserAboutSpace from './about-space';
import Reviews from './reviews';
import About from './about';
import Listing from './listing';
import GuidBooking from './guid-book';

const Content = () => {
    return (
        <div className='lg:w-[55%]  mt-9'>
            <AboutItem />
            <UserAboutSpace />
            <Reviews/> 
            <About/>
            <Listing/>
            <GuidBooking/>
        </div>
    );
};

export default Content;