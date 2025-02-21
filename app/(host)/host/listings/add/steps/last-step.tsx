import { Checkbox, Form } from 'antd'
import React from 'react'
import { lastStep } from '../../../../../../helpers/utils'
import Link from 'next/link'


const LastStep = (elements) => {
    const LastStepCard = ({ onChange, value }: any) => {
        return (
            <div className="w-full">
                <Checkbox.Group className="flex flex-col gap-10 w-full">
                    {elements?.elements?.features?.map((item, index) => (
                        <label
                            key={index}
                            className={`!w-full flex items-center justify-between cursor-pointer ${value === item?._id ? 'border-black' : ''
                                }`}
                            htmlFor={`checkbox-${item?._id}`}
                            onClick={() => onChange(item?._id)}
                        >
                            <h1 className="text-css !leading-[20px]">{item?.name}</h1>
                            <Checkbox
                                id={`checkbox-${item?._id}`}
                                value={item?._id}
                                checked={value === item?._id}
                            />
                        </label>
                    ))}
                </Checkbox.Group>
            </div>
        );
    };

    return (
        <div className='max-w-[750px]'>
            <h1 className="text-xlMedium mb-10">Just one last step!</h1>
            <p className="text-h5 text-secondaryText mb-6">Does your place have any of these?</p>
            <Form.Item
                className="w-full border-b border-webBorder pb-10 mb-10"
                name="features"
            >
                <LastStepCard />
            </Form.Item>
            <h1 className="my-5 text-rcs">Important things to know</h1>
            <p className="text-p3 text-secondaryText my-5">
                Security cameras that monitor indoor spaces are not allowed even if they're turned off. All exterior security cameras must be disclosed.
            </p>
            <p className="text-p3 text-secondaryText capitalize">
                Be sure to comply with your <Link href="#" className="underline">local laws</Link> and review Airbnb's{' '}
                <Link href="#" className="underline">anti-discrimination policy</Link> and{' '}
                <Link href="#" className="underline">guest and Host fees.</Link>
            </p>
        </div>
    );
};

export default LastStep;
