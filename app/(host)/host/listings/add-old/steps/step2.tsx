import React from 'react';
import Multiselect from "../forms/multiselect";
import {ImageCards} from "../../../../../../components/form/image";
import Textarea from "../forms/textarea";

const Step2 = ({elements, required}: any) => {
    return (
        <div>
            <div className="mt-20">
                <h3 className='text-xlMedium text-main'>Tell guests what your place has to offer</h3>
                <p className='text-p2 text-secondaryText mt-1'>You can add more amenities after you publish your
                    listing.</p>

                <div className="mt-6 overflow-x-auto">
                    <p className='text-p1 text-main'>Which of these best describes your place? <span
                        className='text-secondaryText'>(Optional)</span></p>
                    <Multiselect
                        name='amenities'
                        options={elements?.amenities?.filter(d => d.type === 'favorite')}/>
                </div>

                <div className="overflow-x-auto">
                    <p className='text-p1 text-main'>Do you have any standout amenities? <span
                        className='text-secondaryText'>(Optional)</span></p>
                    <div className="flex gap-6">
                        <Multiselect
                            name='amenities'
                            options={elements?.amenities?.filter(d => d.type === 'standout')}/>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <p className='text-p1 text-main'>Do you have any standout amenities? <span
                        className='text-secondaryText'>(Optional)</span></p>
                    <div className="flex gap-6">
                        <Multiselect
                            name='amenities'
                            options={elements?.amenities?.filter(d => d.type === 'safety')}/>
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className='text-xlMedium text-main'>Add some photos of your house</h3>
                    <p className='text-p2 text-secondaryText mt-1 mb-4'>You'll need 5 photos to get started. You can add
                        more or make changes later.</p>
                    <ImageCards name="images"/>
                </div>

                <div className="mt-16">
                    <h3 className='text-xlMedium text-main'>Now, let's give your house a title</h3>
                    <p className='text-p2 text-secondaryText mt-1'>Short titles work best. Have fun with it—you can always
                        change it later.</p>
                    <Textarea name="title" label="Title" placeholder="My cozy place in the city" max={50} required={required}/>
                </div>

                <div className="mt-16">
                    <h3 className='text-xlMedium text-main'>Next, let's describe your house</h3>
                    <p className='text-p2 text-secondaryText mt-1'>Choose up to 2 highlights. We'll use these to get your
                        description started.</p>
                    <div className="mt-6">
                        <Multiselect
                            name='tags'
                            options={elements?.tags}
                        />
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className='text-xlMedium text-main'>Create your description</h3>
                    <p className='text-p2 text-secondaryText mt-1'>Share what makes your place special.</p>
                    <Textarea name="description" label="Description" placeholder="My cozy place in the city" max={500} required={required}/>
                </div>
            </div>
        </div>
    );
};

export default Step2;
