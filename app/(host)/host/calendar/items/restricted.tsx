import React from 'react';
import Icon from '../../../../../components/common/icon';
import { Form } from 'antd';

const Restricted = ({ onBack, form }) => {
    const data = [
        { name: 'Sunday', value: 0 },
        { name: 'Monday', value: 1 },
        { name: 'Tuesday', value: 2 },
        { name: 'Wednesday', value: 3 },
        { name: 'Thursday', value: 4 },
        { name: 'Friday', value: 5 },
        { name: 'Saturday', value: 6 }
    ];

    const handleSelect = (value: number, type: 'checkin' | 'checkout') => {
        const fieldName = type === 'checkin' ? 'restricted_checkin' : 'restricted_checkout';
        const currentValues = form.getFieldValue(['availability', fieldName]) || [];
        
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v: number) => v !== value)
            : [...currentValues, value];
        form.setFieldsValue({ availability: { [fieldName]: newValues } });
    };

    return (
        <div>
            <div onClick={() => onBack()} className="w-[41px] h-[41px] rounded-full flex items-center justify-center cursor-pointer bg-[#F7F7F7] mt-2">
                <Icon name={"arrow-left2"} />
            </div>
            <h1 className="text-h4 mt-6">Restricted check-in</h1>
            <span className='text-xs font-medium text-secondaryText'>
                Guests won’t be able to book your place if their stay starts on these days.
            </span>
            <Form.Item name={['availability', 'restricted_checkin']} initialValue={[]}>
                <div className='flex flex-wrap items-center gap-2 mt-4'>
                    {
                        data.map((item, index) => (
                            <Checkbox
                                key={index}
                                title={item.name}
                                value={item.value}
                                active={(form.getFieldValue(['availability', 'restricted_checkin']) || []).includes(item.value)}
                                onSelect={() => handleSelect(item.value, 'checkin')}

                            />
                        ))
                    }
                </div>
            </Form.Item>

            <h1 className="text-h4 mt-6">Restricted check-out</h1>
            <span className='text-xs font-medium text-secondaryText'>
                Guests won’t be able to book your place if their stay starts on these days.
            </span>

            <Form.Item name={['availability', 'restricted_checkout']} initialValue={[]}>
                <div className='flex flex-wrap items-center gap-2 mt-4'>
                    {
                        data.map((item, index) => (
                            <Checkbox
                                key={index}
                                title={item.name}
                                value={item.value}
                                active={(form.getFieldValue(['availability', 'restricted_checkout']) || []).includes(item.value)}
                                onSelect={() => handleSelect(item.value, 'checkout')}
                            />
                        ))
                    }
                </div>
            </Form.Item>
        </div>
    );
};

export default Restricted;

const Checkbox = ({ title, value, active, onSelect }: any) => {
    return (
        <div
            role="button"
            onClick={onSelect}
            className={`flex justify-between items-center px-3 py-1.5 border-2 rounded-[40px] cursor-pointer ${active && 'border-black' }`}>
            <p className="font-semibold"> {title}</p>
        </div>
    );
};