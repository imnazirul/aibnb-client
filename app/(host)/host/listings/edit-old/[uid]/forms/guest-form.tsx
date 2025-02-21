import React from 'react';
import Counter from '../../../add-old/forms/count';
import { Form } from 'antd';

const GuestForm = () => {

    const CounterInput = ({ name }) => {
        const Input = ({ value, onChange }: any) => {
            return (
                <div>
                    <div className="rounded-sm flex items-center justify-center">
                        <Counter
                            className="gap-x-5"
                            countClassName="text-xxxlBold text-main"
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

    return (
        <div>
            <div className="flex items-center justify-center flex-col">
                <img src="/guest.png" alt="guest icon" className='object-contain' />
                <h3 className='text-h5 text-main mt-7 text-wrap w-fit'>How many guests can fit comfortably in your space?</h3>
                <div className="mt-10">
                    <CounterInput name="guests" />
                </div>
            </div>
        </div>
    );
};

export default GuestForm;