import React from 'react';
import Textarea from '../forms/textarea';

const Description = () => {
    return (
        <div className="w-full">
            <div className='flex flex-col justify-center text-start'>
                <h2 className='text-xlSemiBold'>Create your description</h2>
                <h3 className='text-h5 text-secondaryText mb-2'>Share what makes your place special.</h3>
                <Textarea name="description" label="Description" placeholder="You’ll be charmed by this adorable place to stay." max={500} className='!rounded-lg text-h5' />
            </div>
        </div>
    );
};

export default Description;