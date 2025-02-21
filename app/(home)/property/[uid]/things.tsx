"use client";
import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import CustomModal from '../../../../components/common/custom-modal';
import Icon from '../../../../components/common/icon';

const ThingsKnow = () => {
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState({ title: '', subtitle: '', items: [] });

    const data = {
        houseRules: {
            title: "House rules",
            subtitle: "Rules, requirements, and other things you need to know.",
            item: [
                {
                    name: 'Check-in after 4:00 PM',
                    icon: 'clock'
                },
                {
                    name: 'Checkout before 11:00 AM',
                    icon: 'clock'
                },
                {
                    name: 'No smoking',
                    icon: 'smoke-alarm2'
                },
            ]
        },
        safety: {
            title: "Safety & property",
            subtitle: "Avoid surprises by looking over these important details about your Host's property.",
            item: [
                {
                    name: 'No smoke alarm',
                    icon: 'smoke-alarm2'
                },
                {
                    name: 'No carbon monoxide alarm',
                    icon: 'smoke-alarm2'
                },
                {
                    name: 'No security deposit',
                    icon: 'smoke-alarm2'
                }
            ]
        },
        cancellation: {
            title: "Cancellation policy",
            subtitle: "Make sure you’re comfortable with this Host’s policy. In rare cases, you may be eligible for a refund outside of this policy under Airbnb’s Major Disruptive Events Policy.",
            item: [
                {
                    name: 'This reservation is non-refundable.',
                    icon: 'cancel'
                },
            ]
        }
    }

    const handleShowMore = (key) => {
        setModalData({ title: data[key].title, items: data[key].item, subtitle: data[key].subtitle });
        setOpen(true);
    }

    return (
        <div className='my-12'>
            <h1 className='text-title_md text-main mb-2'>Things to know</h1>
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 my-4 md:gap-0 gap-6'>
                {
                    Object.keys(data).map((key, index) => (
                        <div key={index} className='flex flex-col gap-2'>
                            <h4 className='text-p'>{data[key].title}</h4>
                            {
                                data[key].item.map((rule, index) => (
                                    <div key={index}>
                                        <p>{rule.name}</p>
                                    </div>
                                ))
                            }
                            <button type='button' className="flex items-center gap-1 mt-4" onClick={() => handleShowMore(key)}>
                                <span className='underline text-p'>Show more</span>
                                <FaAngleRight />
                            </button>
                        </div>
                    ))
                }
            </div>
            <CustomModal open={open} setOpen={setOpen} title={modalData.title} subTitle={modalData.subtitle}>
                <div className="mt-12">
                    <div className="space-y-4">
                        {modalData.items.map((item, index) => {
                            return (
                                <div key={index} className="flex items-center gap-4 border-b pb-4">
                                    <Icon height={28} width={28} name={item?.icon} />
                                    <h4 className="text-lg">{item.name}</h4>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export default ThingsKnow;
