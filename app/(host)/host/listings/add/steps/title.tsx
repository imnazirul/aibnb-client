import React from 'react';
import Textarea from '../forms/textarea';

const Title = () => {
    return (
        <div className='w-full flex items-center justify-center w-full h-full'>
            <div className='flex flex-col justify-center text-start w-fit'>
                <h2 className='text-xlSemiBold'>Now, let's give your house a title</h2>
                <h3 className='text-h5 text-secondaryText mb-6'>Short titles work best. Have fun with it—you can always change it later.</h3>
                <Textarea name="title" label="Title" placeholder="My cozy place in the city" max={50} className='!rounded-lg text-h5' />
            </div>
        </div>


    );
};

export default Title;