import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa';

interface ListingCardProps {
    data: {
        img: string;
        category: string;
        rate: string;
        title: string;
    };
}

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
    return (
        <div>
            <Image
                src={data?.img}
                alt={data?.title}
                width={500}
                height={500}
                className='w-full h-[200px] object-cover rounded-md'
            />
            <div className='mt-2 flex justify-between'>
                <h3 className='text-c1'>{data?.category}</h3>
                <div className='flex items-center gap-1'>
                    <FaStar size={15} />
                    <p className='text-text_s'>{data?.rate}</p>
                </div>
            </div>
            <h3 className='text-text_s mt-1 line-clamp-1'>{data?.title}</h3>
        </div>
    );
};

export default ListingCard;
