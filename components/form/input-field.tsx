import {Form} from 'antd';

interface FormInputProps {
    label?: string
    name: any
    required?: boolean
    isEmail?: boolean
    initialValue?: any
    placeholder?: string
    onKeyPress?: (e: any) => void
    rules?: any
    inputProps?: any
    textArea?: boolean
    type?: string
    readOnly?: boolean
    onChange?: (value: any) => void

}


const FormField = ({label, name, required, isEmail, initialValue, placeholder, rules = [], inputProps, textArea, type, onKeyPress, readOnly, onChange}: FormInputProps) => {
    let initRules: any = [
        {
            required: required,
            message: `Please provide ${typeof label === 'string' && label?.toLowerCase() || 'a value'}`
        },
    ]
    if (isEmail) {
        initRules.push({type: 'email', message: 'Please enter a valid email address'})
    }

    let input = <input
        className="form-input p-2 text-p1 w-full rounded-md"
        type={type}
        placeholder={placeholder}
        onKeyDown={onKeyPress}
        onChange={onChange}
        readOnly={readOnly}
        {...inputProps}
    />
    textArea && (input = <textarea onKeyDown={onKeyPress} className="form-input"/>)

    return (
        <Form.Item
            name={name}
            label={label}
            rules={[...initRules, ...rules]}
            className="mb-6"
            initialValue={initialValue || ''}
        >
            {input}
        </Form.Item>
    )
}

export default FormField;