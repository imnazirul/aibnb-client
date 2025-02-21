import React from 'react';

interface CounterProps {
    count: number;
    increment: () => void;
    decrement: () => void;
    className?: string;
    countClassName?: string;
}

const Counter: React.FC<CounterProps> = ({ count, increment, decrement, className, countClassName }) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <button
                type="button"
                className="w-8 h-8 flex items-center justify-center border rounded-sm text-secondaryText2 border-secondary hover:border-primary-100 hover:text-primary"
                onClick={decrement}
            >
                –
            </button>
            <div className={`flex items-center justify-center ${countClassName}`}>
                {count}
            </div>
            <button
                type="button"
                className="w-8 h-8 flex items-center justify-center border rounded-sm text-primary border-primary-100"
                onClick={increment}
            >
                +
            </button>
        </div>
    );
};

export default Counter;