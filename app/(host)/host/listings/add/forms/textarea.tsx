import {Form} from "antd";
import React from "react";

interface TextareaProps {
    name: String | [String] | [string,string],
    label?: String,
    max?: number,
    required?: boolean,
    placeholder?: string,
    className?: string
}

const Textarea = ({name, label, max = 500, required, placeholder, className}: TextareaProps) => {
    const Input = ({value, onChange}: any) => {
        return (
            <div className="mt-6">
                <textarea
                    value={value}
                    rows={4}
                    className={`form-input w-full mb-3 ${className}`}
                    onChange={(e) => {
                        let val = e.target.value
                        if (val.length <= max) {
                            onChange(val)
                        } else {
                            onChange(val.substring(0, max))
                        }
                    }}
                    placeholder={placeholder}/>
                <div className="flex justify-between items-center">
                    <p className='text-main text-p2'>{value?.length || 0}/{max} characters available</p>
                    <p
                        role="button"
                        onClick={() => onChange('')}
                        className='text-main p2 underline font-bold'>Clear All</p>
                </div>
            </div>
        )
    }

    return (
        <Form.Item
            name={name as any}
            className="mb-0"
            rules={[
                {
                    required: required,
                    message: 'Please enter ' + label
                }
            ]}
            initialValue=""
        >
            <Input/>
        </Form.Item>
    )

}

export default Textarea