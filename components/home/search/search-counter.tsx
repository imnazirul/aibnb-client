import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface SearchCounterProps {
    value: number;
    maxValue: number;
    onIncrease: () => void;
    onDecrease: () => void;
}


const SearchCounter = ({ value, maxValue, onIncrease, onDecrease }: SearchCounterProps) => {
    return (
        <div className="flex items-center">
            <button
                type='button'
                disabled={value === 0}
                className={`${value === 0 ? 'cursor-not-allowed opacity-40' : ''
                    } btnDecrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300`}
                onClick={onDecrease}
            >
                <FaMinus className="h-4 text-gray-300" />
            </button>
            <span className="inline-block text-center w-9">{value}</span>
            <button
                type='button'
                disabled={value === maxValue}
                className={`${value === maxValue ? 'cursor-not-allowed opacity-40' : ''
                    } btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300`}
                onClick={onIncrease}
            >
                <FaPlus className="h-4 text-gray-300" />
            </button>
        </div>
    );
};

export default SearchCounter;