"use client"

import dayjs from "dayjs";
import {Calendar as BaseCalendar, Dropdown} from "antd";
import React, {useEffect, useState} from "react";
import {useUser} from "../../../../contexts/user";
import {useFetch} from "../../../../helpers/hooks";
import {fetchPropertyElements} from "../../../../helpers/backend";
import Link from "next/link";
import {FaUser} from "react-icons/fa";
import Image from "next/image";
import {toAssetUrl} from "../../../../helpers/utils";
import {FiChevronDown, FiSettings} from "react-icons/fi";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import LoadingSkeleton from "../../../../components/common/skeleton";
import {hideLoader, showLoader} from "../../../../components/common/loader";
import {getDiscountPrice, getPrice} from "../../../../helpers/property";

const Calender = ({selected, setSelected, data, getData, loading}) => {
    const {user} = useUser()
    const [current, setCurrent] = useState(dayjs().format('YYYY_MM'))

    const property = user?.properties?.find(i => i._id === data?._id)

    useEffect(() => {
        document.querySelector('#availability_calendar_' + dayjs().format('YYYY_MM'))?.scrollIntoView()
    }, [])


    return (
        <div className="">
            <div className="flex justify-between items-center p-4 md:p-6">
                <p className="text-2xl font-semibold md:mb-4 hidden md:block">{dayjs(current, 'YYYY_MM').format('MMMM YYYY')}</p>
                <div>
                    <Dropdown
                        rootClassName="property-dropdown"
                        placement="bottomRight"
                        trigger={['click']}
                        menu={{
                            items: user?.properties?.map((property, index) => ({
                                key: index,
                                label: (
                                    <div
                                        role="button"
                                        onClick={() => {
                                            getData({
                                                uid: property.uid
                                            })
                                        }}
                                        className="flex items-center gap-3">
                                        <Image
                                            src={toAssetUrl(property?.images?.[0])}
                                            alt=""
                                            width={28}
                                            height={28}
                                            className="w-7 h-7 rounded-full"
                                        />
                                        <p className="truncate">{property?.title}</p>
                                        <div className="flex-grow flex justify-end">
                                            {property?._id === data?._id && (
                                                <div
                                                    className="bg-blue-500 text-blue-600 p-1 rounded-full"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ),
                            }))
                        }}
                    >
                        <div
                            role="button">
                            <div className="border border-gray-300 rounded-full p-2 flex items-center gap-2">
                                {!property || loading ? (
                                    <LoadingSkeleton height={28} width={28} className="rounded-full"/>
                                ) : (
                                    <Image
                                        src={toAssetUrl(property?.images?.[0])}
                                        alt=""
                                        width={28}
                                        height={28}
                                        className="w-7 h-7 rounded-full"
                                    />
                                )}
                                {!property || loading ? (
                                    <LoadingSkeleton height={20} width={100}/>
                                ) : (<p className="max-w-[100px] truncate">{property?.title}</p>)}
                                <hr className="h-4 border-r w-0"/>
                                <FiChevronDown size={24} className="text-gray-500 mt-1"/>
                            </div>
                        </div>
                    </Dropdown>
                </div>
                <div className="md:hidden">
                    <FiSettings
                        role="button"
                        onClick={() => {
                            document.querySelector('.availability-setting')?.classList.add('show')
                        }}
                        className="text-xl text-gray-700"/>
                </div>
            </div>
            <BaseCalendar
                headerRender={() => null}
                className="availability-calendar-header"/>
            <div
                onScroll={(e) => {
                    let el = e.target as HTMLDivElement
                    let children = el.childNodes
                    for (let i = 0; i < children.length; i++) {
                        let child = children[i] as HTMLDivElement
                        if (el.scrollTop > child.offsetTop - (child.clientHeight * 0.8) && el.scrollTop < child.offsetTop + (child.clientHeight * 1.8)) {
                            setCurrent(child.id.replace('availability_calendar_', ''))
                        }
                    }
                }}

                className="h-[calc(100vh-170px)] md:h-[calc(100vh-210px)] overflow-y-auto slim-scroll">
                {Array(36).fill(0).map((_, index) => (
                    <SingleCalendar
                        key={index}
                        data={data}
                        selected={selected}
                        setSelected={setSelected}
                        month={dayjs().add(index - 12, 'month')}
                        loading={loading}
                    />
                ))}
            </div>
        </div>
    )
}

export default Calender;


const SingleCalendar = ({month, selected, setSelected, data, loading}) => {
    const getPrice = (date) => {
        let price = getDiscountPrice(date, data)
        return price % 1 === 0 ? price : price.toFixed(2)
    }
    return (
        <div
            className="mb-6"
            id={'availability_calendar_' + month.format('YYYY_MM')}>
            <BaseCalendar
                className="availability-calendar"
                value={month}
                fullscreen={false}
                headerRender={() => {
                    return (
                        <div
                            className="flex p-6">
                            <p className="text-2xl font-semibold"> {month.format('MMMM YYYY')}</p>
                        </div>
                    )
                }}
                fullCellRender={(date, a) => {
                    let isBefore = date.isBefore(dayjs().startOf('day'))
                    let isSelected = selected.includes(date.format('YYYY-MM-DD'))
                    const isOpen = !!data?.custom?.[date.format('YYYY-MM-DD')]?.open
                    return (
                        <div className={`${isOpen || loading ? '' : 'bg-gray-100'} p-0.5`}>
                            <div
                                role="button"
                                onClick={() => {
                                    if (isBefore) return
                                    if (selected.includes(date.format('YYYY-MM-DD'))) {
                                        setSelected(selected.filter(i => i !== date.format('YYYY-MM-DD')))
                                    } else {
                                        setSelected([...selected, date.format('YYYY-MM-DD')])
                                    }
                                }}
                                className={`date p-2 sm:p-6 flex flex-col items-start gap-3 sm:gap-8 ${isBefore ? 'inactive' : ''} ${isSelected ? 'active' : ''}`}>
                                <p className="font-medium"> {date.date()}</p>
                                {loading ? <LoadingSkeleton height={20} width={100}/> : (<p className="text-[10px] sm:text-xs md:text-sm"> ${getPrice(date)}</p>)}
                            </div>
                        </div>
                    )
                }}
            />
        </div>
    )
}

