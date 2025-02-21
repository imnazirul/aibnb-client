import React, { useState, Dispatch, SetStateAction } from 'react';
import LocationMap from '../../../../../../../components/common/location-map';
import Textarea from '../../../add-old/forms/textarea';
import Button from '../../../../../../../components/common/button';
import FormInput from '../../../../../../../components/form/input';
import { Checkbox, Form, Switch } from 'antd';
import Icon from '../../../../../../../components/common/icon';
import { IoIosArrowDown } from 'react-icons/io';

interface SectionProps {
    label: string;
    name: string;
    setActiveSection: Dispatch<SetStateAction<string | null>>;
};

interface SectionType {
    key: string;
    label: string;
    component: React.ComponentType<SectionProps>;
};

const LocationForm: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string | null>('address');

    const sections: SectionType[] = [
        { key: 'address', label: 'Address', component: AddressForm },
        { key: 'location_sharing', label: 'Location Sharing', component: LocationSharingForm },
        { key: 'location_features', label: 'Location Features', component: LocationFeaturesForm },
        { key: 'getting_around', label: 'Getting Around', component: TextareaForm },
        { key: 'views', label: 'Scenic Views', component: ScenicForm },
    ];

    return (
        <div>
            <h4 className='text-title_lg text-main capitalize'>Location</h4>
            <div className="mt-10">
                <LocationMap
                    country="bangladesh"
                    name="location"
                    className="-mt-3"
                    rules={[{ required: true, message: 'Please select pickup point' }]}
                />
            </div>

            <div className='flex flex-col gap-5 py-5'>
                {sections.map(section => (
                    <Section
                        key={section.key}
                        label={section.label}
                        isActive={activeSection === section.key}
                        setActive={() => setActiveSection(section.key)}
                    >
                        <section.component
                            label={section.label}
                            name={section.key}
                            setActiveSection={setActiveSection}
                        />
                    </Section>
                ))}
            </div>
        </div>
    );
};

export default LocationForm;

interface SectionComponentProps {
    label: string;
    isActive: boolean;
    setActive: () => void;
    children: React.ReactNode;
};

const Section = ({ label, isActive, setActive, children }: SectionComponentProps) => (
    <div>
        <label className='!text-main text-p2 capitalize font-semibold'>{label}</label>
        {
            !isActive &&
            <div role='button' onClick={setActive} className={`location_section ${isActive ? 'border-primary' : ''}`}>
                <span className='text-h5'>Add Details</span>
                <Icon name='arrow-right' />
            </div>
        }
        {
            isActive &&
            <div role='button' onClick={setActive} className={`location_section ${isActive ? 'border-primary' : ''}`}>
                <span className='text-h5'>Close Details</span>
                <IoIosArrowDown className='h-5 w-5' />
            </div>
        }

        {isActive && children}
    </div>
);

const AddressForm = ({ setActiveSection, label }: SectionProps) => {
    return (
        <div className='mt-4'>
            <h3 className='!text-main text-p1 capitalize'>{label}</h3>
            <div className="border rounded-sm p-6 mt-2">
                <FormInput name='address' label='Street Address' placeholder='Enter Address' className='w-full' />
                <div className="grid lg:grid-cols-2 gap-x-6">
                    <FormInput name='floor' label='Apt, Floor, Bldg. (if applicable)' placeholder='Enter Floor' className='w-full' />
                    <FormInput name='city' label='City / Town / Village' placeholder='Enter City' className='w-full' />
                </div>
                <div className="grid lg:grid-cols-2 gap-x-6">
                    <FormInput name='state' label='Province / State / Territory (if applicable)' placeholder='Enter State' className='w-full' />
                    <FormInput name='zip' label='Postal Code (if applicable)' placeholder='Enter Zip' className='w-full' />
                </div>
                <SaveButton setActiveSection={setActiveSection} />
            </div>
        </div>
    )
};


const LocationSharingForm = ({ setActiveSection, label }: SectionProps) => {
    return (
        <div className="mt-4">
            <h3 className="!text-main text-p1">{label}</h3>
            <div className="border rounded-sm p-6 mt-2">
                <div>
                    <div className="flex justify-between space-y-4 lg:space-y-0 lg:space-x-5">
                        <div className="w-full lg:w-[490px]">
                            <p className="text-p2 text-secondaryText text-wrap">
                                Hide your address, last name, and phone number while guests can cancel.
                            </p>
                        </div>
                        <Form.Item name="is_location_share" initialValue={false}>
                            <Switch onChange={checked => console.log(`switch to ${checked}`)} defaultValue={false} />
                        </Form.Item>
                    </div>
                    <div className="w-full lg:w-2/3 mt-4 lg:mt-0">
                        <LocationMap
                            country="bangladesh"
                            name="location"
                            className="mt-3 h-[285px]"
                            rules={[{ required: true, message: 'Please select pickup point' }]}
                        />
                    </div>
                </div>

                <div className="border-t mt-8 text-secondaryText"></div>

                <div className="flex flex-col lg:flex-row justify-between mt-4 space-y-4 lg:space-y-0">
                    <h5 className="text-c1 text-main capitalize">address privacy for cancellations</h5>
                    <Form.Item name="is_cancel" initialValue={false}>
                        <Switch onChange={checked => console.log(`switch to ${checked}`)} defaultValue={false} />
                    </Form.Item>
                </div>
                <p className="text-p2 text-secondaryText mt-1 w-full lg:w-[580px] text-wrap">
                    Hide your address, last name, and phone number while guests can cancel for free.
                </p>
                <SaveButton setActiveSection={setActiveSection} />
            </div>
        </div>
    );
};


const LocationFeaturesForm = ({ setActiveSection, label }: SectionProps) => {
    const featureList = [
        { id: 1, name: 'beach access', description: 'guest can enjoy a nearby beach' },
        { id: 2, name: 'lake access', description: 'guests can get to lake using a path dock' },
        { id: 3, name: 'private entrance', description: 'Separate street or building entrance' },
    ];

    return (
        <div className="mt-4">
            <h3 className="!text-main text-p1">{label}</h3>
            <div className="border p-6 mt-2 rounded-sm">
                <div className="flex flex-col space-y-5">
                    {featureList.map((val, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-center">
                                <div className="w-full lg:w-[573px] mt-2">
                                    <p className="text-p2 text-secondaryText capitalize">
                                        {val.name}
                                    </p>
                                    <p className="text-p2 text-secondaryText text-wrap">
                                        {val.description}
                                    </p>
                                </div>
                                <div className="mt-4 lg:mt-0">
                                    <Form.Item name={["features", val.name]} initialValue={false}>
                                        <Switch onChange={checked => console.log(`switch to ${checked}`)} defaultValue={false} />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="border-t mt-5 text-secondaryText"></div>
                        </div>
                    ))}
                </div>
                <SaveButton setActiveSection={setActiveSection} />
            </div>
        </div>
    );
};



const TextareaForm = ({ label, name, setActiveSection }: SectionProps) => {
    return (
        <div className='mt-4'>
            <div className='flex flex-col'>
                <label className='!text-main text-p1 capitalize'>{label}</label>
                <Textarea name={name} label="" placeholder="" max={400} required className='-mt-3' />
                <div className='flex justify-end gap-x-3 mt-4'>
                    <Button className='!text-primary bg-white border' onClick={() => setActiveSection(null)}>
                        Close
                    </Button>
                    <Button className='!text-white'>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
};


const ScenicForm = ({ label, setActiveSection }: SectionProps) => {

    const scenicViewData = [
        { label: 'Bay View', value: 'bay_view' },
        { label: 'Beach View', value: 'beach_view' },
        { label: 'Canal View', value: 'canal_view' },
        { label: 'City Skyline View', value: 'city_skyline_view' },
    ];

    return (
        <div className='mt-4'>
            <div className='flex flex-col'>
                <label className='!text-main text-p1 capitalize'>{label}</label>
                <div className="border rounded-sm p-6 mt-2">
                    <Multiselect name='scenic_views' options={scenicViewData} />
                    <SaveButton setActiveSection={setActiveSection} />
                </div>
            </div>
        </div>
    )
};


const Multiselect = ({ name, options }) => {
    const Input = ({ value, onChange }: any) => {
        return (
            <>
                <div className="grid lg:grid-cols-2 gap-6 items-center">
                    {options.map((val, index) => (
                        <div className='cursor-pointer' key={index} onClick={() => {
                            if (value?.includes(val.label)) {
                                onChange(value.filter((v) => v !== val.label))
                            } else {
                                onChange([...value, val.label])
                            }
                        }}>
                            <div className="border p-4 rounded-sm">
                                <div className="flex justify-between">
                                    <p className='text-c1 text-secondaryText'>{val.label}</p>
                                    <Checkbox
                                        checked={value?.includes(val.label)}
                                        className='text-secondaryText text-p3' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    return (
        <Form.Item name={name} initialValue={[]}>
            <Input />
        </Form.Item>
    )
}


// button component
const SaveButton = ({ setActiveSection }) => {
    return (
        <>
            <div className='flex justify-end gap-x-3 mt-4'>
                <Button className='!text-primary bg-white border' onClick={() => setActiveSection(null)}>
                    Close
                </Button>
                <Button className='!text-white'>
                    Save
                </Button>
            </div>
        </>
    )
}