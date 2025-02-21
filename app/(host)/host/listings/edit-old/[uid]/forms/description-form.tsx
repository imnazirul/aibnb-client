import React, { useState } from 'react';
import Icon from '../../../../../../../components/common/icon';
import Button from '../../../../../../../components/common/button';
import { IoIosArrowDown } from "react-icons/io";
import Textarea from '../../../add-old/forms/textarea';

const DescriptionForm = () => {
    const [description, setDescription] = useState('description');

    const descriptionSections = [
        { key: 'description', label: 'Listing Description', name: 'description' },
        { key: 'property_description', label: 'Your Property', name: 'property_details' },
        { key: 'guest_access', label: 'Guest Access', name: 'guest_access' },
        { key: 'interaction_guest', label: 'Interaction with Guests', name: 'interaction_guest' },
        { key: 'other_details', label: 'Other Details to Note', name: 'other_details' },
    ];

    return (
        <div className='md:my-0 my-5'>
            <label className='text-main text-title_lg'>Description</label>
            <div className='flex flex-col gap-5 py-5'>
                {descriptionSections.map(section => (
                    <DescriptionSection
                        key={section.key}
                        label={section.label}
                        description={description}
                        activeDescription={section.key}
                        setDescription={setDescription} // Pass setDescription here
                        onClick={() => setDescription(section.key)}
                        onClose={() => setDescription(null)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DescriptionForm;

interface DescriptionSectionProps {
    label: string;
    onClick: () => void;
    description: string;
    activeDescription: string;
    setDescription: (description: string | null) => void;
    onClose: () => void;
}

const DescriptionSection = ({ label, onClick, description, activeDescription, setDescription, onClose }: DescriptionSectionProps) => {
    return (
        <div>
            <label className='!text-main text-p1'>{label}</label>
            {
                description != activeDescription &&
                <div role='button' onClick={onClick} className={`details-button ${description === activeDescription ? 'border-primary' : ''}`}>
                    <span className='text-h5'>Add Details</span>
                    <Icon name='arrow-right' />
                </div>
            }
            {
                description === activeDescription &&
                <div role='button' onClick={onClose} className={`details-button ${description === activeDescription ? 'border-primary' : ''}`}>
                    <span className='text-h5'>Close Details</span>

                    <IoIosArrowDown className='h-5 w-5' />

                </div>
            }
            {
                description === activeDescription && (
                    <DescriptionDetails
                        key={activeDescription}
                        label={label}
                        name={activeDescription}
                        setDescription={setDescription} // Pass setDescription here
                    />
                )
            }
        </div>
    );
};

interface DescriptionDetailsProps {
    label: string;
    name: string;
    setDescription: (description: string | null) => void;
}

const DescriptionDetails = ({ label, name, setDescription }: DescriptionDetailsProps) => {
    return (
        <div className='flex flex-col mt-4'>
            <label className='!text-main text-p1 capitalize'>{label}</label>
            <Textarea name={name} label="" placeholder="" max={400} required className='-mt-3' />
            <div className='flex justify-end gap-x-3'>
                <Button className='mt-2 !text-primary bg-white border'
                    onClick={() => {
                        setDescription(null)
                    }}
                >
                    Close
                </Button>
                <Button className='mt-2 !text-white'>
                    Save
                </Button>
            </div>
        </div>
    );
};
