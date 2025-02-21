"use client";
import { Form, Steps } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useAction, useFetch } from '../../../../../helpers/hooks';
import { fetchPropertyElements, postProperty } from '../../../../../helpers/backend';
import { useUser } from '../../../../../contexts/user';
import Icon from '../../../../../components/common/icon';
import Overview from './steps/overview';
import AboutYourPlace from './steps/about-place';
import PlaceCategory from './steps/place-category';
import TypePlace from './steps/type-place';
import PlaceLocated from './steps/located';
import BasicsPlace from './steps/basics-place';
import Bathrooms from './steps/bathrooms';
import Occupancy from './steps/occupancy';
import StandOut from './steps/stand-out';
import Amenities from './steps/amenities';
import Title from './steps/title';
import Tags from './steps/tags';
import Description from './steps/description';
import FinishSetup from './steps/finish-setup';
import Reservations from './steps/reservations';
import FirstReservation from './steps/first-reservation';
import Apartment from './steps/apartment';
import PriceInput from './forms/price-input';
import Preview from './steps/preview';
import Discounts from './steps/discounts';
import LastStep from './steps/last-step';
import MainView from './steps/main-view';
import Link from 'next/link';
import QuestionsModal from './steps/questions';
const { Step } = Steps;

const steps = Array.from({ length: 23 }, (_, i) => i + 1);

const CreateNewProperties = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [form] = Form.useForm()
    const { user } = useUser();
    const [current, setCurrent] = useState<number>(0);
    console.log("🚀 ~ CreateNewProperties ~ current:", current)
    const router = useRouter();
    const next = () => {
        console.log("next");
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
        const images = form.getFieldValue('images')
        const originalFiles = images?.map((image: any) => image?.originFileObj)?.filter(Boolean);

        // return console.log("value", {
        //     ...values,
        //     images: originalFiles
        // });
        return useAction(postProperty, {
            ...values,
            publish: true,
            images: originalFiles
        }, () => {
            router.push('/host/listings')
        })
    }

    return (
        <div className="container py-5">
            <div className='flex items-center justify-end gap-4 flex-grow'>
                <button type='button' onClick={() => setOpen(true)} className='px-4 py-1 border rounded-[40px] hover:border-black'>
                    Questions?
                </button>
                <Link href={'/host/listings'} className='px-4 py-1 border rounded-[40px] hover:border-black'>
                    Exit
                </Link>
            </div>
            <MainView>
                <Form form={form} layout="vertical" onFinish={handleSubmit} className='listing-form'>

                    <div className="h-[calc(100vh-250px)] md:h-[calc(100vh-220px)] overflow-y-auto">
                        <div style={{ display: current === 0 ? '' : 'none' }} className="flex items-center justify-center w-full h-full">
                            <div className='flex flex-col justify-center text-start md:w-[630px] w-fit'>
                                <h2 className='text-xlSemiBold'>Welcome back, {user?.name}</h2>
                                <h3 className='text-pt my-10'>Start a new listing</h3>
                                <div onClick={() => setCurrent(1)}
                                    role='button' className='flex items-center justify-between border-b pb-4'>
                                    <div className='flex items-center gap-3'>
                                        <Icon name='home' />
                                        <span className='text-p2'>Create new listing</span>
                                    </div>
                                    <Icon name={"right-arrow"} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: current === 1 ? '' : 'none' }} className='max-w-[1200px] mx-auto flex items-center justify-center'>
                            <Overview />
                        </div>

                        <div style={{ display: current === 2 ? '' : 'none' }} className='max-w-[1200px] mx-auto flex items-center justify-center'>
                            <AboutYourPlace />
                        </div>
                        <div style={{ display: current === 3 ? '' : 'none' }} className='max-main-section'>
                            <PlaceCategory elements={elements} />
                        </div>
                        <div style={{ display: current === 4 ? '' : 'none' }} className='max-main-section'>
                            <TypePlace />
                        </div>
                        <div style={{ display: current === 5 ? '' : 'none' }} className='max-main-section'>
                            <PlaceLocated form={form} />
                        </div>
                        <div style={{ display: current === 6 ? '' : 'none' }} className='max-main-section'>
                            <BasicsPlace form={form} />
                        </div>

                        <div style={{ display: current === 7 ? '' : 'none' }} className=''>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <div className="max-main-section">
                                        <Bathrooms form={form} />
                                    </div> : <div className="md:min-w-[950px] mx-auto flex items-center justify-center">
                                        <StandOut />
                                    </div>
                            }
                        </div>
                        <div style={{ display: current === 8 ? '' : 'none' }} className={`${form.getFieldValue('type') === 'private_room' ? 'h-full main-section' : 'max-main-section'} `}>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <Occupancy /> : <Amenities elements={elements} />
                            }
                        </div>
                        <div style={{ display: current === 9 ? '' : 'none' }} className='md:min-w-[950px] mx-auto flex items-center justify-center'>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <StandOut /> : <Apartment form={form} />
                            }
                        </div>
                        <div style={{ display: current === 10 ? '' : 'none' }} className={`${form.getFieldValue('type') === 'private_room' ? 'max-main-section' : 'h-full max-main-section'}`}>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <Amenities elements={elements} /> : <Title />
                            }
                        </div>
                        <div style={{ display: current === 11 ? '' : 'none' }} className={`${form.getFieldValue('type') === 'private_room' ? 'main-section' : 'h-full max-main-section'}`}>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <Apartment form={form} /> : <Tags elements={elements} />
                            }
                        </div>
                        <div style={{ display: current === 12 ? '' : 'none' }} className='max-main-section mx-auto h-full'>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <Title /> : <Description />
                            }
                        </div>
                        <div style={{ display: current === 13 ? '' : 'none' }} className='main-section-lg h-full'>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <Tags elements={elements} /> : <FinishSetup />
                            }
                        </div>
                        <div style={{ display: current === 14 ? '' : 'none' }} className='max-main-section h-full mx-auto flex items-center justify-center'>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <Description /> : <Reservations />
                            }
                        </div>
                        <div style={{ display: current === 15 ? '' : 'none' }} className={`${form.getFieldValue('type') === 'private_room' ? 'main-section-lg h-full' : 'h-full max-main-section'}`}>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <FinishSetup /> : <FirstReservation />
                            }
                        </div>
                        <div style={{ display: current === 16 ? '' : 'none' }} className='max-main-section h-full'>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <Reservations /> : <PriceInput form={form} />
                            }
                        </div>
                        <div style={{ display: current === 17 ? '' : 'none' }} className='max-main-section h-full'>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <FirstReservation /> : <Discounts />
                            }
                        </div>
                        <div style={{ display: current === 18 ? '' : 'none' }} className='max-main-section mx-auto flex items-center justify-center h-full'>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <PriceInput form={form} /> : <LastStep elements={elements} />
                            }
                        </div>
                        <div style={{ display: current === 19 ? '' : 'none' }} className='md:max-w-[750px] mx-auto flex items-center justify-center h-full'>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <Discounts /> : <Preview data={preview} />
                            }
                        </div>
                        <div style={{ display: current === 20 ? '' : 'none' }} className='max-main-section mx-auto flex items-center justify-center h-full'>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <LastStep elements={elements} /> : ''
                            }
                        </div>
                        <div style={{ display: current === 21 ? '' : 'none' }} className='md:max-w-[950px]  mx-auto flex items-center justify-center'>
                            {
                                form.getFieldValue('type') === 'private_room' ?
                                    <Preview data={preview} /> : ''
                            }
                        </div>
                    </div>
                    <div style={{ display: current === 0 ? 'none' : 'block' }} className=''>
                        {
                            current === 0 ? '' : <Buttons setPreview={setPreview} next={next} form={form} current={current} router={router} prev={prev}
                                isTouchend={() => {
                                    if (current === 1 || current === 2 || current === 6 || current === 7 || current === 8 || current === 9 || current === 19 || current === 20 || current === 21 || current === 22
                                    ) {
                                        return true;
                                    }
                                    if (current === 3) {
                                        return form.isFieldTouched('category')
                                    }
                                    if (current === 4) {
                                        return form.isFieldTouched('type')
                                    }
                                    if (current === 5) {
                                        return form.isFieldTouched(['location', 'country']);
                                    }
                                    if (current === 10) {
                                        return form.getFieldValue('type') === 'private_room' ? true : form.isFieldTouched('title');
                                    }
                                    if (current === 11) {
                                        return form.getFieldValue('type') === 'private_room' ? true : form.isFieldTouched('tags');
                                    }
                                    if (current === 12) {
                                        return form.getFieldValue('type') === 'private_room' ? form.isFieldTouched('title') : form.isFieldTouched('description');
                                    }
                                    if (current === 13) {
                                        return form.getFieldValue('type') === 'private_room' ? form.isFieldTouched('tags') : true;
                                    }
                                    if (current === 14) {
                                        return form.getFieldValue('type') === 'private_room' ? form.isFieldTouched('description') : form.isFieldTouched('booking_type');
                                    }
                                    if (current === 15) {
                                        return form.getFieldValue('type') === 'private_room' ? true : form.isFieldTouched('reservation_type');
                                    }
                                    if (current === 16) {
                                        return form.getFieldValue('type') === 'private_room' ? form.isFieldTouched('booking_type') : form.isFieldTouched('price');
                                    }
                                    if (current === 17) {
                                        return form.getFieldValue('type') === 'private_room' ? form.isFieldTouched('reservation_type') : true
                                    }
                                    if (current === 18) {
                                        return form.getFieldValue('type') === 'private_room' ? form.isFieldTouched('price') : true
                                    }
                                    return form.isFieldTouched(current)
                                }}

                            />
                        }
                    </div>
                </Form>
            </MainView>
            <QuestionsModal
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
};

export default CreateNewProperties;

const Buttons = ({ current, router, prev, isTouchend, form, next, setPreview }) => {
    return (
        <>
            <div className="flex justify-between items-center border-t-2 pt-3">
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

                    <Form.Item noStyle shouldUpdate>
                        {() => (
                            <button
                                onClick={() => {
                                    if (current === (form.getFieldValue('type') === 'private_room' ? 20 : 18)) {
                                        form.validateFields().then(values => {
                                            const images = form.getFieldValue('images');
                                            setPreview({
                                                ...values,
                                                images
                                            });
                                            window.scrollTo({
                                                top: 0,
                                                behavior: 'smooth'
                                            });
                                        }).catch(e => {
                                            console.log(e);
                                        });
                                        next();
                                    } else {
                                        next();
                                    }
                                }}
                                disabled={!isTouchend()}
                                // type={current < (form.getFieldValue('type') === 'private_room' ? 21 : 19) ? 'button' : 'submit'}
                                type={
                                    current === (form.getFieldValue('type') === 'private_room' ? 22 : 20) ? 'submit' : 'button'
                                }
                                className="bg-black text-white font-semibold disabled:opacity-30 md:w-[140px] w-[100px] h-14 rounded-md">
                                {
                                    current === 1 ? 'Get Started' :
                                        current < (form.getFieldValue('type') === 'private_room' ? 21 : 19) ? 'Next' : 'Done'

                                }
                            </button>
                        )}
                    </Form.Item>
                </div>
            </div >
        </>
    )
}
