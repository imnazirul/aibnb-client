import React from 'react';
import Icon from '../common/icon';

const FeesSection = ({ setType, setAdditionalFee, data }) => {
    return (
        <div className="w-full">
            <div onClick={() => setType({})} className="mt-2 w-[41px] h-[41px] rounded-full flex items-center justify-center bg-[#F7F7F7] cursor-pointer">
                <Icon name={"arrow-left2"} />
            </div>

            <h1 className="text-cs mt-6">Cleaning fee</h1>
            <div className="bg-white border border-webBorder rounded-sm p-4 mt-2">
                <div className={`flex items-start justify-between`}>
                    <div className="">
                        <h1 className={`text-title_md `}>${data?.cleaning}</h1>
                        <h1 className='text-xxs text-secondaryText my-1'>Amount pet stay</h1>
                    </div>
                    <h1 onClick={() => { setAdditionalFee('cleaning'); setType({}) }} className='text-p underline text-primary cursor-pointer'>Add</h1>
                </div>
            </div>

            <h1 className="text-cs mt-6">Pet fee</h1>
            <div className="bg-white border border-webBorder rounded-sm p-4 mt-2">
                <div className={`flex items-start justify-between`}>
                    <div className="">
                        <h1 className={`text-title_md `}>${data?.pet}</h1>
                        <h1 className='text-xxs text-secondaryText my-1'>Amount pet stay</h1>
                    </div>
                    <h1 onClick={() => { setAdditionalFee('pet'); setType({}) }} className='text-p underline text-primary cursor-pointer'>Add</h1>
                </div>
            </div>

            <h1 className="text-cs mt-6">Extra guest fee</h1>
            <div className="bg-white border border-webBorder rounded-sm p-4 mt-1">
                <div className={`flex items-start justify-between`}>
                    <div className="">
                        <h1 className={`text-title_md `}>${data?.guest_fee}</h1>
                        <h1 className='text-xxs text-secondaryText my-1'>After 1 guest, per night</h1>
                    </div>
                    <h1 onClick={() => { setAdditionalFee('guest_fee'); setType({}) }} className='text-p underline text-primary cursor-pointer'>Add</h1>
                </div>
            </div>
        </div>
    );
};

export default FeesSection;