interface PriceProps {
    value?: number;
    onChange?: (value: number) => void;
    className?: string;
    isIncrementOrDecrement?: boolean;
}

export const CalendarPrice: React.FC<PriceProps> = ({ value, onChange, className, isIncrementOrDecrement }) => {

    const handleDecrement = () => {
        if (value > 0) {
            onChange(value - 1);
        }
    };

    const handleIncrement = () => {
        onChange(value + 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace('$', '').trim();
        if (!isNaN(+val) && +val >= 0) {
            onChange(+val);
        }
    };

    return (
        <div className="flex justify-around items-center w-full my-8">
            {
                isIncrementOrDecrement &&
                <button
                    type="button"
                    disabled={value <= 0}
                    className="w-8 h-8 flex items-center justify-center border rounded-sm text-secondaryText2 border-secondary hover:border-primary-100 hover:text-primary"
                    onClick={handleDecrement}
                >
                    –
                </button>
            }

            <div className="flex items-center justify-center text-xxxl text-primary">
                <input
                    className={`${className} min-w-0 max-w-80 text-center border-0 outline-0`}
                    value={`$${value}`} onChange={handleChange}
                    readOnly={!isIncrementOrDecrement}
                />
            </div>
            {
                isIncrementOrDecrement &&
                <button
                    type="button"
                    className="w-8 h-8 flex items-center justify-center border rounded-sm text-primary border-primary-100"
                    onClick={handleIncrement}
                >
                    +
                </button>
            }

        </div>
    );
};
