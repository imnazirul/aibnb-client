import React from 'react';
import { Form } from 'antd';

const PriceTooltipContent = ({ form, type }) => {
    const getPriceField = () => {
        if (Array.isArray(type) && type.length === 2) {
            if (type[0] === 'discounts' && type[1] === 'weekly') {
                return ['discounts', 'weekly'];
            } else if (type[0] === 'discounts' && type[1] === 'monthly') {
                return ['discounts', 'monthly'];
            }
        }
        return null;
    };

    const weekOrMonth = () => {
        if (Array.isArray(type)) {
            const dailyPrice = form.getFieldValue('price') || 0;
            if (type[0] === 'discounts' && type[1] === 'weekly') {
                const mainPrice = dailyPrice * 7;
                return mainPrice;
            } else if (type[0] === 'discounts' && type[1] === 'monthly') {
                const mainPrice = dailyPrice * 30;
                return mainPrice;
            }
        }
        return null;
    };
    return (
        <div className="w-[19rem] left-[6.5px] bg-white p-3 border relative shadow-price rounded-b-[2px] ">
            <div className="flex flex-col border-b gap-1 pb-2 border-webBorder text-s text-main">
                <div className="flex w-full justify-between items-center text-main">
                    <span>
                        {type[1] === 'weekly' ? '7' : '30'} nights
                    </span>
                    <Form.Item noStyle shouldUpdate>
                        {() => {
                            const price = weekOrMonth();
                            return <span className='text-main'>${price}</span>;
                        }}
                    </Form.Item>
                </div>
                <div className="flex w-full justify-between items-center text-main">
                    <span>Weekly discount</span>
                    <Form.Item noStyle shouldUpdate>
                        {() => {
                            let percnt = form.getFieldValue(getPriceField());
                            let percntPrice = (weekOrMonth() * (percnt / 100));
                            return <span className='text-main'>${percntPrice}</span>;
                        }}
                    </Form.Item>

                </div>
                <div className="flex w-full justify-between items-center text-main">
                    <span>Guest service fee</span>
                    <span className="text-main">$28</span>
                </div>
            </div>
            <div className="flex flex-col border-b gap-1 pb-2 border-webBorder mt-2 text-s text-main">
                <div className="flex w-full justify-between items-center text-main">
                    <span>Guest price before taxes</span>
                    <Form.Item noStyle shouldUpdate>
                        {() => {
                            let value = form.getFieldValue(getPriceField()) || 0;
                            let percentPrice = weekOrMonth() - (weekOrMonth() * (value / 100));
                            let guestServiceFee = 28;
                            let price = percentPrice + guestServiceFee;
                            return <span className='text-main'>${price}</span>;
                        }}
                    </Form.Item>
                </div>
            </div>
            <h3 className="flex w-full justify-between items-center text-sb text-main mt-2">
                <span>You earn</span>
                <Form.Item noStyle shouldUpdate>
                    {() => {
                        let percentPrice = weekOrMonth();
                        let price = percentPrice - 5;
                        return <span className='text-main'>${price}</span>;
                    }}
                </Form.Item>
            </h3>
        </div>
    );
};

export default PriceTooltipContent;