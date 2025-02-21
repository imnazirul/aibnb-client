'use client'
import { Form } from 'antd';
import React, { PropsWithChildren, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import SearchClear from './search-clear';
import LocationInput2 from '../../common/location2';

interface SearchOptionButtonProps extends PropsWithChildren<any> {
    relative?: boolean;
    withSearch?: boolean;
    separator?: boolean;
    isSearch?: boolean;
    type?: string;
    title?: string;
    placeholder: string;
    active: boolean;
    value?: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur?: () => void;
    onClear: () => void;
}

const SearchOptionButton = ({ relative, children, separator, withSearch, isSearch, type, title, placeholder, active, value, onChange, onFocus, onBlur, onClear }: SearchOptionButtonProps) => {
    const [showMapPickup, setShowMapPickup] = useState(false);

    return (
        <div role="btn"
            tabIndex={0}
            className={`${active ? 'shadow-md bg-white py-0' : ''
                } ${relative && 'relative'} flex items-center rounded-full !h-auto !w-full`}
            onFocus={onFocus}
            onBlur={onBlur}>
            <div
                className={`${withSearch && 'min-w-[120px]'
                    } flex flex-col flex-grow pl-7 pr-3 text-left`}
            >
                <span className="text-xs font-bold tracking-wider text-gray-500">{title}</span>
                {type === 'inputText' ? (
                    <Form.Item className='mb-0'>
                        <div className='w-full'>
                            <LocationInput2
                                className="mt-1"
                                name="location"
                                showMap={showMapPickup}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select pickup point",
                                    },
                                ]}
                                country="USA" // Add the country prop
                            />
                        </div>
                    </Form.Item>

                ) : (
                    <span className="text-sm text-secondaryText truncate max-w-[105px] lg:max-w-none">
                        {value || placeholder}
                    </span>
                )}
            </div>

            {/* clear icon */}
            <SearchClear
                onClick={onClear}
                active={value}
                isFocus={active}
                separator={separator}
            />

            {/* {withSearch && (
                <button
                    type="submit"
                    className={`${isSearch ? 'w-auto saturate-200' : 'w-12'
                        } flex items-center justify-center m-2 ml-0 px-3 h-12 rounded-full bg-primary hover:saturate-200`}
                >
                    <FaSearch className="text-white" />

                    <span
                        className={`${isSearch ? 'inline-block' : 'hidden'
                            } ml-2 font-medium text-white`}
                    >
                        Search
                    </span>
                </button>
            )} */}
            <div className={`${active ? 'block' : 'hidden'} mt-16`}>{children}</div>
        </div>
    );
};

export default SearchOptionButton;