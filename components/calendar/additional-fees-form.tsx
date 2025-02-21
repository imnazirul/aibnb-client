import React from 'react';
import { Form } from 'antd';
import { CalendarPrice } from './calender-price';
import { GuestInput } from './guest-input';
import Button from '../common/button';

const AdditionalFeesForm = ({ additionalFee, setType, setAdditionalFee }) => {
    return (
        <>
            {additionalFee === "cleaning" || additionalFee === "pet" || additionalFee === "guest_fee" ? (
                <>
                    {additionalFee !== "guest_fee" ? (
                        <h1 className="text-main text-title_md text-center capitalize mt-6">{additionalFee} fee</h1>
                    ) : (
                        <h1 className="text-main text-title_md text-center capitalize mt-6">Extra guest fee</h1>
                    )}

                    {additionalFee === "cleaning" || additionalFee === "pet" ? (
                        <h4 className="text-p2 mt-2 text-secondaryText text-center">Amount per stay</h4>
                    ) : (
                        <h4 className="text-p2 mt-2 text-secondaryText text-center">Amount per night</h4>
                    )}
                    <div className='bg-white border border-webBorder rounded-sm mt-6'>
                        <Form.Item name={additionalFee} noStyle initialValue={0}>
                            <CalendarPrice className='w-[10rem]' isIncrementOrDecrement />
                        </Form.Item>
                    </div>
                    {additionalFee === "guest_fee" && (
                        <>
                            <h4 className="text-p mt-6 text-main">For Each Guest After</h4>
                            <div className='bg-white border border-webBorder rounded-sm mt-4'>
                                <Form.Item name={'guests'} noStyle initialValue={0}>
                                    <GuestInput className='w-[10rem]' isIncrementOrDecrement />
                                </Form.Item>
                            </div>
                        </>
                    )}
                    <div className="flex flex-col gap-5 mt-6">
                        <Button className='!py-[12px] !text-h4 rounded text-white'>
                            Save
                        </Button>
                        <button type='button' onClick={() => {
                            setType({});
                            setAdditionalFee('');
                        }} className="btn">Cancel</button>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default AdditionalFeesForm;