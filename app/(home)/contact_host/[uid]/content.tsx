'use client'
import React from 'react';
import Link from 'next/link';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Image from 'next/image';
import About from './about';
import Message from './message';

const  Content: React.FC = () => {
    return (
        <div className="flex-1">
            <Link href={'/'}>
                <MdOutlineKeyboardArrowLeft size={35} aria-label="Go back" />
            </Link>
            <div className='mt-8 w-full flex justify-between items-center border-b pb-8'>
                <div>
                    <h2 className='text-title_sss'>Contact Elisabeth</h2>
                    <p>Typically responds within an hour</p>
                </div>
                <div className='w-[56px] h-[56px] rounded-full'>
                    <Image 
                        src={'/sign.png'} 
                        width={500} 
                        height={300} 
                        alt='user logo' 
                        className='w-[56px] h-[56px] rounded-full' 
                        priority 
                    />
                </div>
            </div>
            <div>
                <About/>
                <Message/>
            </div>
        </div>
    );
};

export default Content;
