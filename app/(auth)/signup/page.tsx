"use client";
import React, { useEffect, useState } from 'react';
import AuthForm from '../../../components/common/auth-form';
import Icon from '../../../components/common/icon';
import { Checkbox, DatePicker, Form, Input, message } from 'antd';
import PhoneInput from 'react-phone-input-2';
import Link from 'next/link';
import Button from '../../../components/common/button';
import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'
import { useTimer } from "use-timer";
import { postRegister, sendOtp } from '../../../helpers/backend';
import { useUser } from '../../../contexts/user';

const SignIn = () => {
    const [value, setValue] = useState("gmail");
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [otpScreen, setOtpScreen] = useState(false);
    const { getUser } = useUser();
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState({ message: "", color: "", icon: null });
    const [registrationValues, setRegistrationValues] = useState({});

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(checkPasswordStrength(newPassword));
    };

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

    useEffect(() => {
        let params = new URL(document.location.href).searchParams;
        const data = params.get('data');
        const type = params.get('type');
        setValue(type);
        form.setFieldValue('email', data);
        form.setFieldValue('phone', data);
    }, []);


    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        switch (strength) {
            case 0:
            case 1:
                return { message: "Very weak", color: "red", icon: <CloseCircleOutlined /> };
            case 2:
                return { message: "Weak", color: "orange", icon: <WarningOutlined /> };
            case 3:
                return { message: "Fair", color: "purple", icon: <WarningOutlined /> };
            case 4:
                return { message: "Good", color: "blue", icon: <CheckCircleOutlined /> };
            case 5:
                return { message: "Strong", color: "green", icon: <CheckCircleOutlined /> };
            default:
                return { message: "", color: "", icon: null };
        }
    };
    const dateFormat = 'YYYY-MM-DD'; 

    return (
        <div >
            {
                !otpScreen &&
                <AuthForm>
                    <div className='flex gap-3 items-center w-full justify-between'>
                        <div onClick={() => router.back()}
                            className='p-3 bg-secondary rounded-full cursor-pointer'>
                            <Icon name="arrow-left" />
                        </div>
                        <span className="text-title_md text-main mx-auto">Enter your information for create account</span>
                    </div>
                    <Form form={form}
                        onFinish={async (values) => {
                            setLoadingRequest(true);
                            if (!!values?.email || !!values?.phone) {
                                setLoadingRequest(false);
                                setEmail(values?.email);
                                setPhone(`+${values?.phone}`);
                                const { error, msg, data } = await sendOtp({
                                    email: values?.email ? values?.email : undefined,
                                    phone: values?.phone ? `+${values?.phone}` : undefined,
                                    action: "register",
                                });
                                if (error) {
                                    setLoadingRequest(false);
                                    return message.error(msg);
                                } else {
                                    form2.setFieldValue("otp", data.otp);
                                    setLoadingRequest(false);
                                    message.success(
                                        `OTP sent to ${values?.email || `+${values?.phone}`}`
                                    );
                                    setOtpScreen(true);
                                    setRegistrationValues({
                                        name: values?.name,
                                        dob: values?.dob,
                                        email: !!values?.email ? values?.email : undefined,
                                        phone: !!values?.phone ? `+${values?.phone}` : undefined,
                                    });
                                }
                            }
                        }}
                        className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <div>
                                    <label className='text-main text-p1 mb-2'>Full Name</label>
                                    <Form.Item name={"name"}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your full name!",
                                            },
                                        ]}>
                                        <Input
                                            type="text"
                                            size="large"
                                            variant="outlined"
                                            placeholder="Enter Full Name"
                                            className=" form-input"
                                        />
                                    </Form.Item>

                                    {value === "phone" && (
                                        <>
                                            <label className='text-main text-p1 mb-2'>Phone Number</label>
                                            <Form.Item name={"phone"}
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
                                        </>

                                    )}
                                    {value === "gmail" && (
                                        <>
                                            <label className='text-main text-p1 mb-2'>Email</label>
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
                                                    className=" form-input"
                                                />
                                            </Form.Item>
                                        </>

                                    )}

                                    <label className='text-main text-p1 mb-2'>Date Of Birth</label>
                                    <Form.Item name={"dob"}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your date of birth!",
                                            },
                                        ]}>
                                        <DatePicker
                                            name='dob'
                                            placeholder="Date Of Birth"
                                            size="large"
                                            className="form-input !w-full"
                                            format={dateFormat} 
                                        />
                                    </Form.Item>

                                    <label className='text-main text-p1 mb-2'>Password</label>
                                    <Form.Item
                                        name={"password"}

                                    >
                                        <Input.Password
                                            type="password"
                                            size="large"
                                            variant="outlined"
                                            placeholder="**********"
                                            className="form-input"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                        <div className='mt-2.5' style={{ color: passwordStrength.color, display: 'flex', alignItems: 'center' }}>
                                            {passwordStrength.icon}
                                            <span style={{ marginLeft: '8px' }}>
                                                Password strength: {passwordStrength.message}
                                            </span>
                                        </div>
                                    </Form.Item>

                                </div>
                            </div>
                            <Checkbox className='text-secondaryText text-p3'>
                                <span className=''>
                                    By signing up. you agree to the
                                    <Link href="#" className='text-main underline hover:text-primary px-1'>
                                        Terms of service
                                    </Link>
                                    and
                                    <br />
                                    <Link href="#" className='text-main underline hover:text-primary'>
                                        Privacy policy.
                                    </Link>
                                </span>
                            </Checkbox>

                        </div>
                        <Button className="w-full mt-4 text-white">Agree and continue</Button>
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
                        <span className="text-title_md text-main mx-auto">Otp Verification</span>
                    </div>
                    <Form form={form} className="mt-8 flex flex-col justify-center items-center"
                        onFinish={async (values) => {
                            if (!!values?.otp) {
                                setOtpScreen(false);
                                const payload = {
                                    ...registrationValues,
                                    password: password,
                                    otp: values?.otp,
                                };
                                const { error, msg, data } = await postRegister(payload);
                                if (error) {
                                    return message.error(msg);
                                } else {
                                    router.push("/");
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
                                            <span className='text-main font-semibold'>{phone}</span>
                                        </p>
                                    )}
                                    {value === "gmail" && (
                                        <p className='text-secondaryText'>
                                            We sent a 6 digits verification code via SMS to
                                            <br />
                                            <span className='text-main font-semibold'>
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
                                            className="form-input"

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

export default SignIn;