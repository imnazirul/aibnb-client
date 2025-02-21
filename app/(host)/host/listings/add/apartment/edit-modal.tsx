'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { Slider, Switch, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import FormInput from '../../../../../../components/form/input';

const EditModal = ({
    showEditModal,
    currentImageToEdit,
    closeEditModal,
    handleSave,
}) => {
    const [contrast, setContrast] = useState(100);
    const [brightness, setBrightness] = useState(100);
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);


    const handleContrastChange = (value: number) => {
        setContrast(value);
    };

    const handleBrightnessChange = (value: number) => {
        setBrightness(value);
    };

    const handleZoomChange = (value: number) => {
        setZoom(value);
    };

    const rotateLeft = () => {
        setRotation(rotation - 90);
    };

    const handleSaveClick = () => {
        if (currentImageToEdit) {
            const updatedImage = currentImageToEdit;
            handleSave(updatedImage);
        }
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Details',
            children: (
                <div>
                    <h2 className='text-p1'>Caption</h2>
                    <p className='mb-3 text-xxs'>Mention what’s special about this space like comfortable furniture or favorite details.</p>
                    <FormInput textArea={true} name='caption' />
                </div>
            ),
        },
        {
            key: '2',
            label: 'Edit',
            children: (
                <div className='text-p2'>
                    <div className='flex flex-col gap-4 '>
                        <div className='flex flex-col w-full gap-3 '>
                            <label htmlFor='contrast '>Contrast</label>
                            <Slider
                                value={contrast}
                                onChange={handleContrastChange}
                                min={0}
                                max={200}
                                tooltip={{ open: false }}
                                trackStyle={{ backgroundColor: 'black' }}
                                handleStyle={{ borderColor: 'black' }}
                            />
                        </div>
                        <div className='flex flex-col w-full gap-3'>
                            <label htmlFor='brightness'>Brightness</label>
                            <Slider
                                value={brightness}
                                onChange={handleBrightnessChange}
                                min={0}
                                max={200}
                                tooltip={{ open: false }}
                                trackStyle={{ backgroundColor: 'black' }}
                                handleStyle={{ borderColor: 'black' }}
                            />
                        </div>
                        <div className='flex flex-col w-full gap-3'>
                            <label htmlFor='zoom'>Zoom</label>
                            <Slider
                                value={zoom}
                                onChange={handleZoomChange}
                                min={1}
                                max={3}
                                step={0.1}
                                tooltip={{ open: false }}
                                trackStyle={{ backgroundColor: 'black' }}
                                handleStyle={{ borderColor: 'red' }}
                            />
                        </div>

                        <button onClick={rotateLeft} className='px-4 py-2 w-fit mt-4 text-p1 hover:bg-gray-200 border-black rounded-lg border duration-500'>
                            Rotate
                        </button>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <>
            {showEditModal && currentImageToEdit && (
                <div
                    role="dialog"
                    aria-label="Edit image"
                    aria-modal="true"
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 py-10 flex items-center px-2 justify-center  z-50"
                >
                    <div className="bg-white w-[95%] h-full rounded-[20px] shadow-lg  overflow-auto relative  ">
                        <button
                            onClick={closeEditModal}
                            aria-label="Close"
                            type="button"
                            className=" absolute top-4 left-3 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                        <div className=' border-b w-full h-[60px] flex items-center justify-center'>
                            <h2 className='text-p'>Edit Photo</h2>
                        </div>

                        <div className=' lg:max-w-[1440px] my-10 mx-auto lg:h-[70%] flex lg:flex-row flex-col gap-8 px-3'>
                            <div className='lg:w-[70%] w-full  h-full bg-[#F7F7F7] flex justify-center lg:overflow-hidden items-center'>
                                <Image
                                    src={currentImageToEdit}
                                    width={1000}
                                    height={500}
                                    alt='cover img'
                                    style={{
                                        filter: `contrast(${contrast}%) brightness(${brightness}%)`,
                                        transform: `scale(${zoom}) rotate(${rotation}deg)`,
                                    }}
                                    className='h-full'
                                />
                            </div>
                            <div className='tabs lg:w-[30%] w-full'>
                                <Tabs defaultActiveKey="1" items={items} size={'large'} />
                            </div>
                        </div>
                        <div className='relative bottom-0 top-5 w-full px-4 flex justify-end border-t'>

                            <button
                                onClick={handleSaveClick}
                                className='px-5 py-3 bg-black text-white rounded-[10px] mt-4'
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditModal;
