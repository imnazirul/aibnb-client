import React from "react";
import {Calendar} from "antd";
import dayjs from "dayjs";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";


const DateRangeSelector = ({from, to, onChange}) => {

    const [month, setMonth] = React.useState(dayjs())
    const cellRender = (value) => {
        let isStart = !!from && dayjs(from).format('YYYY-MM-DD') === value.format('YYYY-MM-DD')
        let isLast = !!to && dayjs(to).format('YYYY-MM-DD') === value.format('YYYY-MM-DD')
        const inRange = () => {
            if (from && to) {
                return dayjs(value).isAfter(dayjs(from)) && dayjs(value).isBefore(dayjs(to))
            }
            return false
        }
        const innerClassName = () => {
            if (isStart) {
                return 'bg-black text-white rounded-full'
            }
            if (isLast) {
                return 'bg-black text-white rounded-full'
            }
            return ''
        }
        const outerClassName = () => {
            if (!!from && !!to) {
                if (isStart) {
                    return 'bg-gray-300 text-white rounded-l-full'
                }
                if (isLast) {
                    return 'bg-gray-300 text-white rounded-r-full'
                }
                if (inRange()) {
                    return 'bg-gray-300'
                }
            }
            return ''
        }
        return (
            <div
                onClick={() => {
                    if (from && !to) {
                        if(dayjs(from).isAfter(value)) {
                            onChange({
                                from: value.toISOString(),
                                to: from
                            })
                        } else {
                            onChange({
                                from: from,
                                to: value.toISOString()
                            })
                        }
                    } else {
                        onChange({
                            from: value.toISOString(),
                            to: null
                        })
                    }
                }}
                className={`aspect-square ${outerClassName()}`}>
                <div className={`h-full flex justify-center items-center font-medium ${innerClassName()}`}>
                    {value.date()}
                </div>
            </div>
        )
    }


    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Calendar
                value={month}
                headerRender={({value, type, onChange, onTypeChange}) => {
                    return (
                        <div className="flex justify-center p-2 font-medium relative">
                            {month.isAfter(dayjs()) && month.diff(dayjs(), 'month') >= 0 && (
                                <FiChevronLeft
                                    role="button"
                                    onClick={() => setMonth(month.add(-1, 'month'))}
                                    className="absolute left-0" size={20}/>
                            )}
                            {value.format('MMMM, YYYY')}
                        </div>
                    )
                }}
                fullscreen={false}
                fullCellRender={cellRender}

            />
            <Calendar
                value={month.add(1, 'month')}
                fullscreen={false}
                headerRender={({value, type, onChange, onTypeChange}) => {
                    return (
                        <div className="flex justify-center p-2 font-medium relative">
                            <FiChevronRight
                                role="button"
                                onClick={() => setMonth(month.add(1, 'month'))}
                                className="absolute right-0" size={20}/>
                            {value.format('MMMM, YYYY')}
                        </div>
                    )
                }}
                fullCellRender={cellRender}
            />
        </div>
    )
}

export default DateRangeSelector;