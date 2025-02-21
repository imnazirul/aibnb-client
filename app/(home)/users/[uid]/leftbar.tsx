'use client';
import React, { useState } from 'react';
import UserProfile from './profile';
import Info from './info';
import ReportRadioInput from '../../property/report-radio';
import { Form, Modal } from 'antd';
import Button from '../../../../components/common/button';
import ReportBtn from './report-btn';

interface ReportItem {
    id: number;
    name: string;
}

interface FormValues {
    report: string;
}

const LeftBar: React.FC = () => {
    const [form] = Form.useForm<FormValues>();
    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = (values: FormValues) => {
        console.log(values);
    };

    const reportData: ReportItem[] = [
        { id: 1, name: 'I think they’re scamming or spamming me' },
        { id: 2, name: 'They’re being offensive' },
        { id: 3, name: 'Something else' },
    ];

    return (
        <>
            <div className='xl:w-[35%] lg:w-[70%] sm:w-[60%] mt-10 lg:mt-0 lg:sticky lg:top-[120px] h-fit'>
                <UserProfile />
                <Info />
                <ReportBtn setOpen={setOpen} />
            </div>

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                centered
                title={
                    <div>
                        <p className='text-title_md'>What’s happening?</p>
                        <p className='text-p2 mt-1'>This will only be shared with Airbnb.</p>
                    </div>
                }
                footer={null}
            >
                <div className='flex flex-col mt-6'>
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                    >
                        <Form.Item name="report" noStyle>
                            <ReportRadioInput reportData={reportData} />
                        </Form.Item>
                        <div className='flex justify-end mt-8 cursor-pointer'>
                            <Button type='submit' className='w-[120px] text-white !bg-black hover:!bg-gray-700 duration-500 hover:!scale-x-105'>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default LeftBar;
