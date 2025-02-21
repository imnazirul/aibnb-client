import { Checkbox, DatePicker, Form, Input, message } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Button from '../common/button';
import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { postRegister, sendOtp } from '../../helpers/backend';
import { useRouter } from 'next/navigation';
import { useUser } from '../../contexts/user';

const SignUp = ({ userValue, setIsOpen }) => {
    const [form] = Form.useForm();
    const [passwordStrength, setPasswordStrength] = useState({ message: "", color: "", icon: null });
    const [password, setPassword] = useState("");
    const [registrationValues, setRegistrationValues] = useState({});
    const [otpScreen, setOtpScreen] = useState(false);
    const router = useRouter();
    const { getUser } = useUser();

    useEffect(() => {
        form.setFieldsValue({ email: userValue?.value });
        form.setFieldsValue({ phone: userValue?.value });
    }, [userValue]);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(checkPasswordStrength(newPassword));
    };


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
    return (
        <div className="user-sidebar">
            {
                !otpScreen &&
                <Form
                    form={form}
                    onFinish={async (values) => {
                        if (!!values?.email || !!values?.phone) {
                            const { error, msg, data } = await sendOtp({
                                email: values?.email ? values?.email : undefined,
                                phone: values?.phone ? `+${values?.phone}` : undefined,
                                action: "register",
                            });
                            if (error) {
                                return message.error(msg);
                            } else {
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
                    className="">
                    <div className="space-y-5">
                        <div>
                            <div>
                                <label className='text-main text-p '>Full Name</label>
                                <Form.Item name={"name"}
                                    className="mt-3"
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
                                <p className="text-xxs -mt-5 mb-5 text-[#6a6a6a]">Make sure this matches the name on your government ID. If you go by another name, you can add a <span className="font-semibold underline text-main">preferred first name</span> .</p>


                                {userValue?.type === "phone" && (
                                    <>
                                        <label className='text-main text-p1 mb-2'>Phone Number</label>
                                        <Form.Item name={"phone"}
                                            className="mt-3"
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
                                <label className='text-main text-p mb-2'>Date Of Birth</label>
                                <Form.Item name={"dob"}
                                    className="mt-3"
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
                                    />
                                </Form.Item>
                                <p className="text-xxs -mt-5 mb-5 text-[#6a6a6a]">To sign up, you need to be at least 18. Your birthday won’t be shared with other people who use Airbnb.</p>
                                {userValue?.type === "gmail" && (
                                    <>
                                        <label className='text-main text-p mb-2'>Email</label>
                                        <Form.Item
                                            className="mt-3"
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
                                        <p className="text-xxs -mt-5 mb-5  text-[#6a6a6a]">We'll email you trip confirmations and receipts.</p>
                                    </>
                                )}


                                <label className='text-main text-p mb-2'>Password</label>
                                <Form.Item
                                    name={"password"}
                                    className="mt-3"

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
                        <Checkbox className=' text-[#6a6a6a]  text-xxs'>
                            <span className=''>
                                By signing up. you agree to the
                                <Link href="#" className='text-main underline hover:text-primary px-1'>
                                    Terms of service
                                </Link>
                                and <Link href="#" className='text-main underline hover:text-primary'>
                                    Privacy policy.
                                </Link>
                            </span>
                        </Checkbox>

                    </div>
                    <Button className="w-full mt-4 text-white">Agree and continue</Button>
                </Form>
            }

            {
                otpScreen &&
                <div className="user-sidebar">
                    <span className="text-title_md text-black w-full ">Enter your verification code</span>
                    <Form className="mt-2 flex flex-col justify-center "
                        onFinish={async (values) => {
                            if (!!values?.otp) {
                                const payload = {
                                    ...registrationValues,
                                    password: password,
                                    otp: values?.otp,
                                };
                                const { error, msg, data } = await postRegister(payload);
                                if (error) {
                                    return message.error(msg);
                                } else {
                                    setIsOpen(false);
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
                                    {userValue?.type === "phone" && (
                                        <p className='text-secondaryText'>
                                            Enter the code we just sent to your phone
                                            <span className='text-main font-semibold ml-1.5'>
                                                {userValue?.value}
                                            </span>
                                        </p>
                                    )}
                                    {userValue?.type === "gmail" && (
                                        <p className='text-secondaryText'>
                                            Enter the code we emailed to
                                            <span className='text-main font-semibold ml-1.5'>
                                                {userValue?.value}
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
                </div>
            }
        </div>
    );
};

export default SignUp;