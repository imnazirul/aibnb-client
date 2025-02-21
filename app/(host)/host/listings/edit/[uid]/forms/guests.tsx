import { Form } from 'antd';
import React from 'react';
import { Counter } from './property-type';

const GuestsEdit = ({ data }) => {
    const CounterInput = ({ item, value, onChange }: any) => {
        return (
            <div className='pb-5'>
                <Counter
                    className='gap-x-3'
                    countClassName='!text-[120px] font-semibold px-10'
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
        <div className='flex h-full w-full items-center justify-center'>
            <Form.Item
                noStyle
                name={'guests'}
                className="mb-0"
                initialValue={data?.guests}
            >

                <CounterInput item={{ min: 1, max: 10 }}
                    value={data?.guests || 1} />
            </Form.Item>
        </div>
    );
};

export default GuestsEdit;

