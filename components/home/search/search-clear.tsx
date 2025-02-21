import React from 'react';
import { IoClose } from "react-icons/io5";

interface SearchClearProps {
    onClick: () => void;
    active: boolean;
    isFocus?: boolean;
    separator?: boolean;
}

const SearchClear = ({ onClick, active, isFocus, separator, }: SearchClearProps) => {
    return (
        <div className={`${separator && 'border-r border-gray-200'} flex items-center h-8`}>
            <div
                role="button"
                tabIndex={0}
                className={`${active && isFocus ? 'opacity-200' : 'opacity-0'
                    } flex items-center pr-3`}
                onClick={onClick}
            >
                <IoClose className="h-6 w-6 p-1 bg-white rounded-full bg-opacity-60 hover:bg-opacity-100" />
            </div>
        </div>
    );
};

export default SearchClear;