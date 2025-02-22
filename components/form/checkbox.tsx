import {Checkbox, Form} from "antd";

const FormCheckbox = ({ name, label, initialValue }) => {
    return (
        <Form.Item
            name={name}
            initialValue={initialValue}
            className="mb-2"
            valuePropName="checked">
            <Checkbox>{label}</Checkbox>
        </Form.Item>
    )
}
export default FormCheckbox


export const FormGroupCheckbox = ({ name, label, initialValue , options}) => {
    return (
        <Form.Item
            name={name}
            initialValue={initialValue}
            className="mb-2"
            valuePropName="checked">
            <Checkbox.Group options={options} />
        </Form.Item>
    )
}
