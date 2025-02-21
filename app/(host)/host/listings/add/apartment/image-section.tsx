import { Dropdown } from 'antd';
import React from 'react';
import { ImageCards } from '../../../../../../components/form/image';
import { TfiPlus } from "react-icons/tfi";

const ImageSection = ({
    images,
    openModal,
    selectedFiles,
    openEditModal,
    handleDeleteImage,
    SlOptions,
    handleUpload,

}) => {
    return (
        <>
            {images.length > 0 && (
                <div className='max-w-[640px] md:h-[515px] mt-[15px] mb-6 !relative '>
                    <img
                        src={images[0]?.originFileObj ? URL.createObjectURL(images[0]?.originFileObj) : URL.createObjectURL(images[0])}
                        alt={`Uploaded 0`}
                        className="w-full h-full rounded-lg shadow-sm"
                    />
                    <Dropdown
                        rootClassName="user-dropdown"
                        trigger={['click']}
                        menu={{
                            items: [
                                {
                                    key: 1,
                                    label: 'Edit',
                                    onClick: () => openEditModal(images[0]),
                                },
                                {
                                    key: 2,
                                    label: 'Move forward',
                                },
                                {
                                    key: 3,
                                    label: 'Delete',
                                    onClick: () => { handleDeleteImage(0) },
                                },
                            ],
                        }}
                    >
                        <button
                            type='button'
                            className="absolute top-2 right-2 bg-white text-black/70 duration-500 hover:scale-105 hover:text-black shadow-sm rounded-full p-2 "
                        >
                            <SlOptions />
                        </button>
                    </Dropdown>
                </div>
            )}

            {images.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
                    {images?.slice(1)?.map((image, index) => (
                        <div key={index + 1} className='w-full !relative'>
                            <img src={image?.originFileObj ? URL.createObjectURL(image?.originFileObj) : URL.createObjectURL(image)}
                                alt={`Uploaded ${index + 1}`}
                                className="w-full md:h-[201px] rounded-lg shadow-sm"
                            />
                            <Dropdown
                                rootClassName="user-dropdown"
                                trigger={['click']}
                                menu={{
                                    items: [
                                        {
                                            key: 1,
                                            label: 'Edit',
                                            onClick: () => openEditModal(image?.originFileObj ? URL.createObjectURL(image?.originFileObj) : URL.createObjectURL(image)),
                                        },
                                        {
                                            key: 2,
                                            label: 'Move forward',
                                        },
                                        {
                                            key: 3,
                                            label: 'Make cover photo',
                                        },
                                        {
                                            key: 4,
                                            label: 'Delete',
                                            onClick: () => { handleDeleteImage(index + 1) },
                                        },
                                    ],
                                }}
                            >
                                <button type='button' className="absolute top-2 right-2 bg-white text-black/70 duration-500 hover:scale-105 hover:text-black shadow-sm rounded-full p-2 ">
                                    <SlOptions />
                                </button>
                            </Dropdown>
                        </div>
                    ))}
                    <div onClick={openModal} className='rounded-[15px] gap-2 h-[201px] border-2 border-dotted bg-[#F7F7F7] flex flex-col items-center justify-center'>
                        <TfiPlus size={32} />
                        <h1>Add more</h1>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageSection;