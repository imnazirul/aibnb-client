import { Form, Select } from "antd";
import Icon from "../common/icon";

interface FormSelectProps {
    label?: any
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

const FormSelect = ({
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
    layoutStyle
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
            label={label}
            rules={[...initRules, ...rules]}
            className="mb-4"
            initialValue={initialValue}
            layout={layoutStyle}
        >
            <Select
            defaultValue={initialValue}
            
                className={className}
                variant="borderless"
                mode={mode}
                placeholder={placeholder}
                onChange={onChange}
                menuItemSelectedIcon={<Icon name="check" />}
                options={options?.map(option => ({
                    label: option?.label || option?.name,
                    value: option?.value || option?._id
                }))}
            />
        </Form.Item>
    )
}

export default FormSelect;




