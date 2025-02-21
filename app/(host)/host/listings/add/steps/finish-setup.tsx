import Image from 'next/image';
import React from 'react';

const FinishSetup = () => {
    return (
        // <div className='max-w-[1120px]'>
            <div className="flex justify-between flex-col-reverse lg:flex-row items-center mt-14 gap-10 text-main">
                <div className="md:basis-1/2">
                    <p className='mb-6 text-h5 text-black'>Step 3</p>
                    <h1 className='text-xxxlMedium text-black'>Finish up and publish</h1>
                    <p className='mt-4 text-p2 text-black'>Finally, you'll choose booking settings, set up pricing, and publish your listing.</p>
                </div>
                <div className='md:basis-1/2'>
                    <Image className='ml-auto' src="/image8.png" width={500} height={474} alt='image'></Image>
                </div>
            </div>
        // </div>
    );
};

export default FinishSetup;