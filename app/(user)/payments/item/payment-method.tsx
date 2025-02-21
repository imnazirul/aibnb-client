"use client";
import React, { useState } from "react";
import CustomModal from "../../../../components/common/custom-modal";
import { Form, notification } from "antd";
import FormSelect from "../../../../components/form/select";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import InputMask from "react-input-mask";
import Button from "../../../../components/common/button";

const PaymentMethod = ({ open, setOpen }) => {
    const [form] = Form.useForm();
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        focus: '',
    });

    const handleInputChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handleFocusChange = (e) => {
        setCardDetails({ ...cardDetails, focus: e.target.name });
    };

    const handleSubmit = (values) => {
        console.log("Form Values:", values);
        notification.success({
            message: "Payment Method Added",
            description: "Your card details have been successfully added.",
        });
        setOpen(false);
        form.resetFields()
    };

    const handleFailedSubmit = (errorInfo) => {
        console.log("Failed:", errorInfo);
        notification.error({
            message: "Submission Failed",
            description: "Please check the form for errors.",
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    const countrys = [
        "Canada",
        "South Africa",
        "Pakistan",
        "Nepal",
        "India",
        "USA",
        "UK",
        "Japan",
        "China",
        "Australia",
        "New Zealand",
        "Singapore",
        "Bangladesh",
    ];

    return (
        <>
            <div className="mt-12 border-b pb-10">
                <h2 className="text-main text-sh mb-6">Your payments</h2>
                <p className="text-p text-wrap">
                    Add a payment method using our secure payment system, then start
                    planning your next trip.
                </p>
            </div>
            <Button onClick={() => setOpen(true)} className="!bg-black text-white mt-6 rounded-md !py-4 w-fit cursor-pointer">
                Add payment method
            </Button>
            <CustomModal
                open={open}
                setOpen={setOpen}
                title={<p className="text-center">Add card details</p>}
            >
                <>
                    <div className="mt-10">
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center space-x-2">
                                <img src="visa.png" alt="Visa" className="h-6" />
                                <img src="master-card.png" alt="Mastercard" className="h-3" />
                            </div>
                            <div className="card-container border-b border-main pb-2.5">
                                <Cards
                                    number={cardDetails.number}
                                    name={cardDetails.name}
                                    expiry={cardDetails.expiry}
                                    cvc={cardDetails.cvc}
                                />
                            </div>
                            <Form
                                form={form}
                                onFinish={handleSubmit}
                                onFinishFailed={handleFailedSubmit}
                            >
                                <div className="h-[40vh] overflow-y-scroll pay-scroll">
                                    <div className=" gap-2 " >
                                        <Form.Item
                                            name="name"
                                            className="col-span-3 px-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rules={[
                                                { required: true, message: "Please enter your name" },

                                            ]}
                                        >
                                            <InputMask
                                                name="name"
                                                placeholder="Your name"
                                                className="w-full py-4 outline-none"
                                                value={cardDetails.name}
                                                onChange={handleInputChange}
                                                onFocus={handleFocusChange}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="card_number"
                                            className="col-span-3 px-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rules={[
                                                { required: true, message: "Please enter your card number" },
                                                { len: 19, message: "Card number must be 16 digits" },
                                            ]}
                                        >
                                            <InputMask
                                                mask="9999 9999 9999 9999"
                                                name="number"
                                                placeholder="Card number"
                                                className="w-full py-4 outline-none"
                                                value={cardDetails.name}
                                                onChange={handleInputChange}
                                                onFocus={handleFocusChange}
                                            />
                                        </Form.Item>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Form.Item
                                                name="expiration"
                                                className="w-full px-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rules={[
                                                    { required: true, message: "Please enter the expiration date" },
                                                    { pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: "Enter a valid expiration date" }
                                                ]}
                                            >
                                                <InputMask
                                                    mask="99/99"
                                                    name="expiry"
                                                    placeholder="MM/YY"
                                                    className="w-full py-4 outline-none"
                                                    value={cardDetails.expiry}
                                                    onChange={handleInputChange}
                                                    onFocus={handleFocusChange}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name="cvv"
                                                className="w-full px-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rules={[
                                                    { required: true, message: "Please enter your CVV" },
                                                    { len: 3, message: "CVV must be 3 digits" }
                                                ]}
                                            >
                                                <InputMask
                                                    mask="999"
                                                    name="cvc"
                                                    placeholder="CVV"
                                                    className="w-full py-4 outline-none"
                                                    value={cardDetails.cvc}
                                                    onChange={handleInputChange}
                                                    onFocus={handleFocusChange}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="">
                                        <Form.Item
                                            name="address"
                                            className="w-full px-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rules={[{ required: true, message: "Please enter your street address" }]}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Street address"
                                                className="w-full py-4 outline-none"
                                                onFocus={handleFocusChange}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="apt_number"
                                            className="w-full px-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <input
                                                type="text"
                                                placeholder="Apt or suite number"
                                                className="w-full py-4 outline-none"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="city"
                                            className="w-full px-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rules={[{ required: true, message: "Please enter your city" }]}
                                        >
                                            <input
                                                type="text"
                                                placeholder="City"
                                                className="w-full py-4 outline-none"
                                            />
                                        </Form.Item>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Form.Item
                                                name="state"
                                                className="px-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rules={[{ required: true, message: "Please enter your state" }]}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="State"
                                                    className="w-full py-4 outline-none"
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name="zip_code"
                                                className="px-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rules={[{ required: true, message: "Please enter your ZIP code" }]}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="ZIP code"
                                                    className="w-full py-4 outline-none"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="selected">
                                            <FormSelect
                                                className="w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                name="country"
                                                initialValue="Bangladesh"
                                                options={countrys.map((country) => ({
                                                    label: country,
                                                    value: country,
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="text-main hover:text-black"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                                    >
                                        Done
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </>
            </CustomModal>
        </>
    );
};

export default PaymentMethod;

