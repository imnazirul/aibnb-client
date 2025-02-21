import { Form, Switch } from 'antd';
import React, { useState } from 'react';
import Icon from '../../../../../../../components/common/icon';
import CustomModal from '../../../../../../../components/common/custom-modal';
import Button from '../../../../../../../components/common/button';
import Textarea from '../../../add-old/forms/textarea';

const BookForm = () => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    return (
        <div className='md:mt-0 mt-5'>
            <label className='text-main text-title_lg capitalize'>Instant Book</label>
            <div className='md:mt-0 mt-10'></div>
            <div className="flex justify-between items-start md:mt-10 mt-5">
                <div className="book_form lg:w-[727px]">
                    <label className='text-h4 text-main'>Where you’ve been</label>
                    <p>
                        Turn on to automatically accept bookings. Turn off to manually accept or decline booking requests.
                    </p>
                </div>
                <Form.Item name="booking_request" valuePropName="checked" initialValue={false}>
                    <Switch onChange={checked => console.log(`switch to ${checked}`)} />
                </Form.Item>
            </div>

            <div className="flex justify-between md:mt-10 mt-5 lg:w-[727px]">
                <div className="book_form">
                    <label>Optional settings</label>
                    <p>
                        These settings are available when Instant Book is on. Guests who don’t meet these requirements can send booking requests.
                    </p>
                </div>
            </div>

            <div className="flex justify-between md:mt-10 mt-5">
                <div className="book_form lg:w-[727px]">
                    <label>good track record</label>
                    <p>
                        Only allow guests who have stayed on Airbnb without incidents or negative reviews.
                    </p>
                </div>
                <Form.Item name="track_record" valuePropName="checked" initialValue={false}>
                    <Switch onChange={checked => console.log(`switch to ${checked}`)} />
                </Form.Item>
            </div>

            <div className="flex justify-between md:py-10 py-5 cursor-pointer" onClick={() => setOpen(true)}>
                <div className="book_form">
                    <label>per-booking message</label>
                    <p>
                        Turn on to automatically accept bookings. Turn off to manually accept or decline booking requests.
                    </p>
                </div>
                <Icon name='arrow-right' width={"40"} />
            </div>

            <CustomModal open={open} setOpen={setOpen} title="Pre-booking message">
                <div className='my-2'>
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={(values) => {
                            setOpen(false);
                            console.log(values)
                        }}
                    >
                        <Textarea name="title" label="Title" placeholder="Input your message" required={true} />

                        <div className='border-t mt-7' />
                        <div className="flex justify-between items-center mt-4">
                            <div onClick={() => setOpen(false)}
                                className='text-main text-p underline !cursor-pointer'>
                                Close
                            </div>
                            <Button className="text-white">Save</Button>
                        </div>
                    </Form>
                </div>
            </CustomModal>
        </div>
    );
};

export default BookForm;
