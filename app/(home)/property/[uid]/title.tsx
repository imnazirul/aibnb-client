"use client";
import React, { useState } from 'react';
import { FiShare } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FaCopy } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiImessage } from "react-icons/si";
import { FaWhatsappSquare, FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Modal, notification } from 'antd';
import Image from 'next/image';
import { toAssetUrl } from '../../../../helpers/utils';

const PropertyTitle = ({ data }) => {
    const [show, setShow] = useState(false)
    console.log("data: " + data?.title);

    return (
        <div className=''>
            <div className='flex justify-between items-center mt-6'>
                <h1 className='sm:text-title_md text-p text-main'>{data?.title}</h1>
                <div className='flex gap-2'>
                    <div className='flex gap-1 items-center hover:bg-secondary p-1 rounded-md cursor-pointer' onClick={() => setShow(true)}>
                        <FiShare />
                        <span className='underline text-ssb'>Share</span>
                    </div>
                    <div className='flex gap-1 items-center hover:bg-secondary p-1 rounded-md cursor-pointer'>
                        <FiHeart />
                        <span className='underline text-ssb'>Save</span>
                    </div>
                </div>
            </div>
            <Modal
                open={show}
                onCancel={() => setShow(false)}
                title={<p className='text-title_md'>Share this place</p>}
                footer={null}>
                <>
                    <div className='flex items-center my-6'>
                        <Image
                            height={64}
                            width={64}
                            src={toAssetUrl(data.images[0])}
                            className="h-[64px] object-cover mr-4 rounded-md"
                            alt=""
                        />
                        <span className='text-p2'>
                            {data?.title} · {data?.rooms} room · {data?.bedrooms} bedrooms · {data?.bathrooms} bathrooms
                        </span>
                    </div>


                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex gap-4 items-center px-4 py-2 border rounded-lg hover:bg-secondary cursor-pointer' onClick={() => {
                            navigator.clipboard.writeText(window.location.href)
                            notification.success({ message: 'Link copied' })
                        }}>
                            <FaCopy className='h-5 w-5' />
                            <span className='text-main text-p'>Copy Link</span>
                        </div>
                        <div className='flex gap-4 items-center px-4 py-2 border rounded-lg hover:bg-secondary cursor-pointer'>
                            <MdEmail className='h-5 w-5' />
                            <span className='text-main text-p'>Email</span>
                        </div>
                        <div className='flex gap-4 items-center px-4 py-2 border rounded-lg hover:bg-secondary cursor-pointer'>
                            <SiImessage className='h-5 w-5' />
                            <span className='text-main text-p'>Messages</span>
                        </div>
                        <div className='flex gap-4 items-center px-4 py-2 border rounded-lg hover:bg-secondary cursor-pointer'>
                            <FaWhatsappSquare className='h-5 w-5' />
                            <span className='text-main text-p'>WhatsApp</span>
                        </div>
                        <div className='flex gap-4 items-center px-4 py-2 border rounded-lg hover:bg-secondary cursor-pointer'>
                            <FaFacebookSquare className='h-5 w-5' />
                            <span className='text-main text-p'>Facebook</span>
                        </div>
                        <div className='flex gap-4 items-center px-4 py-2 border rounded-lg hover:bg-secondary cursor-pointer'>
                            <FaInstagramSquare className='h-5 w-5' />
                            <span className='text-main text-p'>Instagram</span>
                        </div>
                        <div className='flex gap-4 items-center px-4 py-2 border rounded-lg hover:bg-secondary cursor-pointer'>
                            <FaSquareXTwitter className='h-5 w-5' />
                            <span className='text-main text-p'>Twitter</span>
                        </div>
                    </div>
                </>
            </Modal>
        </div>
    );
};

export default PropertyTitle;