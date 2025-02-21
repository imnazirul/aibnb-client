import React, { useRef, useState } from "react";
import { AutoComplete, DatePicker } from "antd";
import { FaPlus, FaMinus, FaSearch } from "react-icons/fa";
import Icon from "./icon";

const options = [
    {
        value: "Burns Bay Road",
    },
    {
        value: "Downing Street",
    },
    {
        value: "Wall Street",
    },
];

const SearchBar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const inputRef = useRef(null);
    const inputRef1 = useRef(null);
    const datePickerRef1 = useRef(null);
    const datePickerRef2 = useRef(null);

    const handleAutoCompleteClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleDatePicker1Click = () => {
        if (datePickerRef1.current) {
            datePickerRef1.current.input.focus();
        }
    };

    const handleDatePicker2Click = () => {
        if (datePickerRef2.current) {
            datePickerRef2.current.input.focus();
        }
    };

    const handleWhoSectionClick = () => {
        if (inputRef1.current) {
            inputRef1.current.focus();
        }
        setDropdownVisible(!dropdownVisible);
    };

    const handleIncrement = (setter) => {
        setter((prev) => prev + 1);
    };

    const handleDecrement = (setter, value) => {
        if (value > 0) {
            setter((prev) => prev - 1);
        }
    };

    return (
        <div className="flex flex-wrap justify-between search">
            <div className="flex items-center cursor-pointer !border-r-4"
                onClick={handleAutoCompleteClick}
            >
                <Icon name="location-search" />

                <div className="flex flex-col w-full">
                    <AutoComplete
                        ref={inputRef}
                        variant="borderless"
                        style={{ width: 200 }}
                        options={options}
                        placeholder={<>
                            <div className="flex flex-col gap-0">
                                <span className="text-sm font-bold text-primary">Where</span>
                                <span className="text-secondaryText text-sm font-bold">search destinations</span>
                            </div>

                        </>}
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                            -1
                        }
                    />
                </div>
            </div>
            <div
                className="flex items-center cursor-pointer pr-[37px] border-r"
                onClick={handleDatePicker1Click}
            >
                <Icon name="calender-search" />
                <div className="flex flex-col">
                    <AutoComplete
                        ref={inputRef}
                        variant="borderless"
                        style={{ width: 200 }}
                        options={options}
                        placeholder={<>
                            <div className="flex flex-col gap-0">
                                <span className="text-sm font-bold text-primary">Check in</span>
                                <span className="text-secondaryText text-sm font-bold">dates</span>
                            </div>

                        </>}
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                            -1
                        }
                    />
                </div>
            </div>
            <div
                className="flex gap-2 items-center cursor-pointer pr-[37px] border-r"
                onClick={handleDatePicker2Click}
            >
                <Icon name="check-search" />

                <div className="flex flex-col items-center">
                    <AutoComplete
                        ref={inputRef}
                        variant="borderless"
                        style={{ width: 200 }}
                        options={options}
                        placeholder={<>
                            <div className="flex flex-col gap-0">
                                <span className="text-sm font-bold text-primary">Check out</span>
                                <span className="text-secondaryText text-sm font-bold">dates</span>
                            </div>

                        </>}
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                            -1
                        }
                    />
                </div>
            </div>

            <div className="relative">
                <div
                    className="user-search"
                    onClick={handleWhoSectionClick}
                >
                    <Icon name="user-search" />
                    <div className="flex flex-col">
                        <AutoComplete
                            ref={inputRef1}
                            className="w-full"
                            style={{ width: 300 }}
                            placeholder={<>
                                <div className="flex flex-col gap-0">
                                    <span className="text-sm font-bold text-primary">Who</span>
                                    <span className="text-secondaryText text-sm font-bold">add guest</span>
                                </div>

                            </>}
                            variant="borderless"
                        />
                    </div>
                </div>
                {dropdownVisible && (
                    <div className="increment-input">
                        <div className="flex justify-between items-center border-b pb-4">
                            <span>Adults</span>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleDecrement(setAdults, adults)}
                                    className="p-2"
                                >
                                    <FaMinus />
                                </button>
                                <span className="mx-2">{adults}</span>
                                <button
                                    onClick={() => handleIncrement(setAdults)}
                                    className="p-2"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <span>Children</span>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleDecrement(setChildren, children)}
                                    className="p-2"
                                >
                                    <FaMinus />
                                </button>
                                <span className="mx-2">{children}</span>
                                <button
                                    onClick={() => handleIncrement(setChildren)}
                                    className="p-2"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-primary text-white search-icon">
                <FaSearch className="p-10" />
            </div>
        </div>
    );
};

export default SearchBar;