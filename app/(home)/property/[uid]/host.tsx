import React from 'react';
import Button from '../../../../components/common/button';
import Icon from '../../../../components/common/icon';
import { TiTick } from 'react-icons/ti';
import { FaStar } from 'react-icons/fa';
import { GrManual } from 'react-icons/gr';
import { IoBriefcaseOutline, IoLanguage } from 'react-icons/io5';
import { TiGlobeOutline } from 'react-icons/ti';
import { RiGraduationCapLine } from 'react-icons/ri';


const items = [
    {
        key: 1,
        icon: <RiGraduationCapLine size={24} className="text-[#4b4e53]" />,
        description: "Where I went to school: ",
        detail: <>Khulna School</>,

    },
    {
        key: 2,
        icon: <IoBriefcaseOutline size={24} className="text-[#4b4e53]" />,
        description: "My Work: ",
        detail: <>Appstick</>,
    },
    {
        key: 3,
        icon: <TiGlobeOutline size={24} className="text-[#4b4e53]" />,
        description: "Where i live: ",
        detail: <>168/36 Sonadanga Khulna</>,
    },
    {
        key: 4,
        icon: <IoLanguage size={24} className="text-[#4b4e53]" />,
        description: "Languages I speak: ",
        detail: <>English</>,
    },
];

const Host = ({ data }) => {
    return (
        <div className='my-12'>
            <h1 className='text-[22px] font-medium'>Meet your Host</h1>
            <div className='flex lg:flex-row flex-col lg:gap-20 gap-6 mt-10'>
                <div className='w-full lg:w-[45%]'>
                    <div className='rounded-[15px] w-full lg:w-[370px] bg-white p-6 shadows drop-shadow-xl flex justify-between items-center'>
                        <div className="basis-2/3">
                            <div className='flex items-center gap-4 flex-col justify-items-center'>
                                <div className='relative'>
                                    <img
                                        src="https://via.placeholder.com/100"
                                        alt="Avatar"
                                        className='w-[100px] h-[100px] rounded-full object-cover'
                                    />
                                    <div className='w-8 h-8 bg-red-600 rounded-full absolute right-0 bottom-0 flex items-center justify-center'>
                                        <TiTick size={20} className='text-white' />
                                    </div>
                                </div>
                                <div className='text-center flex items-center flex-col'>
                                    <h1 className='text-h4'>{data?.owner?.name}</h1>
                                    <p className='flex gap-x-1 text-p2 items-center'>
                                        <GrManual className='-rotate-[180deg]' />
                                        <span>SuperHost</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="basis-1/3">
                            <div className='flex flex-col gap-4'>
                                <div className='text-center border-b py-1'>
                                    <h2 className='text-title_md font-bold'>1361</h2>
                                    <p className='text-xxs'>Reviews</p>
                                </div>
                                <div className='text-center border-b py-1'>
                                    <h2 className='text-title_md font-bold flex items-center justify-center gap-1'>
                                        4.87 <FaStar size={15} />
                                    </h2>
                                    <p className='text-xxs'>Rating</p>
                                </div>
                                <div className='text-center border-b py-1'>
                                    <h2 className='text-title_md font-bold'>2</h2>
                                    <p className='text-xxs'>Years hosting</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-10">
                        {items.map((item) => (
                            <div
                                key={item.key}
                                className="flex items-center gap-3 pb-6 text-p2"
                            >
                                {item?.icon}
                                <p className="flex items-center justify-between w-full">
                                    <span className="text-main text-c1">
                                        {item?.description}
                                        <span className="text-main">{item?.detail}</span>
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='w-full'>
                    <div className='border-b pb-8'>
                        <h2 className='text-h4'>{data?.owner?.name} is a Superhost</h2>
                        <p className='text-h5 my-3'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                        <h2 className='text-h4 mt-6'>Host Details</h2>
                        <p className='text-h5 mt-3'>Response rate: <span>100%</span></p>
                        <p className='text-h5'>Responds within an hour</p>
                        <button className='bg-main text-white px-6 py-4 rounded-md text-h4 mt-7'>Message Host</button>
                    </div>
                    <div className='flex items-center gap-3 mt-6'>
                        <Icon name={'accuracy'} />
                        <p className='text-p1'>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Host;