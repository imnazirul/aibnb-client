import {DatePicker, Form} from 'antd';

interface FormInputProps {
    label?: string
    name: string
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
    onChange?: (value: any) => void,
    className?: string
}

const FormInput = ({label, name, className, required, isEmail, initialValue, placeholder, rules = [], inputProps, textArea, type, onKeyPress, readOnly, onChange}: FormInputProps) => {
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
        className={`form-input ${className}`}
        type={type}
        placeholder={placeholder}
        onKeyDown={onKeyPress}
        onChange={onChange}
        readOnly={readOnly}
        {...inputProps}
    />
    textArea && (input = <textarea placeholder={placeholder} onKeyDown={onKeyPress} rows={4} className="form-input w-full p-2 rounded-sm"/>)
    type === 'date' && (input = <DatePicker/>)

    return (
        <Form.Item
            name={name}
            label={label}
            rules={[...initRules, ...rules]}
            className="mb-4"
            initialValue={initialValue || ''}
        >
            {input}
        </Form.Item>
    )
}

export default FormInput;

interface HiddenInputProps {
    name: any
    initialValue?: any

}

interface InputFormatViewerProps {
    value?: any
    formatter?: (value: any) => any
}

export const InputFormatViewer = ({value, formatter} : InputFormatViewerProps) => {
    return (
        <>
            {!!formatter ? formatter(value) : value}
        </>
    )
}


export const HiddenInput = ({name, initialValue}: HiddenInputProps) => {
    const BlankInput = ({value} : {value?: any}) => <input value={value || ''} onChange={() => {}}/>
    return (
        <Form.Item
            name={name}
            initialValue={initialValue || ''}
            hidden
        >
            <BlankInput/>
        </Form.Item>
    )
}

