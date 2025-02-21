import React from 'react';
import FormSelect from '../../../../../../../components/form/select';
import { Form, Input } from 'antd';
import FormInput from '../../../../../../../components/form/input';
import { host_types } from '../../../../../../../helpers/utils';
import FormSelectInput from './select-input';
import { FaMinus, FaPlus } from 'react-icons/fa';

const PropertyEdit = ({ categories, data, form }) => {
    console.log("form------", form.getFieldsValue(['category', 'bedrooms', 'bathrooms', 'title', 'type']));



    const currentYear = new Date().getFullYear();


    return (
        <div className='my-5 md:my-5 px-36'>
            <h3 className='text-title_lg text-main capitalize'>Property type</h3>

            {/* <div className="mt-4 property-select">
                <FormSelectInput
                    className=''
                    label="which is most like your place?"
                    name="category"
                    options={categories.map((item) => ({
                        value: item._id,
                        label: item.name
                    }))} />

            </div> */}
            <div className="mt-4">
                <FormSelect
                    label="which is most like your place?"
                    name='category'
                    options={categories.map((item) => ({
                        value: item._id,
                        label: item.name
                    }))}
                    className='capitalize mt-1 py-2 border-2 rounded-md w-full h-full' />
            </div>

            <div className="mt-4">
                <FormSelect
                    label='Property Type'
                    name='type'
                    options={host_types.map((item) => ({
                        value: item.value,
                        label: item.title
                    }))}
                    className='capitalize mt-1 py-2 border-2 rounded-md w-full h-full' />
            </div>


            {/* <div className="mt-4 property-select">
                <FormSelectInput
                    className=''
                    label="Property Type"
                    name="type"
                    options={
                        host_types.map((item) => ({
                            value: item.value,
                            label: item.title
                        }))
                    } />
            </div> */}

            {/* <div className="flex justify-between">
                <p className="capitalize text-p2 font-semibold">How many floors in the building?</p>
                <Form.Item name={'floors'} noStyle initialValue={data?.floors || 1}>
                    <CounterInput
                        item={{ min: 1, max: 10 }}
                        value={data?.floors || 1}
                    />
                </Form.Item>

            </div> */}


            <div className="flex justify-between">
                <p className="capitalize text-p2 font-semibold">How many bedrooms in the building?</p>
                <Form.Item name={'bedrooms'} noStyle initialValue={data?.bedrooms || 0}>
                    <CounterInput
                        item={{ min: 0, max: 10 }}
                        value={data?.bedrooms || 0}
                    />
                </Form.Item>
            </div>
            <div className="flex justify-between">
                <p className="capitalize text-p2 font-semibold">How many beds in there?</p>
                <Form.Item name={'beds'} noStyle initialValue={data?.beds || 1}>
                    <CounterInput
                        item={{ min: 1, max: 10 }}
                        value={data?.beds || 1}
                    />
                </Form.Item>
            </div>
            <div className="flex justify-between">
                <p className="capitalize text-p2 font-semibold">How many bathrooms in the building?</p>
                <Form.Item name={'bathrooms'} noStyle initialValue={data?.bathrooms || 0}>
                    <CounterInput
                        item={{ min: 0, max: 10 }}
                        value={data?.bathrooms || 0}
                    />
                </Form.Item>

            </div>

            <FormInput
                label="Year Built"
                name="year_built"
                className='w-full rounded-md'
                rules={[
                    // { required: true, message: 'Please enter a valid year' },
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

            <div className="flex w-[400px] items-center">
                {/* <FormInput
                    name="property_size"
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
                /> */}

                {/* <FormSelect
                    label='Unit'
                    name='unit'
                    options={[
                        { value: 'square_feet', label: 'Square feet' },
                        { value: 'square_meters', label: 'Square meters' },
                    ]}
                    className='capitalize mt-1 border w-full h-full' /> */}
            </div>
        </div>
    );
};

export default PropertyEdit;




interface CounterProps {
    count: number;
    increment: () => void;
    decrement: () => void;
    className?: string;
    countClassName?: string;
    maxValue?: number;
    minValue?: number;
}
export const Counter: React.FC<CounterProps> = ({ count, increment, decrement, className, countClassName, maxValue, minValue }) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <button
                type='button'
                disabled={count === minValue}
                className={`${count === minValue ? 'cursor-not-allowed opacity-40' : ''
                    } btnDecrease p-[7px] border border-gray-500 hover:border-black rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300`}
                onClick={decrement}
            >
                <FaMinus className="h-4 text-gray-300" />
            </button>
            <span className={`inline-block text-center font-semibold text-h4 ${countClassName}`}>
                {count}
            </span>
            <button
                type='button'
                disabled={count === maxValue}
                className={`${count === maxValue ? 'cursor-not-allowed opacity-40' : ''
                    } btnIncrease p-[7px] border border-gray-500 hover:border-black rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300`}
                onClick={increment}
            >
                <FaPlus className="h-4 text-gray-300" />
            </button>
        </div>
    );
};


const CounterInput = ({ item, value, onChange }: any) => {
    return (
        <div className='pb-5'>
            <Counter
                className='gap-x-3'
                countClassName='text-xs'
                count={value}
                increment={() => onChange(value + 1)}
                decrement={() => onChange((value - 1) || 0)}
                maxValue={item?.max}
                minValue={item?.min}
            />
        </div>
    )
}