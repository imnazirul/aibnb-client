import React from 'react';
import Icon from '../../../../../components/common/icon';
import dayjs from "dayjs";
import { Form } from 'antd';
import { useAction } from '../../../../../helpers/hooks';
import { patchProperty } from '../../../../../helpers/backend';

const TripLength = ({ onBack, selected, data }) => {
    const handleUpdate = (selected) => {
        return useAction(patchProperty, {
            uid: data?.uid,
            availability: {
                custom_length: {
                    from: selected[0],
                    to: selected[selected.length - 1]
                }
            }
        }, () => {
            // onReload()
        }, false,)
    }
    return (
        <div>
            <div onClick={() => onBack()} className="w-[41px] h-[41px] rounded-full flex items-center justify-center cursor-pointer bg-[#F7F7F7] mt-2">
                <Icon name={"arrow-left2"} />
            </div>
            <h1 className="text-h4 my-6">Custom trip length</h1>
            <div className="border rounded-lg p-4">
                <p className="font-medium text-gray-700">Dates</p>
                <div className="flex text-p font-semibold text-gray-700">
                    <p className="font-semibold underline">{getDates(selected) || 'Select dates on calendar'}</p>
                </div>

            </div>

            <div className='mt-6'>
                <Form.Item noStyle shouldUpdate>
                    {() => (
                        <button
                            onClick={() => handleUpdate(selected)}
                            disabled={!selected?.length}
                            className="w-full bg-black text-white font-semibold disabled:opacity-30 p-2.5 rounded-md">
                            Save
                        </button>
                    )}
                </Form.Item>
            </div>
        </div>
    );
};

export default TripLength;


const getDates = (dates) => {
    if (dates.length === 1) {
        return dayjs(dates[0])?.format('MMM DD')
    }
    if (dates.length > 1) {
        let minDate = dayjs(dates[0])
        let maxDate = dayjs(dates[dates.length - 1])
        for (let i = 0; i < dates.length; i++) {
            let date = dayjs(dates[i])
            if (date.isBefore(minDate)) {
                minDate = date
            }
            if (date.isAfter(maxDate)) {
                maxDate = date
            }
        }
        if (maxDate.diff(minDate, 'days') === dates?.length - 1) {
            return `${minDate.format('MMM DD')} - ${maxDate.format('MMM DD')}`
        } else {
            return
        }
    }
    return ''
}