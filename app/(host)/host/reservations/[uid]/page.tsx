import Image from 'next/image';
import React from 'react';
import { toAssetUrl } from '../../../../../helpers/utils';
import Earnings from './earnings';
import Icon from '../../../../../components/common/icon';
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaFlagUsa, FaHome } from "react-icons/fa";


const page = ({ params }) => {

    const commonQuestions = [
        {
            question: "Decline a trip request",
            answer: "You can always decline any inquiries or requests that you can’t accommodate, but you should do so within 24 hours."
        },
        {
            question: "Respond to an inquiry",
            answer: "Respond within 24 hours. Guests who send an inquiry are usually searching for more information before sending a reservation request."
        },
        {
            question: "Why are hosts asked to respond within 24 hours?",
            answer: "Quick responses to reservation requests, booking inquiries, and other messages build trust in our hosting community."
        },
    ]

    return (
        <div className="max-w-7xl px-5 md:px-8 xl:px-0 mx-auto py-14">
            <div className="flex justify-between items-center">
                <p className="text-3xl font-medium mb-6">
                    Reservations details {params?.uid}
                </p>
                <button className="text-black border border-black px-4 py-1.5 rounded-md">
                    Print
                </button>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-x-6 flex-container">
                <div className="flex-1">
                    {/* Content section */}
                    <UserInfo data={{ user: { name: "John Doe" } }} />
                    <UserSaid data={{ user: { name: "John Doe" } }} />
                    <AboutUser data={{ user: { name: "John Doe" } }} />

                    <div className="border-b py-7">
                        <h1 className="text-pt">aircover</h1>
                        <p>for Hosts</p>
                        <p className="text-p2 py-5">
                            Top-to-bottom protection, included every time you host.
                        </p>
                        <p className="underline text-p cursor-pointer">Learn more</p>
                    </div>

                    <div className="border-b py-7">
                        <h1 className="text-pt">Support</h1>
                        <div className="flex justify-between items-center mt-5">
                            <div className="flex items-center gap-2">
                                <FaFlagUsa className="w-5 h-5" />
                                <h1>Report this guest</h1>
                            </div>
                            <Icon name="right-arrow" />
                        </div>
                    </div>

                    <h1 className="text-pt mt-7">Common questions</h1>
                    <div>
                        {
                            commonQuestions.map((item, index) => <CommonQuestions key={index} data={item}></CommonQuestions>)
                        }
                    </div>
                    <h1 className="text-p underline mt-7 cursor-pointer">Show more topics</h1>
                </div>

                <div className="sticky self-start top-5 flex w-full md:w-fit mt-12 lg:mt-0">
                    <Earnings />
                </div>
            </div>
        </div>
    );
};

export default page;



const UserInfo = ({ data }) => {
    return (
        <div className="flex items-start justify-between py-7 border-t border-b ">
            <div className="ml-3">
                <span className='text-s'>Inquiry</span>
                <p className="font-semibold">{data?.user?.name} asked about a trip</p>
                <p className="text-sm text-gray-500">Reservations</p>
                <p className="text-xs text-gray-500">Aug 31 – Sep 1 (1 night)</p>
                <p className="text-xs text-gray-500">2 guests · $38.80</p>
            </div>
            <div className="flex items-center justify-center text-white">
                {data?.image ? (
                    <Image src={toAssetUrl(data?.image)} alt="profile" width={40} height={40} objectFit="cover" className='w-10 h-10 rounded-full' />
                ) : (
                    <span className='font-bold text-p w-10 h-10 flex justify-center items-center bg-black rounded-full'>{data?.user?.name ? data?.user?.name[0] : 'T'}</span>
                )}
            </div>
        </div>
    )
}


const CommonQuestions = ({ data }) => {
    return (
        <div className="border-b py-7">
            <p className="text-p">{data?.question}</p>
            <p className="text-p2 py-4">{data?.answer}</p>
            <p className="underline text-p cursor-pointer">Read more</p>
        </div>
    )
}
const UserSaid = ({ data }) => {
    return (
        <div className="flex items-center gap-8 py-7 border-t border-b ">
            <div className="ml-3">
                <p className="font-semibold">{data?.user?.name} said:</p>
                <p className="text-sm text-gray-500">14 hours ago</p>
                <p className="text-xs text-gray-500">Can i check in in the morning?</p>
            </div>
        </div>
    )
}

const AboutUser = ({ data }) => {
    return (
        <>
            <div className="py-7 border-t border-b ">
                <p className="text-pt font-medium mb-6">About {data?.user?.name}</p>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Icon name="star-primary" />
                        <span className="text-p2">5.0 rating from 2 reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdOutlineVerifiedUser className='w-5 h-5' />
                        <span className="text-p2">Identify Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaHome className='w-5 h-5' />
                        <span className="text-p2">5.0 rating from 2 reviews</span>
                    </div>
                </div>
                <p className='text-p underline mt-7 cursor-pointer'>Show profile</p>
            </div>
            <div className="py-7 border-b">
                <h1 className='text-p mb-4'>Most recent review</h1>
                <p className='text-p2'>Great to host. Very independent, and most importantly, respected the place and left it
                    clean. Would recommend to any host.
                </p>
            </div>
        </>
    )
}