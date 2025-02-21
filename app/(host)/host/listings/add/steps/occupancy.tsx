import { Form } from 'antd';
import React from 'react';
import { occupancyItems } from '../../../../../../helpers/utils';
import Icon from '../../../../../../components/common/icon';

const Occupancy = () => {
    const OccupancyItem = ({ value, onChange }: any) => {
        return (
            <div className="grid md:grid-cols-3 grid-cols-2 gap-3 md:gap-4 lg:gap-5 mt-6">
                {occupancyItems.map((item, index) => (
                    <div
                        className={`place-card ${value === item.name ? 'selected' : ''}`}
                        key={index}
                        onClick={() => onChange(item.name)}
                    >
                        <Icon name={item.icon} />
                        <div className="">
                            <h3 className={`group-hover:text-black text-h4 ${value === item.name ? 'text-black' : 'text-main'}`}>{item.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>
            <h2 className='text-xlMedium text-black'>Who else might be there?</h2>
            <span className='text-p1 text'>Guests need to know whether they’ll encounter other people during their stay.</span>
            <Form.Item
                name="occupancy"
                rules={[{ required: true, message: 'Please select a value' }]}
            >
                <OccupancyItem />
            </Form.Item>
        </div>
    );
};

export default Occupancy;