import React from 'react';
import Icon from '../../../../../components/common/icon';
import { useAction } from '../../../../../helpers/hooks';
import { patchProperty } from '../../../../../helpers/backend';

const Promotion = ({ onBack, data, onReload }) => {
    return (
        <div>
            <div onClick={() => onBack()} className="w-[41px] h-[41px] rounded-full flex items-center justify-center cursor-pointer bg-[#F7F7F7] mt-2">
                <Icon name={"arrow-left2"} />
            </div>
            <h1 className="text-cs text-center mt-6">New listing promotion</h1>
            <div className='flex flex-col justify-center items-center my-4'>
                <h1 className='text-xxlRegular text-black'>20% off</h1>
                <span className='text-p2 text-secondaryText'>For next 3 bookings</span>
            </div>
            <span className='text-ssb text-secondaryText'>
                Need a jumpstart? Use this promotion to grab guests’ attention and get your first bookings.
            </span>
            <div className='rounded-lg bg-[#F7F7F7] p-5 mt-4'>
                <span className='text-sb text-black'>What you get</span>
                <ul className='list-disc list-inside my-2'>
                    <li className='text-asb'>20% off for the next 3 bookings</li>
                    <li className='text-ssb'>Promotion badge on your listing</li>
                    <li className='text-ssb'>Higher visibility in search results</li>
                </ul>
            </div>
            {
                data?.promotions?.new === true ?
                    <button className='w-full bg-black text-white font-semibold p-2.5 rounded-md mt-8'
                        onClick={(e) => {
                            e.stopPropagation()
                            return useAction(patchProperty, { uid: data.uid, promotions: { new: false } }, () => {
                                onReload();
                                onBack();
                            })
                        }}
                    >Remove promotion</button>

                    :
                    <button type='button' className='w-full bg-black text-white font-semibold p-2.5 rounded-md mt-8'
                        onClick={(e) => {
                            e.stopPropagation()
                            return useAction(patchProperty, { uid: data.uid, promotions: { new: true } }, () => {
                                onReload();
                                onBack();
                            }, false)
                        }}
                    >Apply promotion</button>

            }
        </div>
    );
};

export default Promotion;