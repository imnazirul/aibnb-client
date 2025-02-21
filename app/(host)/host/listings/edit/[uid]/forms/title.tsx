import React from 'react';
import { Form } from 'antd';

const Title = () => {
    const Input = ({ value, onChange }: any) => {
        return (
            <div className="mt-6">

                <p className='text-center text-main text-s'>{value?.length || 0}/{50} characters available</p>

                <textarea
                    value={value}
                    rows={4}
                    className={`bg-white p-4 w-full text-xlMedium mb-3 border-none outline-none text-center`}
                    onChange={(e) => {
                        let val = e.target.value
                        if (val.length <= 50) {
                            onChange(val)
                        } else {
                            onChange(val.substring(0, 50))
                        }
                    }}
                    placeholder={'My cozy place in the city'} />

            </div>
        )
    }
    return (
        <div className='flex h-full w-full items-center justify-center'>
            <Form.Item
                noStyle
                name={'title'}
                className="mb-0"
                required
                initialValue=""
            >

                <Input />
            </Form.Item>
        </div>
    );
};

export default Title;