import React from 'react';
import { formatPrice } from '../../../../../helpers/property';

const Earnings = () => {
    return (
        <div className="w-full md:w-[470px] mt-8 md:mt-0">
            <div className="p-5 bg-white shadow-xl rounded-xl border-2">
                <div className="border border-gray-300 rounded-lg mb-4">
                    <div className="flex relative">
                        <div
                            className="w-1/2 p-2 border-r border-b border-gray-300"

                        >
                            <div className="text-xxs font-semibold uppercase">CHECK-IN</div>
                            <div>
                                Today
                            </div>
                        </div>
                        <div
                            className="w-1/2 p-2 border-b border-gray-300"

                        >
                            <div className="text-xxs font-semibold uppercase">CHECKOUT</div>
                            <div>
                                Tomorrow
                            </div>
                        </div>

                    </div>
                    <div className="p-2 relative">
                        <div className="flex justify-between items-start">
                            <div className="">
                                <div className="text-xxs font-semibold uppercase">GUESTS</div>
                                <h1>2</h1>
                            </div>

                            <div className="text-xxs font-semibold underline">
                                View
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="text-h4">Potential earnings</h1>
                <div className="space-y-4 mt-4">
                    <div className="flex justify-between">
                        <span>${formatPrice(10)} x {2} nights</span>
                        <span>${formatPrice(20)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Special offer</span>
                        <span>${formatPrice(20)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Service fee (host)</span>
                        <span>${formatPrice(20)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-p">Total (USD)</span>
                        <span>${formatPrice(10)}</span>
                    </div>
                </div>
            </div>
            <button className="w-full bg-white text-black py-3 rounded-lg font-bold mb-4 border border-black transition duration-200 mt-8 hover:bg-black hover:text-white">
                Pre-approve
            </button>

            <div className="grid md:grid-cols-2 md:gap-2.5">
                <button className="w-full bg-white text-black py-3 rounded-lg font-bold mb-4 border border-black transition duration-200 hover:bg-black hover:text-white">
                    Special offer
                </button>
                <button className="w-full bg-white text-black py-3 rounded-lg font-bold mb-4 border border-black transition duration-200 hover:bg-black hover:text-white">
                    Decline
                </button>
            </div>
        </div>
    );
};

export default Earnings;