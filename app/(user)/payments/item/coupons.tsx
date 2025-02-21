'use client';
import { Form } from 'antd';
import React, { useState } from 'react';
import Button from '../../../../components/common/button';

const Coupons = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    return (
        <div>
            <h2 className="text-main text-sh mt-12 border-b pb-4">Coupons</h2>
            <div className="mt-4 flex justify-between">
                <h2 className="text-[#222222] text-p1">Your Coupons</h2>
                <span className="text-main text-title_md">0</span>
            </div>
            {
                open ? (
                    <Form
                        form={form}
                        onFinish={(values) => console.log(values)
                        }
                        className="mt-4">
                        <Form.Item
                            name="coupons"
                            className="w-full px-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rules={[{ required: true, message: "Please enter your coupons" }]}
                        >
                            <input
                                type="text"
                                placeholder="Add coupon"
                                className="w-full py-4 outline-none"
                            />
                        </Form.Item>

                        <div className='flex gap-4'>
                            <button
                                type="submit"
                                className="px-5 py-3 bg-black text-white rounded-md hover:bg-gray-800"
                            >
                                Redeem Coupon
                            </button>
                            <div
                                onClick={() => setOpen(false)}
                                className="px-5 py-3 cursor-pointer rounded-md border border-black"
                            >
                                Cancel
                            </div>
                        </div>
                    </Form>
                ) : (
                    <button
                        onClick={() => setOpen(true)}
                        type="button"
                        className="px-5 py-3 mt-4 bg-black text-white rounded-md hover:bg-gray-800"
                    >
                        Add Coupon
                    </button>
                )
            }


        </div>
    );
};

export default Coupons;