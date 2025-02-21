import { Form, Switch } from 'antd';
import React, { useState } from 'react';
import Icon from '../../../../../../../components/common/icon';
import CustomModal from '../../../../../../../components/common/custom-modal';
import Textarea from '../../../add/forms/textarea';
import Button from '../../../../../../../components/common/button';

const BookingType = ({ data, form, handleSubmit }) => {
    const [checked, setChecked] = useState<boolean>(data?.booking_type === 'instant');
    const [open, setOpen] = useState(false);

    const handleSwitchChange = (checked) => {
        setChecked(checked);
        const bookingType = checked ? "instant" : "request";
        form.setFieldsValue({ booking_type: bookingType });
    };

    const handleFinish = (values) => {
        handleSubmit(values);
        setOpen(false);
    };

    return (
        <div className='my-5 md:my-5 px-36'>
            <h3 className='text-title_lg text-main capitalize'>Instant Book</h3>
            <div className="flex justify-between items-start md:mt-10 mt-5">
                <div className="book_form lg:w-[727px]">
                    <label className='text-h4 text-main'>Where you’ve been</label>
                    <p>
                        Turn on to automatically accept bookings. Turn off to manually accept or decline booking requests.
                    </p>
                </div>
                <Form.Item name="booking_type"
                    initialValue={data?.booking_type}>
                    <Switch checked={checked} onChange={handleSwitchChange} />
                </Form.Item>
            </div>
            {
                data?.booking_type === 'instant' ?
                    <>
                        <div className="flex justify-between md:py-10 py-5 cursor-pointer" onClick={() => setOpen(true)}>
                            <div className="book_form">
                                <label>per-booking message</label>
                                <p>Require guests to read and respond to a message before they confirm their reservation.</p>
                            </div>
                            <Icon name='arrow-right' width={"40"} />
                        </div>
                        <CustomModal open={open} setOpen={setOpen} title="Pre-booking message">
                            <div className='my-2'>
                                <Form
                                    layout="vertical"
                                    form={form}
                                    onFinish={handleFinish}
                                >
                                    <Textarea name="pre_booking_msg" label="" placeholder="Input your message" required={true} />

                                    <div className='border-t mt-7' />
                                    <div className="flex justify-between items-center mt-4">
                                        <div onClick={() => setOpen(false)}
                                            className='text-main text-p underline !cursor-pointer'>
                                            Close
                                        </div>
                                        <Button className="text-white !bg-black">Save</Button>
                                    </div>
                                </Form>
                            </div>
                        </CustomModal>
                    </>
                    :
                    null
            }
        </div>
    );
};

export default BookingType;