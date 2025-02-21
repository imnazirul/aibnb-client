import { Form, Slider, Tooltip } from 'antd';
import React from 'react';
import PriceTooltipContent from '../../../../../components/calendar/discount-price-tooltip';
import Icon from '../../../../../components/common/icon';

const DiscountInput = ({ name, form }) => {
    const weekOrMonth = () => {
        if (Array.isArray(name)) {
            const dailyPrice = form.getFieldValue('price') || 0;
            if (name[0] === 'discounts' && name[1] === 'weekly') {
                const mainPrice = dailyPrice * 7;
                return mainPrice;
            } else if (name[0] === 'discounts' && name[1] === 'monthly') {
                const mainPrice = dailyPrice * 30;
                return mainPrice;
            }
        }
        return null;
    };

    return (
        <>
            <div className='flex items-center justify-center text-xxxl'>
                <Form.Item noStyle shouldUpdate>
                    {() => {
                        let value = form.getFieldValue(name) || 0
                        let price = weekOrMonth() - (weekOrMonth() * (value / 100))
                        return (
                            <input
                                className={`min-w-0 max-w-80 text-center border-0 outline-0`}
                                value={`$${price.toFixed(2)}`}
                                readOnly={true}
                            />
                        )
                    }}
                </Form.Item>
            </div>
            <Tooltip arrow={false} color={'white'} placement="bottomLeft" trigger={['click']} title={<PriceTooltipContent form={form} type={name} />}>
                <div className="flex items-center justify-center mb-6 gap-1">
                    <span className='!text-main !text-sb cursor-pointer'>Guest price before taxes </span>
                    <Form.Item noStyle shouldUpdate>
                        {({ getFieldValue }) => {
                            let value = getFieldValue(name) || 0
                            let percentPrice = weekOrMonth() - (weekOrMonth() * (value / 100));
                            let guestServiceFee = 28;
                            let price = percentPrice + guestServiceFee;
                            return (
                                <>
                                    <span className='!text-main !text-sb cursor-pointer'>${price}</span>
                                </>
                            )
                        }}
                    </Form.Item>
                    <Icon name={"down-arrow"} />
                </div>
            </Tooltip>
            <div className='flex items-center justify-between mt-10'>
                <div>
                    <p className='text-p'>Set a discount</p>
                    <span className='text-xxs'>
                        {
                            name[1] === 'weekly' ? ' Tip: To attract weekly stays, try 15%' : ' Tip: To attract monthly stays, try 15%'
                        }
                    </span>
                </div>
                <div className='border rounded-xl p-3'>
                    <Form.Item noStyle name={name}>
                        <Input />
                    </Form.Item>
                </div>
            </div>
            <div className="my-8 calender-slider">
                <Form.Item noStyle name={name}>
                    <Slider styles={
                        {
                            track: {
                                background: '#000000',
                                height: '8px',
                                blockSize: '8px',
                                borderRadius: '4px',
                            },
                            rail: {
                                background: '#F5F5F5',
                                height: '8px',
                                blockSize: '8px',
                                borderRadius: '4px',
                            },
                            handle: {
                                background: '#000000',
                                height: '18px',
                                width: '18px',
                                borderRadius: '50%',
                                top: '-1px'
                            },
                        }
                    } tooltip={{
                        open: false,
                    }}
                        marks={{
                            0: {
                                label: <span className='text-main text-ssb'>0%</span>,
                            },
                            99: {
                                label: <span className='text-main text-ssb'>99%</span>,
                            }
                        }} defaultValue={1} />
                </Form.Item>
            </div>
        </>

    );
};

export default DiscountInput;


const Input = ({ value, onChange }: any) => {
    return (
        <div className="flex items-center justify-center text-title_md">
            <input
                className="min-w-0 max-w-12 text-center border-0 outline-0"
                value={`${value || 0}%`} onChange={e => {
                    let val = e.target.value.replaceAll('%', '').trim()
                    if (!isNaN(+val) && +val >= 0 && +val <= 99) {
                        onChange(+val)
                    }
                }} />
        </div>
    )

}