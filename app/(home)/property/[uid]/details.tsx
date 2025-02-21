'use client'
import React, {useEffect, useState} from 'react';
import Icon from '../../../../components/common/icon';
import DateRangeSelector from '../../components/home/date_range';
import dayjs from "dayjs";
import WhereSleep from './sleep';
import RightBar from './rightbar';
import PlaceOffers from './offers';
import AboutSpace from './about';
import {Rate} from 'antd';
import Image from 'next/image';
import {useRouter, useSearchParams} from "next/navigation";
import {addQueryToUrl} from "../../../../helpers/utils";


const aboutData = [
    { _id: 1, title: 'Self check-in', description: 'Check yourself in with the keypad.', icon: 'check-in' },
    { _id: 2, title: 'Rakan is a Superhost', description: 'Superhosts are experienced, highly rated Hosts.', icon: 'rakan' },
    { _id: 3, title: 'Free cancellation before 4:00 PM on Aug 12', description: 'Get a full refund if you change your mind.', icon: 'calander' }
];

const Details = ({ data }) => {
    const router = useRouter()
    const params = useSearchParams()


    const [tab, setTab] = useState('')
    const [search, setSearch] = useState<any>({
        adults: +params.get('adults') || 1,
        children: +params.get('children') || 0,
        infants: +params.get('infants') || 0,
        pets: +params.get('pets') || 0,
        from: !!params.get('from') ? dayjs(params.get('from'), 'YYYY-MM-DD').toISOString() : null,
        to: !!params.get('to') ? dayjs(params.get('to'), 'YYYY-MM-DD').toISOString() : null,
    })

    useEffect(() => {
        window.history.pushState({}, '', addQueryToUrl({
            from: search.from ? dayjs(search.from).format('YYYY-MM-DD') : null,
            to: search.to ? dayjs(search.to).format('YYYY-MM-DD') : null,
            adults: search.adults,
            children: search.children,
            infants: search.infants,
            pets: search.pets
        }))
    }, [search])

    const numberOfNights = search?.from && search?.to
        ? dayjs(search.to).diff(dayjs(search.from), 'day')
        : null;

    const guests = +search.adults + +search.children

    return (
        <div className="">
            <div className='py-10'>
                <div className="flex flex-col md:flex-row justify-between gap-x-6">
                    <div className="flex-1">
                        <h1 className="text-xl font-bold">{data?.location?.name}</h1>
                        <p className="text-gray-600">{data?.guests} guests · {data?.bedrooms} bedrooms · {data?.bathrooms} bathroom</p>
                        <Favorite />
                        <HostInfo data={data} />
                        <Features />
                        <DateSection search={search} numberOfNights={numberOfNights} setSearch={setSearch} />
                        <AboutSpace data={data} />
                        <WhereSleep data={data} />
                        <PlaceOffers data={data} />
                    </div>

                    <RightBar data={data} search={search} setSearch={setSearch} tab={tab} setTab={setTab} guests={guests} />
                </div>
            </div>
        </div>
    );
};

export default Details;



const Favorite = () => {
    return (
        <div className="flex lg:flex-row flex-col p-4 border rounded-md mt-8">
            <div className="basis-1/4">
                <div className="flex items-center">
                    <span className="text-lg mr-2">🌟</span>
                    <p className="text-sm">Guest favorite</p>
                </div>
            </div>
            <div className="basis-2/4">
                <p className="text-wrap">One of the most loved homes on Airbnb, according to guests</p>
            </div>
            <div className="basis-1/4">
                <div className="flex items-center gap-x-4">
                    <div className="flex flex-col ">
                        <span className="text-xl font-bold mr-1">4.97</span>
                        <Rate disabled value={5} className='text-black text-[10px]' />

                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold mr-1">36</span>
                        <span className="underline">Reviews</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const HostInfo = ({ data }) => {
    return (
        <div className="flex items-center mt-7">

            <Image
                // src={toAssetUrl(data?.owner?.image)}
                src="/profile.png"
                alt={"owner"}
                width={40}
                height={40}
                className={`w-10 h-10 rounded-full`}
            />
            <div className="ml-3">
                <p className="font-semibold">Hosted by {data?.owner?.name}</p>
                <p className="text-sm text-gray-500">Superhost · 7 months hosting</p>
            </div>
        </div>
    )
}

const Features = () => {
    return (
        <>
            <div className='mt-6 border-t-2 border-secondary'>
                <div className="">
                    {aboutData?.map((val) => (
                        <div key={val._id} className="flex items-center gap-x-6 mt-6">
                            <Icon name={val?.icon} />
                            <div>
                                <p className="font-semibold">{val?.title}</p>
                                <p className="text-sm text-gray-500">
                                    {val?.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}


interface DateSectionProps {
    search?: any;
    numberOfNights?: number;
    setSearch?: (search: any) => void;
}

const DateSection = ({ search, numberOfNights, setSearch }: DateSectionProps) => {
    return (
        <>
            <div id="calendar-selector" className='selector-calendar'>
                <div className="mt-10 border-t">
                    <h1 className="text-xl font-bold mt-6">
                        {numberOfNights ? `${numberOfNights} nights in Riyadh` : 'Select check-in/check-out date'}
                    </h1>
                    <p className='text-sm text-secondaryText'>
                        {search?.from && search?.to ?
                            <>
                                {dayjs(search.from).format('MMM DD, YYYY')} - {dayjs(search.to).format('MMM DD, YYYY')}
                            </>
                            :
                            'Add your travel dates for exact pricing'
                        }
                    </p>
                    <div className="mt-5">
                        <DateTab search={search} setSearch={setSearch} />
                    </div>
                </div>
            </div>
        </>
    )
}

const DateTab = ({ search, setSearch }) => {
    return (
        <div
            style={{ zIndex: 9999999 }}
            className={`top-20 p-4 bg-white shadow-md border rounded-2xl`}>

            <DateRangeSelector
                from={search.from}
                to={search.to}
                onChange={({ from, to }) => {
                    setSearch({
                        ...search,
                        from,
                        to
                    })
                }}
            />

        </div>
    )
}
