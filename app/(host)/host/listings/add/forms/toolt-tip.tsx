import React from 'react';
import { Form } from 'antd';

const TooltipContent = ({ form }) => {

    return (
        <div className="w-[19rem] left-[6.5px] bg-white p-3 border relative shadow-price rounded-lg ">
            <div className="flex flex-col border-b gap-1 pb-2 border-webBorder text-s text-main">

                <div className="flex w-full justify-between items-center text-main">
                    <span>Base Price</span>
                    <Form.Item noStyle shouldUpdate>
                        {() => {
                            const price = form.getFieldValue('price') || 0;
                            return <span className='text-main'>${price}</span>;
                        }}
                    </Form.Item>

                </div>
                <div className="flex w-full justify-between items-center text-main">
                    <span>Guest service fee</span>
                    <Form.Item noStyle shouldUpdate>
                        {() => {
                            const price = form.getFieldValue('price') || 0;
                            const serviceFeePercent = 14
                            const main = price * (serviceFeePercent / 100)
                            return <span className='text-main'>${main.toFixed()}</span>;
                        }}
                    </Form.Item>
                </div>
            </div>
            <div className="flex flex-col border-b gap-1 pb-2 border-webBorder mt-2 text-s text-main">
                <div className="flex w-full justify-between items-center text-main">
                    <span>Guest price before taxes</span>
                    <Form.Item noStyle shouldUpdate>
                        {() => {
                            const price = form.getFieldValue('price') || 0;
                            const serviceFeePercent = 14
                            const serviceFee = price * (serviceFeePercent / 100)
                            const value = price + serviceFee
                            return <span className='text-main'>${value}</span>;
                        }}
                    </Form.Item>
                </div>
            </div>
            <h3 className="flex w-full justify-between items-center text-sb text-main mt-2">
                <span>You earn</span>
                <Form.Item noStyle shouldUpdate>
                    {() => {
                        const price = form.getFieldValue('price') || 1;
                        const serviceFee = 1
                        const value = price - serviceFee
                        return <span className='text-main'>${value}</span>;
                    }}
                </Form.Item>
            </h3>
        </div>
    );
};

export default TooltipContent;