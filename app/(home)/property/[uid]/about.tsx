"use client";
import { Modal } from 'antd';
import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';

const AboutSpace = ({ data }) => {
    const [open, setOpen] = useState(false);
    
    return (
        <div className='border-t-2 border-secondary mt-10'>
            <div className='my-8'>
                <p className='text-wrap text-p3 pr-6' dangerouslySetInnerHTML={{ __html: data?.description }} />
                <button type='button' className="flex items-center gap-1 mt-6" onClick={() => setOpen(true)}>
                    <span className='underline text-p'>Show more</span>
                    <FaAngleRight />
                </button>
            </div>
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                centered
                title={<p className='text-title_md'>About this space</p>}
                footer={null}>
                <div className='flex flex-col'>
                    <p className='text-wrap text-p3 my-6' dangerouslySetInnerHTML={{ __html: data?.description }} />

                    <h5 className='text-p mb-1.5'>The space</h5>
                    <p className='text-wrap text-p3' dangerouslySetInnerHTML={{ __html: data?.description }} />
                </div>
            </Modal>
        </div>

    );
};

export default AboutSpace;