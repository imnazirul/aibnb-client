import {Checkbox, Form} from "antd";
import React from "react";

const LanguageMultiselect = ({name, options}) => {
    const Input = ({value, onChange}: any) => {
        return (
            <div className="flex flex-col gap-6 mt-4">
                {options.map((val, index) => (
                    <div key={index}
                         role="button"
                         onClick={() => {
                                if (value?.includes(val.label)) {
                                    onChange(value.filter((v) => v !== val.label))
                                } else {
                                    onChange([...value, val.label])
                                }
                         }}
                         className="border-b-2 p-3 gap-4 w-full h-[57px] cursor-pointer">
                        <div className="flex gap-x-2 items-center justify-between">
                            <p className='text-p1 text-main capitalize'>{val.label}</p>
                            <div className="gap-x-6">
                                <Checkbox
                                    checked={value?.includes(val.label)}
                                    className='text-secondaryText text-p3'/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Form.Item name={name} initialValue={[]}>
            <Input/>
        </Form.Item>
    )
}

export default LanguageMultiselect;