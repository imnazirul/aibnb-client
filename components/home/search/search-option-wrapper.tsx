import React from 'react';

interface SearchOptionWrapperProps {
    className?: string;
    children?: React.ReactNode;
}

const SearchOptionWrapper = ({ className, children }: SearchOptionWrapperProps) => {
    return (
        <div className={`${className} absolute px-8 py-4 mt-3 bg-white rounded-lg shadow-around-bold shadow-2xl`}>
            {children}
        </div>
    );
};

export default SearchOptionWrapper;