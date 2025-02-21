import React from 'react';
import Icon from '../../../../../components/common/icon';
import { useAction } from '../../../../../helpers/hooks';
import { patchProperty } from '../../../../../helpers/backend';

const MoreDiscount = ({ onBack, setTab, form, data, onReload }) => {
    return (
        <div>
            <div onClick={() => onBack()} className="w-[41px] h-[41px] rounded-full flex items-center justify-center cursor-pointer bg-[#F7F7F7] mt-2">
                <Icon name={"arrow-left2"} />
            </div>
            <h1 className="text-cs mt-6">Early bird discounts</h1>
            <p className='mt-2 text-xs text-secondaryText'>Attract early bookings by offering discounts when guests book far in advance.</p>
            {
                (data?.discounts?.early?.discount > 0 && data?.discounts?.early?.months > 0) &&
                <div className="border border-webBorder p-4 rounded-lg my-5">
                    <div className={`flex flex-col items-start justify-between`}>
                        <h1 className={`text-sb text-main`}>{data?.discounts?.early?.discount}% off</h1>
                        <h1 className='text-p4 text-secondaryText'>For guests who book {data?.discounts?.early?.months} month before arrival</h1>
                    </div>
                    <h1 onClick={(e) => {
                        e.stopPropagation()
                        return useAction(patchProperty, { uid: data.uid, discounts: { early: { months: 0, discount: 0 } } }, () => {
                            onReload();
                            onBack();
                        })
                    }} className='text-sb underline cursor-pointer mt-1.5'>Remove</h1>
                </div>
            }
            {
                (!data?.discounts?.early?.discount && !data?.discounts?.early?.months) &&
                <button
                    onClick={() => {
                        setTab('early_discount');
                        form.setFieldsValue({ discounts: { early: { months: 0, discount: 0 } } })
                    }}
                    type='button' className="w-full text-black border border-black font-semibold p-2.5 rounded-md mt-5">Add a discount</button>

            }


            <h1 className="text-cs mt-10">Last-minute discounts</h1>
            <p className='mt-2 text-xs text-secondaryText'>Fill your calendar by offering discounts when guests book close to their arrival date.</p>
            
            {
                data?.discounts?.lasts?.length > 0 && data?.discounts?.lasts?.map((item, index) => {
                    return (
                        <div key={index} className="border border-webBorder p-4 rounded-lg my-5">
                            <div className={`flex flex-col items-start justify-between`}>
                                <h1 className={`text-sb text-main`}>{item.discount}% off</h1>
                                <h1 className='text-p4 text-secondaryText'>For stays booked 0 - {item.days} days before arrival</h1>
                            </div>
                            <h1 onClick={(e) => {
                                e.stopPropagation()
                                const updatedLasts = data.discounts.lasts.filter((_, i) => i !== index);
                                return useAction(patchProperty, { uid: data.uid, discounts: { lasts: updatedLasts } }, () => {
                                    onReload();
                                    onBack();
                                })
                            }} className='text-sb underline cursor-pointer mt-1.5'>Remove</h1>
                        </div>
                    )
                })
            }

            {
                data?.discounts?.lasts?.length ?
                <button
                    onClick={() => {
                        setTab('last_discount');
                        form.setFieldsValue({  uid: data.uid, discounts: { lasts: [{ days: 0, discount: 0 }] } })
                    }}
                    type='button' className="w-full text-black border border-black font-semibold p-2.5 rounded-md mt-5">Add another</button>
                :
                <button
                    onClick={() => {
                        setTab('last_discount');
                        form.setFieldsValue({ discounts: { lasts: [{ days: 0, discount: 0 }] } })
                    }}
                    type='button' className="w-full text-black border border-black font-semibold p-2.5 rounded-md mt-5">Add a discount</button>
            }

        </div >
    );
};

export default MoreDiscount;