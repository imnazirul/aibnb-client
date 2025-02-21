import { Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import Button from '../common/button';
import Icon from '../common/icon';
import PhoneInput from 'react-phone-input-2';
import { useFetch } from '../../helpers/hooks';
import { findUser } from '../../helpers/backend';
import "react-phone-input-2/lib/style.css";

const Welcome = ({ setCurrent, setUserValue, userValue, }) => {
    const [value, setValue] = useState("gmail");
    const [existUser, getExistUser]: any = useFetch(findUser, {}, false);
    const [dataSubmitted, setDataSubmitted] = useState(false);

    const handleInputChange = (event) => {
        setUserValue({
            value: event,
            type: value
        });
        setDataSubmitted(false);
    };

    const handleSubmit = (values) => {
        getExistUser(values);
        setDataSubmitted(true);

    }

    useEffect(() => {
        if (!!dataSubmitted && existUser?.isExist) {
            setCurrent('login')
            setUserValue(userValue)

        }
        if (!!dataSubmitted && existUser?.isExist === false) {
            setCurrent('signup')
            setUserValue(userValue)
        }
    }, [dataSubmitted, !!existUser]);


    return (
        <div className="user-sidebar">
            <h2 className="text-black text-title_md mt-2.5">Welcome to Appstick</h2>
            <Form className="mt-4" onFinish={handleSubmit}>
                <div className="space-y-5">
                    <div>
                        <div>
                            {value === "phone" && (
                                <>
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
                                        <p className='text-xxs font-medium mt-1'>We’ll call or text you to confirm your number. Standard message and data rates apply. Privacy Policy</p>
                                    </Form.Item>
                                </>

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
                </div>
                <Button className="w-full text-white">Continue</Button>
            </Form>
            <div className="flex whitespace-pre items-center gap-2 my-5">
                <div className="w-1/2 h-[2px] bg-[#ECEEF2]"></div>
                <div className="text-main ">Or</div>
                <div className="w-1/2 h-[2px] bg-[#ECEEF2]"></div>
            </div>

            <div className="mt-3 space-y-3">
                
                <IconButton icon="facebook" top={'[12px]'} name="Continue with Facebook" />
                <IconButton icon="google-icon" top={'[12px]'} name="Continue with Google" />
                <IconButton icon="apple" top={'[12px]'} name="Continue with Apple" />

                {
                    value === "phone" ? (
                        // <Button onClick={() => setValue("gmail")} className="btn-phn-email">
                        //     <Icon name="message" />
                        //     Continue with Email
                        // </Button>
                        <IconButton onClick={() => setValue("gmail")} icon="message" top={'[12px]'} name="Continue with Email" />
                    ) : (
                        // <Button onClick={() => setValue("phone")} className="btn-phn-email">
                        //     <Icon name="phone" />
                        //     Continue with Phone
                        // </Button>
                        <IconButton onClick={() => setValue("phone")} icon="phone" top={'[12px]'} name="Continue with Phone" />
                    )
                }
            </div>
        </div>
    );
};

export default Welcome;

const IconButton = ({ icon, top, name, onClick }: { icon: string, top: number | any, name: string, onClick?: any }) => {

    return (
        <Button onClick={onClick} className="btn-google relative">
            <div className={`absolute top-${top} left-5`}>
                <Icon name={icon} />
            </div>
            {name}
        </Button>
    );
}