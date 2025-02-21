import { Form } from 'antd';
import React from 'react';
import { FaCheck } from "react-icons/fa";
import { useAction } from '../../../../../helpers/hooks';
import { patchProperty } from '../../../../../helpers/backend';
import { HiddenInput } from '../../../../../components/form/input';

const CheckInput = ({ data, getData, name, form, setTab }) => {
    
    const availableData = () => {
        if (Array.isArray(name)) {
            if (name[0] === 'availability' && name[1] === 'advance_notice') {
                data = {
                    types: [
                        { title: 'Same day', value: 0 },
                        { title: 'At least 1 day', value: 1 },
                        { title: 'At least 2 days', value: 2 },
                        { title: 'At least 3 days', value: 3 },
                        { title: 'At least 7 days', value: 7 },
                    ]

                }
                return data;
            } else if (name[0] === 'availability' && name[1] === 'notice_time') {
                data = {
                    types: [
                        { title: '6:00 AM', value: '6:00 AM' },
                        { title: '7:00 AM', value: '7:00 AM' },
                        { title: '8:00 AM', value: '8:00 AM' },
                        { title: '9:00 AM', value: '9:00 AM' },
                        { title: '10:00 AM', value: '10:00 AM' },
                        { title: '11:00 AM', value: '11:00 AM' },
                        { title: '12:00 PM', value: '12:00 PM' },
                        { title: '1:00 PM', value: '1:00 PM' },
                        { title: '2:00 PM', value: '2:00 PM' },
                        { title: '3:00 PM', value: '3:00 PM' },
                        { title: '4:00 PM', value: '4:00 PM' },
                        { title: '5:00 PM', value: '5:00 PM' },
                        { title: '6:00 PM', value: '6:00 PM' },
                        { title: '7:00 PM', value: '7:00 PM' },
                        { title: '8:00 PM', value: '8:00 PM' },
                        { title: '9:00 PM', value: '9:00 PM' },
                        { title: '10:00 PM', value: '10:00 PM' },
                        { title: '11:00 PM', value: '11:00 PM' },
                        { title: '12:00 AM', value: '12:00 AM' },
                    ]
                }
                return data;
            }
            else if (name[0] === 'availability' && name[1] === 'preparation_time') {
                data = {
                    types: [
                        { title: 'None', value: null },
                        { title: '1 night before and after each reservation', value: 1 },
                        { title: '2 nights before and after each reservation', value: 2 }
                    ]
                }
                return data;
            }
            else if (name[0] === 'availability' && name[1] === 'max_book_month') {
                data = {
                    types: [
                        { title: '24 months in advance', value: 24 },
                        { title: '12 months in advance', value: 12 },
                        { title: '9 months in advance', value: 9 },
                        { title: '6 months in advance', value: 6 },
                        { title: '3 months in advance', value: 3 },
                        { title: 'Dates unavailable by default', value: null },
                    ]
                }
                return data;
            }
        }
        return null;
    };

    const Checkbox = ({ title, active, onSelect }: any) => {
        return (
            <div
                role="button"
                onClick={onSelect}
                className={`flex justify-between items-center px-7 py-5 ${active && 'bg-secondary'}`}>
                <p className="font-semibold"> {title}</p>
                {active && <FaCheck className='' />}
            </div>
        )
    }

    const Input = ({ value, onChange }: any) => {
        const data = availableData();
        return (
            <div className="rounded-lg">
                {data && data.types.map((type, index) => (
                    <Checkbox
                        key={index}
                        title={type.title}
                        active={value === type.value}
                        onSelect={() => onChange(type.value)}
                    />
                ))}
            </div>
        )
    }

    return (
        <div>
            <Form
                form={form}
                onFinish={(values) => {
                    // return console.log(values)
                    return useAction(patchProperty, values, () => {
                        getData(),
                        setTab('settings')
                    })
                }}
            >
                <div className="h-[220px] overflow-y-auto ">
                    <HiddenInput name="uid" />
                    <Form.Item name={name}>
                        <Input />
                    </Form.Item>

                </div>
                <div className="border-t p-5">
                    <Form.Item noStyle shouldUpdate>
                        {() => (
                            <button
                                disabled={!form.isFieldsTouched([name])}
                                className="w-full bg-black text-white font-semibold disabled:opacity-30 p-2.5 rounded-md">
                                Save
                            </button>
                        )}
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default CheckInput;