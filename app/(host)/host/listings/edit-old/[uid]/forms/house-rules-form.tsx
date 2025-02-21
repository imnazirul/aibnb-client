import React, { useState } from 'react';
import Icon from '../../../../../../../components/common/icon';
import Counter from '../../../add-old/forms/count';
import { Drawer, Form, Switch } from 'antd';
import FormSelect from '../../../../../../../components/form/select';
import Button from '../../../../../../../components/common/button';
import Textarea from '../../../add-old/forms/textarea';


const HouseRulesForm = ({ form, handleSubmit }) => {
    const CounterInput = ({ name }) => {
        const Input = ({ value, onChange }: any) => {
            return (
                <div>
                    <div className="rounded-sm flex items-center justify-center">
                        <Counter
                            className="gap-x-3"
                            countClassName="text-main text-p2"
                            count={value}
                            increment={() => onChange(value + 1)}
                            decrement={() => onChange((value - 1) || 1)}
                        />
                    </div>
                </div>
            );
        };

        return (
            <Form.Item name={name} initialValue={1}>
                <Input />
            </Form.Item>
        );
    };

    const [isShow, setIsShow] = useState(false);
    const [isHour, setIsHour] = useState(false);
    const [open, setOpen] = useState(false);
    const [rules, setRules] = useState(false);

    const handleChange = (checked) => {
        setIsShow(checked);
    };

    const handleHourChange = (checked) => {
        setIsHour(checked);
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleFinish = (values) => {
        console.log(values);
        handleSubmit(values);
        setOpen(false);
    };

    return (
        <div>
            <label className='text-main text-title_lg capitalize'>House rules</label>
            <div className="mt-5 text-p2 text-main text-wrap">Guests are expected to follow your rules and may be removed from Airbnb if they don't.</div>

            <div className="mt-10">
                <div className="flex justify-between">
                    <div className="lg:w-[547px]">
                        <p className='text-main text-p2 capitalize'>Pets allowed</p>
                        <p className="text-p2 text-main text-wrap">You can refuse pets, but must reasonably accommodate service animals.</p>
                    </div>
                    <Form.Item
                        name="pet_allowed"
                        valuePropName="checked"
                        initialValue={false}
                        getValueFromEvent={(checked) => checked}
                    >
                        <Switch onChange={handleChange} />
                    </Form.Item>
                </div>

                {isShow &&
                    <div className="flex justify-between mt-4">
                        <div className="lg:w-[547px]">
                            <p className='text-main text-p2 capitalize'>Maximum number of pets allowed</p>
                        </div>
                        <CounterInput name="no_of_pets" />
                    </div>
                }
                <div className="border-t-2 py-4 mt-3"></div>

                <div className="flex justify-between">
                    <div className="lg:w-[547px]">
                        <p className='text-main text-p2 capitalize text-wrap'>Smoking, vaping, e‑cigarettes allowed</p>
                    </div>
                    <Form.Item
                        name="is_smoking"
                        valuePropName="checked"
                        initialValue={false}
                        getValueFromEvent={(checked) => checked}
                    >
                        <Switch onChange={(checked) => console.log(`switch to ${checked}`)} />
                    </Form.Item>
                </div>
                <div className="border-t-2 py-4"></div>

                <div className="flex justify-between">
                    <div className="lg:w-[547px]">
                        <p className='text-main text-p2 capitalize'>Quiet hours</p>
                    </div>
                    <Form.Item
                        name="quiet_hour"
                        valuePropName="checked"
                        initialValue={false}
                        getValueFromEvent={(checked) => checked}
                    >
                        <Switch onChange={handleHourChange} />
                    </Form.Item>
                </div>

                {isHour &&
                    <div className="">
                        <div className="grid lg:grid-cols-2">
                            <FormSelect
                                initialValue={"start time"}
                                className='text-xs mt-2 capitalize'
                                label="Start Time"
                                name="start_time"
                                options={[
                                    { value: '10pm', label: '10PM' },
                                    { value: '11pm', label: '11PM' },
                                    { value: '12pm', label: '12PM' },
                                ]}
                            />

                            <FormSelect
                                initialValue={"end time"}
                                className='text-xs mt-2 capitalize'
                                label="End Time"
                                name="end_time"
                                options={[
                                    { value: '10am', label: '10AM' },
                                    { value: '11am', label: '11AM' },
                                    { value: '12am', label: '12AM' },
                                ]}
                            />
                        </div>
                    </div>
                }
                <div className="border-t-2 py-4"></div>

                <div className="flex justify-between">
                    <div className="lg:w-[547px]">
                        <p className='text-main text-p2 capitalize text-wrap'>Commercial photography and filming allowed</p>
                    </div>
                    <Form.Item
                        name="is_photography"
                        valuePropName="checked"
                        initialValue={false}
                        getValueFromEvent={(checked) => checked}
                    >
                        <Switch onChange={(checked) => console.log(`switch to ${checked}`)} />
                    </Form.Item>
                </div>
                <div className="border-t-2 py-4"></div>
            </div>

            <div className="flex justify-between border-b-2">
                <p className='text-main text-p2 capitalize'>Number of guests</p>
                <CounterInput name="guests" />
            </div>

            <div className="flex justify-between py-8 cursor-pointer" onClick={showDrawer}>
                <label className='text-p2 text-main capitalize'>Check-in and checkout times</label>
                <Icon name='arrow-right' />
            </div>
            <div className="border-t-2 py-4"></div>

            <div className="flex justify-between cursor-pointer" onClick={() => setRules(!rules)}>
                <div>
                    <label className='text-p2 text-main capitalize'>Additional rules</label>
                    <p className='text-p2 text-main capitalize text-wrap'>Share anything else you expect from guests.</p>
                </div>
                <Icon name='arrow-right' />
            </div>

            {rules &&
                <div className="my-2">
                    <Textarea name={'rules'} label="" placeholder="" max={400} />
                </div>
            }

            <Drawer title="House Rules" onClose={onClose} open={open} >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <div className='flex flex-col'>
                        <FormSelect
                            initialValue={"start time"}
                            className='text-xs mt-2 capitalize'
                            label="Start Time"
                            name="start_time"
                            options={[
                                { value: '10pm', label: '10PM' },
                                { value: '11pm', label: '11PM' },
                                { value: '12pm', label: '12PM' },
                            ]}
                            layoutStyle='vertical'
                        />

                        <FormSelect
                            initialValue={"end time"}
                            className='text-xs capitalize'
                            label="End Time"
                            name="end_time"
                            options={[
                                { value: '10pm', label: '10PM' },
                                { value: '11pm', label: '11PM' },
                                { value: '12pm', label: '12PM' },
                            ]}
                            layoutStyle='vertical'
                        />

                        <FormSelect
                            initialValue={"checkout time"}
                            className='text-xs capitalize'
                            label="Checkout Time"
                            name="checkout_time"
                            options={[
                                { value: '10pm', label: '10PM' },
                                { value: '11pm', label: '11PM' },
                                { value: '12pm', label: '12PM' },
                            ]}
                            layoutStyle='vertical'
                        />

                        <Button className='mt-2 !text-white'>
                            Save
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </div>
    );
};

export default HouseRulesForm;
