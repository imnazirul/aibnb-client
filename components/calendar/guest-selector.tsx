import React from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import SearchCounter from '../home/search/search-counter';
import Button from '../common/button';
import { DATA_ACTION_TYPES } from '../../helpers/action-types';


const GuestSelector = ({ priceBreakDownType, setPriceBreakDownType, guests, setGuest }) => {

    const totalGuests = guests.adults + guests.children + guests.infants;

    return (
        <div className='border rounded-[40px] px-4 py-1 bg-secondary'>
            <div onClick={() => setPriceBreakDownType(prevType => (prevType === 'guest' ? '' : 'guest'))} className='flex gap-1.5 items-center relative cursor-pointer'>

                <span>{totalGuests} guest{totalGuests > 1 ? 's' : ''}</span>
                {
                    priceBreakDownType === 'guest' ? (
                        <FaChevronUp className='w-3 h-3' />
                    ) :
                        <FaChevronDown className='w-3 h-3' />
                }
            </div>
            {
                priceBreakDownType === 'guest' && (
                    <div className={`left-14 w-[300px] absolute px-8 py-4 mt-2 !bg-white rounded-lg shadow-around-bold drop-shadow-xl`}>
                        <div>
                            <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                <div className="flex-grow">
                                    <h2 className="text-sb">Adults</h2>
                                    <p className="text-sm leading-4 text-secondaryText">
                                        Ages 13 or above
                                    </p>
                                </div>
                                <SearchCounter
                                    value={guests.adults}
                                    maxValue={16}
                                    onIncrease={() =>
                                        setGuest({ type: DATA_ACTION_TYPES.INCREASE_ADULTS, adults: 1 + guests.adults, children: guests.children, infants: guests.infants })
                                    }
                                    onDecrease={() =>
                                        setGuest({ type: DATA_ACTION_TYPES.INCREASE_ADULTS, adults: guests.adults - 1, children: guests.children, infants: guests.infants })
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                <div className="flex-grow">
                                    <h2 className="text-sb">Children</h2>
                                    <p className="text-sm leading-4 text-secondaryText">Ages 2-12</p>
                                </div>
                                <SearchCounter
                                    value={guests.children}
                                    maxValue={5}
                                    onIncrease={() =>
                                        setGuest({ type: DATA_ACTION_TYPES.INCREASE_CHILDREN, children: 1 + guests.children, adults: guests.adults, infants: guests.infants })
                                    }
                                    onDecrease={() =>
                                        setGuest({ type: DATA_ACTION_TYPES.DECREASE_CHILDREN, children: guests.children - 1, adults: guests.adults, infants: guests.infants })
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex py-4">
                                <div className="flex-grow">
                                    <h2 className="text-sb">Infants</h2>
                                    <p className="text-sm leading-4 text-secondaryText">Under 2</p>
                                </div>
                                <SearchCounter
                                    value={guests.infants}
                                    maxValue={2}
                                    onIncrease={() =>
                                        setGuest({ type: DATA_ACTION_TYPES.INCREASE_INFANTS, infants: 1 + guests.infants, children: guests.children, adults: guests.adults })
                                    }
                                    onDecrease={() =>
                                        setGuest({ type: DATA_ACTION_TYPES.DECREASE_INFANTS, infants: guests.infants - 1, children: guests.children, adults: guests.adults })
                                    }
                                />
                            </div>
                        </div>
                        <hr></hr>
                        <div className='mt-2 flex justify-end'>
                            <Button className='!py-3 text-white'>
                                Save
                            </Button>
                        </div>


                    </div>
                )
            }

        </div>
    );
};

export default GuestSelector;