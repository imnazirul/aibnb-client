import { Form } from 'antd';
import React from 'react';
import FormInput from '../../../../components/form/input';

const Message: React.FC = () => {
    return (
        <div>
            <h3 className='text-title_sss my-8'>Still have questions? Message the Host</h3>
            <Form>
                <Form.Item className=''>
                    <FormInput
                        textArea={true}
                        name='message'
                        placeholder="Hi Helena, I'll be visiting"
                        className='w-full'
                    />
                </Form.Item>
                <button
                    type='button'
                    className='border border-main rounded-lg flex w-fit px-6 py-3 mt-6'
                >
                    Show all reviews
                </button>
            </Form>
        </div>
    );
};

export default Message;
