import { Form } from 'antd';
import React from 'react';

const DayInput = ({ name, data }) => {
    const Input = ({ value, onChange }: any) => {
        return (
            <div className="flex flex-col items-center justify-center text-xxxl">
                <input
                    
                    className="min-w-0 max-w-80 text-center border-0 outline-0"
                    value={`${value || 0}`} onChange={e => {
                        let val = e.target.value.trim()
                        if (!isNaN(+val) && +val >= 0 && +val <= 365) {
                            onChange(+val)
                        }
                    }} />
                {
                    name[1] === 'min_nights' && value > data?.availability?.max_nights ? (
                        <p className="text-red-500 text-s text-wrap px-4 text-center">
                            Your maximum stay is {data?.availability?.max_nights} nights. Minimum nights must be less than the maximum.
                        </p>
                    ) : null
                }
            </div>
        )
    }
    return (
        <div>
            <Form.Item name={name}>
                <Input />
            </Form.Item>
        </div>

    )
}


export default DayInput;