import {Checkbox, Form, Radio} from "antd";

interface FormRadioProps {
    name: string;
    label?: string;
    initialValue?: any;
    options: any;
}

const FormRadio = ({name, label, initialValue, options}: FormRadioProps) => {
    return (
        <Form.Item
            name={name}
            label={label}
            initialValue={initialValue}
            className="mb-2">
            <Radio.Group options={options}/>
        </Form.Item>
    )
}


export default FormRadio