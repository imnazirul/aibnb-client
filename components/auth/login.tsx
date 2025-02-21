import { Form, Input, message } from 'antd';
import React from 'react';
import { postLogin } from '../../helpers/backend';
import { useRouter } from 'next/navigation';
import { useUser } from '../../contexts/user';
import Button from '../common/button';

const Login = ({ userValue, setOpen, setCurrent }) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { getUser } = useUser();

    const handleSubmit = async (values) => {
        const { error, msg, data } = await postLogin({
            email: userValue?.type === 'gmail' ? userValue?.value : undefined,
            phone: userValue?.type === 'phone' ? `+${userValue?.value}` : undefined,
            password: values?.password,
        });
        if (error) {
            message.error(msg);
        } else {
            setOpen(false);
            if (data?.role === "admin" || data?.role === "employee") {
                localStorage.setItem("token", data.token);
                router.push("/admin");
                message.success(msg);
            } else {
                localStorage.setItem("token", data.token);
                getUser();
                router.push("/");
                message.success(msg);
            }
        }
    }

    const forgetPass = () => {
        setCurrent('forgetPass')
    }
    return (
        <div>
            <Form form={form} className="mt-2" onFinish={handleSubmit}>
                <Form.Item
                    name={"password"}
                    className="mt-3"

                >
                    <Input.Password
                        type="password"
                        size="large"
                        variant="outlined"
                        placeholder="Password"
                        className="form-input !border-black"
                    // value={password}
                    // onChange={handlePasswordChange}
                    />

                </Form.Item>
                <Button className="w-full mt-2.5 text-white">Login</Button>

            </Form>

            <div onClick={forgetPass} className='forget-password'>
                Forgot Password?
            </div>

        </div>
    );
};

export default Login;