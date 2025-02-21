import React from 'react';
import Textarea from '../../../add/forms/textarea';

const PropertyDescriptionEdit = ({ data }) => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className='flex flex-col justify-center text-start'>
                <h2 className='text-xlSemiBold md:w-[600px] w-[320px]'>Listing description</h2>
                <Textarea name="description" label="Description" placeholder="You’ll be charmed by this adorable place to stay." max={500} className='!rounded-lg text-h5' />
            </div>
        </div>
    );
};

export default PropertyDescriptionEdit;