import { Form } from 'antd';
import React from 'react';
import { MonthPercentInput } from './month-percent-input';
import Button from '../common/button';

const DiscountForm = ({ discount, setType, setDiscount }) => {
    return (
        <>
            {
                discount == "early" ?
                    <h1 className="text-main text-title_md text-center mt-6">Early bird discount</h1>
                    :
                    <h1 className="text-main text-title_md text-center mt-6">Last-minute discount</h1>
            }
            <h4 className="text-p2 mt-2 text-secondaryText text-center">For reservations booked 1 to 28 days before arrival.</h4>
            {discount == "early" ?
                <div className='bg-white border border-webBorder rounded-sm mt-6'>
                    <div className={`p-4 border-b border-webBorder`}>
                        <Form.Item name={'early_birds_months'} noStyle initialValue={0}>
                            <MonthPercentInput />
                        </Form.Item>

                        <h1 className='text-secondaryText text-p2 mt-1'>Month before arrival</h1>
                    </div>
                    <div className={`p-4`}>
                        <Form.Item name={'early_birds_discount'} noStyle initialValue={0}>
                            <MonthPercentInput isPercent />
                        </Form.Item>
                        <h1 className='text-secondaryText text-p2 mt-1'>Discount %</h1>
                    </div>
                </div>
                :
                <div className='bg-white border border-webBorder rounded-sm mt-6'>
                    <div className={`p-4 border-b border-webBorder`}>
                        <Form.Item name={'last_minute_months'} noStyle initialValue={0}>
                            <MonthPercentInput />
                        </Form.Item>
                        <h1 className='text-secondaryText text-p2 mt-1'>Month before arrival</h1>
                    </div>
                    <div className={`p-4`}>
                        <Form.Item name={'last_minute_discount'} noStyle initialValue={0}>
                            <MonthPercentInput isPercent />
                        </Form.Item>
                        <h1 className='text-secondaryText text-p2 mt-1'>Month before arrival</h1>
                    </div>
                </div>}
            <div className="flex flex-col gap-5 mt-6">
                <Button className='!py-[12px] !text-h4 rounded text-white'>
                    Save
                </Button>
                <button type='button' onClick={() => {
                    setType({})
                    setDiscount("")
                }} className="btn">Cancel</button>
            </div>
        </>
    );
};

export default DiscountForm;