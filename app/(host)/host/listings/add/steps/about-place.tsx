import Image from 'next/image';
import React from 'react';

const AboutYourPlace = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row items-center mt-14 gap-10 text-main">
            <div className="md:basis-1/2 ">
                <p className='mb-6 text-h5 text-black'>Step 1</p>
                <h1 className='text-xxxlMedium text-black'>It’s easy to get started on Airbnb</h1>
                <p className='mt-10 text-c1 text-secondaryText'>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</p>
            </div>
            <div className='md:basis-1/2'>
                <Image className='ml-auto' src="/place.png" width={500} height={474} alt='image'></Image>
            </div>
        </div>

    );
};

export default AboutYourPlace;