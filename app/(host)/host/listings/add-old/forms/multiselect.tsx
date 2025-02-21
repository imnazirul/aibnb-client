import Icon from "../../../../../../components/common/icon";
import {Checkbox, Form} from "antd";
import React from "react";
import {toAssetUrl} from "../../../../../../helpers/utils";
import Svg from "../../../../../../components/common/svg";

const Multiselect = ({name, options}) => {
    const Input = ({value, onChange}: any) => {
        return (
            <div className="flex gap-6 mt-4">
                {options?.map((val, index) => (
                    <div key={index}
                         role="button"
                         onClick={() => {
                                if (value?.includes(val._id)) {
                                    onChange(value.filter((v) => v !== val._id))
                                } else {
                                    onChange([...value, val._id])
                                }
                         }}
                         className="border p-3 rounded-md flex flex-row gap-4 w-auto h-[57px] cursor-pointer">
                        <div className="flex gap-x-2 items-center">
                            <Svg src={toAssetUrl(val.icon)}/>
                            <p className='text-p1 text-main capitalize'>{val.name}</p>
                            <div className="flex-1"/>
                            <div className="gap-x-6">
                                <Checkbox
                                    checked={value?.includes(val._id)}
                                    className='text-secondaryText text-p3'/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Form.Item name={name} initialValue={[]}>
            <Input/>
        </Form.Item>
    )
}

export default Multiselect;