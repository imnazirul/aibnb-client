"use client"
import { useFetch } from "../../../helpers/hooks";
import { fetchBookings } from "../../../helpers/backend";
import Button from "../../../components/common/button";
import Image from "next/image";
import dayjs from "dayjs";
import { toAssetUrl } from "../../../helpers/utils";

const Bookings = () => {
    const [data, getData] = useFetch(fetchBookings)
    console.log(data)

    return (
        <div className="container mt-12 mb-6">
            <h1 className="text-main text-xlRegular mb-6">Bookings</h1>
            {
                (data && data?.docs?.length > 0) ?
                    <div className="flex md:flex-row flex-col gap-10">
                        <div className="flex flex-col gap-8">
                            {
                                data?.docs?.map((booking, index) => (
                                    <div key={index} className="basis-2/3">
                                        <BookingCard booking={booking} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="basis-1/3">
                            <h2>Explore things to do near, Bangladesh</h2>
                            <div className="mt-2">
                                <div className="grid lg:grid-cols-2 grid-cols-1">
                                    {
                                        [1, 2, 3, 4, 5, 6].map((_, index) => (
                                            <div key={index} className="flex gap-x-2 mb-3">
                                                <Image className="rounded-lg h-[60px] " src={'/106.jpg'} alt="profile" height={60} width={60} />
                                                <div className="flex flex-col justify-center">
                                                    <h1 className='text-p'>Art And Culture</h1>
                                                    <p className='text-s'>114 experiences</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div> : <div className="border-t border-b py-8">
                        <h4 className="text-main text-title_sss">No trips booked...yet!</h4>
                        <p className="text-p3">Time to dust off your bags and start planning your next adventure.</p>
                        <Button href="/" className="text-black bg-white border !py-2.5 rounded-lg border-black hover:bg-gray-100 mt-4">Start searching</Button>
                    </div>
            }
            <p className='text-p2 py-6'>Can’t find your reservation here? <span className='inline-block underline text-p cursor-pointer'>Visit the Help Center</span></p>

        </div>
    )
}

export default Bookings


const BookingCard = ({ booking }) => {
    return (
        <div className="rounded-lg">
            <div className="grid md:grid-cols-2 ">
                <div className="p-5 flex justify-center flex-col border">
                    <div className="h-full flex justify-center flex-col pb-3 md:pb-0">
                        <h1 className='text-xlMedium'>{booking?.property?.title}</h1>
                        <p className='text-s'>Entire rental unit hosted by {booking?.user?.name}</p>
                    </div>
                    <div className="w-full border-t text-p5 h-[calc(100%-20px)] flex items-center pt-5">
                        <div className="h-full border-r flex items-center pr-2.5">
                            {`${dayjs(booking?.start_date).format('MMM DD')} - ${dayjs(booking?.end_date).format('DD YYYY')}`}
                        </div>
                        <p className='pl-2.5 text-wrap'>{booking?.property?.location?.name}</p>
                    </div>
                </div>
                <div className="relative">
                    <p className="absolute top-5 left-5 rounded-md text-ssb bg-white px-3 py-1">{booking?.status}</p>
                    <Image className="h-48 md:h-64 md:w-[500px] w-full rounded-b-lg md:rounded-l-none md:rounded-r-lg object-cover" src={toAssetUrl(booking?.property?.images[0])} alt="profile" height={500} width={500} />
                </div>
            </div>
        </div>
    );
}