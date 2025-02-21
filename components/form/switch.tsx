import {Form, Switch} from "antd";

interface FormSwitchProps {
    name: string;
    label: string;
    initialValue?: boolean;
}

const FormSwitch = ({ name, label, initialValue }: FormSwitchProps) => {

    const Input = ({value, onChange}: any) => {
        return (
            <div className="flex gap-4 items-center">
                <Switch
                    value={value}
                    onChange={onChange}
                />
                <p>{label}</p>
            </div>
        )
    }


    return (
        <Form.Item
            name={name}
            initialValue={initialValue}
            className="mb-2">
            <Input/>
        </Form.Item>
    )
}
export default FormSwitch