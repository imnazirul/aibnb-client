import React from 'react';
import Icon from '../common/icon';

const MoreDiscounts = ({ setType, setDiscount, data }) => {
    return (
        <div className="w-full">
            <div onClick={() => setType({})} className="w-[41px] h-[41px] rounded-full flex items-center justify-center cursor-pointer bg-[#F7F7F7] mt-2">
                <Icon name={"arrow-left2"} />
            </div>
            <h1 className="text-cs mt-6">Early bird discounts</h1>
            <p className='mt-2 text-xs text-secondaryText'>Attract early bookings by offering discounts when guests book far in advance.</p>
            {data?.early_birds_discount &&
                <div className="border border-webBorder p-4 rounded-sm mt-5 flex">
                    <div className={`flex flex-col items-start justify-between`}>
                        <h1 className={`text-title_md text-main`}>{data?.early_birds_discount}% off</h1>
                        <h1 className='text-p2 text-secondaryText'>For guests who book 1 month before arrival</h1>
                    </div>
                    <h1 onClick={() => {
                        setType({})
                    }} className='text-p underline text-primary cursor-pointer'>Remove</h1>
                </div>
            }
            <button type='button' onClick={() => {
                setDiscount("early")
                setType({})
            }} className="btn mt-6">Add a discount</button>

            <h1 className="text-cs mt-10">Last-minute discounts</h1>
            <p className='mt-2 text-xs text-secondaryText'>Fill your calendar by offering discounts when guests book close to their arrival date.</p>
            {data?.last_minute_discount &&
                <div className="border border-webBorder p-4 rounded-sm mt-5 flex">
                    <div className={`flex flex-col items-start justify-between`}>
                        <h1 className={`text-title_md text-main`}>{data?.last_minute_discount}% off</h1>
                        <h1 className='text-p2 text-secondaryText'>For guests who book 1 month before arrival</h1>
                    </div>
                    <h1 onClick={() => {
                        setType({})
                    }} className='text-p underline text-primary cursor-pointer'>Remove</h1>
                </div>
            }
            <button type='button' onClick={() => {
                setDiscount("last")
                setType({})
            }} className="btn mt-6">Add a discount</button>
        </div>
    );
};

export default MoreDiscounts;