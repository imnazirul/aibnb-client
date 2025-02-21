import React, { useEffect } from 'react'
import { basicsItems, host_types } from '../../../../../../helpers/utils'
import { Form, Radio } from 'antd'
import Icon from '../../../../../../components/common/icon'
import { FaMinus, FaPlus } from 'react-icons/fa'

const BasicsPlace = ({ form }: any) => {
    const Input = ({ item, value, onChange }: any) => {
        return (
            <div className='flex items-center justify-between border-b border-webBorder pb-5'>
                <h1 className='text-p1 text-m'>{item?.label}</h1>
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
        <div className="text-main w-full">
            <h1 className='text-xlMedium mb-5'>Share some basics about your place</h1>
            <p className='text-h5 text-secondaryText mb-10'>You'll add more details later, like bed types.</p>
            <h2 className='text-rcs mb-5'>How many people can stay here?</h2>
            <div className="">
                {
                    basicsItems.map((item, index) => 
                    <Form.Item key={index} name={item.name} initialValue={item?.min}>
                        <Input item={item} />
                    </Form.Item>)
                }
            </div>
            {
                form.getFieldsValue('type')?.type === 'private_room' && <>
                    <h2 className='text-rcs mb-6 mt-[60px]'>Does every bedroom have a lock?</h2>
                    <Form.Item name="private_room_type">
                        <Radio.Group className='flex gap-y-6 flex-col w-fit'>
                            <Radio value={'yes'}>Yes</Radio>
                            <Radio value={'no'}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                </>
            }
        </div>
    )
}

export default BasicsPlace


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
                    } btnDecrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300`}
                onClick={decrement}
            >
                <FaMinus className="h-4 text-gray-300" />
            </button>
            <span className={`inline-block text-center text-p ${countClassName}`}>
                {count}
            </span>
            <button
                type='button'
                disabled={count === maxValue}
                className={`${count === maxValue ? 'cursor-not-allowed opacity-40' : ''
                    } btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300`}
                onClick={increment}
            >
                <FaPlus className="h-4 text-gray-300" />
            </button>
        </div>
    );
};
