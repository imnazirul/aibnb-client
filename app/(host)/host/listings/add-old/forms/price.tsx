import React from 'react';

interface PriceProps {
    value?: number;
    onChange?: (value: number) => void;
    className?: string;
}

const Price: React.FC<PriceProps> = ({ value, onChange, className }) => {
    return (
        <div className="flex justify-around items-center w-full">
            <button
                type="button"
                className="w-8 h-8 flex items-center justify-center border rounded-sm text-secondaryText2 border-secondary hover:border-primary-100 hover:text-primary"
                onClick={() => onChange((+value - 1) || 0)}
            >
                –
            </button>
            <div className="flex items-center justify-center text-xxxl text-primary">
                <input
                    className={`${className} min-w-0 max-w-80 text-center border-0 outline-0`}
                    value={`$${value}`} onChange={e => {
                        let val = e.target.value.replaceAll('$', '').trim()
                        if (!isNaN(+val)) {
                            onChange(+val)
                        }
                    }} />
            </div>
            <button
                type="button"
                className="w-8 h-8 flex items-center justify-center border rounded-sm text-primary border-primary-100"
                onClick={() => onChange((+value + 1) || 0)}
            >
                +
            </button>
        </div>
    );
};

export default Price;
