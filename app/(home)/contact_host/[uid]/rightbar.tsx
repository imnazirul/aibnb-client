import React, { useRef } from 'react';
import dayjs from "dayjs";
import { Tooltip } from 'antd';
import SearchCounter from '../../../../components/home/search/search-counter';;
import Image from 'next/image';



interface RightProps {
    search?: any;
    setSearch?: (search: any) => void;
    tab?: string;
    setTab?: (tab: string) => void;
    guests?: number;
}

const RightBar = ({ search, setSearch, tab, setTab, guests }: RightProps) => {
    const ref = useRef()
    const data = {

        prices: [
            { id: 1, date: '9/22/2024', price: 38 },
            { id: 2, date: '9/23/2024', price: 38 },
            { id: 3, date: '9/24/2024', price: 38 },
        ],
        perNight: 38,
        nights: 3,
        totalBasePrice: 115,
        cleaningFee: 14,
        serviceFee: 14,
        totalBeforeTaxes: 96,
        cleaningDetails: "One-time fee charged by host to cover the cost of cleaning their space.",
        serviceDetails: "This helps us run our platform and offer services like 24/7 support on your trip.",
    }
    
    return (
        <>
            <div className="w-full md:w-[370px] mt-8 md:mt-0">
                <div className="md:sticky md:top-20">
                    <div className="p-5 bg-white shadow-lg rounded-xl border">
                        <div className='flex w-full justify-between'>
                            <div className='flex flex-col gap-1'>
                                <h2 className="text-pt">$82 <span className="text-p3 text-main">night</span></h2>
                                <p className='text-xs'>YOUR HOME IN ROME</p>
                                <p className='text-xxs'>Private room</p>
                            </div>
                            <Image src={'/man.jpg'} width={500} height={300} alt='img' className='w-[100px] h-[100px] rounded-[10px] ' />
                        </div>
                        <div className="border border-gray-300 rounded-lg mb-4 mt-7">
                            <div className="flex relative">
                                <div
                                    className="w-1/2 p-2 border-r border-b border-gray-300 cursor-pointer"
                                    onClick={() => setTab(tab === 'from' ? null : 'from')}
                                >
                                    <div className="text-xxs font-semibold uppercase">CHECK-IN</div>
                                    <div>
                                        {search?.from ? dayjs(search.from).format('Do, MMM') : 'Add dates'}
                                    </div>
                                </div>
                                <div
                                    className="w-1/2 p-2 border-b border-gray-300 cursor-pointer"
                                    onClick={() => setTab(tab === 'to' ? null : 'to')}
                                >
                                    <div className="text-xxs font-semibold uppercase">CHECKOUT</div>
                                    <div>
                                        {search?.to ? dayjs(search.to).format('Do, MMM') : 'Add dates'}
                                    </div>
                                </div>

                            </div>
                            <div className="p-2 relative" ref={ref}>
                                <div className="text-xxs font-semibold uppercase">GUESTS</div>
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => setTab(tab === 'guest' ? null : 'guest')}
                                >
                                    <div>
                                        {guests > 0 && (
                                            <>
                                                {guests} guests
                                                {search.infants > 0 && `, ${search.infants} infants`}
                                                {search.pets > 0 && `, ${search.pets} pets`}
                                            </>
                                        )}
                                        {guests === 0 && 'Add guests'}
                                    </div>
                                </div>
                                <GuestTab
                                    show={tab === 'guest'}
                                    search={search}
                                    setSearch={setSearch}
                                    setTab={setTab}
                                />
                            </div>
                        </div>

                        <button className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold mb-4 hover:bg-pink-700 transition duration-200">
                            Reserve
                        </button>

                        <p className="text-center text-gray-500 mb-4">You won't be charged yet</p>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Tooltip color={'white'} arrow={false} placement="bottomRight" trigger={['click']} title={<PriceBreakdown data={data} />}>
                                    <span className="underline cursor-pointer">${data?.perNight} x {data?.nights} night</span>
                                </Tooltip>
                                <span>$115</span>
                            </div>
                            <div className="flex justify-between">
                                <Tooltip color={'white'} arrow={false} placement="bottomRight" trigger={['click']} title={<DetailTooltip data={data?.cleaningDetails} />}>
                                    <span className="underline cursor-pointer">Cleaning fee</span>
                                </Tooltip>
                                <span>${data?.cleaningFee}</span>
                            </div>
                            <div className="flex justify-between">
                                <Tooltip color={'white'} arrow={false} placement="bottomRight" trigger={['click']} title={<DetailTooltip data={data?.serviceDetails} />}>
                                    <span className="underline cursor-pointer">Airbnb service fee</span>
                                </Tooltip>
                                <span>${data?.serviceFee}</span>
                            </div>
                            <div className="flex justify-between pt-4 border-t border-gray-300 font-bold">
                                <span>Total before taxes</span>
                                <span>${data?.totalBeforeTaxes}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default RightBar;



const GuestTab = ({
    show, search, setSearch, setTab
}) => {
    return (
        <div
            style={{ zIndex: 9999999 }}
            className={`absolute top-14 left-0 right-0 p-4 bg-white shadow-md border rounded-2xl ${show ? 'block' : 'hidden'}`}>
            <div>
                <div className="flex gap-8 py-4 border-b border-gray-200 border-opacity-70">
                    <div className="flex-grow">
                        <h2 className="font-medium">Adults</h2>
                        <p className="text-sm leading-4 text-secondaryText">
                            Ages 13 or above
                        </p>
                    </div>
                    <SearchCounter
                        value={search?.adults}
                        maxValue={16}
                        onIncrease={() =>
                            setSearch({
                                ...search,
                                adults: search.adults + 1
                            })
                        }
                        onDecrease={() =>
                            setSearch({
                                ...search,
                                adults: search.adults - 1
                            })
                        }
                    />
                </div>
            </div>
            <div>
                <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                    <div className="flex-grow">
                        <h2 className="font-medium">Children</h2>
                        <p className="text-sm leading-4 text-secondaryText">Ages 2-12</p>
                    </div>
                    <SearchCounter
                        value={search?.children}
                        maxValue={5}
                        onIncrease={() =>
                            setSearch({
                                ...search,
                                children: search?.children + 1
                            })
                        }
                        onDecrease={() =>
                            setSearch({
                                ...search,
                                children: search.children - 1
                            })
                        }
                    />
                </div>
            </div>
            <div>
                <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                    <div className="flex-grow">
                        <h2 className="font-medium">Infants</h2>
                        <p className="text-sm leading-4 text-secondaryText">Under 2</p>
                    </div>
                    <SearchCounter
                        value={search?.infants}
                        maxValue={5}
                        onIncrease={() =>
                            setSearch({
                                ...search,
                                infants: search.infants + 1
                            })
                        }
                        onDecrease={() =>
                            setSearch({
                                ...search,
                                infants: search.infants - 1
                            })
                        }
                    />
                </div>
            </div>
            <div>
                <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                    <div className="flex-grow">
                        <h2 className="font-medium">Pets</h2>
                        <p className="text-sm text-black underline leading-4 cursor-pointer">Bringing a service animal?</p>
                    </div>
                    <SearchCounter
                        value={search?.pets}
                        maxValue={2}
                        onIncrease={() =>
                            setSearch({
                                ...search,
                                pets: search.pets + 1
                            })
                        }
                        onDecrease={() =>
                            setSearch({
                                ...search,
                                pets: search.pets - 1
                            })
                        }
                    />
                </div>
            </div>

            <div className='mt-4'>
                <span className='text-xxs text-wrap !leading-[0] pt-4'>This place has a maximum of 2 guests, not including infants. Pets aren't allowed.</span>
            </div>

            <button type='button' className="flex justify-end mt-3" onClick={() => setTab('')}>
                <span className='underline text-p'>Close</span>
            </button>
        </div>
    )
}


const PriceBreakdown = ({ data }) => {
    return (
        <div className='w-[280px] bg-white border rounded-md py-5 shadow-2xl'>
            <div className='border-b pb-4'>
                <h2 className="text-p text-center">Base Price Breakdown</h2>
            </div>
            <div className='px-5'>
                <div className="space-y-2 mt-2 text-p3">
                    {
                        data?.prices?.map((item) => (
                            <div key={item.id} className="flex justify-between">
                                <span>{item.date}</span>
                                <span>${item.price}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between text-p1">
                    <span>Total Base Price</span>
                    <span>${data?.totalBasePrice}</span>
                </div>
            </div>
        </div>
    )
}


const DetailTooltip = ({ data }) => {
    return (
        <div className='md:w-[400px] w-[320px] bg-white border rounded-md p-5 shadow-2xl'>
            <h2 className="text-p2 text-secondaryText text-wrap">{data}</h2>
        </div>
    )
}