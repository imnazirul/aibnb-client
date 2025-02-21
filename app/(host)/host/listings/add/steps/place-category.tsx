import { Form } from 'antd';
import React from 'react';
import Svg from '../../../../../../components/common/svg';
import { toAssetUrl } from '../../../../../../helpers/utils';

const PlaceCategory = ({ elements }) => {

    const Places = ({ value, onChange }: any) => {

        return (
            <div className="grid md:grid-cols-3 grid-cols-2 gap-3 md:gap-4 lg:gap-5 mt-6">
                {elements?.categories.map((item, index) => (
                    <div
                        className={`place-card ${value === item._id ? 'selected' : 'border-webBorder'}`}
                        key={index}
                        onClick={() => onChange(item._id)}
                    >
                        <Svg
                            height={40}
                            width={40}
                            src={toAssetUrl(item.icon)}
                        />
                        <div>
                            <h3 className={`group-hover:text-black text-h4 ${value === item._id ? 'text-black' : 'text-main'}`}>
                                {item.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='w-full'>
            <h2 className='text-xlMedium text-black'>Which of these best describes your place?</h2>
            <Form.Item
                name="category"
                rules={[{ required: true, message: 'Please select a value' }]}
            >
                <Places />
            </Form.Item>
        </div>
    );
};

export default PlaceCategory;
