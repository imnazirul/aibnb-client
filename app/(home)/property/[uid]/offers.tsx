"use client";
import React, { useState } from 'react';
import { Modal } from 'antd';
import { toAssetUrl } from '../../../../helpers/utils';
import Svg from '../../../../components/common/svg';

const PlaceOffers = ({ data }) => {
    const [show, setShow] = useState(false)
    
    return (
        <>
            <div className='border-t-2 border-secondary mt-8'>
                <div className='my-8 flex flex-col gap-2 w-full md:w-[650px]'>
                    <h1 className='text-title_md text-main mb-2'>What this place offers</h1>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                        {
                            data?.amenities.slice(0, 5).map((amenity, index) => (
                                <div key={index} className="flex gap-4 items-center">
                                    <Svg src={toAssetUrl(amenity?.icon)}/>
                                    <span className='text-p1 text-main'>{amenity.name}</span>
                                </div>
                            ))
                        }
                    </div>
                    <button type='button' className='border border-main rounded-lg flex w-fit px-6 py-3 mt-6' onClick={() => setShow(true)}>Show all { data?.amenities?.length || 0} amenities</button>
                </div>
            </div>
            <Modal
                open={show}
                onCancel={() => setShow(false)}
                centered
                title={<p className='text-title_md'>What this place offers</p>}
                width={700}
                footer={null}>
                <div className='overflow-y-auto h-[calc(100vh-20vh)]'>
                    <div className='flex flex-col'>
                        {/* {
                            Object.keys(data.allAmenities).map((key, index) => (
                                <div key={index}>
                                    <h1 className='text-h4 text-main py-4 mt-4'>{data.allAmenities[key].title}</h1>

                                    {
                                        data.allAmenities[key].items.map((item, index) => (
                                            <div key={index} className="flex gap-4 py-6 items-center border-b-2">
                                                <Icon name={item.icon} />
                                                {key === 'notIncludes' ? <del className='text-p1 text-main'>{item.name}</del> :
                                                    <span className='text-p1 text-main'>{item.name}</span>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        } */}
                        {
                            data?.amenities.map((amenity, index) => (
                                <div key={index} className="flex gap-4 py-6 items-center border-b-2">
                                    <Svg src={toAssetUrl(amenity?.icon)}/>
                                    <span className='text-p1 text-main'>{amenity.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Modal>
        </>

    );
};

export default PlaceOffers;