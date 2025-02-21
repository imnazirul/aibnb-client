import React from 'react'
import Icon from '../../../../../../components/common/icon'
import { host_types } from '../../../../../../helpers/utils'
import { Form } from 'antd'

const TypePlace = () => {
    const PlaceCard = ({ onChange, value }: any) => {
        return (
            <div className="space-y-4">
                {
                    host_types?.map((item, index) =>
                        <div role='button' key={index} onClick={() => onChange(item?.value)} className={`type-card ${value == item?.value ? 'selected' : ''}`}>
                            <div className="">
                                <h1 className='mb-4 text-css'>{item?.title}</h1>
                                <p className='text-h5 text-secondaryText md:w-[450px] w-auto'>{item?.description}</p>
                            </div>
                            <div className="md:ml-auto">
                                <Icon name={item?.icon} />
                            </div>
                        </div>
                    )}
            </div>
        )
    }
    return (
        <div className="w-full">
            <h1 className='text-xlMedium mb-10'>What type of place will guests have?</h1>
            <Form.Item
                name="type"
                rules={[{ required: true, message: 'Please select a value' }]}
            >
                <PlaceCard />
            </Form.Item>

        </div>
    )
}

export default TypePlace

