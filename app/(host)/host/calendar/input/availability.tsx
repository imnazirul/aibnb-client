import {Form} from "antd"
import React from "react";

const AvailabilityInput = () => {

    const Checkbox = ({title, active, onSelect}: any) => {
        return (
            <div
                role="button"
                onClick={onSelect}
                className="flex justify-between items-center p-6">
               <p className="font-semibold"> {title}</p>
                <div className={`w-5 h-5 border-gray-800 border rounded-full ${active ? 'border-[6px]' : ''}`}/>
            </div>
        )
    }


    const Input = ({value, onChange}: any) => {
        return (
            <div className="border rounded-lg">
                <Checkbox
                    title="Open Nights"
                    active={value === true} onSelect={() => onChange(true)}/>
                <div className="border-b"/>
                <Checkbox
                    title="Block Nights"
                    active={value === false} onSelect={() => onChange(false)}/>
            </div>
        )

    }
    return (
        <Form.Item name={['custom', 'open']}>
            <Input/>
        </Form.Item>
    )
}

export default AvailabilityInput