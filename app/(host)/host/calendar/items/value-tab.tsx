import { useState } from "react";
import { Form } from "antd";
import { HiddenInput } from "../../../../../components/form/input";
import PriceInput from "../input/price";
import TabView from "./tab";
import { useAction } from "../../../../../helpers/hooks";
import { patchProperty } from "../../../../../helpers/backend";
import AvailabilityInput from "../input/availability";
import DiscountInput from "../input/discount";
import MoreDiscount from "./more-discount";
import MoreDiscountInput from "../input/discount-input";
import Promotion from "./promotion";
import ExtraFees from "./extra-fee";
import DayInput from "../input/nights";
import CustomTrip from "./custom-trip";
import TripLength from "../input/trip-length";
import Restricted from "./restricted";

const ValueTab = ({ currentTab, setTab, form, onReload, data, selected}) => {
    let title = {
        'price': 'Per Night',
        'custom_price': 'Per Night',
        'weekend_price': 'Custom Weekend Price',
        'availability': 'Availability',
        'weekly_discount': 'Weekly Discount',
        'monthly_discount': 'Monthly Discount',
        'early_discount': 'Early bird discount',
        'last_discount': 'Last-minute discount',
        'stay': 'Cleaning fee',
        'pet': 'Pet fee',
        'guest': 'Extra guest fee',
        'min_nights': 'Minimum nights',
        'max_nights': 'Maximum nights',
    }[currentTab] || ''

    let subtitle = {
        'weekend_price': 'Fri and Sat nights',
        'availability': 'Selected nights have mixed availability.',
        'weekly_discount': 'Average for a 7-night stay',
        'monthly_discount': 'Average for a 30-night stay',
        'early_discount': 'For reservations booked 1 to 24 months before arrival.',
        'last_discount': 'For reservations booked 1 to 28 days before arrival.',
        'stay': 'Per stay',
        'guest': 'Per night',
    }[currentTab] || ''

    const settingsTabs = ['price', 'weekend_price', 'weekly_discount', 'monthly_discount', 'more_discount', 'early_discount', 'last_discount', 'promotion', 'extra_fees', 'stay', 'pet', 'guest', 'min_nights', 'max_nights', 'custom_length', 'custom_trip_length', 'restricted']
    const customTabs = ['availability', 'custom_price']
    const tab = [...settingsTabs, ...customTabs]?.includes(currentTab) ? currentTab : 'none'

    const onBack = () => {
        if (customTabs?.includes(currentTab)) {
            setTab('custom_pricing')
        } else {
            setTab('settings')
        }
    }

    return (
        <TabView value={tab} current={currentTab}>
            <div className="p-6">
                <div className={['availability']?.includes(currentTab) ? 'text-left' : 'text-center'}>
                    <p className="font-semibold text-gray-800">{title}</p>
                    <p className="text-gray-600">{subtitle}</p>
                </div>
                <Form form={form} onFinish={values => {
                    if (currentTab === 'last_discount') {
                        values = { uid: data.uid, discounts: { lasts: [...data.discounts.lasts, { days: values.discounts.lasts[0].days, discount: values.discounts.lasts[0].discount }] } }
                    }
                    // return console.log(values) 
                    return useAction(patchProperty, values, () => {
                        onReload()
                        onBack()
                    }, false,)
                }}>
                    <HiddenInput name="uid" />
                    {customTabs?.includes(currentTab) && (
                        <HiddenInput name={['custom', 'dates']} />
                    )}
                    <div className="py-8">
                        {['price', 'weekend_price']?.includes(currentTab) && <PriceInput name={currentTab} />}
                        {currentTab === 'availability' && <AvailabilityInput />}
                        {currentTab === 'custom_price' && <PriceInput name={['custom', 'price']} />}
                        {currentTab === 'weekly_discount' && <DiscountInput name={['discounts', 'weekly']} form={form} />}
                        {currentTab === 'monthly_discount' && <DiscountInput name={['discounts', 'monthly']} form={form} />}
                        {currentTab === 'more_discount' && <MoreDiscount onBack={onBack} setTab={setTab} form={form} data={data} onReload={onReload} />}
                        {currentTab === 'early_discount' && <MoreDiscountInput name={[['discounts', 'early', 'months'], ['discounts', 'early', 'discount']]} form={form} />}
                        {currentTab === 'last_discount' && <MoreDiscountInput name={[['discounts', 'lasts', 'days'], ['discounts', 'lasts', 'discount']]} form={form} />}
                        {currentTab === 'promotion' && <Promotion onBack={onBack} data={data} onReload={onReload} />}
                        {currentTab === 'extra_fees' && <ExtraFees onBack={onBack} data={data} form={form} setTab={setTab} />}
                        {['stay', 'pet', 'guest']?.includes(currentTab) && <PriceInput name={['fees', currentTab]} />}
                        {['min_nights', 'max_nights']?.includes(currentTab) && <DayInput data={data} name={['availability' ,currentTab]} />}
                        {currentTab === 'custom_length' && <CustomTrip data={data} onBack={onBack} setTab={setTab} form={form} onReload={onReload} />}
                        {currentTab === 'custom_trip_length' && <TripLength data={data} onBack={onBack} selected={selected} />}
                        {currentTab === 'restricted' && <Restricted onBack={onBack} form={form} />}
                    </div>

                    {
                        (currentTab != 'more_discount' && currentTab != 'promotion' && currentTab != 'extra_fees' && currentTab != 'custom_length'
                            && currentTab != 'custom_trip_length') && (
                            <Buttons
                                isTouchend={() => {
                                    if (currentTab === 'availability') {
                                        return form.getFieldValue(['custom', 'open']) !== undefined
                                    }
                                    if (currentTab === 'custom_price') {
                                        return form.isFieldTouched(['custom', 'price'])
                                    }
                                    if (currentTab === 'weekly_discount') {
                                        return form.isFieldTouched(['discounts', 'weekly'])
                                    }
                                    if (currentTab === 'monthly_discount') {
                                        return form.isFieldTouched(['discounts', 'monthly'])
                                    }
                                    if (currentTab === 'early_discount') {
                                        return form.isFieldTouched(['discounts', 'early', 'months']) || form.isFieldTouched(['discounts', 'early', 'discount'])
                                    }
                                    if (currentTab === 'last_discount') {
                                        return form.isFieldTouched(['discounts', 'lasts']) || form.isFieldTouched(['discounts', 'lasts'])
                                    }
                                    if (currentTab === 'stay') {
                                        return form.isFieldTouched(['fees', 'stay'])
                                    }
                                    if (currentTab === 'pet') {
                                        return form.isFieldTouched(['fees', 'pet'])
                                    }
                                    if (currentTab === 'guest') {
                                        return form.isFieldTouched(['fees', 'guest'])
                                    }
                                    if (currentTab === 'min_nights') {
                                        return form.isFieldTouched(['availability', 'min_nights'])
                                    }
                                    if (currentTab === 'max_nights') {
                                        return form.isFieldTouched(['availability', 'max_nights'])
                                    }
                                    if (currentTab === 'restricted') {
                                        return form.isFieldTouched(['availability', 'restricted_checkin'] || form.isFieldTouched(['availability', 'restricted_checkout']))
                                    }
                                    return form.isFieldTouched(currentTab)
                                }}
                                onBack={onBack}
                            />
                        )
                    }
                </Form>
            </div>
        </TabView>
    )

}

export default ValueTab


const Buttons = ({ onBack, isTouchend }) => {
    return (
        <>

            <div className="flex flex-col gap-4">
                <Form.Item noStyle shouldUpdate>
                    {() => (
                        <button
                            disabled={!isTouchend()}
                            className="w-full bg-black text-white font-semibold disabled:opacity-30 p-2.5 rounded-md">
                            Save
                        </button>
                    )}
                </Form.Item>
                <button
                    type="button"
                    className="w-full border font-semibold border-black p-2.5 rounded-md"
                    onClick={onBack}>
                    Cancel
                </button>
            </div>
        </>
    )
}