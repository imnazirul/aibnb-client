import { Drawer, Modal } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";

const QuestionsModal = ({ open, setOpen }) => {
    const [show, setShow] = useState<boolean>(false)
    return (
        <div className=''>
            <Drawer
                onClose={() => setOpen(false)}
                open={open}
                title={<p className='text-center'> Questions?</p>}
            >
                <div>
                    <div className='my-6'>
                        <h1 className='text-h4 mb-4'>Talk to a Superhost</h1>
                        <div className='border rounded-[15px] overflow-hidden flex flex-col py-4 px-2.5'>
                            <Image src={'/profile.png'} width={20} height={20} alt='' className='w-[48px] h-[48px] rounded-full' />
                            <h1 className='text-h4 mt-2.5'>Rainer is here to help</h1>
                            <p className='text-p2 text-secondaryText'> We matched you with Rainer, an experienced Host who can offer you one-to-one guidance.</p>
                            <button onClick={() => setShow(true)} className='bg-[#222222] text-white rounded-md text-h4 px-4 py-2 mt-4'>Message Rainer</button>
                        </div>
                    </div>

                    <h1 className='text-h4'>Get quick tips</h1>
                    <div className='h-[96px] border rounded-[15px] overflow-hidden flex mt-4 gap-4 items-center'>
                        <Image src={'/qb.png'} width={500} height={300} alt='' className='w-[96px] h-full' />
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-c1'>How to finish listing your space</h1>
                            <p className=''>2 min read</p>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <h1 className='text-h4'>Talk to a Superhost</h1>
                        <div onClick={() => setShow(true)} className='border rounded-[15px] overflow-hidden flex flex-col mt-4 cursor-pointer'>
                            <Image src={'/host.jpg'} width={500} height={300} alt='' className='w-full h-[181px]' />
                            <div className='flex flex-col gap-2 p-5 border'>
                                <h1 className='text-h4'>Get one-to-one guidance</h1>
                                <p className=''>We’ll match you with an experienced Host who can answer questions over chat or video.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
            <Modal
                open={show}
                footer={false}
                className='2xl:!w-[55%] !w-[90%] sm:!w-[50%] lg:!w-[90%] relative !overflow-hidden modals   '
            >
                <button type='button' onClick={() => setShow(false)} className='w-[32px] h-[32px] rounded-full bg-white z-30 top-4 left-4 absolute flex items-center justify-center'>
                    <IoClose size={20} />
                </button>
                <div className='relative flex flex-col lg:flex-row w-full lg:h-[600px] '>
                    <div className='w-full lg:w-1/2 overflow-hidden h-[240px] lg:h-full  lg:rounded-s-[8px] rounded-t-[8px] relative '>
                        <Image src={'/host.jpg'} width={500} height={500} alt='' className='w-full h-full' />
                    </div>
                    <div className='w-full lg:w-1/2 relative'>
                        <div className='lg:px-8 px-3 flex flex-col justify-center'>
                            <h1 className='lg:text-xlSemiBold text-title_ss lg:mt-[200px] mt-3'>Let’s find you a Superhost</h1>
                            <p className='lg:text-h5 text-p2 text-[#6a6a6a] mt-2'>We’ll match you with an experienced Host who can help you get started.</p>
                            <p className='text-xxs text-[#6a6a6a] lg:my-[120px] mt-[80px] mb-[100px]'>By selecting “Get matched” you agree to the <span className='font-semibold underline'>Program Terms.</span></p>
                        </div>
                        <footer className='border-t h-[80px] absolute bottom-0 w-full flex items-center justify-end pe-10'>
                            <button className='font-semibold bg-[#222222] px-[26px] py-3 rounded-md text-white text-xl '>Get matched</button>
                        </footer>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default QuestionsModal;