import {DatePicker, Form} from "antd";
import React from "react";

interface DateInputProps {
    label: string
    name: string
    required?: boolean
}


const DateInput = ({label, name, required}: DateInputProps) => {
    return (
        <Form.Item
            label={label}
            name={name}
            className="mb-5"
            rules={[
                {
                    required: required,
                    message: "Please input your date of birth!",
                },
            ]}>
            <DatePicker
                name='dob'
                placeholder="Date Of Birth"
                size="large"
                className="form-input !w-full !px-4 !py-3.5 !leading-none"
            />
        </Form.Item>
    )
}

export default DateInput