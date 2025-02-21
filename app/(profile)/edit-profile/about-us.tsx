import { Form, Switch } from 'antd';
import React, { useState } from 'react';
import Icon from '../../../components/common/icon';
import { GoPlus } from 'react-icons/go';
import { interest } from '../../../helpers/utils';
import CustomModal from '../../../components/common/custom-modal';
import { IntroMultiselect } from '../../(host)/host/listings/edit-old/[uid]/forms/about-host';
import Button from '../../../components/common/button';
import Textarea from '../../(host)/host/listings/add-old/forms/textarea';
import Image from 'next/image';

const AboutUs = ({ isSwitchOn, setIsSwitchOn, form }) => {
    const [open, setOpen] = useState(false);
    const [openAbout, setOpenAbout] = useState(false);
    const handleSwitchToggle = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const places = [
        { icon: "/global.png", icon2: "/global2.png", label: "Next destination" },
        { icon: "/sun.png", icon2: "/sun2.png", label: "Next destination" },
        { icon: "/air.png", icon2: "/air2.png", label: "Next destination" },
        { icon: "/switch.png", icon2: "/switch2.png", label: "Next destination" },
    ];


    return (
        <div className='mt-10'>
            <h1 className="text-xlSemiBold text-main mb-3">About you</h1>
            <div className="mt-3 rounded   pb-10">
                <p className="text-p2 text-main mb-[11px]">Edit Intro</p>
                <span onClick={() => setOpenAbout(true)} className="text-p underline w-fit cursor-pointer">Edit Intro</span>
            </div>

            <div className="mt-5">
                <h1 className="text-title_md text-main mb-3">What you’re into</h1>
                <p className="text-p2 text-main">Find common ground with other guests and Hosts by adding interests to your profile.</p>
                <div className="flex flex-wrap gap-2.5 my-6">
                    {interest.map((item, index) => (
                        <div
                            className="about_interest flex items-center space-x-2"
                            key={index}
                        >
                            <Icon name={item.icon} />
                            <h3 className="group-hover:text-primary text-s text-main">{item.label}</h3>
                        </div>
                    ))}
                </div>
                <span onClick={() => setOpen(true)} className="text-p underline w-fit cursor-pointer">Edit interests</span>
            </div>

            <div className="mt-10">
                <div className="flex items-center justify-between ">
                    <h1 className="text-title_lg text-main mb-3">Where you’ve been</h1>
                    <Switch
                        defaultChecked
                        checked={isSwitchOn} onChange={handleSwitchToggle}
                    />
                </div>
                <p className="text-p2 text-main">Choose whether other people can see all the places you’ve been on Appstick.</p>
                <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-5 border-b pb-10">
                    {
                        places?.map((item, index) => (
                            <div key={index} className={` flex flex-col items-center gap-4 cursor-pointer`}>
                                <Image width={500} height={500} src={item?.icon} alt='places' className={`w-full  h-[120px]  ${isSwitchOn ? 'opacity-100' : ' opacity-30'} `} />
                                <p className={`group-hover:text-primary text-s text-main`}>{item?.label}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <CustomModal open={open} setOpen={setOpen} title={"What are you into?"} subTitle={"Pick some interests you enjoy that you want to show on your profile."}>
                <>
                    <Form form={form} onFinish={(values) => console.log(values)}>
                        <div className=''>
                            <div className="flex flex-wrap gap-2.5 my-2.5 flex-shrink">
                                <IntroMultiselect name='interests' options={interest} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center  border-t-[1px] border-[#EEE] pt-6 mt-8">
                            <div onClick={() => setOpen(false)}
                                className='text-main text-p underline !cursor-pointer'>
                                Close
                            </div>
                            <Button type='submit' onClick={
                                () => setOpen(false)
                            } className="text-white">Save</Button>
                        </div>
                    </Form>
                </>
            </CustomModal>

            <CustomModal open={openAbout}
                setOpen={setOpenAbout} title={"About you"} subTitle={"Tell us a little bit about yourself, so your future hosts or guests can get to know you."}>
                <Form onFinish={(values) => console.log(values)}>
                    <div className="">
                        <Textarea name="about" max={450} placeholder="write something" />
                    </div>
                    <div className="flex justify-between items-center  border-t-[1px] border-[#EEE] pt-6 mt-8">
                        <div onClick={() => setOpenAbout(false)}
                            className='text-main text-p underline !cursor-pointer'>
                            Close
                        </div>
                        <Button type='submit' onClick={
                            () => setOpenAbout(false)
                        } className="text-white">Save</Button>
                    </div>
                </Form>
            </CustomModal>

        </div>
    );
};

export default AboutUs;