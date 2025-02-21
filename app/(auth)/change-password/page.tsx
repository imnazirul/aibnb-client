"use client";
import React, { useState } from 'react';
import AuthForm from '../../../components/common/auth-form';
import { useRouter } from 'next/navigation';
import Icon from '../../../components/common/icon';
import { Form, Input } from 'antd';
import Button from '../../../components/common/button';

const ChangePassword = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [changeSuccess, setChangeSuccess] = useState(false);
    const handleSubmit = (values) => {
        console.log(values);
    }
    return (
        <div>
            {
                changeSuccess &&
                <AuthForm>
                    <div className='flex items-center w-full justify-between'>
                        <div onClick={() => router.back()} className='p-3 bg-secondary rounded-full cursor-pointer'>
                            <Icon name="arrow-left" />
                        </div>
                        <span className="text-title_md text-main mx-auto capitalize">create new password</span>
                    </div>
                    <Form form={form} className="mt-8" onFinish={handleSubmit}>
                        <div className="space-y-5">
                            <div>
                                <div>
                                    <Form.Item
                                        name={"password"}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your password",
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (value.length >= 6) {
                                                        return Promise.resolve();
                                                    } else {
                                                        return Promise.reject(
                                                            new Error(
                                                                (
                                                                    "Password must be at least 6 characters!"
                                                                )
                                                            )
                                                        );
                                                    }
                                                },
                                            }),
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password
                                            type="password"
                                            size="large"
                                            variant="outlined"
                                            placeholder="New Password"
                                            className="!bg-white !py-[16px] !outline-primary border-2 !border-secondary !focus:border-primary !focus:outline-primary !focus:ring-0 !hover:border-primary"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={"confirm_password"}
                                        dependencies={["password"]}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please confirm your password!",
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (
                                                        !value ||
                                                        getFieldValue("password") === value
                                                    ) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(
                                                        new Error(
                                                            (
                                                                "The new password that you entered do not match!"
                                                            )
                                                        )
                                                    );
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password
                                            type="password"
                                            size="large"
                                            variant="outlined"
                                            placeholder="Password"
                                            className="!bg-white !py-[16px] !outline-primary border-2 !border-secondary !focus:border-primary !focus:outline-primary !focus:ring-0 !hover:border-primary"
                                        />
                                    </Form.Item>

                                </div>
                            </div>
                        </div>
                        <Button className="w-full mt-4 text-white">Confirm</Button>
                    </Form>

                </AuthForm>
            }

            {
                !changeSuccess &&
                <AuthForm>
                    <div className='flex items-center w-full justify-between'>
                        <div onClick={() => setChangeSuccess(true)} className='p-3 bg-secondary rounded-full cursor-pointer'>
                            <Icon name="arrow-left" />
                        </div>
                        <span className="text-title_md text-main mx-auto capitalize">new password done</span>
                    </div>
                    <div className='flex flex-col justify-center items-center mt-[60px]'>
                        <Icon name="success" />
                        <div className='mt-[58px] mb-8 flex flex-col gap-3 items-center'>
                            <h2 className='text-main text-title_md '>Great! Password Changed</h2>
                            <p className='text-secondaryText text-p2'>
                                Don’t worry! We’ll let you know if there is any
                                problem with your account
                            </p>
                        </div>

                    </div>
                    <Button href='/' className="w-full mt-4 text-white">Go Home</Button>
                </AuthForm>
            }


        </div>
    );
};

export default ChangePassword;