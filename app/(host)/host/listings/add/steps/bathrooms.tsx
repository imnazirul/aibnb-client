import React from 'react';
import { bathroomItems } from '../../../../../../helpers/utils';
import { Form } from 'antd';
import { Counter } from './basics-place';

const Bathrooms = ({ form }) => {
    const Input = ({ item, value, onChange }: any) => {
        return (
            <div className='flex items-center justify-between border-b border-webBorder pb-5'>
                <div>
                    <h1 className='text-p1 text-m'>{item?.label}</h1>
                    <span className='text-p1 text-secondaryText'>{item?.short_description}</span>
                </div>
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

    return (
        <div>
            <div className="md:max-w-[650px]">
                <h1 className='text-xlMedium text-black mb-5'>What kind of bathrooms are available to guests?</h1>
                <div className="">
                    {
                        bathroomItems.map((item, index) =>
                            <Form.Item key={index} name={item.name} initialValue={item?.min}>
                                <Input item={item} />
                            </Form.Item>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Bathrooms;