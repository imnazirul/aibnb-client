import { Form, Input, message } from 'antd';
import React from 'react';
import Button from '../common/button';

const ForgetPassword = ({ setIsOpen }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        console.log(values);
        message.success('Reset link sent to your email' + values.email);
        setIsOpen(false);
    }
    return (
        <div>
            <p className='text-p text-main text-wrap'>Enter the email address associated with your account, and we’ll email you a link to reset your password.</p>
            <Form form={form} className="mt-4" onFinish={handleSubmit}>
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
                        placeholder="Email"
                        className="form-input !border-black"
                    />
                </Form.Item>
                <Button className="w-full mt-12 text-white">Sent reset link</Button>

            </Form>
        </div>
    );
};

export default ForgetPassword;