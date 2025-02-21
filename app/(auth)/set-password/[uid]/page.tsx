"use client";
import { Form, Input } from 'antd'
import React from 'react'
import { MdCancel } from 'react-icons/md'

const SetPassword = ({ params }) => {
    console.log("params", params)

    const onSubmit = (values) => {
        console.log(values);
    }
    return (
        <div className="flex h-[calc(100vh-180px)] justify-center items-center">
            <div className="max-w-[580px] mx-auto ">
                <div className="border rounded-lg">
                    <h1 className='py-5 border-b text-center text-h4'>Update password</h1>
                    <div className="p-8">
                        <p className='pb-4 text-h5'>Must include at least one symbol or number and have at least 8 characters.</p>
                        <Form onFinish={onSubmit}>
                            <Form.Item
                                name={"password"}
                                rules={[
                                    {
                                        required: true,
                                        message: <div className="flex gap-2 mt-1 items-center font-semibold text-xxs text-red-600">Please input your password!</div>,
                                    },
                                    () => ({
                                        validator(_, value) {
                                            if (value && value.length <= 8) {
                                                return Promise.reject(<div className="flex gap-2 mt-1 items-center font-semibold text-xxs text-red-600">
                                                    <MdCancel />
                                                    <h1>At least 8 characters</h1>
                                                </div>);
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                    () => ({
                                        validator(_, value) {
                                            if (value && !/[A-Z]/.test(value)) {
                                                return Promise.reject(<div className="flex gap-2 items-center font-semibold text-xxs text-red-600">
                                                    <MdCancel />
                                                    <h1>At least one uppercase letter</h1>
                                                </div>);
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                    () => ({
                                        validator(_, value) {
                                            if (value && !/[a-z]/.test(value)) {
                                                return Promise.reject(<div className="flex gap-2 items-center font-semibold text-xxs text-red-600">
                                                    <MdCancel />
                                                    <h1>At least one lowercase letter</h1>
                                                </div>);
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                    () => ({
                                        validator(_, value) {
                                            if (value && !/[0-9]/.test(value)) {
                                                return Promise.reject(<div className="flex gap-2 items-center font-semibold text-xxs text-red-600">
                                                    <MdCancel />
                                                    <h1>At least one number</h1>
                                                </div>);
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                    () => ({
                                        validator(_, value) {
                                            if (value && !/[!@#$%^&*()_+\-=\[\]{ };':"\\|,.<>\/?]/.test(value)) {
                                                return Promise.reject(<div className="flex gap-2 items-center mb-3 font-semibold text-xxs text-red-600">
                                                    <MdCancel />
                                                    <h1>At least one special character</h1>
                                                </div>);
                                            }
                                            return Promise.resolve();
                                        },
                                    })
                                ]}
                            >
                                <Input.Password
                                    type="password"
                                    size="large"
                                    variant="outlined"
                                    placeholder="Password"
                                    className="form-input"
                                />
                            </Form.Item>
                            <Form.Item
                                name={"confirm_password"}
                                className='mt-3'
                                rules={[
                                    {
                                        required: true,
                                        message: "Please re-enter your password!",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(<div className="flex gap-2 items-center mb-3 font-semibold text-xxs text-red-600">The new password that you entered do not match!</div>);
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    type="password"
                                    size="large"
                                    variant="outlined"
                                    placeholder="Re-enter your password"
                                    className="form-input"
                                />
                            </Form.Item>
                            <button className='w-full bg-black text-white py-3 rounded-md text-h5'>Update</button>
                        </Form>
                    </div>

                </div>
            </div >
        </div >
    );
};

export default SetPassword;