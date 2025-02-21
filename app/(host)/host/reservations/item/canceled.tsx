import Image from 'next/image';
import React from 'react';
import { toAssetUrl } from '../../../../../helpers/utils';

const Canceled = ({ bookings }) => {
    const canceledBookings = bookings?.docs?.filter(data => data?.status === 'rejected') || [];

    return (
        <div>
            {
                canceledBookings.length === 0 ? (
                    <div className='w-full my-[128px] mx-auto flex flex-col justify-center items-center'>
                        <h4 className='text-h4 font-semibold'>No results found</h4>
                        <p className='text-p'>Please try a different filter.</p>
                    </div>
                ) : (
                    <table className="w-full text-left mt-2 mb-6">
                        <thead>
                            <tr className="text-sm font-medium text-gray-700">
                                <th className="py-3">Listing</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {canceledBookings.map((data, index) => (
                                <tr key={index} className="text-sm text-gray-500 font-medium hover:bg-gray-50 cursor-pointer">
                                    <td className="py-2 flex gap-6 items-center">
                                        <Image
                                            height={700}
                                            width={700}
                                            src={toAssetUrl(data?.property?.images[0])}
                                            className="h-16 w-20 object-cover mb-2 rounded-md"
                                            alt=""
                                        />
                                        <p>{data?.property?.title}</p>
                                    </td>
                                    <td>
                                        {data?.property?.location?.name}
                                    </td>
                                    <td className="capitalize">
                                        {data?.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
    );
};

export default Canceled;