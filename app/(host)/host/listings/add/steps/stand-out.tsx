import Image from 'next/image';
import React from 'react';

const StandOut = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row items-center mt-14 gap-10 text-main">
            <div className="md:basis-1/2">
                <p className='mb-6 text-h5 text-black'>Step 2</p>
                <h1 className='text-xxxlMedium text-black'>Make your place stand out</h1>
                <p className='mt-4 text-p2 text-black'>In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then, you’ll create a title and description.</p>
            </div>
            <div className='md:basis-1/2'>
                <Image className='ml-auto' src="/place.png" width={500} height={474} alt='image'></Image>
            </div>
        </div>
    );
};

export default StandOut;