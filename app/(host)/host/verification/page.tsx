"use client";
import React, { useState } from 'react';
import { Form, message, Radio, Space, Upload } from 'antd';
import CountryInput from '../../../../components/form/country';
import Icon from '../../../../components/common/icon';
import Button from '../../../../components/common/button';


const HostVerification = () => {
    const [form] = Form.useForm();
    const [country, setCountry] = useState<string | undefined>(undefined);
    const [value, setValue] = useState('license');
    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: false,
        beforeUpload: file => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
            }
            return isJpgOrPng;
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        showUploadList: false,
    };

    const handleSubmit = (values) => {
        console.log(values);
    }


    const onChange = e => {
        setValue(e.target.value);
    };
    return (
        <div className='grid grid-cols-2'>
            <div className='my-2 border-2 rounded-md shadow-md p-4'>
                <div>
                    <h2 className='text-main text-title_md mb-6'>Personal information</h2>
                </div>
                <h1 className='text-main text-xlRegular'>Let’s add your government ID</h1>
                <span className='text-secondaryText text-p2'>
                    We’ll need you to add an official government ID. This step helps make sure you’re really you.
                </span>

                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleSubmit}
                >
                    <CountryInput whitelist={undefined} label={"Select country/region"} name={["address", "country"] as any} setCountry={setCountry} required />
                    <div className="flex  mt-6">
                        <Radio.Group onChange={onChange} name='role' value={value} className='mb-4'>
                            <Space direction="vertical" className='gap-6'>
                                <Radio className='text-main text-h4 hover:text-primary' value={"license"}>
                                    {"Driving License"}
                                </Radio>
                                <Radio className='text-main text-h4 hover:text-primary' value={"passport"}>
                                    {"Passport"}
                                </Radio>
                                <Radio className='text-main text-h4 hover:text-primary' value={"id_card"}>
                                    {"Identity card"}
                                </Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    {
                        value === 'license' &&
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-2'>
                            <Dragger {...props} className="text-center flex flex-col items-center ">
                                <p className="ant-upload-drag-icon flex justify-center mb-5">
                                    <Icon name="uploader" />
                                </p>

                                <p className="text-lg font-medium">Font Side</p>
                                <p className="text-sm text-gray-500 !mb-5">JPEG or PNG only</p>
                                <Button className="!px-4 !py-2">Choose File</Button>
                            </Dragger>

                            <Dragger {...props} className="text-center flex flex-col items-center ">
                                <p className="ant-upload-drag-icon flex justify-center mb-5">
                                    <Icon name="uploader" />
                                </p>

                                <p className="text-lg font-medium">Back Side</p>
                                <p className="text-sm text-gray-500 !mb-5">JPEG or PNG only</p>
                                <Button className="!px-4 !py-2">Choose File</Button>
                            </Dragger>
                        </div>
                    }

                    {
                        value === 'passport' &&
                        <div className='grid grid-cols-1 gap-4 mb-2'>
                            <Dragger {...props} className="text-center flex flex-col items-center ">
                                <p className="ant-upload-drag-icon flex justify-center mb-5">
                                    <Icon name="uploader" />
                                </p>

                                <p className="text-lg font-medium">Font Side</p>
                                <p className="text-sm text-gray-500 !mb-5">JPEG or PNG only</p>
                                <Button className="!px-4 !py-2">Choose File</Button>
                            </Dragger>
                        </div>

                    }
                    {
                        value === 'id_card' &&
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-2'>
                            <Dragger {...props} className="text-center flex flex-col items-center ">
                                <p className="ant-upload-drag-icon flex justify-center mb-5">
                                    <Icon name="uploader" />
                                </p>

                                <p className="text-lg font-medium">Font Side</p>
                                <p className="text-sm text-gray-500 !mb-5">JPEG or PNG only</p>
                                <Button className="!px-4 !py-2">Choose File</Button>
                            </Dragger>

                            <Dragger {...props} className="text-center flex flex-col items-center ">
                                <p className="ant-upload-drag-icon flex justify-center mb-5">
                                    <Icon name="uploader" />
                                </p>
                                <p className="text-lg font-medium">Back Side</p>
                                <p className="text-sm text-gray-500 !mb-5">JPEG or PNG only</p>
                                <Button className="!px-4 !py-2">Choose File</Button>
                            </Dragger>
                        </div>
                    }


                    <div className="flex justify-between items-center mt-4">
                        <Button className="text-white w-full">Save</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default HostVerification;