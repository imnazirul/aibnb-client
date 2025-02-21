import React from 'react';
import TabView from './tab';
import { Form } from 'antd';
import { useAction } from '../../../../../../../helpers/hooks';
import { patchProperty } from '../../../../../../../helpers/backend';
import Title from '../forms/title';
import PropertyEdit from '../forms/property-type';
import PropertyLocationEdit from '../forms/property-location';
import GuestsEdit from '../forms/guests';
import PropertyDescriptionEdit from '../forms/description-edit';
import PropertyAboutHostEdit from '../forms/about-host';
import Amenities from '../forms/amenities';
import BookingType from '../forms/book-type';
import Phototour from '../forms/photo-tour';

const MainSection = ({ data, getData, elements, setSection, section, form }) => {
    let title = {
        'title': 'Title',
        'property_type': 'Property Type',
        'location': 'Location',
        'about_host': 'About the host',
        'amenities': 'Amenities',
        'booking_type': 'Booking Type',
        'photo_tour': 'Photo Tour',
        'last_discount': 'Last-minute discount',
        'stay': 'Cleaning fee',
        'pet': 'Pet fee',
        'guest': 'Extra guest fee',
        'min_nights': 'Minimum nights',
        'max_nights': 'Maximum nights',
    }[section] || ''

    const yourSpace = ['title', 'property_type', 'location', 'guests', 'description', 'about_host', 'amenities', 'booking_type', 'photo_tour']
    const arrivalGuide = ['weekend_price', 'availability']
    const tab = [...yourSpace, ...arrivalGuide]?.includes(section) ? section : 'none'

    const handleSubmit = async (values) => {
        // return console.log(values)
        return useAction(patchProperty, { uid: data.uid, ...values }, () => {
            getData()
        })
    }
    return (
        <div className=''>
            <TabView value={tab} current={section}>

                <Form form={form} layout='vertical' onFinish={handleSubmit}>
                    {/* <HiddenInput name="uid" /> */}
                    <div className="h-[calc(100vh-250px)] md:h-[calc(100vh-170px)] overflow-y-auto">

                        {section === 'photo_tour' && <Phototour form={form} handleSubmit={handleSubmit} data={data} />}
                        {section === 'title' && <Title />}
                        {section === 'property_type' && <PropertyEdit categories={elements?.categories} data={data} form={form} />}
                        {section === 'guests' && <GuestsEdit data={data} />}
                        {section === 'description' && <PropertyDescriptionEdit data={data} />}
                        {section === 'location' && <PropertyLocationEdit data={data} />}
                        {section === 'about_host' && <PropertyAboutHostEdit form={form} data={data} handleSubmit={handleSubmit} />}
                        {section === 'amenities' && <Amenities form={form} data={data} elements={elements?.amenities} handleSubmit={handleSubmit} />}
                        {section === 'booking_type' && <BookingType data={data} form={form} handleSubmit={handleSubmit} />}
                    </div>

                    {
                        (section != 'about_host' && section != 'amenities' && section != 'photo_tour' && section != 'custom_length'
                            && section != 'custom_trip_length') && (
                            <Buttons
                                isTouchend={() => {
                                    if (section === 'title') {
                                        return form.isFieldTouched('title')
                                    }
                                    if (section === 'property_type') {
                                        return form.isFieldTouched('category') || form.isFieldTouched('type') || form.isFieldTouched('beds') || form.isFieldTouched('bedrooms')
                                            || form.isFieldTouched('bathrooms')
                                    }
                                    if (section === 'location') {
                                        return form.isFieldTouched('location')
                                    }
                                    if (section === 'guests') {
                                        return form.isFieldTouched('guests')
                                    }
                                    if (section === 'description') {
                                        return form.isFieldTouched('description')
                                    }
                                    if (section === 'booking_type') {
                                        return form.isFieldTouched('booking_type')
                                    }
                                    return false
                                }}
                            />
                        )
                    }
                </Form>
            </TabView>

        </div>
    );
};

export default MainSection;


const Buttons = ({ isTouchend }) => {
    return (
        <>

            <div className="flex flex-col gap-4 border-t-2 pt-4">
                <Form.Item noStyle shouldUpdate>
                    {() => (
                        <button
                            disabled={!isTouchend()}
                            className="ml-auto w-[140px] bg-black text-white font-semibold disabled:opacity-30 p-2.5 rounded-md">
                            Save
                        </button>
                    )}
                </Form.Item>
            </div>
        </>
    )
}