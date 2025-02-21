import React from 'react';
import Icon from '../../../../../components/common/icon';
import dayjs from "dayjs";
import { useAction } from '../../../../../helpers/hooks';
import { patchProperty } from '../../../../../helpers/backend';

const CustomTrip = ({ onBack, setTab, form, data, onReload }) => {
    return (
        <div>
            <div onClick={() => onBack()} className="w-[41px] h-[41px] rounded-full flex items-center justify-center cursor-pointer bg-[#F7F7F7] mt-2">
                <Icon name={"arrow-left2"} />
            </div>
            <div className='my-6'>
                <h1 className="text-h4">Custom trip lengths</h1>
                <span className='text-secondaryText text-p2'>
                    Set a minimum stay for specific dates.
                </span>
            </div>
            {
                data?.availability?.custom_length?.from &&
                <>
                    <div className='border rounded-lg p-4'>
                        <p className="font-medium text-gray-700">Dates</p>
                        <div className="flex text-p font-semibold text-gray-700">
                            <p className="font-semibold underline">{`${dayjs(data?.availability?.custom_length?.from)?.format('MMM DD')} - ${dayjs(data?.availability?.custom_length?.to)?.format('MMM DD')}`}</p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                return useAction(patchProperty, {
                                    uid: data.uid,
                                    availability: { custom_length: { from: null, to: null } }
                                }, () => {
                                    onReload()
                                })
                            }}
                            type='button' className="text-black font-semibold underline mt-5">Remove</button>
                    </div>

                </>
            }

            {
                !data?.availability?.custom_length?.from &&
                <button
                    onClick={() => {
                        setTab('custom_trip_length');
                        form.setFieldsValue({ discounts: { lasts: [{ days: 0, discount: 0 }] } })
                    }}
                    type='button' className="w-full text-black border border-black font-semibold p-2.5 rounded-md mt-5">Add a custom trip length</button>
            }

        </div>
    );
};

export default CustomTrip;

