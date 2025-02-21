"use client";
import React, { useEffect, useState } from 'react';
import LocationMapView from '../../../../components/common/location-map-view';
import { FaAngleRight } from "react-icons/fa6";
import { Drawer, Form } from 'antd';

const PropertyLocation = ({ data }) => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false);
    // const data = {
    //     country: 'Vietnam',
    //     name: 'Phong Thổ District, Lai Chau',
    //     description: 'we have every Saturday market and Hmong village and beautiful people, stunning views',
    //     location: {
    //         lat: 23.690495952964536,
    //         lng: 90.30569089379881,
    //         name: 'M8R4+577, Char Ruhitpur Rd, Ruhitpur, Bangladesh',
    //         city: 'Ruhitpur',
    //         country: 'BD',
    //         country_long: 'Bangladesh'
    //     }
    // }
    useEffect(() => {
        form.setFieldsValue({
            location: data.location,
        })
    }, [data])

    return (
        <div className='my-12'>
            <h1 className='text-title_md text-main mb-4'>Where you’ll be</h1>
            <Form form={form}>
                <LocationMapView
                    country={data?.location?.country}
                    name={"location"}
                    className="z-40"
                    rules={[]}
                    height={400} />
            </Form>
            <h4 className='text-p text-main mb-2'>{data?.title}</h4>
            <p className='text-wrap text-p3 my-6' dangerouslySetInnerHTML={{ __html: data?.description }} />
            <button type='button' className="flex items-center gap-1" onClick={() => setOpen(true)}>
                <span className='underline text-p'>Show more</span>
                <FaAngleRight />
            </button>
            <Drawer
                title={null}
                placement="bottom"
                height={'100vh'}
                onClose={() => setOpen(false)}
                open={open}
            >
                <div className='grid md:grid-cols-4 grid-cols-1'>
                    <div className='col-span-1 md:px-6'>
                        <h1 className='text-xxxlBold mb-4'>Where you’ll be</h1>
                        <h4 className='text-p text-main mb-2'>{data?.title}</h4>
                        <p className='text-wrap text-p3 my-6' dangerouslySetInnerHTML={{ __html: data?.description }} />

                    </div>
                    <div className='col-span-3'>
                        <Form form={form}>
                            <LocationMapView
                                country={data?.location?.country}
                                name={"location"}
                                className="z-40"
                                rules={[]}
                                height={"80vh"} />
                        </Form>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default PropertyLocation;