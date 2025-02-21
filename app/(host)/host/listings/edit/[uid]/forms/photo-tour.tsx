import React, { useState } from 'react';
import Icon from '../../../../../../../components/common/icon';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import { FiCopy, FiDownload, FiMoreVertical, FiTrash } from "react-icons/fi";
import CustomModal from '../../../../../../../components/common/custom-modal';
import { Dropdown, Form, notification, Upload } from 'antd';
import { toAssetUrl } from '../../../../../../../helpers/utils';
import Image from 'next/image';
import { RiDeleteBinFill } from 'react-icons/ri';

const Phototour = ({ form, data, handleSubmit }) => {
    const [allPhotos, setAllPhotos] = useState(false);
    const [open, setOpen] = useState(false);
    const [upload, setUpload] = useState([]);
    const handleDelete = (index: number) => {
        setUpload(prev => {
            const updatedFiles = prev.filter((_, i) => i !== index);
            form.setFieldsValue({
                images: updatedFiles
            });
            return updatedFiles;
        });
    };

    const urlToFile = async (url, filename, mimeType) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, { type: mimeType });
    };

    return (
        <div className='md:mt-0 mt-5 2xl:px-40 px-3 '>
            <div className={`flex justify-between md:flex-row flex-col   ${allPhotos ? 'items-start' : 'md:items-center items-start'}`}>
                {
                    allPhotos ?
                        <>
                            <div onClick={() => setAllPhotos(!allPhotos)} className='cursor-pointer'>
                                <FaArrowLeft className='h-8 w-8 p-2 rounded-full bg-secondary' />
                            </div>
                            <h2 className='text-title_sm'>All Photos</h2>
                        </>
                        :
                        <div className='flex flex-col gap-4 lg:w-[320px]'>
                            <h2 className='text-title_sm'>{data?.title}</h2>
                            <p className='text-secondaryText text-wrap '>
                                Hotel Relax is a serene retreat designed to provide guests with a tranquil and rejuvenating experience.
                            </p>
                        </div>
                }
                <div className='flex gap-2.5 md:mt-0 mt-2.5'>
                    <button onClick={() => setAllPhotos(!allPhotos)}
                        type='button' className='photos-button'>
                        <Icon name={'photos'} />
                        {
                            allPhotos ? "Manage Photo" : "All Photos"
                        }
                    </button>
                    <button type='button' className='add-photo-icon' onClick={() => setOpen(true)}>
                        <Icon name={'plus-icon'} />
                    </button>
                </div>
            </div>
            {
                allPhotos ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:my-10 my-5">
                        {
                            data?.images.map((img, index) => (
                                <div key={index} className='relative h-[260px] rounded-[10px] overflow-hidden'>
                                    <div className="border rounded-full bg-white  absolute p-1 top-[10px] right-[5px] ">
                                        <Dropdown menu={{
                                            items: [
                                                {
                                                    key: '1',
                                                    label: "Download",
                                                    icon: <FiDownload />,
                                                    onClick: () => {
                                                        window.open(toAssetUrl(img), '_blank');
                                                    }
                                                },
                                                {
                                                    key: '2',
                                                    label: "Copy Link",
                                                    icon: <FiCopy />,
                                                    onClick: () => {
                                                        navigator.clipboard.writeText(toAssetUrl(img));
                                                        notification.success({ message: 'Link copied to clipboard' });
                                                    }
                                                },
                                                {
                                                    key: '3',
                                                    label: "Delete",
                                                    icon: <FiTrash />,
                                                    className: 'text-danger',
                                                    // onClick: () => {
                                                    //     // Handle the deletion here
                                                    // }
                                                },
                                            ]
                                        }}
                                            overlayStyle={{ width: 180, borderRadius: 4 }}
                                            placement="bottomRight">
                                            <FiMoreVertical role="button" />
                                        </Dropdown>
                                    </div>
                                    <Image
                                        width={500}
                                        height={500}
                                        className="w-full h-full"
                                        crossOrigin='anonymous'
                                        src={toAssetUrl(img)}
                                        alt="Reception"
                                    />
                                </div>
                            ))
                        }
                    </div>
                    :
                    data?.images?.length > 0 && (
                        <div className="relative md:mt-20 mt-10 md:mb-10 mb-0">
                            <div className="flex items-center space-x-4">
                                <Image
                                    width={500}
                                    height={500}
                                    className="w-[220px] h-[270px] object-cover rounded-md"
                                    crossOrigin='anonymous'
                                    src={toAssetUrl(data?.images[0])}
                                    alt="Reception"
                                />
                            </div>
                            <div className="absolute bottom-4 left-4 bg-white px-6 py-2 rounded-md">
                                <p className="text-lg font-medium">Additional photos</p>
                                <p className="text-gray-600">{data?.images?.length} photos</p>
                            </div>
                        </div>
                    )
            }

            <CustomModal open={open} title='' setOpen={setOpen} uploaded={"uploaded"} >
                <div className={`rounded-lg w-full max-w-[568px] overflow-y-auto relative ${upload.length > 2 ? 'h-[80vh]' : 'h-auto'}`}>
                    <button
                        onClick={() => {
                            setOpen(false);
                            setUpload([]);
                        }}
                        aria-label="Close"
                        type="button"
                        className="absolute top-5 left-4 text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes className="text-xl" />
                    </button>

                    <header className="flex justify-center items-center mb-5 pt-5">
                        <div className='flex flex-col items-center'>
                            <h1 className="text-h4">Upload Photos</h1>
                            <p className='text-xxs text-secondaryText'>
                                {upload.length > 0
                                    ? `${upload.length} ${upload.length === 1 ? 'image selected' : 'images selected'}`
                                    : 'No items selected'}
                            </p>
                        </div>
                    </header>

                    <div className={`p-5 ${upload.length > 4 ? 'h-auto overflow-y-auto' : 'h-auto overflow-y-auto'}`}>
                        {upload.length <= 0 && (
                            <Form.Item name="images"  className='absolute' noStyle>
                                <Upload.Dragger
                                    name="images"
                                    fileList={upload}
                                    disabled={upload.length >= 5}
                                    showUploadList={false}
                                    onChange={({ fileList }) => {
                                        setUpload(fileList);
                                    }}
                                    multiple
                                    listType="picture"
                                >
                                    <div className="md:!h-[270px] h-[200px] p-4 mb-4 flex flex-col items-center justify-center gap-2">
                                        <h3 className='text-title_sss'>Drag and drop</h3>
                                        <p className='text-sb'>or browse for photos</p>
                                        <button
                                            type='button'
                                            className='px-5 py-3 bg-black text-white rounded-[10px] z-30'
                                            disabled={upload.length >= 5}
                                        >
                                            Browse
                                        </button>
                                    </div>
                                </Upload.Dragger>
                            </Form.Item>
                        )}

                        {upload.length > 0 && (
                            <div className={`mt-2.5 grid md:grid-cols-2 grid-cols-1 gap-4 mb-4 ${upload.length > 4 && 'h-[80%] overflow-auto pe-3'}`}>
                                {upload.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={file?.originFileObj ? URL.createObjectURL(file?.originFileObj) : URL.createObjectURL(file)}
                                            alt={`Preview ${index}`}
                                            className="w-full h-[252px] mb-4 rounded-lg border border-gray-300 shadow-sm"
                                        />
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="absolute top-2 right-2 p-2 rounded-full bg-black text-white"
                                        >
                                            <RiDeleteBinFill />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <footer className="flex border-t justify-between p-5">
                        <button
                            type="button"
                            className="duration-500 hover:bg-gray-50 rounded-[10px] z-30 text-c1"
                            onClick={() => {
                                const images = form.getFieldValue('images');
                            }}
                            disabled={upload.length === 0}
                        >
                            Done
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-3 bg-black text-white rounded-[10px] z-30"
                            onClick={async ()  => {
                                const images = form.getFieldValue('images');
                                // const my_img = data?.images ?
                                //     data?.images?.map((img, index) => ({
                                //         uid: `-${index + 1}`,
                                //         name: img,
                                //         status: 'done',
                                //         url: toAssetUrl(img),
                                //     })) : [];
                                const my_img = data?.images ? await Promise.all(data.images.map(async (img, index) => {
                                    const fileType = img.split('.').pop();
                                    const mimeType = `image/${fileType}`;
                                    return await urlToFile(toAssetUrl(img), `image-${index}.${fileType}`, mimeType);
                                })) : [];

                                const fileList = Array.isArray(images.fileList) ? images.fileList.map(file => file.originFileObj) : [];
                                // const fileList = Array.isArray(images.fileList) ? images.fileList.map(file => ({
                                //     uid: file.uid,
                                //     name: file.name,
                                //     status: 'done',
                                //     url: URL.createObjectURL(file.originFileObj),
                                // })) : [];
                                const all_img = [...my_img, ...fileList];
                                console.log("All Image", all_img);
                                // handleSubmit({ images: all_img });
                                setOpen(false);
                            }}
                            disabled={upload.length === 0}
                        >
                            Upload
                        </button>
                    </footer>
                </div>
            </CustomModal>
        </div>
    );
};

export default Phototour;
