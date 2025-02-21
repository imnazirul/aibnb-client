import React from 'react';
import MultiSelectAmenities from '../forms/multi-select';

const Amenities = ({ elements }) => {
    return (
        <div>
            <h1 className='text-xlMedium mb-5'>Tell guests what your place has to offer</h1>
            <p className='text-h5 text-secondaryText mb-10'>You can add more amenities after you publish your listing.</p>
            <div className='flex flex-col my-5'>
                <h2 className='text-h4 text-black'>What about these guest favorites?</h2>
                <div className=''>
                    <MultiSelectAmenities
                        name='amenities'
                        options={elements?.amenities?.filter(d => d.type === 'favorite')} />
                </div>
            </div>

            <div className='flex flex-col my-5'>
                <h2 className='text-h4 text-black'>WDo you have any standout amenities?</h2>
                <div className=''>
                    <MultiSelectAmenities
                        name='amenities'
                        options={elements?.amenities?.filter(d => d.type === 'standout')} />
                </div>
            </div>

            <div className='flex flex-col my-5'>
                <h2 className='text-h4 text-black'>Do you have any of these safety items?</h2>
                <div className=''>
                    <MultiSelectAmenities
                        name='amenities'
                        options={elements?.amenities?.filter(d => d.type === 'safety')} />
                </div>
            </div>
        </div>
    );
};

export default Amenities;