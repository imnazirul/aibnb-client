import { Form } from 'antd';
import React from 'react';
import Svg from '../../../../../../components/common/svg';
import { toAssetUrl } from '../../../../../../helpers/utils';

const Tags = ({ elements }) => {

    const Input = ({ value, onChange }: any) => {
        return (
            <div className="flex flex-wrap gap-2 mt-6">
                {elements?.tags?.map((val, index) => (
                    <div
                        className={`place-rounded ${value.includes(val._id) ? 'selected' : ''}`}
                        key={index}
                        onClick={() => {
                            if (value?.includes(val._id)) {
                                onChange(value.filter((v) => v !== val._id))
                            } else {
                                onChange([...value, val._id])
                            }
                        }}
                    >
                        <Svg src={toAssetUrl(val.icon)} />
                        <div className="">
                            <h3 className={`group-hover:text-black text-c1 ${value.includes(val._id) ? 'text-black' : 'text-main'}`}>{val.name}</h3>

                        </div>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <div>
            <h2 className='text-xlSemiBold text-black'>Next, let's describe your house</h2>
            <span className='text-h5 text-secondaryText mt-6'>Choose up to 2 highlights. We'll use these to get your description started.</span>
            <Form.Item name="tags" initialValue={[]}>
                <Input />
            </Form.Item>
        </div>
    );
};

export default Tags;
