import React from 'react';
import { Form } from 'antd';


const PriceTooltip = ({ form, type }) => {
    return (
        <div className="w-[19rem] left-[6.5px] bg-white p-3 border relative shadow-price rounded-b-[2px] ">
            <div className="flex flex-col border-b gap-1 pb-2 border-webBorder text-s text-main">
                <h3 className="flex w-full justify-between items-center text-secondary2"><span>Base Price</span>
                    <Form.Item noStyle shouldUpdate>
                        {() => {
                            let price = form.getFieldValue(type)
                            return (
                                <span className='text-main'>${price}</span>
                            )
                        }}
                    </Form.Item>
                </h3>
                <h3 className="flex w-full justify-between items-center text-secondary2"><span>Guest Service Fee</span>
                    <span className='text-main'>$4</span>
                </h3>
            </div>
            <h3 className="flex w-full justify-between items-center text-sb text-main mt-2"><span>Guest price before taxes</span>
                <Form.Item noStyle shouldUpdate>
                    {() => {
                        let price = form.getFieldValue(type)
                        let serviceFee = 4
                        let total = price + serviceFee
                        return (
                            <span className="text-primary">${total}</span>
                        )
                    }}
                </Form.Item>
            </h3>
            <div className="flex flex-col border-b gap-1 pb-2 border-webBorder mt-2 text-s text-main">
                <h3 className="flex w-full justify-between items-center text-secondary2"><span>Base Price</span>
                    <Form.Item noStyle shouldUpdate>
                        {() => {
                            let price = form.getFieldValue(type)
                            return (
                                <span className='text-main'>${price}</span>
                            )
                        }}
                    </Form.Item>
                </h3>
                <h3 className="flex w-full justify-between items-center text-secondary2">
                    <span> Host Service Fee</span>
                    <span className="text-main">- $1</span>
                </h3>
            </div>
            <h3 className="flex w-full justify-between items-center text-sb text-main mt-2"><span> You earn</span>
                <Form.Item noStyle shouldUpdate>
                    {() => {
                        let price = form.getFieldValue(type)
                        let hostServiceFee = 1
                        let yourEarn = price - hostServiceFee
                        return (
                            <span className="text-primary">${yourEarn}</span>
                        )
                    }}
                </Form.Item>

            </h3>
        </div>
    );
};

export default PriceTooltip