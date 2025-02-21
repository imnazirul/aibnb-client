import React, { useState } from 'react';
import Icon from '../../../../../../../components/common/icon';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiCopy, FiDownload, FiInfo, FiMoreVertical, FiSearch, FiTrash } from "react-icons/fi";
import CustomModal from '../../../../../../../components/common/custom-modal';
import { Dropdown, Form, message as msg, notification, Upload } from 'antd';
import Button from '../../../../../../../components/common/button';
import { BiImages } from "react-icons/bi";
import { hideLoader, showLoader } from '../../../../../../../components/common/loader';
import { toAssetUrl } from '../../../../../../../helpers/utils';

const PhotoForm = ({ form, handleSubmit, data }) => {
    const [allPhotos, setAllPhotos] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [upload, setUpload] = useState([])
    const [file, setFile] = useState(null)
    const [renameValue, setRenameValue] = useState()

    const handleFileRename = (e) => {
        setRenameValue(e.target.value)
    }

    return (
        <div className='md:mt-0 mt-5'>
            <div className={`flex justify-between md:flex-row flex-col ${allPhotos ? 'items-start' : 'md:items-center items-start'}`}>
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
                                Hotel Relax is a serene retreat designed to provide guests with a tranquil and rejuvenating.
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
                    <div className="all-photos">
                        {
                            data?.images.map((img, index) => (
                                <div key={index} className='photo-card'>
                                    <div className="dropdown">
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
                                                        navigator.clipboard.writeText(toAssetUrl(img))
                                                        notification.success({ message: 'Link copied to clipboard' })
                                                    }
                                                },
                                                {
                                                    key: '3',
                                                    label: "Delete",
                                                    icon: <FiTrash />,
                                                    className: 'text-danger',
                                                    // onClick: () => {
                                                    //     return useActionConfirm(delFile, { id: file.id }, () => {
                                                    //         getFiles()
                                                    //     }, 'Are you sure you want to delete this file?', 'Yes, Delete')
                                                    // }
                                                },
                                            ]
                                        }}
                                            overlayStyle={{ width: 180, borderRadius: 4 }}
                                            placement="bottomRight">
                                            <FiMoreVertical role="button" />
                                        </Dropdown>
                                    </div>
                                    <img
                                        className="photo"
                                        crossOrigin='anonymous' src={toAssetUrl(img)}
                                        alt="Reception"
                                    />
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div className="relative md:mt-20 mt-10 md:mb-10 mb-0">
                        <div className="flex items-center space-x-4">
                            <img
                                className="w-[220px] h-[270px] object-cover rounded-md"
                                crossOrigin='anonymous' src={toAssetUrl(data?.images[0])}
                                alt="Reception"
                            />
                        </div>
                        <div className="absolute bottom-4 left-4 bg-white px-6 py-2 rounded-md">
                            <p className="text-lg font-medium">Additional photos</p>
                            <p className="text-gray-600">{data?.images?.length} photos</p>
                        </div>
                    </div>
            }

            <CustomModal open={open} setOpen={setOpen} title="Upload photos" subTitle="">
                <div className='my-2'>
                    <Upload.Dragger
                        name="file"
                        style={{ borderRadius: 4 }}
                        fileList={upload}
                        beforeUpload={file => {
                            if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/gif' && file.type !== 'image/svg') {
                                msg.error(`${file.name} is not a image file`);
                                return Upload.LIST_IGNORE
                            }
                            return false
                        }}
                        onChange={({ fileList }) => {
                            setUpload(fileList)
                        }}
                        multiple={true}
                    >
                        <div className="flex justify-center items-center" style={{ height: 300 }}>
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-center">
                                    <BiImages size={48} />
                                </p>
                                <p className="ant-upload-text">Click or drag image to this area to upload</p>
                            </div>
                        </div>
                    </Upload.Dragger>

                    <div className='border-t mt-7' />
                    <div className="flex justify-between items-center mt-4">
                        <div onClick={() => setOpen(false)}
                            className='text-main text-p underline !cursor-pointer'>
                            Close
                        </div>
                        {upload?.length > 0 && (
                            <Button className="text-white" onClick={async () => {
                                try {
                                    let newArray = []
                                    let files = upload?.map(d => d.originFileObj)
                                    await Promise.all(files.map(async (d) => {
                                        return console.log("all files", d)
                                        // const compressedImage = await handleImageUploadCompression(d);
                                        // newArray.push(compressedImage);
                                    }));
                                    // showLoader()
                                    // let { success, message } = await postFiles({ galleries: files }, {
                                    //     headers: {
                                    //         'Content-Type': 'multipart/form-data'
                                    //     }
                                    // })
                                    // hideLoader()
                                    // if (success === true) {
                                    //     setUpload([])
                                    //     // getFiles()
                                    //     setOpen(false)
                                    //     notification.success({ message: 'Success', description: message || 'Successfully uploaded' })
                                    //     window.location.reload()
                                    // } else {
                                    //     msg.error(message)
                                    //     notification.error({ message: 'Error', description: message || 'Something went wrong' })
                                    //     window.location.reload()
                                    // }
                                } catch (e) {
                                    msg.error("Please upload max 20files")
                                    hideLoader()
                                    // window.location.reload()
                                    // notification.error({ message: 'Error', description: 'Something went wrong' })
                                }
                            }}>Upload</Button>
                        )}
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export default PhotoForm;