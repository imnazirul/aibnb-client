"use client"

import { Divider, Form } from 'antd';
import React, { FocusEvent, useEffect, useState } from 'react';
import SearchOptionButton from './search-option-button';
import { DATA_ACTION_TYPES } from '../../../helpers/action-types';
import SearchOptionWrapper from './search-option-wrapper';
import { formatCheckDate, formatRangeDate } from '../../../helpers/datesUtils';
import SearchDateRange from './search-date-range';
// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { formatGuests } from '../../../helpers/guestsUtils';
import SearchCounter from './search-counter';
import Icon from '../../common/icon';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

interface SearchBarProps {
    isActiveHeader?: boolean;
    active?: number;
}
enum ESearchMenu {
    LOCATION = '',
    CHECK_IN = 'checkIn',
    CHECK_OUT = 'checkOut',
    GUESTS = 'guests',
}


const SearchBar = ({ isActiveHeader, active }: SearchBarProps) => {
    const [form] = Form.useForm();
    const [searchMenu, setSearchMenu] = useState<ESearchMenu | null>(null);
    const [searchValue, setSearchValue] = useState({ type: '', payload: '' });
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [guests, setGuest] = useState({ type: '', adults: 0, children: 0, infants: 0 });
    const [dateTab, setDateTab] = useState('dates');
    const [selectedWeek, setSelectedWeek] = useState('weekend');
    const [selectedYears, setSelectedYears] = useState<{ name: string, year: number }[]>([]);
    const [selectedMonths, setSelectedMonths] = useState(1);

    const handleOnBlur = (event?: FocusEvent<HTMLElement>) => {
        const { relatedTarget } = event || {};
        if (!relatedTarget) {
            setSearchMenu(null);
            return;
        }
        const relatedTargetClassList = Array.from((relatedTarget as Element)?.classList);
        const result = relatedTargetClassList.some((className) => {
            const prefix = ['rdr', 'btn'];
            if (prefix.includes(className.slice(0, 3))) return true;
        });
        if (!result) setSearchMenu(null);
    };

    useEffect(() => {
        if (active !== 1) {
            resetDateStates();
        }
    }, [active]);

    const resetDate = () => {
        setCheckIn(null);
        setCheckOut(null);
        handleOnBlur();
    };

    const resetDateStates = () => {
        resetDate();
        setDateTab('dates');
        setSelectedMonths(1);
        setSelectedWeek(undefined);
        setSelectedYears([]);
        // Add any other date-related state resets here
    };

    const dateRangeStyle = 'left-4 right-4 searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/2 searchbar:w-[850px] z-[999] text-secondaryText';

    const flexibles = [
        { label: 'Weekend', value: 'weekend' },
        { label: 'Week', value: 'week' },
        { label: 'Month', value: 'month' },
    ];

    const toggleSelectWeek = (week) => {
        setSelectedWeek(week);
    };

    const today = new Date();
    const monthsFromNowNames = Array.from({ length: 24 }, (_, i) => {
        const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
        return { name: date.toLocaleString('default', { month: 'long' }), year: date.getFullYear() };
    });

    const toggleSelectMonthFromNow = (monthName, year) => {
        const month = { name: monthName, year };
        setSelectedYears((prevSelected) =>
            prevSelected.some(m => m.name === monthName && m.year === year)
                ? prevSelected.filter(m => !(m.name === monthName && m.year === year))
                : [...prevSelected, month]
        );
    };

    const months = Array.from({ length: 12 }, (_, index) => index + 1);

    const handleSelectMonth = (month) => {
        setSelectedMonths(month);
    };

    const getMonthName = (monthIndex) => {
        const date = new Date();
        date.setMonth(monthIndex);
        return date.toLocaleString('default', { month: 'long' });
    };

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentMonthName = getMonthName(currentMonth);
    let endMonthName, endThisYear;

    if (selectedMonths) {
        const endMonthIndex = (currentMonth + selectedMonths) % 12;
        endThisYear = currentYear + Math.floor((currentMonth + selectedMonths) / 12);
        endMonthName = getMonthName(endMonthIndex);
    }

    const monthNameToNumber = (monthName) => {
        const date = new Date(`${monthName} 1, 2000`);
        return (date.getMonth() + 1).toString().padStart(2, '0');
    };


    const handleTabChange = (newTab: string) => {
        setDateTab(newTab);
        // Reset values based on the tab selected
        if (newTab === 'Dates') {
            setCheckIn(null);
            setCheckOut(null);
        } else if (newTab === 'Month') {
            setCheckIn(null);
            setCheckOut(null);
            setSelectedYears([]);
        } else if (newTab === 'Flexible') {
            setCheckIn(null);
            setCheckOut(null);
            setSelectedYears([]);
        }
    };

    const handleSearch = (values) => {
        const payload = {
            ...values,
            dateTab,
            checkIn: dateTab === 'dates' ? formatCheckDate(checkIn, 'MM/dd/yyyy') :
                dateTab === 'month' ? {
                    start: `${monthNameToNumber(currentMonthName)}/${currentYear.toString().slice(-2)}`,
                    end: `${monthNameToNumber(endMonthName)}/${endThisYear.toString().slice(-2)}`
                } :
                    dateTab === 'flexible' ? {
                        months: selectedYears.map(item => `${monthNameToNumber(item.name)}/${item.year.toString().slice(-2)}`)
                    } : '',
            checkOut: dateTab === 'dates' ? formatCheckDate(checkOut, 'MM/dd/yyyy') : 'N/A',
            guests: {
                adults: guests.adults,
                children: guests.children,
                infants: guests.infants
            }
        };

        console.log('Search Payload:', payload);
    };

    return (
        <div>
            <div className={`${isActiveHeader ? 'visible' : 'invisible'} px-4 md:w-[1008px]`}>

                <div
                    className={`${!isActiveHeader && 'translate-y-[-75px] transform scale-50 opacity-0 z-[100]'
                        } mx-auto mt-2 rounded-full bg-[#F3F3F4] border border-gray-200 duration-300 hidden md:flex cursor-pointer`}
                >
                    <Form onFinish={handleSearch} form={form} className="flex items-center justify-between w-full">
                        <div
                            className='shrink-0'
                        >
                            <SearchOptionButton
                                separator
                                relative
                                type="inputText"
                                placeholder="Where are you going?"
                                active={searchMenu === ESearchMenu.LOCATION}
                                value={searchValue.payload}
                                onChange={({ target }) =>
                                    setSearchValue({ type: DATA_ACTION_TYPES.SET_LOCATION, payload: target.value })
                                }
                                onFocus={() => setSearchMenu(ESearchMenu.LOCATION)}
                                onBlur={handleOnBlur}
                                onClear={() => {
                                    setSearchValue({ type: DATA_ACTION_TYPES.SET_LOCATION, payload: '' });
                                    handleOnBlur();
                                }}
                                className={`flex-grow min-w-[200px]`}
                            >

                            </SearchOptionButton>
                        </div>

                        {/* check in */}

                        <SearchOptionButton
                            separator
                            title={active === 1 ? 'Check-in' : 'Date'}
                            placeholder="Add dates"
                            active={searchMenu === ESearchMenu.CHECK_IN}
                            value={
                                active === 1 ? dateTab === 'dates'
                                    ? (checkIn && checkOut ? `${formatCheckDate(checkIn)}` : ``)
                                    : dateTab === 'month'
                                        ? `${currentMonthName}, ${currentYear} To ${endMonthName}, ${endThisYear}`
                                        : dateTab === 'flexible'
                                            ? (
                                                selectedYears.length > 0
                                                    ? `${selectedYears.slice(0, 3).map(item => item.name).join(', ')}${selectedYears.length > 3 ? '...' : ''}`
                                                    : selectedWeek
                                                        ? flexibles.find(f => f.value === selectedWeek)?.label
                                                        : 'Flexible'
                                            )
                                            : ''
                                    : formatRangeDate(checkIn, checkOut)
                            }
                            onFocus={() => setSearchMenu(ESearchMenu.CHECK_IN)}
                            onClear={() => {
                                resetDateStates();
                            }}
                            className={`flex-grow`}
                            onBlur={handleOnBlur}
                        >
                            {/* date picker */}
                            <SearchOptionWrapper className={dateRangeStyle}>
                                {searchMenu === ESearchMenu.CHECK_IN &&
                                    <>
                                        {active === 1 &&
                                            <div className="flex items-center justify-center">
                                                <div className="bg-secondary rounded-sm flex justify-center items-center cursor-pointer">
                                                    <TabButton dateTab={dateTab} setDateTab={handleTabChange} name={'Dates'} />
                                                    <TabButton dateTab={dateTab} setDateTab={handleTabChange} name={'Month'} />
                                                    <TabButton dateTab={dateTab} setDateTab={handleTabChange} name={'Flexible'} />
                                                </div>
                                            </div>
                                        }

                                        {dateTab === 'dates' && <SearchDateRange
                                            months={2}
                                            checkIn={checkIn}
                                            checkOut={checkOut}
                                            setCheckIn={setCheckIn}
                                            setCheckOut={setCheckOut}
                                        />}
                                        {active === 1 && dateTab === 'month' && (
                                            <>
                                                <h1 className='text-center mt-6 text-c1 text-main'>Select Your Flexible Month</h1>
                                                <p className="text-primary text-c1 text-center mt-4">
                                                    {currentMonthName}, {currentYear} To {endMonthName}, {endThisYear}
                                                </p>
                                                <div className="mt-6">
                                                    <div className="grid md:grid-cols-6 grid-cols-2 gap-4">
                                                        {months.map((month) => (
                                                            <div
                                                                key={month}
                                                                className={`h-[46px] border flex items-center justify-center rounded-sm cursor-pointer ${selectedMonths === month ? 'bg-primary' : ''}`}
                                                                onClick={() => handleSelectMonth(month)}
                                                            >
                                                                <span className={`text-ssb text-center ${selectedMonths === month ? 'text-white' : 'text-main'}`}>
                                                                    {month} Month{month !== 1 ? 's' : ''}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {active === 1 && dateTab === 'flexible' && (
                                            <>
                                                <h1 className='text-center mt-5 text-c1 text-main'>Select Your Flexible Month</h1>
                                                <div className="mt-4">
                                                    <div className="flex justify-center">
                                                        <div className="w-1/2">
                                                            <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                                                                {flexibles.map((val, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className={`h-[46px] border flex items-center justify-center rounded-sm cursor-pointer ${selectedWeek === val?.value ? 'bg-primary' : ''}`}
                                                                        onClick={() => toggleSelectWeek(val?.value)}
                                                                        style={{ marginBottom: '1.5rem' }}
                                                                    >
                                                                        <span className={`text-ssb text-center ${selectedWeek === val?.value ? 'text-white' : 'text-main'}`}>
                                                                            {val?.label}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h1 className="text-center mt-3 text-c1 text-main">
                                                            Go in
                                                            {
                                                                selectedYears?.length > 0 ? (
                                                                    <>
                                                                        {selectedYears.slice(0, 3).map((item, index) => (
                                                                            <span key={index} className='pl-1'>{item?.name}{index < 2 && index < selectedYears.length - 1 ? ', ' : ''}</span>
                                                                        ))}
                                                                        {selectedYears.length > 3 && '...'}
                                                                    </>
                                                                ) : 'Anytime'
                                                            }
                                                        </h1>
                                                    </div>

                                                    <div className="mt-3">
                                                        <Swiper
                                                            spaceBetween={10}
                                                            slidesPerView={6}
                                                            navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                                                        >
                                                            {monthsFromNowNames.map(({ name, year }, index) => (
                                                                <SwiperSlide key={index} className='!mr-4'>
                                                                    <div
                                                                        className={`flex items-center justify-center cursor-pointer flex-col lg:h-[120px] border rounded-sm w-[120px] ${selectedYears.some(m => m.name === name && m.year === year) ? 'bg-primary text-white' : ''}`}
                                                                        onClick={() => toggleSelectMonthFromNow(name, year)}
                                                                    >
                                                                        <Icon name='hero-calender' />
                                                                        <p className={`text-p ${selectedYears.some(m => m.name === name && m.year === year) ? 'text-white' : 'text-main'}`}>
                                                                            {name}
                                                                        </p>
                                                                        <span>{year}</span>
                                                                    </div>
                                                                </SwiperSlide>
                                                            ))}
                                                        </Swiper>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                }
                            </SearchOptionWrapper>

                        </SearchOptionButton>

                        {/* check out */}

                        {active === 1 && dateTab === 'dates' &&
                            <SearchOptionButton
                                separator
                                title="Check out"
                                placeholder="Add dates"
                                active={searchMenu === ESearchMenu.CHECK_OUT}
                                value={formatCheckDate(checkOut)}
                                onFocus={() => setSearchMenu(ESearchMenu.CHECK_OUT)}
                                onBlur={handleOnBlur}
                                onClear={resetDate}
                                className="flex-grow"
                            >
                                {/* date picker */}
                                <SearchOptionWrapper className={dateRangeStyle}>
                                    {searchMenu === ESearchMenu.CHECK_OUT && <SearchDateRange
                                        months={2}
                                        checkIn={checkIn}
                                        checkOut={checkOut}
                                        setCheckIn={setCheckIn}
                                        setCheckOut={setCheckOut}
                                    />}
                                </SearchOptionWrapper>
                            </SearchOptionButton>

                        }

                        {/* guest section  */}

                        <SearchOptionButton
                            relative
                            withSearch
                            title="Guests"
                            placeholder="Add guests"
                            active={searchMenu === ESearchMenu.GUESTS}
                            value={formatGuests(guests)}
                            onFocus={() => setSearchMenu(ESearchMenu.GUESTS)}
                            onBlur={handleOnBlur}
                            onClear={() => {
                                setGuest({ type: DATA_ACTION_TYPES.RESET_GUESTS, adults: 0, children: 0, infants: 0 });
                                handleOnBlur();
                            }}
                            isSearch={!!searchMenu}
                            onSearch={() => setSearchMenu(ESearchMenu.LOCATION)}
                        >
                            <SearchOptionWrapper className="right-0 w-96">
                                <div>
                                    <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                        <div className="flex-grow">
                                            <h2 className="font-medium">Adults</h2>
                                            <p className="text-sm leading-4 text-secondaryText">
                                                Ages 13 or above
                                            </p>
                                        </div>
                                        <SearchCounter
                                            value={guests.adults}
                                            maxValue={16}
                                            onIncrease={() =>
                                                setGuest({ type: DATA_ACTION_TYPES.INCREASE_ADULTS, adults: 1 + guests.adults, children: guests.children, infants: guests.infants })
                                            }
                                            onDecrease={() =>
                                                setGuest({ type: DATA_ACTION_TYPES.INCREASE_ADULTS, adults: guests.adults - 1, children: guests.children, infants: guests.infants })
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                        <div className="flex-grow">
                                            <h2 className="font-medium">Children</h2>
                                            <p className="text-sm leading-4 text-secondaryText">Ages 2-12</p>
                                        </div>
                                        <SearchCounter
                                            value={guests.children}
                                            maxValue={5}
                                            onIncrease={() =>
                                                setGuest({ type: DATA_ACTION_TYPES.INCREASE_CHILDREN, children: 1 + guests.children, adults: guests.adults, infants: guests.infants })
                                            }
                                            onDecrease={() =>
                                                setGuest({ type: DATA_ACTION_TYPES.DECREASE_CHILDREN, children: guests.children - 1, adults: guests.adults, infants: guests.infants })
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex py-4">
                                        <div className="flex-grow">
                                            <h2 className="font-medium">Infants</h2>
                                            <p className="text-sm leading-4 text-secondaryText">Under 2</p>
                                        </div>
                                        <SearchCounter
                                            value={guests.infants}
                                            maxValue={5}
                                            onIncrease={() =>
                                                setGuest({ type: DATA_ACTION_TYPES.INCREASE_INFANTS, infants: 1 + guests.infants, children: guests.children, adults: guests.adults })
                                            }
                                            onDecrease={() =>
                                                setGuest({ type: DATA_ACTION_TYPES.DECREASE_INFANTS, infants: guests.infants - 1, children: guests.children, adults: guests.adults })
                                            }
                                        />
                                    </div>
                                </div>
                            </SearchOptionWrapper>
                        </SearchOptionButton>


                        <button type='submit' className='flex items-center justify-center px-4 py-3 mr-2 rounded-full bg-primary hover:saturate-200'>
                            <Icon name='search' className='text-white' />
                            <span className='ml-1 text-white font-medium'>Search</span>
                        </button>
                    </Form>
                </div>
            </div>

        </div>
    );
};

export default SearchBar;



interface TabButtonProps {
    dateTab: string;
    setDateTab: (tab: string) => void;
    name: string;
}

export const TabButton = ({ dateTab, setDateTab, name }: TabButtonProps) => {
    return (
        <div className="p-2">
            <p
                className={`px-4 sm:px-7 py-2 border rounded-full ${dateTab === name.toLowerCase()
                    ? 'border-primary bg-primary-50 text-primary'
                    : 'border-secondary'
                    } hover:border-primary hover:bg-primary-50 hover:text-primary duration-150 ease-in-out text-sb`}
                onClick={() => setDateTab(name.toLowerCase())}
            >
                {name}
            </p>
        </div>
    );
}
