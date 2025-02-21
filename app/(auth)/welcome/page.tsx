"use client"
import React, { useEffect, useState } from 'react';
import AuthForm from '../../../components/common/auth-form';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Form, Input, message } from 'antd';
import Button from '../../../components/common/button';
import Icon from '../../../components/common/icon';
import Link from 'next/link';
import { findUser } from '../../../helpers/backend';
import { useFetch } from '../../../helpers/hooks';
import { useRouter } from 'next/navigation';

const FindUserPage = () => {
    const [value, setValue] = useState("gmail");
    const [existUser, getExistUser]:any = useFetch(findUser, {}, false);
    const router = useRouter();
    const [userValue, setUserValue] = useState();
    const [dataSubmitted, setDataSubmitted] = useState(false);

    const handleInputChange = (event) => {
        console.log(event);
        setUserValue(event);
        setDataSubmitted(false);
    };

    const handleSubmit = (values) => {
        getExistUser(values);
        setDataSubmitted(true);
    }

    useEffect(() => {
        if (!!dataSubmitted && existUser?.isExist) {
            router.push(`/login?data=${userValue}&type=${value}`);
        }
        if (!!dataSubmitted && existUser?.isExist === false) {
            router.push(`/signup?data=${userValue}&type=${value}`);
        }
    }, [dataSubmitted, !!existUser]);
    return (
        <div >
            <AuthForm>
                <h2 className="text-main text-center text-title_md">Welcome to appstick home</h2>
                <p className="mt-2 text-p2 text-secondaryText text-center">Enter your phone number number to create an account or Login</p>
                <Form className="mt-8" onFinish={handleSubmit}>
                    <div className="space-y-5">
                        <div>
                            <div>
                                {value === "phone" && (
                                    <Form.Item name={"phone"}>
                                        <PhoneInput
                                            enableSearch={true}
                                            country={"bd"}
                                            // value={this?.state?.phone}
                                            onChange={
                                                (phone) => {
                                                    handleInputChange(phone);
                                                }
                                            }
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
                                            onChange={(e) => handleInputChange(e.target.value)}
                                        />
                                    </Form.Item>
                                )}
                            </div>
                        </div>
                        <span className='text-secondaryText text-p3'>
                            We’ll call or text you to confirm your number. Standard message and data rates apply.
                            <br />
                            <Link href="#" className='text-secondaryText underline hover:text-primary'>
                                Privacy Policy
                            </Link>
                        </span>
                    </div>
                    <Button className="w-full mt-4 text-white">Continue</Button>
                </Form>
                <div className="flex whitespace-pre items-center gap-2 my-5">
                    <div className="w-1/2 h-[2px] bg-[#ECEEF2]"></div>
                    <div className="text-secondaryText">Or Continue with</div>
                    <div className="w-1/2 h-[2px] bg-[#ECEEF2]"></div>
                </div>

                <div className="mt-3 space-y-3">
                    {
                        value === "phone" ? (
                            <Button onClick={() => setValue("gmail")} className="btn-phn-email">
                                <Icon name="message" />
                                Continue with Email
                            </Button>
                        ) : (
                            <Button onClick={() => setValue("phone")} className="btn-phn-email">
                                <Icon name="phone" />
                                Continue with Phone
                            </Button>
                        )
                    }

                    <Button className="btn-google">
                        <Icon name="google-icon" />
                        Continue with Google
                    </Button>
                </div>
            </AuthForm>

        </div>
    );
};

export default FindUserPage;