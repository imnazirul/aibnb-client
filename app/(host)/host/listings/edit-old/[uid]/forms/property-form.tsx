import React from 'react';
import FormSelect from '../../../../../../../components/form/select';
import Counter from '../../../add-old/forms/count';
import { Form } from 'antd';
import FormInput from '../../../../../../../components/form/input';
import { host_types } from '../../../../../../../helpers/utils';


const PropertyForm = ({ categories }) => {

    const CounterInput = ({ name }) => {
        const Input = ({ value, onChange }: any) => {
            return (
                <div>
                    <div className="rounded-sm flex items-center justify-center">

                        <Counter
                            className="gap-x-3"
                            count={value}
                            increment={() => onChange(value + 1)}
                            decrement={() => onChange((value - 1) || 1)} />
                    </div>
                </div>
            )
        }

        return (
            <Form.Item name={name} initialValue={1}>
                <Input />
            </Form.Item>
        )
    }

    const currentYear = new Date().getFullYear();


    return (
        <div className='my-5 md:my-0'>
            <h3 className='text-title_lg text-main capitalize'>Property type</h3>
            <div className="mt-5">
                <FormSelect
                    initialValue={""}
                    className=' text-xs mt-2 capitalize'
                    label="which is most like your place?"
                    name="category"
                    options={categories.map((item) => ({
                        value: item._id,
                        label: item.name
                    }))} />
            </div>

            <div className="">
                <FormSelect
                    initialValue={""}
                    className=' text-xs mt-2 capitalize'
                    label="Property Type"
                    name="type"
                    options={
                        host_types.map((item) => ({
                            value: item.value,
                            label: item.title
                        }))
                    } />
            </div>

            <div className="">
                <FormSelect
                    initialValue={"1-2"}
                    className=' text-xs mt-2 capitalize'
                    label="how many total rooms dose your property have?"
                    name="total_rooms"
                    options={[
                        { value: '2-5', label: '2-5' },
                        { value: '6-10', label: '6-10' },
                        { value: '11-15', label: '11-15' },
                    ]} />
            </div>

            <div className="">
                <FormSelect
                    initialValue={"Shared Room"}
                    className=' text-xs mt-2 capitalize'
                    label="listing type"
                    name="listing_type"
                    options={[
                        { value: 'Shared Room', label: 'Shared Room' },
                        { value: 'Private Room', label: 'Private Room' },
                        { value: 'Entire Place', label: 'Entire Place' },
                    ]} />
            </div>

            <div className="flex justify-between">
                <p className="capitalize text-p3 text-main mb-2 lg:mb-0">How many floors in the building?</p>
                <CounterInput name="floors" />
            </div>

            <div className="flex justify-between">
                <p className="capitalize text-p3 text-main mb-2 lg:mb-0">Which floor is the listing on?</p>
                <CounterInput name="floor_listing" />
            </div>


            <FormInput
                label="Year Built"
                name="year_built"
                className='w-full rounded-sm'
                rules={[
                    { required: true, message: 'Please enter a valid year' },
                    { pattern: /^[0-9\b]+$/, message: 'Please enter only numbers' },
                    {
                        validator: (_, value) => {
                            if (value && value > currentYear) {
                                return Promise.reject('Must be current year or before.');
                            }
                            return Promise.resolve();
                        }
                    }
                ]}
            />

            <div className="flex items-center">
                <FormInput
                    name="property_search"
                    label="Property Size"
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (value && value < 0) {
                                    return Promise.reject(new Error("Property size must be greater than 0"))
                                }
                                return Promise.resolve()
                            }
                        }),
                        { pattern: /^[0-9\b]+$/, message: 'Please enter only numbers' },
                    ]}
                    className='rounded-md'

                />
                <FormSelect
                    label='Unit'
                    name='unit'
                    options={[
                        { value: 'sqft', label: 'Square feet' },
                        { value: 'm2', label: 'Square meters' },
                    ]}
                    className='capitalize w-1/4 mt-1 rounded-none' />
            </div>
        </div>
    );
};

export default PropertyForm;