'use client'

import React, { useState } from 'react'
import { FaCheck, FaStar } from 'react-icons/fa'
import Button from '../../../components/common/button'
import Icon from '../../../components/common/icon'
import Link from 'next/link'
import { MdVerifiedUser } from 'react-icons/md'
import Image from 'next/image'
import { Modal } from 'antd'
import { useUser } from '../../../contexts/user'
import { interest, toAssetUrl } from '../../../helpers/utils'
import { RiGraduationCapLine } from 'react-icons/ri'
import { TiGlobeOutline } from 'react-icons/ti'
import { IoLanguage } from 'react-icons/io5'

const Page = () => {
    const { user, getUser } = useUser();
    const [open, setOpen] = useState(false);
    const [verify, setVerify] = useState(false);

    const items = [
        {
            icon: <RiGraduationCapLine size={24} className="text-[#4b4e53]" />,
            title: 'Where I went to school: school'
        },
        {
            icon: <IoLanguage size={24} className="text-[#4b4e53]" />,
            title: 'Speaks Afrikaans, English, and Albanian'
        },
        {
            icon: <TiGlobeOutline size={24} className="text-[#4b4e53]" />,
            title: 'Lives in Dhaka, Bangladesh'
        }
    ]

    return (
        <div className="p-6 md:p-0 w-full max-w-[1220px] mx-auto md:flex gap-8 lg:gap-16 mt-[40px] mb-[80px]">
            <div className="w-full md:w-[400px] text-main md:sticky md:self-start md:z-20 md:top-28">
                <div className={`w-full flex items-center justify-between rounded-3xl shadows drop-shadow-xl p-8`}>
                    <div className="flex flex-col justify-center items-center pl-4">
                        <div onClick={() => setOpen(!open)} className="relative cursor-pointer">
                            <img
                                src="/profile.png"
                                height={200}
                                width={200}
                                alt="profile"
                                className="h-[120px] w-[120px] rounded-full"
                            />
                            <MdVerifiedUser className='absolute bottom-2 -right-2 text-4xl rounded-full text-white bg-red-600 p-[6px]' />
                        </div>
                        <h1 className="text-xlSemiBold text-center text-wrap mt-3">{user?.name}</h1>
                        <h1>Host</h1>
                    </div>
                    <div className="">
                        <p className='text-p'>1</p>
                        <span className="text-s">Month hosting</span>
                    </div>
                </div>
                <div className="mt-6 border-[1px] border-webBorder rounded-3xl p-6">
                    <h2 className="text-pt">
                        {user?.name}'s confirmed information
                    </h2>
                    {
                        !verify ? <>
                            <p className="text-p2 flex items-center gap-3 mt-6">
                                <FaCheck />
                                Identity
                            </p>
                            <p className="text-p2 flex items-center gap-3 mt-6">
                                <FaCheck />
                                Phone number
                            </p>
                            <p className='underline text-p2 cursor-pointer mt-6'>Learn about identity verification</p>
                        </> : <>
                            <p className="text-p2 flex items-center gap-3 mt-6">
                                <FaCheck />
                                Phone number
                            </p>
                            <div className="h-[1px] w-full bg-webBorder mt-[34px] mb-[30px]"></div>
                            <h2 className="text-pt">
                                Verify your identity
                            </h2>
                            <p className="text-p2 mt-6 mb-[26px]">
                                Before you book or host on Appstick, you’ll need to complete this
                                step.
                            </p>
                            <Button onClick={() => setVerify(!verify)} className="bg-transparent border-black border-[1px] !py-[11px] text-sb">Get Verified</Button>
                        </>
                    }

                </div>
            </div>
            <div className="w-full md:w-[calc(100%-400px)] mt-12 md:mt-0">
                <h1 className="text-xlSemiBold">About {user?.name}</h1>
                <Button href='/edit-profile' className='bg-transparent mt-6 border-black border-[1px] text-sb rounded-md !px-[16px] !py-[6px]'>Edit Profile</Button>
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 border-b-[1px] border-webBorder pb-10">
                    {
                        items.map((item, index) => <div key={index} className='flex items-center gap-3'>
                            {item?.icon}
                            <h1>{item?.title}</h1>
                        </div>)
                    }
                </div>
                <div className="py-10 border-b-[1px] border-webBorder">
                    <h1 className='text-title_m'>Ask {user?.name} about</h1>
                    <div className="flex items-center flex-wrap gap-3 mt-6">
                        {
                            interest.map((item, index) => <div key={index} className='flex items-center flex-wrap gap-2 border border-webBorder px-3 md:px-4 py-3 rounded-full text-s md:text-p3'>
                                <Icon name={item?.icon} />
                                <h1>{item?.label}</h1>
                            </div>)
                        }
                    </div>
                </div>
                <div className="py-10 border-b-[1px] border-webBorder">
                    <h1 className='text-title_m'>{user?.name} listings</h1>
                    <div className="flex items-center md:flex-wrap overflow-y-scroll md:overflow-auto gap-3 mt-6 no-scroll-bar">
                        {
                            user?.properties?.map((item, index) => <ListCard key={index} item={item} />)
                        }
                    </div>
                </div>
                <div className="py-10">
                    <h1 className='text-title_m'>{user?.name}'s Guidebooks</h1>
                    <div className="flex items-center md:flex-wrap overflow-y-scroll md:overflow-auto gap-3 mt-6  no-scroll-bar">
                        <div className="bg-yellow-200 w-[200px] h-[200px] rounded-lg flex items-end">
                            <h1 className='p-3'>{user?.name}'s Guidebooks</h1>
                        </div>
                    </div>
                </div>
            </div>
            <Modal className='profile-image' open={open} title={<h1 className='text-center pt-5 pb-2'>{user?.name}</h1>} onCancel={() => setOpen(false)} footer={null} centered>
                <div className="border-t-[1px] border-webBorder py-12">
                    <Image src="/profile.png" className='mx-auto w-[300px] h-[300px] rounded-lg' alt="image" width={500} height={500} />
                </div>
            </Modal>
        </div>
    )
}

export default Page

const ListCard = ({ item }) => <Link href={`/property/${item?.uid}`} className='w-[200px]'>
    {item?.images.length > 0 ? <Image alt="image" width={500} height={500} className='w-[200px] h-[200px] rounded-lg' src={toAssetUrl(item?.images[0])} /> : null}
    <div className="flex items-start mt-3 justify-between w-[200px]">
        <div>
            <p className="font-medium">{item?.title?.slice(0, 12) ? `${item?.title?.slice(0, 12)}...` : item?.title}</p>
            <p className="text-gray-700 truncate">USA</p>
        </div>
        <div className="flex items-center gap-1">
            <FaStar size={12} />
            <h1>New</h1>
        </div>
    </div>
</Link>