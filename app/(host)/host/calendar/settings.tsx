import {Collapse, ConfigProvider, Form, message, Switch, Tabs} from "antd";
import {useEffect, useState} from "react";
import TabView from "./items/tab";
import ValueTab from "./items/value-tab";
import CustomPricing from "./items/custom";
import {useAction} from "../../../../helpers/hooks";
import {patchProperty} from "../../../../helpers/backend";
import FormSwitch from "../../../../components/form/switch";
import Icon from "../../../../components/common/icon";
import {IoIosArrowDown} from "react-icons/io";
import CheckInput from "./input/check-input";
import {FiX} from "react-icons/fi";

const Settings = ({selected, setSelected, data, getData}) => {

    const [current, setCurrent] = useState('settings')
    const [form] = Form.useForm()
    useEffect(() => {
        if (current !== 'custom_trip_length') {
            setCurrent(selected?.length ? 'custom_pricing' : 'settings')
            if(selected?.length) {
                document.querySelector('.availability-setting')?.classList.add('show')
            } else {
                document.querySelector('.availability-setting')?.classList.remove('show')
            }
        }
    }, [selected])


    return (
        <>
            <ValueTab
                form={form}
                currentTab={current}
                onReload={getData}
                data={data}
                setTab={setCurrent}
                selected={selected}

            />

            <CustomPricing
                data={data}
                form={form}
                currentTab={current}
                onReload={getData}
                setTab={setCurrent}
                selected={selected}
                setSelected={setSelected}
            />

            <TabView value='settings' current={current}>
                {/* <div className="relative px-5 py-3">
                    <FiX
                        onClick={() => {
                            document.querySelector('.availability-setting')?.classList.remove('show')
                        }}
                        className="text-2xl cursor-pointer"
                    />
                </div> */}
                <div
                    className="md:py-8 px-6 h-[calc(100vh-48px)] md:h-[calc(100vh-100px)] overflow-y-auto relative">
                    <p className="text-2xl font-semibold mb-4">Settings</p>
                    <p className="text-gray-700 mb-6">
                        These apply to all nights, unless you customize them by date.
                    </p>
                    <ConfigProvider
                        theme={{
                            components: {
                                Tabs: {
                                    itemColor: '#374151',
                                    itemHoverColor: '#000000',
                                    itemSelectedColor: '#000000',
                                    itemActiveColor: '#000000',
                                    inkBarColor: '#000000',
                                    /* here is your component tokens */
                                },
                            },
                        }}>
                        <Tabs
                            defaultActiveKey="1"
                            items={[
                                {
                                    key: '1',
                                    label: 'Pricing',
                                    children: (
                                        <Pricing
                                            form={form}
                                            data={data}
                                            setTab={setCurrent}
                                            getData={getData}
                                        />
                                    ),
                                },
                                {
                                    key: '2',
                                    label: 'Availability',
                                    children: <Availability
                                        form={form}
                                        data={data}
                                        setTab={setCurrent}
                                        getData={getData}
                                    />,
                                },
                            ]}
                        />
                    </ConfigProvider>
                </div>
            </TabView>
        </>
    )
}

export default Settings


const Pricing = ({setTab, form, data, getData}) => {
    return (
        <div>
            <p className="text-lg font-semibold mb-2">Base Price</p>
            <div
                role="button"
                onClick={() => {
                    setTab('price')
                    form.resetFields()
                    form.setFieldsValue({uid: data.uid, price: data?.price})
                }}
                className="border rounded-lg p-6 mb-4">
                <p className="font-medium text-gray-700">Per Night</p>
                <p className="text-3xl font-semibold text-gray-700">${data?.price}</p>
            </div>
            <div className="border rounded-lg p-6">
                <div
                    role={!!data?.weekend_price ? 'button' : undefined}
                    onClick={() => {
                        if (!data?.weekend_price) return
                        setTab('weekend_price')
                        form.resetFields()
                        form.setFieldsValue({uid: data.uid, weekend_price: data?.weekend_price || data?.price})
                    }}
                    className="flex justify-between items-center">
                    <p className="font-medium text-gray-700 mb-1">Custom Weekend Price</p>
                    <a
                        onClick={() => {
                            setTab('weekend_price')
                            form.resetFields()
                            form.setFieldsValue({uid: data.uid, weekend_price: data?.weekend_price || data?.price})
                        }}
                        className="font-medium underline hover:text-black hover:underline">
                        {data?.weekend_price ? (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation()
                                    return useAction(patchProperty, {uid: data.uid, weekend_price: 0}, () => {
                                        getData()
                                    })
                                }}
                                className="px-2 py-1 hover:bg-gray-100 rounded-md">
                                Remove
                            </div>
                        ) : 'Add'}
                    </a>
                </div>
                {!!data?.weekend_price && (
                    <p className="text-3xl font-semibold text-gray-700">${data?.weekend_price}</p>
                )}
            </div>
            <div className='flex justify-between items-center border rounded-lg py-5 px-6 my-4'>
                <p className="font-medium text-main text-p">Smart Pricing</p>
                <Switch
                    className=""
                    value={data?.smart_pricing}
                    onChange={checked => useAction(patchProperty, {uid: data.uid, smart_pricing: checked}, () => {
                        getData()
                    }, false)}
                />
            </div>
            <p className="text-lg font-semibold">Discounts</p>
            <span className="text-gray-500">Adjust your pricing to attract more guests.</span>
            <div className="border rounded-lg px-5 py-2 mt-4">
                <div
                    role={!!data?.discounts?.weekly ? 'button' : undefined}
                    onClick={() => {
                        if (!data?.discounts?.weekly) return
                        setTab('weekly_discount')
                        form.resetFields()
                        form.setFieldsValue({
                            uid: data.uid,
                            discounts: {weekly: data?.discounts?.weekly},
                            price: data?.price
                        })
                    }}
                    className="">
                    <div className="flex flex-col">
                        <p className="font-medium text-main text-p">Weekly</p>
                        <span className="text-gray-500 text-xxs">For 7 nights or more</span>
                    </div>

                    {!!data?.discounts?.weekly ? (
                            <div className="flex justify-between items-end mt-2">
                                <p className="text-3xl font-semibold text-gray-700">{data?.discounts?.weekly}%</p>
                                <span className="text-gray-500">
                                Weekly average is ${(data?.price * 7 - (data?.price * 7 * (data?.discounts?.weekly / 100)))}
                            </span>
                            </div>
                        )
                        :
                        <div
                            onClick={() => {
                                setTab('weekly_discount')
                                form.resetFields()
                                form.setFieldsValue({uid: data.uid})
                            }}
                            className="flex mt-2 cursor-pointer w-fit">
                            <p className="font-medium text-main text-p underline py-1 hover:bg-gray-100 rounded-md">Add</p>
                        </div>
                    }
                </div>
            </div>

            <div className="border rounded-lg px-5 py-2 mt-4">
                <div
                    role={!!data?.discounts?.monthly ? 'button' : undefined}
                    onClick={() => {
                        if (!data?.discounts?.monthly) return
                        setTab('monthly_discount')
                        form.resetFields()
                        form.setFieldsValue({
                            uid: data.uid,
                            discounts: {monthly: data?.discounts?.monthly},
                            price: data?.price
                        })
                    }}
                    className="">
                    <div className="flex flex-col">
                        <p className="font-medium text-main text-p">Monthly</p>
                        <span className="text-gray-500 text-xxs">For 28 nights or more</span>
                    </div>

                    {!!data?.discounts?.monthly ? (
                            <div className="flex justify-between items-end mt-2">
                                <p className="text-3xl font-semibold text-gray-700">{data?.discounts?.monthly}%</p>
                                <span className="text-gray-500">
                                Weekly average is ${(data?.price * 30 - (data?.price * 30 * (data?.discounts?.monthly / 100)))}
                            </span>
                            </div>
                        )
                        :
                        <div
                            onClick={() => {
                                setTab('monthly_discount')
                                form.resetFields()
                                form.setFieldsValue({uid: data.uid})
                            }}
                            className="flex mt-2 cursor-pointer w-fit">
                            <p className="font-medium text-main text-p underline py-1 hover:bg-gray-100 rounded-md">Add</p>
                        </div>
                    }
                </div>
            </div>

            <div className='flex justify-between items-center border rounded-lg py-5 px-6 my-4 cursor-pointer'
                 onClick={() => {
                     setTab('more_discount')
                     form.resetFields()
                     form.setFieldsValue({uid: data.uid})
                 }}>
                <div>
                    <p className="font-medium text-main text-p">More discounts</p>
                    <span className="text-secondaryText text-p2">Early bird, last-minute</span>
                </div>
                <Icon name={"right-arrow"}/>
            </div>

            <p className="text-lg font-semibold">Promotions</p>
            <span className="text-gray-500">Set short-term discounts to get new bookings.</span>

            <div className='flex justify-between items-center border rounded-lg py-5 px-6 my-4 cursor-pointer'
                 onClick={() => {
                     setTab('promotion')
                     form.resetFields()
                     form.setFieldsValue({uid: data.uid})
                 }}>
                <div>
                    {
                        data?.promotions ? <>
                            <span className="bg-[#e6f4e6] text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">ACTIVE</span>
                            <h2 className="font-medium text-main text-p mt-2">New listing promotion: 20% off</h2>
                            <p className="text-sm text-gray-600">Applies to your first 3 bookings</p>
                            <div className="text-gray-500 text-xs">0 views · 0 used, 3 remaining</div>
                        </>
                            :
                            <>
                                <p className="font-medium text-main text-p">New listing promotion</p>
                                <span className="text-secondaryText text-p2">Get your first guests in the door</span>
                            </>
                    }
                </div>
                <Icon name={"right-arrow"}/>
            </div>

            <p className="text-lg font-semibold">Additional charges</p>

            <div className='flex justify-between items-center border rounded-lg py-5 px-6 my-4 cursor-pointer'
                 onClick={() => {
                     setTab('extra_fees')
                     form.resetFields()
                     form.setFieldsValue({
                         uid: data.uid,
                         fees: {stay: data?.fees?.stay, pet: data?.fees?.pet, guest: data?.fees?.guest}
                     })
                 }}>
                <div>
                    <p className="font-medium text-main text-p">Fees</p>
                    <span className="text-secondaryText text-p2">Cleaning, pets, extra guests</span>
                </div>
                <Icon name={"right-arrow"}/>
            </div>

        </div>
    )
}


const Availability = ({setTab, form, data, getData}) => {
    return (
        <div>
            <p className="text-lg font-semibold mb-2">Trip Length</p>
            <div
                role="button"
                onClick={() => {
                    setTab('min_nights')
                    form.resetFields()
                    form.setFieldsValue({uid: data.uid, availability: {min_nights: data?.availability?.min_nights}})
                }}
                className="border rounded-lg p-6 mb-4">
                <p className="font-medium text-gray-700">Minimum nights</p>
                <p className="text-3xl font-semibold text-gray-700">{data?.availability?.min_nights || 1}</p>
            </div>
            <div
                role="button"
                onClick={() => {
                    setTab('max_nights')
                    form.resetFields()
                    form.setFieldsValue({uid: data.uid, availability: {max_nights: data?.availability?.max_nights}})
                }}
                className="border rounded-lg p-6 mb-4">
                <p className="font-medium text-gray-700">Maximum nights</p>
                <p className="text-3xl font-semibold text-gray-700">{data?.availability?.max_nights || 1}</p>
            </div>

            <div className='flex justify-between items-center border rounded-lg py-5 px-6 my-4 cursor-pointer'
                 onClick={() => {
                     setTab('custom_length')
                     form.resetFields()
                     form.setFieldsValue({
                         uid: data.uid,
                         custom_length: {
                             from: data?.availability?.custom_length?.from,
                             to: data?.availability?.custom_length?.to
                         }
                     })
                 }}>
                <div>
                    <p className="font-medium text-main text-p">Custom trip lengths</p>
                </div>
                <Icon name={"right-arrow"}/>
            </div>
            <p className="text-lg font-semibold mb-2">Availability</p>

            <div className="my-4">
                <Collapse
                    bordered={true}
                    className="rounded-lg"
                    defaultActiveKey={[]}
                    expandIconPosition="right"
                    expandIcon={({isActive}) => <IoIosArrowDown
                        className={`w-5 h-5 transform ${isActive ? 'rotate-180' : ''}`}/>}
                    style={{background: 'white'}}
                    items={
                        [
                            {
                                key: '1',
                                label: <>
                                    <div onClick={() => {
                                        form.resetFields()
                                        form.setFieldsValue({
                                            uid: data.uid,
                                            custom_length: {from: data?.availability?.advance_notice}
                                        })
                                    }}>
                                        <p className="font-medium text-main text-p">Advance Notice</p>
                                        <p className="text-main">
                                            {
                                                data?.availability?.advance_notice === 0 ? 'Same day' :
                                                    `At least ${data?.availability?.advance_notice} days`
                                            }
                                        </p>
                                    </div>

                                </>,
                                children: (
                                    <div className="">
                                        <CheckInput
                                            form={form}
                                            data={data}
                                            getData={getData}
                                            name={['availability', 'advance_notice']}
                                            setTab={setTab}
                                        />
                                    </div>
                                )
                            },
                        ]
                    }
                />
            </div>

            <div className="my-4">
                <Collapse
                    bordered={true}
                    className="rounded-lg"
                    defaultActiveKey={[]}
                    expandIconPosition="right"
                    expandIcon={({isActive}) => <IoIosArrowDown
                        className={`w-5 h-5 transform ${isActive ? 'rotate-180' : ''}`}/>}
                    style={{background: 'white'}}
                    items={
                        [
                            {
                                key: '1',
                                label: <>
                                    <div onClick={() => {
                                        form.resetFields()
                                        form.setFieldsValue({
                                            uid: data.uid,
                                            notice_time: {from: data?.availability?.notice_time}
                                        })
                                    }}>
                                        <p className="font-medium text-main text-p">Same day advance notice</p>
                                        <p className="text-gray-500">
                                            {data?.availability?.notice_time}
                                        </p>
                                    </div>
                                </>,
                                children: (
                                    <div className="">
                                        <CheckInput
                                            form={form}
                                            data={data}
                                            getData={getData}
                                            name={['availability', 'notice_time']}
                                            setTab={setTab}
                                        />
                                    </div>
                                )
                            },
                        ]
                    }
                />
            </div>


            <div className="my-4">
                <Collapse
                    bordered={true}
                    className="rounded-lg"
                    defaultActiveKey={[]}
                    expandIconPosition="right"
                    expandIcon={({isActive}) => <IoIosArrowDown
                        className={`w-5 h-5 transform ${isActive ? 'rotate-180' : ''}`}/>}
                    style={{background: 'white'}}
                    items={
                        [
                            {
                                key: '1',
                                label: <>
                                    <div onClick={() => {
                                        form.resetFields()
                                        form.setFieldsValue({
                                            uid: data.uid,
                                            availability: {preparation_time: data?.availability?.preparation_time}
                                        })
                                    }}>
                                        <p className="font-medium text-main text-p">Preparation time</p>
                                        <p className="text-main">
                                            {
                                                data?.availability?.preparation_time === 0 ? 'None' :
                                                    data?.availability?.preparation_time === 1 ? '1 night before and after each reservation' :
                                                        data?.availability?.preparation_time === 2 ? '2 nights before and after each reservation' :
                                                            'None'
                                            }
                                        </p>
                                    </div>
                                </>,
                                children: (
                                    <div className="">
                                        <CheckInput
                                            form={form}
                                            data={data}
                                            getData={getData}
                                            name={['availability', 'preparation_time']}
                                            setTab={setTab}
                                        />
                                    </div>
                                )
                            },
                        ]
                    }
                />
            </div>

            <div className="my-4">
                <Collapse
                    bordered={true}
                    className="rounded-lg"
                    defaultActiveKey={[]}
                    expandIconPosition="right"
                    expandIcon={({isActive}) => <IoIosArrowDown
                        className={`w-5 h-5 transform ${isActive ? 'rotate-180' : ''}`}/>}
                    style={{background: 'white'}}
                    items={
                        [
                            {
                                key: '1',
                                label: <>
                                    <div onClick={() => {
                                        form.resetFields()
                                        form.setFieldsValue({
                                            uid: data.uid,
                                            availability: {max_book_month: data?.availability?.max_book_month}
                                        })
                                    }}>
                                        <p className="font-medium text-main text-p">Availability window</p>
                                        <p className="text-main">
                                            {
                                                data?.availability?.max_book_month ?
                                                    `${data?.availability?.max_book_month} months in advance` :
                                                    'Dates unavailable'
                                            }
                                        </p>
                                    </div>
                                </>,
                                children: (
                                    <div className="">
                                        <CheckInput
                                            form={form}
                                            data={data}
                                            getData={getData}
                                            name={['availability', 'max_book_month']}
                                            setTab={setTab}
                                        />
                                    </div>
                                )
                            },
                        ]
                    }
                />
            </div>

            <div className='flex justify-between items-center border rounded-lg py-5 px-6 my-4 cursor-pointer'
                 onClick={() => {
                     setTab('restricted')
                     form.resetFields()
                     form.setFieldsValue({
                         uid: data.uid,
                         availability: {
                             restricted_checkin: data?.availability?.restricted_checkin,
                             restricted_checkout: data?.availability?.restricted_checkout
                         }
                     })
                 }}>
                <div>
                    <p className="font-medium text-main text-p">More availability settings</p>
                    <span className="text-secondaryText text-p2">Restricted check-in, restricted check-out</span>

                </div>
                <Icon name={"right-arrow"}/>
            </div>
        </div>
    )
}





