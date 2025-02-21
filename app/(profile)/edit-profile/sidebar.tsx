import React, { useState } from 'react';
import { Form, Upload } from 'antd';
import { FaCamera } from 'react-icons/fa';
import Image from 'next/image';
import { useUser } from '../../../contexts/user';
import { RoundedImageCards } from '../../../components/form/image';

const ProfileUploader = ({ form }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { user, getUser } = useUser();
    const [fileList, setFileList] = useState([]);


    const handleUploadChange = async (info: any) => {
        let newFileList = [...info.fileList];

        // Limit the number of uploaded files
        newFileList = newFileList.slice(-1);

        // Read from response and show file link
        newFileList = newFileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        setFileList(newFileList);

        if (info.file.status === 'done') {
            const url = URL.createObjectURL(info.file.originFileObj);
            setImageUrl(url);
            console.log(url);

            // Submit the form with the uploaded file
            try {
                await form.validateFields();
                const values = form.getFieldsValue();
                console.log('Form values:', values);
                handleSubmit(values);
            } catch (error) {
                console.error('Validation failed:', error);
            }
        }
    };

    const handleSubmit = async (values: any) => {
        console.log(values);
    };

    return (
        <div className="w-[300px] 2xl:w-[400px] flex justify-center lg:sticky lg:top-[112px]">
            <div className="relative w-[214px] h-[214px] btn-none ">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                    {imageUrl ? (
                        <Image src={imageUrl} alt="profile" width={214} height={214} objectFit="cover" />
                    ) : (
                        <span className='font-bold text-[150px]'>{user?.name ? user?.name[0] : ''}</span>
                    )}
                </div>
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="images"
                        initialValue={[]}
                        style={{ boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)" }}
                        className="absolute -bottom-[15px] left-1/2 transform -translate-x-1/2  translate-y-1/2 bg-white flex items-center rounded-full shadow-lg w-fit h-[40px]"
                    >
                        <Upload.Dragger
                            fileList={fileList}
                            listType="picture"
                            className="w-full h-full  !bg-transparent !border-none"
                            showUploadList={false}
                            onChange={handleUploadChange}
                        >
                            <div className="flex w-full h-full items-center gap-2">
                                <FaCamera className="text-sm" />
                                <span className="text-xs font-medium">{imageUrl ? 'Edit' : 'Add'}</span>
                            </div>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ProfileUploader;
