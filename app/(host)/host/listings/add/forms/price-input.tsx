import { Form, Tooltip } from "antd"
import React from "react";
import TooltipContent from "./toolt-tip";
import Icon from "../../../../../../components/common/icon";

const PriceInput = ({form}) => {
    const Input = ({ value, onChange }: any) => {
        return (
            <div className="flex items-center justify-center text-d1">
                <input
                    className="min-w-0 max-w-80 text-center border-0 outline-0"
                    value={`$${value || 0}`} onChange={e => {
                        let val = e.target.value.replaceAll('$', '').trim()
                        if (!isNaN(+val)) {
                            onChange(+val)
                        }
                    }} />
            </div>
        )

    }
    return (
        <div>
            <div className="mb-28">
                <h1 className='text-xlMedium'>Now, set your price</h1>
                <span className="text-c1 text-secondaryText">You can change it anytime.</span>
            </div>

            <Form.Item name="price">
                <Input />
            </Form.Item>

            <Tooltip arrow={false} color={'white'} placement="bottomLeft" trigger={['click']} title={<TooltipContent form={form} />}>
                <div className="flex items-center justify-center mb-6 gap-1">
                    <span className='!text-main !text-sb cursor-pointer'>Guest price before taxes </span>
                    <Form.Item noStyle shouldUpdate>
                        {({ getFieldValue }) => {
                            let value = getFieldValue("price") || 0
                            return (
                                <>
                                    <span className='!text-main !text-sb cursor-pointer'>${value}</span>
                                </>
                            )
                        }}
                    </Form.Item>
                    <Icon name={"down-arrow"} />
                </div>
            </Tooltip>
        </div>

    )
}

export default PriceInput