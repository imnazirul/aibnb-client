"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { toAssetUrl } from '../../../../helpers/utils';
import { CgMenuGridO } from "react-icons/cg";
import { Drawer } from 'antd';
import ImageGallery from './gallery';

const PropertyPhotos = ({ data }) => {
    const [open, setOpen] = useState(false);
    // const data = {
    //     images: [
    //         {
    //             id: 1,
    //             src: '/106.jpg'
    //         },
    //         {
    //             id: 2,
    //             src: '/106.png'
    //         },
    //         {
    //             id: 3,
    //             src: '/128.png'
    //         },
    //         {
    //             id: 4,
    //             src: '/106.jpg'
    //         },
    //         {
    //             id: 5,
    //             src: '/106.jpg'
    //         },
    //         {
    //             id: 6,
    //             src: '/130.png'
    //         },
    //         {
    //             id: 7,
    //             src: '/106.png'
    //         },
    //         {
    //             id: 8,
    //             src: '/130.png'
    //         },
    //         {
    //             id: 9,
    //             src: '/128.png'
    //         },
    //     ]
    // }

    return (
        <>
            <div className='mt-6'>
                <div className="flex md:flex-row flex-col gap-4">
                    <div className='relative group basis-2/3'>
                        <Image
                            src={toAssetUrl(data?.images[0])}
                            alt={"properties"}
                            width={400}
                            height={400}
                            className={`cursor-pointer object-cover w-full h-full md:rounded-tl-lg md:rounded-bl-lg rounded-lg md:rounded-none `}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity"></div>
                    </div>

                    <div className='grid grid-cols-2 gap-4 '>
                        {data?.images.slice(1, 5).map((img, index) => (
                            <div key={index} className={`relative group ${index === 4 ? 'relative' : ''}`}>
                                <Image
                                    src={toAssetUrl(img)}
                                    alt={"properties"}
                                    width={250}
                                    height={250}
                                    className={`cursor-pointer object-cover w-full h-[272px] md:rounded-none rounded-lg ${index === 1 ? 'md:rounded-tr-lg' : ''} ${index === 3 ? 'md:rounded-br-lg' : ''}`}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity"></div>
                                {index === 3 && data.images.length > 4 && (
                                    <div className="absolute bottom-2 right-2 bg-white md:px-4 px-2 md:py-2 py-1 text-main text-sb rounded cursor-pointer flex items-center" onClick={() => setOpen(true)}>
                                        <CgMenuGridO className="inline-block mr-2 w-5 h-5" />
                                        Show all photos
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <Drawer
                    title={null}
                    placement="bottom"
                    height={'100vh'}
                    onClose={() => setOpen(false)}
                    open={open}
                >
                    <ImageGallery images={data.images} />
                </Drawer>
            </div>
        </>
    );
};

export default PropertyPhotos;
