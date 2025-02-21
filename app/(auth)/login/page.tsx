"use client";
import React, { useEffect, useState } from 'react';
import Button from '../../../components/common/button';
import AuthForm from '../../../components/common/auth-form';
import { Form, Input, message } from 'antd';
import PhoneInput from 'react-phone-input-2';
import Link from 'next/link';
import Icon from '../../../components/common/icon';
import { useUser } from '../../../contexts/user';
import { useRouter } from 'next/navigation';
import { postChangePassword, postLogin } from '../../../helpers/backend';
import { useTimer } from 'use-timer';

const LoginPage = () => {
    const [value, setValue] = useState("gmail");
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [otpScreen, setOtpScreen] = useState(false);
    const { getUser } = useUser();
    const [error, setError] = useState(null);
    const router = useRouter();
    const [form] = Form.useForm();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        let params = new URL(document.location.href).searchParams;
        const data = params.get('data');
        const type = params.get('type');
        setValue(type);
        form.setFieldValue('email', data);
        form.setFieldValue('phone', data);
    }, []);
    
    const handleSubmit = async (values) => {
        setLoadingRequest(true);
        setEmail(values?.email);
        setPhone(`+${values?.phone}`);
        const { error, msg, data } = await postLogin({
            email: values?.email ? values?.email : undefined,
            phone: values?.phone ? `+${values?.phone}` : undefined,
            password: values?.password,
        });
        if (error) {
            setError(msg);
            message.error(msg);
            setLoadingRequest(false);
        } else {
            if (data?.role === "admin" || data?.role === "employee") {
                setLoadingRequest(false);
                localStorage.setItem("token", data.token);
                router.push("/admin");
                message.success(msg);
            } else {
                localStorage.setItem("token", data.token);
                getUser();
                setLoadingRequest(false);
                router.push("/");
                message.success(msg);
            }
        }
        console.log(values);
    }

    const { time, start, pause, reset, status } = useTimer({
        initialTime: 120,
        timerType: "DECREMENTAL",
    });

    useEffect(() => {
        if (email) {
            start();
        }
        if (time === 0) pause();
    }, [time, start, pause, email]);

    const handleChangePass = () => {
        setOtpScreen(true);
    }

    return (
        <div >
            {
                !otpScreen &&
                <AuthForm>
                    <div className='flex items-center w-full justify-between'>
                        <div onClick={() => router.back()} className='p-3 bg-secondary rounded-full cursor-pointer'>
                            <Icon name="arrow-left" />
                        </div>
                        <span className="text-title_md text-main mx-auto">Log in</span>
                    </div>
                    <Form form={form} className="mt-8" onFinish={handleSubmit}>
                        <div className="space-y-5">
                            <div>
                                <div>
                                    {value === "phone" && (
                                        <Form.Item name="phone"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your phone number!",
                                                },
                                            ]}>
                                            <PhoneInput
                                                enableSearch={true}
                                                country={"bd"}

                                            />
                                        </Form.Item>
                                    )}
                                    {value === "gmail" && (
                                        <Form.Item
                                            name={"email"}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your email!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                type="email"
                                                size="large"
                                                variant="outlined"
                                                placeholder="support@gmail.com"
                                                className="form-input"
                                            />
                                        </Form.Item>
                                    )}

                                    <Form.Item
                                        name={"password"}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your password!",
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            type="password"
                                            size="large"
                                            variant="outlined"
                                            placeholder="**********"
                                            className="form-input"
                                        />
                                    </Form.Item>

                                </div>
                            </div>
                            <div onClick={handleChangePass} className='forget-password'>
                                Forgot Password?
                            </div>
                        </div>
                        <Button className="w-full mt-4 text-white">Login</Button>
                    </Form>

                </AuthForm>
            }
            {
                otpScreen &&
                <AuthForm>
                    <div className='flex items-center w-full justify-between'>
                        <div onClick={() => setOtpScreen(false)}
                            className='p-3 bg-secondary rounded-full cursor-pointer'>
                            <Icon name="arrow-left" />
                        </div>
                        <span className="text-title_md text-primary mx-auto">Otp Verification</span>
                    </div>
                    <Form className="mt-8 flex flex-col justify-center items-center"
                        onFinish={async (values) => {
                            if (!!values?.otp) {
                                setOtpScreen(false);
                                const payload = {
                                    email: email ? email : "",
                                    phone: phone ? phone : "",
                                    otp: values?.otp,
                                };
                                const { error, msg, data } = await postChangePassword(payload);
                                if (error) {
                                    return message.error(msg);
                                } else {
                                    router.push("/change-password");
                                    localStorage.setItem("token", data.token);
                                    getUser();
                                    message.success(msg);

                                }
                            }
                        }}
                    >
                        <div className="space-y-5">
                            <div>
                                <div className='flex flex-col gap-4'>
                                    {value === "phone" && (
                                        <p className='text-secondaryText'>
                                            We sent a 6 digits verification code via SMS to
                                            <br />
                                            <span className='text-primary font-semibold'>{phone}</span>
                                        </p>
                                    )}
                                    {value === "gmail" && (
                                        <p className='text-secondaryText'>
                                            We sent a 6 digits verification code via SMS to
                                            <br />
                                            <span className='text-primary font-semibold'>
                                                {email}
                                            </span>
                                        </p>
                                    )}

                                    <Form.Item
                                        name={"otp"}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your otp!",
                                            },
                                        ]}
                                    >
                                        <Input.OTP
                                            size="large"
                                            variant="outlined"
                                            className=" !bg-white !py-[16px] !outline-main border-2 !border-secondary !focus:border-main !focus:outline-main !focus:ring-0 !hover:border-main"

                                        />
                                    </Form.Item>

                                </div>
                                <p className='text-secondaryText'>
                                    Resend code in <span className='text-primary font-semibold'>30s</span>
                                </p>
                            </div>

                        </div>
                        <Button className="w-full mt-4 text-white">Continue</Button>
                    </Form>

                </AuthForm>
            }

        </div>
    );
};

export default LoginPage;