'use client'

import React, {useState} from 'react';
import {Form, Steps} from 'antd';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Button from '../../../../../components/common/button';
import Step3 from './steps/step3';
import {useAction, useFetch} from "../../../../../helpers/hooks";
import {fetchPropertyElements, postProperty} from "../../../../../helpers/backend";
import {useRouter} from 'next/navigation';
import Preview from './steps/preview';

const {Step} = Steps;

const steps = [
    {
        title: 'Step 1',
    },
    {
        title: 'Step 2',
    },
    {
        title: 'Step 2',
    }
];

const CreateProperties: React.FC = () => {
    const [form] = Form.useForm()
    const [current, setCurrent] = useState<number>(0);
    const router = useRouter();
    const next = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        setCurrent(current + 1);
    }

    const prev = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        setCurrent(current - 1);
    }

    const [preview, setPreview] = useState(null)

    const [elements] = useFetch(fetchPropertyElements)

    const handleSubmit = async (values: any) => {
        return useAction(postProperty, values, () => {
            router.push('/host/listings')
        })
    }

    return (
        <>
            <div style={{display: !!preview ? undefined : 'none'}}>
                <Preview
                    data={preview}
                    onBack={() => setPreview(null)}
                    onSubmit={(publish: any) => {
                        let values = {...preview, publish}
                        return handleSubmit(values)
                    }}
                />
            </div>
            <div style={{display: !!preview ? 'none' : undefined}}>
                <div className="container">
                    <p className='text-xlMedium'>
                        Step <span className='text-primary'>{current + 1}</span> of {steps.length}
                    </p>
                    <Steps current={current} className="custom-steps mt-4">
                        {steps.map((item, index) => (
                            <Step key={index} title={item.title}/>
                        ))}
                    </Steps>
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <div className="steps-content mt-6">
                            <div style={{display: current === 0 ? 'block' : 'none'}}>
                                <Step1 elements={elements}/>
                            </div>
                            <div style={{display: current === 1 ? 'block' : 'none'}}>
                                <Step2 elements={elements} required={current === 1}/>
                            </div>
                            <div style={{display: current === 2 ? 'block' : 'none'}}>
                                <Step3 elements={elements} required={current === 2}/>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className='border-t mt-10 pt-6'>
                    <div className="flex justify-between items-center">
                        <div className='text-main text-p underline !cursor-pointer' onClick={() => {
                            if (current === 0) {
                                router.back()
                            } else {
                                prev()
                            }
                        }}>
                            Back
                        </div>
                        <div className="flex gap-x-6">
                            {/*<Button className="text-primary border border-primary bg-white text-p h-14">Save and Exit</Button>*/}
                            <Button className="text-white text-p lg:w-[140px] h-14" onClick={() => {
                                form.validateFields().then(values => {
                                    if (current < steps.length - 1) {
                                        next()
                                    } else {
                                        setPreview(values)
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth'
                                        })
                                    }
                                }).catch(e => {

                                })
                            }}>
                                {current < steps?.length - 1 ? 'Next' : 'Done'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateProperties;
