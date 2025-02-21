import { Form } from 'antd';
import React from 'react';

const MoreDiscountInput = ({ name, form }) => {
    const setName = () => {
        if (Array.isArray(name)) {
            if (name[0][0] === 'discounts' && name[0][1] === 'early') {
                return [['discounts', 'early', 'discount'], ['discounts', 'early', 'months']];
            }
            if (name[0][0] === 'discounts' && name[0][1] === 'lasts') {
                return [['discounts', 'lasts', 'days'], ['discounts', 'lasts', 'months']];
            }
        }
        return null;
    };
    
    return (
        <div>
            <div className="flex flex-col border rounded-lg py-5 px-6 my-4">
                {
                    name[0][1] === 'early' ? <p>Months before arrival</p> : <p>Days before arrival</p>
                }
                {
                    name[0][1] === 'early' ?
                        <Form.Item noStyle name={setName()[0]}>
                            <Input />
                        </Form.Item>
                        :
                        <Form.List name={['discounts', 'lasts']}>
                            {(fields) => (
                                <>
                                    {fields.map(({ key, name }) => (
                                        <React.Fragment key={key}>
                                            <Form.Item noStyle
                                                name={[name, 'days']}
                                            >
                                                <Input isDays />
                                            </Form.Item>
                                        </React.Fragment>
                                    ))}
                                </>
                            )}
                        </Form.List>
                }

            </div>
            <div className="flex flex-col border rounded-lg py-5 px-6 my-4">
                <p>Discount</p>
                <div className=''>
                    {
                        name[0][1] === 'early' ?
                            <Form.Item noStyle name={setName()[1]}>
                                <Input isPercent />
                            </Form.Item>
                            :
                            <Form.List name={['discounts', 'lasts']}>
                                {(fields) => (
                                    <>
                                        {fields.map(({ key, name }) => (
                                            <React.Fragment key={key}>
                                                <Form.Item noStyle
                                                    name={[name, 'discount']}
                                                >
                                                    <Input isPercent />
                                                </Form.Item>
                                            </React.Fragment>
                                        ))}
                                    </>
                                )}
                            </Form.List>
                    }
                </div>
            </div>
        </div>
    );
};

export default MoreDiscountInput;

const Input = ({ value = 0, onChange, isPercent, isDays }: any) => {
    const handleChange = (e) => {
        let val = isPercent ? e.target.value.replace('%', '').trim() : e.target.value.trim();
        if (!isNaN(+val) && +val >= 0 && (isPercent ? +val <= 99 : isDays ? +val <= 365 : +val <= 24)) {
            onChange(+val);
        }
    };
    return (
        <div className="flex text-title_md">
            <input
                className={`min-w-0 max-w-80 text-start border-0 outline-0`}
                value={`${value}${isPercent ? '%' : ''}`}
                onChange={handleChange}
                placeholder="0%"
            />
        </div>
    )

}