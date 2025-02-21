import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import "../../../styles/reactDateRange.scss"

interface SearchDateRangeProps {
    months?: number;
    checkIn?: Date | null;
    checkOut?: Date | null;
    setCheckIn?: (date: Date | null) => void;
    setCheckOut?: (date: Date | null) => void;
}

const SearchDateRange = ({ months, setCheckIn, setCheckOut, checkIn, checkOut }: SearchDateRangeProps) => {

    const selectionRange = {
        startDate: checkIn,
        endDate: checkOut,
        key: 'selection',
    };
    const handleDatePicker = (range) => {
        const { startDate, endDate } = range.selection;
        if (startDate && endDate) {
            setCheckIn(startDate);
            setCheckOut(endDate);
        }

    }
    return (
        <>
            <div className="md:py-4 rounded-3xl">
                <DateRange
                    ranges={[selectionRange]}
                    onChange={handleDatePicker}
                    months={months || 2}
                    direction="horizontal"
                    showMonthAndYearPickers={false}
                    rangeColors={['#F7F7F7']}
                    minDate={new Date()}
                    showDateDisplay={false}
                    monthDisplayFormat="MMMM YYY"
                />
            </div>
        </>
    );
};

export default SearchDateRange;
