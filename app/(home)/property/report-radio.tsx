import { Form } from "antd";
import React from "react";

const ReportRadioInput = ({ reportData }: any) => {

    const Checkbox = ({ title, active, onSelect }: any) => {
        return (
            <div
                role="button"
                onClick={onSelect}
                className="flex justify-between items-center p-6">
                <p className="font-semibold"> {title}</p>
                <div className={`w-5 h-5 border-gray-800 border rounded-full ${active ? 'border-[6px]' : ''}`} />
            </div>
        )
    }

    const Input = ({ value, onChange }: any) => {
        return (
            <div >
                {reportData?.map((item: any) => (
                    <div key={item.id}>
                        <Checkbox
                            title={item.name}
                            active={value === item.id}
                            onSelect={() => onChange(item.id)}
                        />
                        {item.id !== reportData.length && <div className="border-b" />}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Form.Item name={'report'} >
            <Input />
        </Form.Item>
    )
}

export default ReportRadioInput;
