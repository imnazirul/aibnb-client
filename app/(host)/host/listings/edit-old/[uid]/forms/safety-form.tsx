import React, { useState } from 'react';
import Icon from '../../../../../../../components/common/icon';
import { Form, Switch } from 'antd';
import CustomModal from '../../../../../../../components/common/custom-modal';
import Textarea from '../../../add-old/forms/textarea';
import Button from '../../../../../../../components/common/button';
import { IoIosArrowDown } from 'react-icons/io';

const SafetyForm = () => {
    const [form] = Form.useForm();
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
    const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});

    const safetyData = [
        { title: 'Safety Considerations', description: 'Not a good fit for children 2-12', type: 'safety_consideration' },
        { title: 'Safety Devices', description: 'Noise decibel monitor present. Smoke alarm installed', type: 'safety_device' },
        { title: 'Property Info', description: 'Weapon(s) on the property', type: 'property_info' },
    ];

    const safetyConsiderationData = [
        { title: 'Not a good fit for children 2 – 12. This property has features that may not be safe for kids.', name: 'good_fit' },
        { title: 'Not a good fit for infants under 2. This property has features that may not be safe for babies or toddlers this age.', name: 'bad_fit' },
        { title: 'Not a good fit for children 2 – 12. This property has features that may not be safe for kids.', name: 'children' },
    ];

    const safetyDeviceData = [
        { title: 'A noise decibel monitor is present in the property to help monitor noise levels.', name: 'noise_monitor' },
        { title: 'A smoke alarm is installed in the property to help monitor smoke levels.', name: 'smoke_alarm' },
    ];

    const propertyInfoData = [
        { title: 'Exterior security camera present. This  property has one or more exterior cameras that record or transmit video, images, or audio.You must disclose them if theyre turned off.', name: 'weapons' },
        {
            title: 'Noise decibel monitor present. This property has one or more devices that can assess sound level but dont record audio.', name: 'weapons'
        },
    ];

    const handleSwitchChange = (index: number, checked: boolean) => {
        setIsOpen(prevState => ({ ...prevState, [index]: checked }));
    };

    const toggleType = (type: string) => {
        if (selectedType === type) {
            setSelectedType(undefined); // Close if the same type is clicked
        } else {
            setSelectedType(type); // Open the new type
        }
    };

    const renderData = (type: string | undefined) => {
        switch (type) {
            case 'safety_consideration':
                return safetyConsiderationData.map((data, index) => (
                    <div className="mt-2" key={index}>
                        <div className="flex justify-between items-center">
                            <div className="lg:w-[547px]">
                                <p className='text-p2 text-main text-wrap'>{data.title}</p>
                            </div>
                            <Form.Item name={`safety_consideration_${index}`} valuePropName="checked">
                                <Switch onChange={(checked) => handleSwitchChange(index, checked)} />
                            </Form.Item>
                        </div>
                        {isOpen[index] && (
                            <TextModal
                                isOpen={isOpen[index]}
                                setOpen={() => handleSwitchChange(index, false)}
                                form={form}
                                name={['safety_consideration', data.name]}
                            />
                        )}
                        <div className="border-t-2 mt-6" />
                    </div>
                ));
            case 'safety_device':
                return safetyDeviceData.map((data, index) => (
                    <div className="mt-2" key={index}>
                        <div className="flex justify-between items-center">
                            <div className="lg:w-[547px]">
                                <p className='text-p2 text-main text-wrap'>{data.title}</p>
                            </div>
                            <Form.Item name={`safety_device_${index}`} valuePropName="checked">
                                <Switch onChange={(checked) => handleSwitchChange(index, checked)} />
                            </Form.Item>
                        </div>
                        {isOpen[index] && (
                            <TextModal
                                isOpen={isOpen[index]}
                                setOpen={() => handleSwitchChange(index, false)}
                                form={form}
                                name={['safety_device', data.name]}
                            />
                        )}
                        <div className="border-t-2 mt-6" />
                    </div>
                ));
            case 'property_info':
                return propertyInfoData.map((data, index) => (
                    <div className="mt-2" key={index}>
                        <div className="flex justify-between items-center">
                            <div className="lg:w-[547px]">
                                <p className='text-p2 text-main text-wrap'>{data.title}</p>
                            </div>
                            <Form.Item name={`property_info_${index}`} valuePropName="checked">
                                <Switch onChange={(checked) => handleSwitchChange(index, checked)} />
                            </Form.Item>
                        </div>
                        {isOpen[index] && (
                            <TextModal
                                isOpen={isOpen[index]}
                                setOpen={() => handleSwitchChange(index, false)}
                                form={form}
                                name={['property_info', data.name]}
                            />
                        )}
                        <div className="border-t-2 mt-6" />
                    </div>
                ));
            default:
                return null;
        }
    };

    return (
        <div>
            <label className='text-main text-title_lg capitalize'>Guest Safety</label>
            <div className="mt-5">
                <div className="lg:w-[490px]">
                    <p className='text-p2 text-main text-wrap'>The safety details you share will appear on your listing, along with information like your House Rules.</p>
                </div>
            </div>

            {safetyData.map((data, index) => (
                <div className="mt-10" key={index}>
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleType(data.type)}>
                        <div className="lg:w-[547px]">
                            <p className='text-h4 text-main text-wrap'>{data.title}</p>
                            <p className='text-p2 text-main text-wrap'>{data.description}</p>
                        </div>
                        <div className='cursor-pointer'>
                            {
                                selectedType === data.type ? <IoIosArrowDown className='h-5 w-5' /> : <Icon name='arrow-right' />
                            }
                        </div>

                    </div>
                    <div className="border-t-2 mt-6" />
                    {selectedType === data.type && (
                        <div className="mt-4">
                            {renderData(selectedType)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SafetyForm;

interface ModalProps {
    isOpen: boolean;
    setOpen: () => void;
    form: any;
    name: [string, string];
}

export const TextModal = ({ isOpen, setOpen, form, name }: ModalProps) => {
    return (
        <>
            <CustomModal open={isOpen} setOpen={setOpen} title="Add Details">
                <div className='my-2'>
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={(values) => {
                            console.log(values)
                        }}
                    >
                        <Textarea name={name} label="Title" placeholder="Enter details:" required={true} />
                        <div className='border-t mt-7' />
                        <div className="flex justify-between items-center mt-4">
                            <div onClick={setOpen}
                                className='text-main text-p underline !cursor-pointer'>
                                Close
                            </div>
                            <Button className="text-white">Save</Button>
                        </div>
                    </Form>
                </div>
            </CustomModal>
        </>
    );
};
