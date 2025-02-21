import Icon from "../../../../../../components/common/icon";
import React from "react";
import PreviewCard from "./preview-card";

const Preview = ({ data }) => {

    const whatsNext = [
        {
            icon: 'calender',
            title: 'Set up your calendar',
            description: 'Choose which dates are available. Guests can start booking 24 hours after you publish.'
        },
        {
            icon: 'user-hands',
            title: 'Adjust you setting',
            description: 'Set house rules, select a cancellation policy, choose how guests can book, and more.'
        },
        {
            icon: 'edit-icon',
            title: 'Prepare for your first guest',
            description: 'Find tips in our Resource Center and access customer support.'
        }

    ]

    return (
        <div>
            <div className='flex flex-col gap-2 mb-10'>
                <h2 className='text-main text-xlMedium'>Review your listing</h2>
                <span className='text-secondaryText text-p2'>Here's what we'll show to guests. Make sure everything looks good.</span>
            </div>
            <div className='flex flex-col gap-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-[42px] items-start'>
                    <PreviewCard data={data} />
                    <div className='flex flex-col gap-4'>
                        <span className='text-title_md text-main mb-6'>What’s next?</span>
                        {
                            whatsNext.map((item, index) => (
                                <div key={index} className='flex gap-4'>
                                    <Icon name={item.icon} />
                                    <div className='flex flex-col'>
                                        <h2 className='text-main text-c1'>{item.title}</h2>
                                        <span className='text-secondaryText text-p2'>{item.description}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Preview