"use client";
import React, {useState} from "react";
import {MdPhonelink} from "react-icons/md";
import IdentityVerification from "./verification/identity";
import {useUser} from "../../../contexts/user";
import AccountVerification from "./verification/account";
import {useFetch} from "../../../helpers/hooks";
import {fetchBookings} from "../../../helpers/backend";
import Link from "next/link";

const Page = () => {
    const {user} = useUser()

    const [bookings, getBookings] = useFetch(fetchBookings, {
        for: 'owner'
    })

    const [tab, setTab] = useState('checking_out')
    const tabs = [
        {
            label: 'Checking Out',
            value: 'checking_out'
        },
        {
            label: 'Currently Hosting',
            value: 'currently_hosting'
        },
        {
            label: 'Arriving Soon',
            value: 'arriving_soon'
        },
        {
            label: 'Upcoming',
            value: 'upcoming'
        },
        {
            label: 'Pending review',
            value: 'pending_review'
        }
    ]


    return (
        <div className="max-w-7xl mx-auto py-14">
            <p className="text-3xl font-medium mb-6">Welcome Back, {user?.name}</p>
            <div className="pb-4 flex flex-col gap-4">
                <IdentityVerification/>
                <AccountVerification/>
            </div>

            <div className="flex justify-between">
                <p className="text-xl font-medium">My Reservations</p>
                <Link href={'/host/reservations'} className="underline text-p text-black">
                    All Reservations ({bookings?.docs?.length})
                </Link>
            </div>
            <div className="py-6">
                <div className="flex gap-4 items-center">
                    {tabs?.map((data, index) => (
                        <Tab
                            key={index}
                            label={data.label}
                            onClick={() => setTab(data.value)}
                            active={data.value === tab}
                            value={0}
                        />
                    ))}
                </div>
            </div>
            <div className="bg-gray-100 py-24 flex justify-center items-center rounded">
                <div className="w-52 text-center">
                    <MdPhonelink
                        size={32}
                        className="inline-block mb-2"/>
                    <p className="text-gray-700"> You don’t have any guests checking out today or tomorrow.</p>
                </div>
            </div>
        </div>
    )
}

export default Page;


const Tab = ({label, value, onClick, active}) => {
    return (
        <div
            role="button"
            onClick={onClick}
            className={`rounded-full px-2.5 py-1.5 ${active ? 'border-gray-900 border-2' : 'border border-gray-400'}`}>
            <p className="text-main text-sm font-medium">{label} ({value})</p>
        </div>
    )
}



