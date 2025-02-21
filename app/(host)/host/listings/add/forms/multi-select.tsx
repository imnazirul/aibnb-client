import { Form } from "antd";
import React from "react";
import { toAssetUrl } from "../../../../../../helpers/utils";
import Svg from "../../../../../../components/common/svg";

const MultiSelectAmenities = ({ name, options }) => {

    const Input = ({ value, onChange }: any) => {
        return (
            <div className="grid md:grid-cols-3 grid-cols-2  gap-3 md:gap-4 lg:gap-5 mt-6">
                {options?.map((val, index) => (
                    <div
                        className={`place-card ${value.includes(val._id) ? 'selected' : ''}`}
                        key={index}
                        onClick={() => {
                            if (value?.includes(val._id)) {
                                onChange(value.filter((v) => v !== val._id))
                            } else {
                                onChange([...value, val._id])
                            }
                        }}
                    >
                        <Svg src={toAssetUrl(val.icon)} />
                        <div className="">
                            <h3 className={`group-hover:text-black text-h4 ${value.includes(val._id) ? 'text-black' : 'text-main'}`}>{val.name}</h3>
                            
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Form.Item name={name} initialValue={[]}>
            <Input />
        </Form.Item>
    )
}

export default MultiSelectAmenities;