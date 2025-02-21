interface MonthPercentInputProps {
    value?: number;
    onChange?: (value: number) => void;
    className?: string;
    isPercent?: boolean;
}

export const MonthPercentInput: React.FC<MonthPercentInputProps> = ({ value, onChange, className, isPercent }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = isPercent ? e.target.value.replace('%', '').trim() : e.target.value.trim();
        if (!isNaN(+val) && +val >= 0 && (isPercent ? +val <= 99 : +val <= 24)) {
            onChange(+val);
        }
    };
    return (

        <div className="flex text-title_md text-primary">
            <input
                className={`${className} min-w-0 max-w-80 text-start border-0 outline-0`}
                value={value}
                onChange={handleChange}
            />
            {isPercent && <span className="text-title_md text-primary">%</span>}
        </div>

    );
};