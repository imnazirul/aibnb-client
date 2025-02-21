import React, { useState } from 'react';
import Icon from '../../../../../../../components/common/icon';
import { FaPlus } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { Radio, Space } from 'antd';
import { ImageCards } from '../../../../../../../components/form/image';
import Button from '../../../../../../../components/common/button';

const AccessibilityForm = () => {
    const [checkedItem, setCheckedItem] = useState(null);
    const [checked, setChecked] = useState(false);
    const [myAccessibility, setAccessibility] = useState(null);
    const [value, setValue] = useState(false);

    console.log(myAccessibility)
    const handleOnchange = e => {
        setValue(e.target.value);
    };

    const accessibilityData = [
        { key: 'air_condition', label: 'Air Conditioning', icon: 'air-condition' },
        { key: 'out_shower', label: 'Outdoor shower', icon: 'out-shower' },
        { key: 'smoke_alarm', label: 'smoke alarm installed', icon: 'smoke-alarm2' },
        { key: 'noise_decibel', label: 'noise decibel monitor present', icon: 'music' },
        { key: 'parking_permission', label: 'free parking on premises', icon: 'icon-p' },
        { key: 'parking_permission', label: 'free parking on premises', icon: 'icon-p' },
    ];

    const handleOnClick = (accessibility) => {
        setCheckedItem(checkedItem === accessibility.key ? null : accessibility.key);
        setChecked(!checked);
        setAccessibility(accessibility)
    };

    return (
        <div className='md:my-0 my-5'>
            <h2 className='text-main text-title_lg capitalize'>accessibility features</h2>
            <div className='flex flex-col gap-10 my-10'>
                {accessibilityData.map(accessibility => (
                    <AccessibilitySection
                        label={accessibility.label}
                        icon={accessibility.icon}
                        key={accessibility.key}
                        onClick={() => handleOnClick(accessibility)}
                        checked={checkedItem === accessibility.key}
                        myAccessibility={myAccessibility}
                        onChange={handleOnchange}
                        value={value}
                    />
                ))}



            </div>
        </div>
    );
};

export default AccessibilityForm;

interface AccessibilitySectionProps {
    label: string;
    key: string;
    icon: string;
    onClick: () => void;
    checked: boolean;
    myAccessibility: any;
    onChange?: (e: any) => void;
    value?: any;
};

interface AccessibilityProps {
    label: string;
    myAccessibility: any;
    icon: string;
    handleOnchange: (e: any) => void;
    value?: any;
}



const AccessibilitySection = ({ label, icon, onClick, checked, myAccessibility, onChange, value, key }: AccessibilitySectionProps) => {
    return (
        <>
            <div className={`accessibility-section`}>
                <div className='flex gap-2.5 items-center '>
                    <Icon name={icon} />
                    <label className='text-secondaryText text-h5 capitalize'>{label}</label>
                </div>
                {
                    checked ?
                        <div role='button' onClick={onClick}>
                            <FaCheck className='check-btn' />
                        </div>
                        :
                        <div role='button' onClick={onClick}>
                            <FaPlus className='plus-btn' />
                        </div>
                }
            </div>
            {
                checked &&
                <div className='flex flex-col gap-2 py-2'>
                    <Accessibility
                        label={myAccessibility.label}
                        myAccessibility={myAccessibility}
                        icon={myAccessibility.icon}
                        handleOnchange={onChange}
                        value={value}
                    />
                </div>
            }
        </>

    );
};


const Accessibility = ({ label, icon, handleOnchange, value, myAccessibility }: AccessibilityProps) => {
    return (
        <div className={`accessibility`}>
            <label className='text-main text-xlMedium capitalize'>{label}</label>
            <div className='text-secondaryText text-p2'>
                The exterior and interior pathways to the guest entrance—like sidewalks
            </div>
            <label className='text-main text-title_md capitalize'>Examples:</label>
            <div className='accessibility-image-grid'>
                <img src="/106.png" alt="air_condition" className='' />
                <img src="/106.png" alt="air_condition" className='' />
                <img src="/106.png" alt="air_condition" className='' />
            </div>
            <div className="flex mt-6">
                <Radio.Group onChange={handleOnchange} name='role' value={value} className='mb-4'>
                    <Space direction="horizontal" className='gap-6 flex flex-col md:flex-row'>
                        <Radio className='radio-btn' value={false}>
                            {"I don’t have this feature"}
                        </Radio>
                        <Radio className='radio-btn' value={true}>
                            {"i have this feature"}
                        </Radio>
                    </Space>
                </Radio.Group>
            </div>
            {
                value &&
                <div className='flex flex-col gap-5'>
                    <label className='text-main text-title_md capitalize'>Add photos of this feature</label>
                    <div className="text-secondaryText text-p2">
                        <ul className="list-disc  space-y-2 text-wrap">
                            <li>
                                Take as many photos as needed to capture the entire pathway from the guest parking spot to the guest entrance.
                            </li>
                            <li>
                                For apartments and hotels, capture the full pathway including photos of the hotel entrance, lobby, hallways, and elevator, if applicable.
                            </li>
                            <li>
                                Doorways must be open to show that the path is free of steps and barriers.
                            </li>
                        </ul>
                    </div>
                    <div className='flex md:flex-row flex-col'>
                        <ImageCards name={myAccessibility?.key} max={3} />
                    </div>
                    <span className='text-secondaryText '>
                        After you submit, we’ll review your photos. Approved accessibility features will be added to your listing.
                    </span>
                    <Button className='mt-2 !text-white'>
                        Save
                    </Button>
                </div>
            }
        </div>
    );
}
