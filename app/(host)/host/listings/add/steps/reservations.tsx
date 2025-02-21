import { Form } from 'antd'
import React from 'react'
import { reservations } from '../../../../../../helpers/utils'
import Icon from '../../../../../../components/common/icon'

const Reservations = () => {
    const PlaceCard = ({ onChange, value }: any) => {
        return (
            <div className="space-y-4">
                {
                    reservations?.map((item, index) =>
                        <div role='button' key={index} onClick={() => onChange(item?.value)} className={`type-card ${value == item?.value ? 'selected' : ''}`}>
                            <div className="">
                                <h1 className='mb-2 text-css'>{item?.title}</h1>
                                <p className='text-h5 text-secondaryText'>{item?.description}</p>
                            </div>
                            <div className="ml-auto">
                                <Icon name={item?.icon} />
                            </div>
                        </div>
                    )}
            </div>
        )
    }
    return (
        <div className="w-full">
            <h1 className='text-xlMedium mb-10'>Decide how you’ll confirm reservations</h1>
            <Form.Item
                name="booking_type"
            >
                <PlaceCard />
            </Form.Item>

        </div>
    )
}

export default Reservations