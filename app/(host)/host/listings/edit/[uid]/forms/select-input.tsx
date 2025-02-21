import { Form, Select } from "antd";

interface FormSelectProps {
    label?: string
    name: any
    required?: boolean
    initialValue?: any
    className?: string
    rules?: any
    onChange?: (value: any) => void
    placeholder?: string
    mode?: "multiple" | "tags"
    options?: any[]
    layoutStyle?: any

}

const FormSelectInput = ({
    className,
    label,
    name,
    required,
    initialValue,
    rules = [],
    onChange,
    placeholder,
    mode,
    options,

}: FormSelectProps) => {
    let initRules = [
        {
            required: required,
            message: `Please provide ${typeof label === 'string' && label?.toLowerCase() || 'a value'}`
        },
    ]

    return (
        <Form.Item
            name={name}
            // label={label}
            rules={[...initRules, ...rules]}
            className="mb-4"
            initialValue={initialValue}
        >
            <h1 className=' absolute text-xxs font-semibold top-[6px] px-2'>{label}</h1>
            <Select
                defaultValue={initialValue}
                className={`w-full text-md ${className}`}
                mode={mode}
                placeholder={placeholder}
                onChange={onChange}
                options={options?.map(option => ({
                    label: option?.label || option?.name,
                    value: option?.value || option?._id
                }))}
                />
        </Form.Item >
    )
}

export default FormSelectInput;




