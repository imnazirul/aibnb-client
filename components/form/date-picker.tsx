import React from "react";
import { Form, DatePicker } from "antd";

interface FormDatePickerProps {
    name: string;
    label: string;
    initialValue?: any;
    onChange?: (date: any, dateString: string) => void;
    onOk?: (value: any) => void;
    placeholder?: string;
    extra?: string;
    disabled?: boolean;
    tooltip?: string;
    required?: boolean;
    showTime?: boolean;
}

const FormDatePicker = ({
    name,
    label,
    initialValue,
    placeholder,
    onChange,
    extra,
    disabled = false,
    tooltip = '',
    required = false,
    showTime = false
}: FormDatePickerProps) => {
    return (
        <Form.Item
            name={name}
            label={label}
            initialValue={initialValue || ''}
            extra={extra && extra}
            rules={[
                {
                    required: required,
                    message: 'Please input your ' + label + '!',
                },
            ]}
        >
            <DatePicker
                title={disabled && tooltip}
                disabled={disabled}
                showTime={showTime}
                placeholder={placeholder}
                className={'form-control w-full'}
            />
        </Form.Item>
    );
};

export default FormDatePicker;

