import { Form, Radio } from 'antd'
import React from 'react'
import { firstReservation } from '../../../../../../helpers/utils'

const FirstReservation = () => {
    const FirstReservation = ({ onChange, value }: any) => {
        return (
            <div className="">
                <Radio.Group className='w-full space-y-4'>
                    {
                        firstReservation?.map((item, index) =>
                            <label
                                key={index}
                                className={`type-card ${value == item?.value ? 'selected' : ''}`}
                                htmlFor={`checkbox-${item?.value}`}
                                onClick={() => onChange(item?.value)}
                            >
                                <Radio rootClassName='!w-5 !h-5' className='' id={`checkbox-${item?.value}`} value={item?.value} />
                                <div className="">
                                    <h1 className="mb-4 text-css !leading-[20px]">{item?.title}</h1>
                                    <p  className='text-h5 text-secondaryText'>{item?.description}</p>
                                </div>
                            </label>
                        )
                    }
                </Radio.Group>
            </div>
        )
    }
    return (
        <div className="w-full">
            <h1 className='text-xlMedium mb-5'>Choose who to welcome for your first reservation</h1>
            <p className='text-h5 text-secondaryText mb-10'>After your first guest, anyone can book your place. learn more</p>
            <Form.Item
                name="reservation_type"
            >
                <FirstReservation />
            </Form.Item>

        </div>
    )
}

export default FirstReservation