import React, { useState } from 'react';
import Icon from '../../../../../../components/common/icon';
import { Checkbox, Form } from 'antd';
import Price from '../forms/price';
import Multiselect from "../forms/multiselect";


const Step3 = ({ elements }: any) => {
    const typesData = [
        {
            title: "Use Instant Book",
            description: "Guests can book automatically.",
            icon: "user-rounded",
            value: "instant"
        },
        {
            title: "Approve or decline requests",
            description: "Guests must ask if they can book.",
            icon: "user-group",
            value: "request"
        },
    ]

    const data = [
        {
            title: "Any guest",
            description: "Get reservations faster when you welcome anyone from the community.",
            value: "any"
        },
        {
            title: "An experienced guest",
            description: "For your first guest, welcome someone with a good track record and who can offer tips for how to be a great Host.",
            value: "experienced"
        },
    ]



    const BookingTypeInput = ({ value, onChange }: any) => {
        return (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-6">
                {typesData.map((item, index) => (
                    <div
                        role="button"
                        onClick={() => onChange(item.value)}
                        className={`guest_card ${value === item.value ? 'bg-primary-50 border-primary' : ''} group`} key={index}>
                        <div className='flex gap-x-4 items-center'>
                            <Icon name={item.icon} />
                            <h3 className={`${value === item.value ? 'text-primary' : ''} text-c1 group-hover:text-primary`}>{item.title}</h3>
                        </div>
                        <p className={`${value === item.value ? 'text-primary' : ''} text-secondaryText text-s group-hover:text-primary`}>{item.description}</p>
                    </div>
                ))}
            </div>
        )
    }


    const ReservationTypeInput = ({ value, onChange }: any) => {
        return (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-6">
                {data.map((item, index) => (
                    <div
                        role="button"
                        onClick={() => onChange(item.value)}
                        className={`guest_card ${value === item.value ? 'bg-primary-50 border-primary' : ''} group`} key={index}>
                        <div className='flex gap-x-4 items-center'>
                            {/*<Icon name={item.icon}/>*/}
                            <h3 className={`${value === item.value ? 'text-primary' : ''} text-c1 group-hover:text-primary`}>{item.title}</h3>
                        </div>
                        <p className={`${value === item.value ? 'text-primary' : ''} text-secondaryText text-s group-hover:text-primary`}>{item.description}</p>
                    </div>
                ))}
            </div>
        )
    }


    return (
        <div>
            <div className="mt-20">
                <h3 className='text-xlMedium text-main'>Decide how you’ll confirm reservations</h3>
                <Form.Item
                    name='booking_type'
                    initialValue='instant'
                >
                    <BookingTypeInput />
                </Form.Item>
            </div>

            <div className="mt-10">
                <h3 className='text-xlMedium text-main'>Choose who to welcome for your first reservation</h3>
                <p className='text-p2 text-secondaryText mt-1'>After your first guest, anyone can book your place.</p>
                <Form.Item
                    name='reservation_type'
                    initialValue='any'
                >
                    <ReservationTypeInput />
                </Form.Item>
            </div>

            <div className="mt-10">
                <h3 className='text-xlMedium text-main'>Now, set your price</h3>
                <p className='text-p2 text-secondaryText mt-1'>You can change it anytime.</p>
                <div className='mt-6'>
                    <div className="md:w-[488px] h-[200px] property_count border-dashed">
                        <Form.Item name="price" initialValue={1}>
                            <Price />
                        </Form.Item>

                    </div>
                </div>
            </div>

            <div className="mt-6 overflow-x-auto">
                <p className='text-p1 text-main'>Does your place have any of these? <span
                    className='text-secondaryText'>(Optional)</span></p>
                <Multiselect name="features" options={elements?.features}/>
            </div>

            <div className="mt-6">
                <p className='text-p2 text-main font-semibold'>Important things to know</p>
                <span className='text-p2 text-secondaryText'>Security cameras that monitor indoor spaces are not allowed even if they're turned off. All exterior security cameras must be disclosed.</span>
            </div>
        </div>
    );
};

export default Step3;