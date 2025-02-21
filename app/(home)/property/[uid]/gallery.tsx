import Image from 'next/image';
import React from 'react';
import { toAssetUrl } from '../../../../helpers/utils';

const ImageGallery = ({ images }) => {
    return (
        <div className='max-w-[1120px] mx-auto'>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 md:mx-36">
                {images.map((image, index) => (
                    <div key={index} className={`overflow-hidden relative ${index % 3 === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}>
                        <Image
                            src={toAssetUrl(image)}
                            alt={"properties"}
                            width={400}
                            height={250}
                            className={`object-cover w-full transition-transform duration-300 ease-in-out transform hover:scale-105
                                ${index % 3 === 0 ? 'h-[540px]' : 'h-[272px]'}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;