import {Form} from "antd"
import React from "react";

const PriceInput = ({name}) => {
    const Input = ({value, onChange}: any) => {
        return (
            <div className="flex items-center justify-center text-xxxl">
                <input
                    className="min-w-0 max-w-80 text-center border-0 outline-0"
                    value={`$${value || 0}`} onChange={e => {
                    let val = e.target.value.replaceAll('$', '').trim()
                    if (!isNaN(+val)) {
                        onChange(+val)
                    }
                }}/>
            </div>
        )

    }
    return (
        <Form.Item name={name}>
            <Input/>
        </Form.Item>
    )
}

export default PriceInput