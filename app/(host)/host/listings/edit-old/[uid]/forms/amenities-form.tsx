import React, { useState } from 'react';
import Icon from '../../../../../../../components/common/icon';
import CustomModal from '../../../../../../../components/common/custom-modal';
import Button from '../../../../../../../components/common/button';
import { Checkbox, Form } from 'antd';
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import {toAssetUrl} from "../../../../../../../helpers/utils";
import Svg from "../../../../../../../components/common/svg";


const AmenitiesForm = ({ handleSubmit, form, data }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState({
        key: '',
        label: '',
        icon: '',
    });

    const amenitiesData = [
        { key: 'air_condition', label: 'Air Conditioning', icon: 'air-condition' },
        { key: 'out_shower', label: 'Outdoor shower', icon: 'out-shower' },
        { key: 'smoke_alarm', label: 'smoke alarm installed', icon: 'smoke-alarm2' },
        { key: 'noise_decibel', label: 'noise decibel monitor present', icon: 'music' },
        { key: 'parking_permission', label: 'free parking on premises', icon: 'icon-p' },
        { key: 'parking_permission', label: 'free parking on premises', icon: 'icon-p' },
    ];

    const airconditionData = [
        { label: 'Central air conditioning', value: 'central_air_conditioning' },
        { label: 'Portable air conditioning', value: 'portable_air_conditioning' },
        { label: 'Window air conditioning', value: 'window_air_conditioning' },
    ];

    const amenitiesService = [
        { label: 'all', value: 'all' },
        { label: 'basics', value: 'basics' },
        { label: 'bathroom', value: 'bathroom' },
        { label: 'bedroom', value: 'bedroom' },
        { label: 'logistics', value: 'logistics' },
        { label: 'outdoor', value: 'outdoor' },
        { label: 'safety', value: 'safety' },
    ]

    const handleEditClick = () => {
        setIsEditMode(!isEditMode);
    };

    const handleModalOpen = (key) => {
        setTitle({
            key: key.key,
            label: key.label,
            icon: key.icon,
        });
        setOpen(true);
    }

    return (
        <div className='md:my-0 my-5'>
            <div className='flex justify-between lg:flex-row flex-col lg:items-center items-start'>
                <div className='flex flex-col gap-2 '>
                    <h2 className='text-main text-title_lg'>Amenities</h2>
                    <span className='text-secondaryText text-p2'>You’ve added these to your listing so far.</span>
                </div>
                {!isAddMode && (
                    <div className='flex gap-2 lg:mt-0 mt-1'>
                        <button
                            type='button'
                            className='amenities-btn'
                            onClick={handleEditClick}
                        >
                            {isEditMode ? 'Done' : 'Edit'}
                        </button>
                        {!isEditMode && (
                            <button
                                onClick={() => setIsAddMode(true)}
                                type='button'
                                className='amenities-btn'
                            >
                                Add
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className={!isEditMode && `flex justify-between items-start gap-4`}>
                <div className={!isEditMode && `flex !w-full justify-between `}>
                    <div className='flex flex-col gap-4'>

                        <div className='flex flex-col gap-10 py-5'>
                            {data?.amenities?.map((amenity, index) => (
                                <AmenitiesSection
                                    key={index}
                                    label={amenity?.name}
                                    icon={amenity.icon}
                                    activeDescription={amenity?.description}
                                    onClick={() => handleModalOpen(amenity?._id)}
                                    isEditMode={isEditMode}
                                />
                            ))}
                        </div>
                    </div>

                </div>

                {isAddMode && (
                    <div className='add-amenities'>
                        <div className='flex justify-between items-center'>
                            <h2 className='capitalize text-main text-title_md'>Add Amenities</h2>
                            <FaSearch className='h-8 w-8 p-2 rounded-full bg-secondary' />
                        </div>
                        <div className='flex flex-wrap gap-2 my-8'>
                            {amenitiesService.map((service, index) => (
                                <div className='flex gap-2' key={index}>
                                    <span className='amenities-label'>
                                        {service.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col gap-2 py-2'>
                            {amenitiesData.map(amenity => (
                                <AddAmenities
                                    label={amenity.label}
                                    icon={amenity.icon}
                                    onClick={() => handleModalOpen(amenity)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <CustomModal open={open} setOpen={setOpen} title={title.label} subTitle={undefined}>
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item name={'amenities'} initialValue={[]}>
                        <div className="flex flex-col gap-6 my-4">
                            <Multiselect name='amenities' options={airconditionData} />
                        </div>
                    </Form.Item>
                    <div className="flex justify-between items-center">
                        <div onClick={() => setOpen(false)}
                            className='text-main text-p underline !cursor-pointer'>
                            Close
                        </div>
                        <Button className="text-white">Save</Button>
                    </div>
                </Form>
            </CustomModal>

        </div>
    );
};

export default AmenitiesForm;


interface AmenitiesSectionProps {
    label: string;
    onClick: () => void;
    icon: string;
    activeDescription: string;
    key: string;
    isEditMode: boolean;
}

const AmenitiesSection = ({ label, onClick, icon, activeDescription, key, isEditMode }: AmenitiesSectionProps) => {
    return (
        <div className={`${isEditMode ? 'all-amenities ' : ''}`}>
            <div className='flex gap-2 items-center '>
                <Svg src={toAssetUrl(icon)} />
                <label className='text-secondaryText text-h5 capitalize'>{label}</label>
            </div>
            {
                isEditMode &&
                <div role='button' onClick={onClick}>
                    <Icon name='edit-icon' />
                </div>
            }
        </div>
    );
};

interface AddAmenitiesProps {
    label: string;
    onClick: () => void;
    icon: string;
}

const AddAmenities = ({ label, onClick, icon, }: AddAmenitiesProps) => {
    return (
        <div className={`border rounded-sm p-4 flex justify-between w-full`}>
            <div className='flex gap-2 items-center '>
                <Icon name={icon} />
                <label className='text-secondaryText text-h5 capitalize'>{label}</label>
            </div>

            <div role='button' onClick={onClick}>
                <FaPlus className='h-4 w-4 bg-secondary rounded-md' />
            </div>

        </div>
    );
}


const Multiselect = ({ name, options }) => {
    const Input = ({ value, onChange }: any) => {
        return (
            <div className="flex flex-col justify-between gap-6 mt-4">
                {options.map((val, index) => (
                    <div key={index}
                        role="button"
                        onClick={() => {
                            if (value?.includes(val.label)) {
                                onChange(value.filter((v) => v !== val.label))
                            } else {
                                onChange([...value, val.label])
                            }
                        }}
                        className="flex gap-4  cursor-pointer">
                        <div className="flex justify-between w-full  gap-x-2 items-center">
                            <p className='text-p1 text-main capitalize'>{val.label}</p>
                            <div className="flex-1" />
                            <div className="gap-x-6">
                                <Checkbox
                                    checked={value?.includes(val.label)}
                                    className='text-secondaryText text-p3' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Form.Item name={name} initialValue={[]}>
            <Input />
        </Form.Item>
    )
}
