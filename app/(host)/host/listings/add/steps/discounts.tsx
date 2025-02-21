import React from 'react'
import { discounts } from '../../../../../../helpers/utils'
import { Checkbox, Form } from 'antd'

const Discounts = () => {
    const DiscountsCard = ({ onChange, value }: any) => {
        return (
            <Checkbox.Group className="w-full flex flex-col gap-6">
                {
                    discounts?.map((item, index) =>
                        <div role='button' key={index} onClick={() => onChange(item?.value)} className={`type-card !items-center ${value?.includes(item?.value) ? 'selected' : ''}`}>
                            <div className="flex gap-6 items-center">
                                <h1 className='text-black text-css border rounded-sm border-black py-[8px] px-[14px]'>{item?.discounts}%</h1>
                                <div className="">
                                    <h1 className='mb-3 text-css'>{item?.title}</h1>
                                    <p className='text-h5 text-secondaryText'>{item?.description}</p>
                                </div>
                            </div>

                            <Checkbox value={item?.value} defaultChecked={value} />
                        </div>
                    )
                }
            </Checkbox.Group>
        )
    }
    return (
        <div className="">
            <h1 className='text-xlMedium mb-5'>Add discounts</h1>
            <p className='text-secondaryText text-h5 mb-10'>Help your place stand out to get booked faster and earn your first reviews.</p>
            <Form.Item
                name="discounts"
            >
                <DiscountsCard />
            </Form.Item>
        </div>
    )

}

export default Discounts