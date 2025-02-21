import React from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import SearchCounter from '../home/search/search-counter';
import Button from '../common/button';
import { DATA_ACTION_TYPES } from '../../helpers/action-types';


const PetSelector = ({ priceBreakDownType, setPriceBreakDownType, pets, setPets }) => {
    return (
        <div className='border rounded-[40px] px-4 py-1 bg-secondary'>
            <div onClick={() => setPriceBreakDownType(prevType => (prevType === 'pets' ? '' : 'pets'))} className='flex gap-1.5 items-center relative cursor-pointer'>
                <span>Pets</span>
                {
                    priceBreakDownType === 'pets' ? (
                        <FaChevronUp className='w-3 h-3' />
                    ) :
                        <FaChevronDown className='w-3 h-3' />
                }
            </div>
            {
                priceBreakDownType === 'pets' && (
                    <div className={`left-14 w-[300px] absolute px-8 py-4 mt-2 !bg-white rounded-lg shadow-around-bold drop-shadow-xl`}>
                        <div>
                            <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                <div className="flex-grow">
                                    <h2 className="text-sb">Pets</h2>
                                    <p className="text-sm leading-4 text-secondaryText">
                                        Total pets
                                    </p>
                                </div>
                                <SearchCounter
                                    value={pets.pets}
                                    maxValue={2}
                                    onIncrease={() =>
                                        setPets({ type: DATA_ACTION_TYPES.INCREASE_PETS, pets: 1 + pets.pets })
                                    }
                                    onDecrease={() =>
                                        setPets({ type: DATA_ACTION_TYPES.DECREASE_PETS, pets: pets.pets - 1 })
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

export default PetSelector;