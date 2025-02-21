interface GuestProps {
    value?: number;
    onChange?: (value: number) => void;
    className?: string;
    isIncrementOrDecrement?: boolean;
}

export const GuestInput: React.FC<GuestProps> = ({ value, onChange, className, isIncrementOrDecrement }) => {

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
        <div className="flex justify-around items-center w-full my-2">
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

            <div className="flex items-center justify-center text-title_md text-secondary2">
                <input
                    className={`${className} min-w-0 max-w-80 text-center border-0 outline-0`}
                    value={`${value}`} onChange={handleChange}
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