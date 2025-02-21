import React, { useState } from 'react';
import Icon from '../../../../../../../components/common/icon';
import { Drawer, Form, Radio, Space, Switch } from 'antd';
import Button from '../../../../../../../components/common/button';

const CancellationPolicy = ({ form, handleSubmit }) => {
    const [open, setOpen] = useState(false);
    const [identityType, setIdentityType] = useState('')
    const [identity, setIdentity] = useState('')
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleFinish = (values) => {
        handleSubmit(values);
        setOpen(false);
    };

    return (
        <div className='cancellation'>
            <h1 className='text-main text-title_lg mb-10'>Cancellation Policy</h1>
            <div className='flex flex-col gap-2'>
                <p className='text-h5 text-main'>Standard policy</p>
                <span className='text-p2 text-secondaryText'>Applies to any stays under 28 nights.</span>
            </div>
            <div className='flex flex-col gap-6 mt-6 border-b-2 pb-10'>
                <div className='cancellation_container'
                    onClick={() => { showDrawer(); setIdentity('flexible') }}>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col text-p2'>
                            <span className='text-main'>Flexible</span>
                            <span className='text-secondaryText text-wrap'>Guests get a full refund if they cancel up to a day before check-in.</span>
                        </div>
                        <Icon name={'edit-icon'} />
                    </div>
                </div>
                <div className='border-2 rounded-md px-3 py-4'>
                    <div className='flex justify-between items-center gap-10'>
                        <div className='flex flex-col text-p2'>
                            <span className='text-main'>Non-refundable</span>
                            <span className='text-secondaryText text-wrap'>In addition to Flexible, offer a non-refundable option—guests pay 10% less, but you keep your payout no matter when they cancel.</span>
                        </div>
                        <Form.Item name={['standard', 'non_refundable']} valuePropName="checked">
                            <Switch onChange={checked => console.log(`switch to ${checked}`)} />
                        </Form.Item>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-6 my-10'>
                <div className='flex flex-col gap-2'>
                    <p className='text-h5 text-main'>Long-term stay policy</p>
                    <span className='text-p2 text-secondaryText'>Applies to stays 28 nights or longer.</span>
                </div>
                <div className='cancellation_container' onClick={() => { showDrawer(); setIdentity('firm') }}>
                    <div className='flex justify-between items-center gap-10'>
                        <div className='flex flex-col text-p2'>
                            <span className='text-main'>Firm</span>
                            <span className='text-secondaryText text-wrap'>Full refund up to 30 days before check-in. After that, the first 30 days of the stay are non-refundable.</span>
                        </div>
                        <Icon name={'edit-icon'} />
                    </div>
                </div>
            </div>

            <Drawer title={<h2 className='text-main text-h4'>Choose your standard policy</h2>} onClose={onClose} open={open} >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <div className='flex flex-col cancel_drawer'>
                        <Form.Item name={identity}>
                            <Radio.Group onChange={e => setIdentityType(e.target.value)} name='role'
                                value={identityType} className='mb-4'>
                                <Space direction="vertical" className='gap-6'>
                                    {
                                        identity === "flexible" &&
                                        <>
                                            <Radio className='cancellation_radio'
                                                value={"flexible"}>
                                                <div className='flex flex-col'>
                                                    <span className='text-main text-p'>Flexible</span>
                                                    <span className='text-secondaryText text-wrap'>Guests get a full refund if they cancel up to a day before check-in.</span>
                                                </div>
                                            </Radio>
                                            <Radio className='cancellation_radio' value={"moderate"}>
                                                <div className='flex flex-col'>
                                                    <span className='text-main text-p'>Moderate</span>
                                                    <span className='text-secondaryText text-wrap'>Guests get a full refund if they cancel up to a day before check-in.</span>
                                                </div>
                                            </Radio>
                                            <Radio className='cancellation_radio' value={"firm"}>
                                                <div className='flex flex-col'>
                                                    <span className='text-main text-p'>Firm</span>
                                                    <span className='text-secondaryText text-wrap'>Guests get a full refund if they cancel up to a day before check-in.</span>
                                                </div>
                                            </Radio>
                                            <Radio className='cancellation_radio' value={"strict"}>
                                                <div className='flex flex-col'>
                                                    <span className='text-main text-p'>Strict</span>
                                                    <span className='text-secondaryText text-wrap'>Guests get a full refund if they cancel up to a day before check-in.</span>
                                                </div>
                                            </Radio>
                                        </>
                                    }
                                    {
                                        identity === "firm" &&
                                        <>
                                            <Radio className='cancellation_radio'
                                                value={"firm"}>
                                                <div className='flex flex-col'>
                                                    <span className='text-main text-p'>Firm</span>
                                                    <span className='text-secondaryText text-wrap'>Guests get a full refund if they cancel up to a day before check-in.</span>
                                                </div>
                                            </Radio>
                                            <Radio className='cancellation_radio' value={"strict"}>
                                                <div className='flex flex-col'>
                                                    <span className='text-main text-p'>Strict</span>
                                                    <span className='text-secondaryText text-wrap'>Guests get a full refund if they cancel up to a day before check-in.</span>
                                                </div>
                                            </Radio>
                                        </>
                                    }
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <div className="flex justify-between items-center">
                            <div onClick={() => onClose()}
                                className='text-main text-h5 underline !cursor-pointer'>
                                Close
                            </div>
                            <Button type='submit' className="text-white">Save</Button>
                        </div>
                    </div>
                </Form>
            </Drawer>

        </div>
    );
};

export default CancellationPolicy;