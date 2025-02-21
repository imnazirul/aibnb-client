'use client'
import React from 'react';
import Rightbar from './rightbar';
import Content from './content';

const ContactHost = () => {
    return (
        <div className="">
            <div className='py-10'>
                <div className="flex flex-col md:flex-row justify-between gap-x-14">
                    <Content />
                    <Rightbar />
                </div>
            </div>
        </div>
    );
};

export default ContactHost;