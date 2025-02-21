import Image from 'next/image';
import React, { useState } from 'react';
import { FaStar, FaTimes } from "react-icons/fa";

const PreviewCard = ({ data }) => {
    const [open, setOpen] = useState(false)
    const getImageUrl = (image) => {
        if (typeof image === 'string') {
            return image;
        } else if (image instanceof Blob) {
            return URL.createObjectURL(image);
        }
        return '';
    };
    return (
        <>
            <div onClick={() => setOpen(true)} className=' shadow-sm p-6 rounded-[14px] relative'>
                <img
                    // src={data?.images[0]?.originFileObj ? URL.createObjectURL(data?.images[0]?.originFileObj) : URL.createObjectURL(data?.images[0])}
                    src={getImageUrl(data?.images[0]?.originFileObj || data?.images[0])}
                    alt='image' className='w-full h-[311px]' />
                <button type='button' className='px-4 py-2 rounded bg-white absolute top-10 left-10 text-p1 h-fit
            '>Show preview</button>
                <div className='mt-4 flex justify-between'>
                    <div>
                        <span className='capitalize text-c1'>{data?.title}</span>
                        <h2 className='flex text-p3 gap-2'> <span className='text-secondaryText'>${data?.price}</span><span>${data?.price} night</span></h2>
                    </div>
                    <h1 className='flex h-fit items-center gap-[6px] text-p2'>New <FaStar /></h1>
                </div>
            </div>

            {
                open && <div
                    role="dialog"
                    aria-label="Edit image"
                    aria-modal="true"
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 py-10 flex items-center px-2 justify-center  z-50"
                >
                    <div className="bg-white xl:w-[75%] 2xl:w-[50%] sm:w-[50%] lg:w-[40%] w-[95%] h-fit  xl:px-10 px-6 rounded-[20px] shadow-lg  relative  ">
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                            type="button"
                            className=" absolute top-4 left-5 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                        <div className=' border-b w-full h-[60px] flex items-center justify-center'>
                            <h2 className='text-p'>Full preview</h2>
                        </div>
                        <div className='grid xl:grid-cols-2 grid-cols-1 xl:gap-10 gap-5 py-10 h-[600px] overflow-auto'>
                            <img
                                // src={data?.images[0]?.originFileObj ? URL.createObjectURL(data?.images[0]?.originFileObj) : URL.createObjectURL(data?.images[0])}
                                src={getImageUrl(data?.images[0]?.originFileObj || data?.images[0])}
                                alt='image'
                                className='h-[500px] object-contain'
                            />
                            <div>
                                <h1 className='xl:text-xlSemiBold text-title_md'>{data?.title}</h1>
                                <div className='xl:mt-8 mt-6 border-b xl:pb-8 pb-6 flex justify-between '>
                                    <div className=' xl:w-[70%] w-[80%]'>
                                        <h1 className='xl:text-title_sss text-cs line-clamp-2'>hosted by { }
                                        </h1>
                                        <p className='flex gap-1 xl:text-p2 mt-1'><span>{data?.guests} guests .</span><span>{data?.bedrooms} bedroom .</span><span>{data?.beds} bed .</span><span>{data?.bathrooms} bath</span></p>
                                    </div>
                                    <div className='w-[56px] h-[56px] rounded-full bg-black text-white flex items-center justify-center'>
                                        N
                                    </div>
                                </div>
                                <p className='flex gap-1 xl:text-p2 mt-1 border-b xl:py-8 py-6'>Reconnect with loved ones in this family-friendly place.
                                </p>
                                <div className='xl:mt-8 mt-6'>
                                    <h3 className='text-p'>Location</h3>
                                    <h1 className='text-p xl:mt-6 mt-4'>{data?.location?.name}</h1>
                                    <p className='text-xxs mt-1'>We’ll only share your address with guests who are booked as outlined in our <span className='underline cursor-pointer'>privacy policy.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    );
};

export default PreviewCard;