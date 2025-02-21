"use client"
import React, {useEffect, useRef, useState} from 'react'
import Icon from '../../../../components/common/icon'
import {Form, Radio, Slider, Space, Switch, Tooltip} from 'antd'
import {currencies} from '../../../../helpers/utils'
import {useOutsideClick} from '../../../../helpers/hooks'
import Button from '../../../../components/common/button'
import {CalendarPrice} from '../../../../components/calendar/calender-price'
import PriceTooltip from '../../../../components/calendar/price-tooltip'
import PriceTooltipContent from '../../../../components/calendar/discount-price-tooltip'
import FeesSection from '../../../../components/calendar/fees-section'
import MoreDiscounts from '../../../../components/calendar/more-discount'
import DiscountForm from '../../../../components/calendar/discount-form'
import AdditionalFeesForm from '../../../../components/calendar/additional-fees-form'

interface taxes {
    type?: string,
    typeTitle?: string,
    typeSubTitle?: string,
    titleSmall?: string,
    typeDes?: string,
    price?: string,
    title?: string,
    subTitle?: string,
    icon?: string | JSX.Element,
    data?: any,
    isPromotion?: boolean
}

interface OptionProps {
    type: string;
    titleSmall?: string;
    title?: string;
    subTitle?: string;
    data?: number;
    typeDes?: string;
    icon?: any;
    isPromotion?: boolean;
}

interface ItemProps {
    title?: string,
    subTitle?: string,
    titleSmall?: string,
    options?: OptionProps[]
}


const CalendarSidebar = () => {
    const [active, setActive] = useState(undefined)
    const [type, setType] = useState<taxes | undefined>()
    const [price, setPrice] = useState<string>('')
    const [currency, setCurrency] = useState<string>('USD')
    const [discount, setDiscount] = useState<string>('')
    const [additionalFee, setAdditionalFee] = useState<string>('')
    const [form] = Form.useForm()
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
    const currencyRef = useRef<any>(null);

    useOutsideClick(
        currencyRef,
        () => setActive(undefined)
    )

    const data: any = {
        per_night: 20,
        // smart_price: 10,
        // minimum_price: 12,
        // maximum_price: 15,
        cleaning: 10,
        pet: 20,
        guest_fee: 5,
        early_birds_discount: 10,
        early_birds_months: 2,
        last_minute_discount: 5,
        last_minute_months: 2,
        promotion: true,
    }

    useEffect(() => {
        if (!!data) {
            form.setFieldsValue({
                per_night: data?.per_night || 0,
                smart_price: data?.smart_price || 0,
                minimum_price: data?.minimum_price || 0,
                maximum_price: data?.maximum_price || 0,
                cleaning: data?.cleaning || 0,
                pet: data?.pet || 0,
                guest_fee: data?.guest_fee || 0,
                early_birds_discount: data?.early_birds_discount || 0,
                last_minute_discount: data?.last_minute_discount || 0,
                early_birds_months: data?.early_birds_months || 0,
                last_minute_months: data?.last_minute_months || 0,
            })
        }
    }, [data]);

    const handleSwitchToggle = () => {
        setIsSwitchOn(!isSwitchOn);
        if (!isSwitchOn) {
            console.log("checked")
        } else {
            console.log("un-checked");
        }
    };

    const items: ItemProps[] = [
        {
            title: isSwitchOn ? "Smart Pricing" : "Base Price",
            options: isSwitchOn ? [
                {
                    type: "minimum_price",
                    titleSmall: "Minimum nightly price",
                    typeDes: "*The price the guest sees could be lower than the minimum nightly price you set if you have discounts or promotions.",
                    subTitle: "Minimum nightly price",
                    data: data?.minimum_price,
                    icon: "Edit"
                },
                {
                    titleSmall: "Maximum nightly price",
                    type: "maximum_price",
                    subTitle: "Maximum nightly price",
                    data: data?.maximum_price,
                    icon: "Edit"
                },
            ]
                :
                [
                    {
                        type: "per_night",
                        titleSmall: 'Per Night',
                        title: data?.per_night,
                        subTitle: "Per Night",
                        data: data?.per_night,
                        icon: "Edit"
                    },
                    {
                        titleSmall: "Custom weekend price",
                        type: "weekend_price",
                        subTitle: "Fri to Sat nights",
                        data: data?.weekend_price,
                        icon: "Edit"
                    },
                ]
        },
        {
            options: [
                {
                    type: "smart_price",
                    titleSmall: "Smart Pricing",
                    typeDes: "*The price the guest sees could be lower than the minimum nightly price you set if you have discounts or promotions.",
                    icon: "Set",
                    data: data?.smart_price
                }
            ]
        },
        {
            title: "Discounts",
            subTitle: "Adjust your pricing to attract more guests.",
            options: [
                {
                    type: "weekly_discount",
                    title: "0%",
                    subTitle: "Weekly",
                    typeDes: "For 7 Nights Or More",
                    icon: "Edit"
                },
                {
                    type: "monthly_discount",
                    title: "0%",
                    subTitle: "Monthly",
                    typeDes: "Average for a 30-night stay",
                    icon: "Edit"

                },
                {
                    type: "more_discount",
                    titleSmall: "More Discounts",
                    subTitle: "For 28 nights or more",
                    icon: <Icon name={"right-arrow"} />

                },
            ]
        },
        {
            title: "Promotions",
            subTitle: "Set short-term discounts to get new bookings..",
            options: [
                {
                    titleSmall: "New listing promotion",
                    subTitle: "Gest your first gusts in the door",
                    icon: <Icon name={"right-arrow"} />,
                    type: "promotion",
                    isPromotion: data?.promotion
                }
            ]
        },
        {
            title: "Additional charges",
            subTitle: "Set short-term discounts to get new bookings..",
            options: [
                {
                    titleSmall: "Fees",
                    subTitle: "Cleaning, pets, extra guests",
                    icon: <Icon name={"right-arrow"} />,
                    type: "fees"
                }
            ]
        }
    ]

    const handleSubmit = (values) => {
        setType({})
        setDiscount("")
        setAdditionalFee("")
        console.log(values)
    }

    return (
        <div className="">
            <Form form={form}
                onFinish={(values) => {
                    handleSubmit(values)
                }}>
                {type?.type ?
                    <>
                        {
                            (type?.type == 'per_night' || type?.type == 'weekend_price' || type?.type == 'smart_price' || type?.type == 'weekly_discount' || type?.type == 'monthly_discount' || type?.type == 'more_discount' || type?.type == "fees" || type?.type == 'promotion' || type?.type == 'minimum_price' || type?.type == 'maximum_price') &&
                            <div className="">
                                {
                                    (type?.type == 'per_night' || type?.type == 'weekend_price' || type?.type == 'minimum_price' || type?.type == 'maximum_price') &&
                                    <>
                                        <h1 className="text-main text-title_md text-center">{type?.typeTitle}</h1>
                                        {<h4 className="text-title_md text-center mt-5">{type?.subTitle}</h4>}

                                        {<p className="text-center text-secondaryText mt-2 text-p2">{type?.typeDes}</p>}
                                        <div className="mt-6 border-[1px] border-dashed border-webBorder px-4">
                                            <Form.Item name={type?.type} initialValue={1} className='!mb-0'>
                                                <CalendarPrice className='w-[10rem]' isIncrementOrDecrement />
                                            </Form.Item>

                                            <div className="calender-tooltip flex items-center justify-center mb-6">
                                                <span className='!text-main !text-sb'>Guest price before taxes</span>
                                                <Form.Item noStyle shouldUpdate>
                                                    {() => {
                                                        let price = form.getFieldValue(type?.type)
                                                        let serviceFee = 4
                                                        let total = price + serviceFee
                                                        return (
                                                            <span className="text-primary !text-ssb ml-1">${+total}</span>
                                                        )
                                                    }}
                                                </Form.Item>
                                                <Tooltip color={'white'} placement="bottomRight" trigger={['click', 'hover']} title={<PriceTooltip form={form} type={type?.type} />}>
                                                    {
                                                        price ? <span onClick={() => setPrice(price)} className="cursor-pointer"><Icon name={"up-arrow"} /></span> : <span onClick={() => setPrice(price)} className="cursor-pointer"><Icon name={"down-arrow"} /></span>
                                                    }
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </>
                                }
                                {
                                    (type?.type == 'weekly_discount' || type?.type == 'monthly_discount') &&
                                    <div>
                                        <h1 className="text-main text-title_md text-center">{type?.typeTitle}</h1>
                                        {<h4 className="text-title_md text-center mt-5">{type?.subTitle}</h4>}
                                        {<p className="text-center text-secondaryText mt-2 text-p2">{type?.typeDes}</p>}
                                        <div className="mt-6 border-[1px] border-dashed border-webBorder px-4">
                                            <Form.Item initialValue={1} className='!mb-0' shouldUpdate>
                                                {
                                                    () => {
                                                        let price = form.getFieldValue(type?.type == 'weekly_discount' ? 'weekly_discount_percent' : 'monthly_discount_percent')
                                                        return (
                                                            <CalendarPrice className='w-[10rem]' value={price ? price : 1} />
                                                        )
                                                    }
                                                }
                                            </Form.Item>
                                            <div className="calender-tooltip flex items-center justify-center mb-6">
                                                <span className='!text-main !text-sb'>Guest price before taxes</span>
                                                <Form.Item noStyle shouldUpdate>
                                                    {() => {
                                                        let price = form.getFieldValue(type?.type == 'weekly_discount' ? 'weekly_discount_percent' : 'monthly_discount_percent')
                                                        let serviceFee = 4
                                                        let total = (price ? price : 1) + serviceFee
                                                        return (
                                                            <span className="text-primary !text-ssb ml-1">${+total}</span>
                                                        )
                                                    }}
                                                </Form.Item>
                                                <Tooltip color={'white'} placement="bottomRight" trigger={['click', 'hover']} title={<PriceTooltipContent form={form} type={type} />}>
                                                    {
                                                        price ? <span onClick={() => setPrice(price)} className="cursor-pointer"><Icon name={"up-arrow"} /></span> : <span onClick={() => setPrice(price)} className="cursor-pointer"><Icon name={"down-arrow"} /></span>
                                                    }
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <div className="mt-[85px]">
                                            <Form.Item noStyle name={type?.type == 'weekly_discount' ? 'weekly_discount_percent' : 'monthly_discount_percent'}>
                                                <Slider styles={
                                                    {
                                                        track: {
                                                            background: '#ff7f3e',
                                                            height: '8px',
                                                            blockSize: '8px',
                                                            borderRadius: '4px',
                                                        },
                                                        rail: {
                                                            background: '#F5F5F5',
                                                            height: '8px',
                                                            blockSize: '8px',
                                                            borderRadius: '4px',
                                                        },
                                                        handle: {
                                                            background: '#ff7f3e',
                                                            height: '18px',
                                                            width: '18px',
                                                            borderRadius: '50%',
                                                            top: '-1px'
                                                        },
                                                    }
                                                } tooltip={{
                                                    open: true,
                                                    color: 'white',
                                                    formatter: (e) => <div className="!z-10">
                                                        <span className='text-main text-[12px] font-medium leading-[18px]'>Discount</span>
                                                        <div className="border-primary rounded-[2px] border py-1 px-[10px] discound-slider text-primary">{e}%</div>
                                                    </div>
                                                }} marks={{
                                                    0: {
                                                        label: <span className='text-main text-ssb'>0%</span>,
                                                        style: {
                                                            top: 'calc(0% - 15px)',
                                                            left: 'calc(0% - 20px)',
                                                        }
                                                    },
                                                    99: {
                                                        label: <span className='text-main text-ssb'>99%</span>,
                                                        style: {
                                                            top: 'calc(100% - 16px)',
                                                            left: 'calc(100% + 23px)',
                                                        }

                                                    }
                                                }} defaultValue={1} />
                                            </Form.Item>
                                        </div>
                                        {
                                            type?.type == 'monthly_discount' &&
                                            <div className='mt-6'>
                                                <Form.Item noStyle shouldUpdate>
                                                    {() => {
                                                        let monthlyDiscount = form.getFieldValue('monthly_discount_percent')
                                                        let weeklyDiscount = form.getFieldValue('weekly_discount_percent')
                                                        if (monthlyDiscount < weeklyDiscount) {
                                                            return (
                                                                <span className='text-error !text-ssb'>
                                                                    This discount must be lower than your weekly (1 week) trip length discount of {weeklyDiscount}%
                                                                </span>
                                                            )
                                                        }
                                                    }}
                                                </Form.Item>
                                            </div>
                                        }
                                    </div>
                                }
                                {type?.type == 'smart_price' && <>
                                    <h4 className="text-c1 text-center mt-6">Minimum nightly price</h4>
                                    {<p className="text-center text-secondaryText mt-2 text-p2">{type?.typeDes}</p>}
                                    <div className="mt-6 border-[1px] border-dashed border-webBorder px-4">
                                        <Form.Item name="minimum_price" initialValue={1} className='!mb-0'>
                                            <CalendarPrice className='w-[10rem]' isIncrementOrDecrement />
                                        </Form.Item>

                                        <div className="calender-tooltip flex items-center justify-center mb-6">
                                            <span className='!text-main !text-sb'>Guest price before taxes</span>
                                            <Form.Item noStyle shouldUpdate>
                                                {() => {
                                                    let price = form.getFieldValue("minimum_price")
                                                    let serviceFee = 4
                                                    let total = price + serviceFee
                                                    return (
                                                        <span className="text-primary !text-ssb ml-1">${+total}</span>
                                                    )
                                                }}
                                            </Form.Item>
                                            <Tooltip color={'white'} placement="bottomRight" trigger={['click', 'hover']} title={<PriceTooltip form={form}
                                                type={"minimum_price"} />}
                                            >
                                                {
                                                    price ? <span onClick={() => setPrice(price)} className="cursor-pointer"><Icon name={"up-arrow"} /></span> : <span onClick={() => setPrice(price)} className="cursor-pointer"><Icon name={"down-arrow"} /></span>
                                                }
                                            </Tooltip>
                                        </div>
                                    </div>

                                    {<h4 className="text-c1 text-center mt-6">Maximum nightly price</h4>}
                                    <div className="mt-6 border-[1px] border-dashed border-webBorder px-4">
                                        <Form.Item name="maximum_price" initialValue={1} className='!mb-0'>
                                            <CalendarPrice className='w-[10rem]' isIncrementOrDecrement />
                                        </Form.Item>
                                        <div className="text-main text-sb flex items-center justify-center mb-6">Gest price before taxes
                                            <Form.Item noStyle shouldUpdate>
                                                {() => {
                                                    let price = form.getFieldValue('maximum_price')
                                                    let serviceFee = 14
                                                    let total = price + serviceFee
                                                    return (
                                                        <span className="text-primary !text-ssb ml-1">${+total}</span>

                                                    )
                                                }}
                                            </Form.Item>
                                            <Tooltip color={'white'} placement="bottomRight" trigger={['click', 'hover']} title={<PriceTooltip form={form}
                                                type={"maximum_price"} />}>
                                                {
                                                    price ? <span onClick={() => setPrice(price)} className="cursor-pointer"><Icon name={"down-arrow"} /></span> : <span onClick={() => setPrice(price)} className="cursor-pointer"><Icon name={"down-arrow"} /></span>
                                                }
                                            </Tooltip>
                                        </div>
                                    </div>
                                </>}
                                {
                                    (type?.type == "fees") &&
                                    <FeesSection data={data} setType={setType} setAdditionalFee={setAdditionalFee} />
                                }
                                {
                                    (type?.type == "more_discount") &&
                                    <MoreDiscounts data={data} setType={setType} setDiscount={setDiscount} />
                                }
                                {
                                    (type?.type == "promotion") &&
                                    <div className="w-full mt-6">
                                        <div onClick={() => setType({})} className="w-[41px] h-[41px] rounded-full flex items-center justify-center cursor-pointer bg-[#F7F7F7] mt-2">
                                            <Icon name={"arrow-left2"} />
                                        </div>

                                        <h1 className="text-main text-title_md text-center mt-6">New listing promotion</h1>
                                        <div className='flex flex-col justify-center items-center my-8'>
                                            <p className='text-xxlRegular text-primary-300 text-center'>20% off</p>
                                            <p className='text-p2 text-secondary2'>For next 3 booking</p>
                                        </div>
                                        <p className='text-p2 text-secondary2 text-wrap text-center'>
                                            Need a jump start? Use this promotion to grab guests’ attention and get your first bookings.
                                        </p>
                                        {
                                            type?.isPromotion ?
                                                <button type='button' onClick={() => {
                                                    setType({})
                                                }} className="btn mt-6">Remove Promotion</button>
                                                :
                                                <button type='button' onClick={() => {
                                                    setType({})
                                                }} className="btn mt-6">Apply Promotion</button>
                                        }

                                    </div>
                                }
                                {
                                    (type?.type !== "more_discount" && type?.type != "fees" && type?.type != "promotion") &&
                                    <div className="flex flex-col gap-5 mt-6">
                                        <Button className='!py-[12px] !text-h4 rounded text-white'>
                                            Save
                                        </Button>
                                        <button type='button' onClick={() => setType({})} className="border-[1px] border-primary py-[11px] text-h4 rounded text-primary hover:bg-primary hover:text-white duration-500 ">Cancel</button>
                                    </div>
                                }
                            </div>}
                    </>
                    : (discount == "early" || discount == "last") ? <>
                        <DiscountForm discount={discount} setType={setType} setDiscount={setDiscount} />
                    </>
                        : (additionalFee == "cleaning" || additionalFee == "pet" || additionalFee == "guest_fee") ?
                            <>
                                {
                                    additionalFee == "cleaning" || additionalFee == "pet" || additionalFee == "guest_fee" ?
                                        <>
                                            <AdditionalFeesForm additionalFee={additionalFee} setType={setType} setAdditionalFee={setAdditionalFee} />
                                        </>
                                        : null
                                }
                            </>
                            :
                            <>

                                <div ref={currencyRef} className="sidebar-option relative">
                                    {items?.map((item: any, i: number) => <div key={i} className="">
                                        <div className={`${i == 0 ? 'flex justify-between items-center' : ''} mt-8`}>
                                            <h1 className='text-cs'>{item?.title}</h1>
                                            {item.subTitle && <p className='text-xxs text-secondaryText mt-1'>{item.subTitle}</p>}

                                            {
                                                i === 0 && <div onClick={() => {
                                                    if (i === active) {
                                                        setActive(undefined)
                                                    } else {
                                                        setActive(i)
                                                    }
                                                }} className="flex items-center gap-2 cursor-pointer">
                                                    <h1 className='text-cs text-primary'>{currency}</h1>
                                                    <Icon name={"down-arrow"} />
                                                </div>
                                            }
                                        </div>
                                        {
                                            i == active ?
                                                <div className='bg-white shadow-price rounded-sm mt-2 px-4 w-fit absolute left-4 h-[280px] overflow-y-auto'>
                                                    <h1 className='text-p text-center py-3 border-b border-webBorder'>Choose a currency</h1>
                                                    <Form.Item name="currency" noStyle>
                                                        <Radio.Group onChange={e => setCurrency(e.target.value)} name='role'>
                                                            <Space direction="vertical">
                                                                {
                                                                    currencies.map((cur: any, i: number) => (
                                                                        <Radio
                                                                            className='flex flex-row-reverse items-start justify-between w-full text-p2 py-3 border-b border-webBorder'
                                                                            value={cur?.value}
                                                                            key={i}
                                                                            checked={cur?.value == cur?.value}
                                                                        >
                                                                            <h1 className='w-[200px]'>{cur?.label}</h1>
                                                                        </Radio>
                                                                    ))
                                                                }
                                                            </Space>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </div>
                                                :
                                                <div className="space-y-5">
                                                    {
                                                        item?.options?.map((option: any, i: number) =>
                                                            <div key={i} className={`border border-webBorder p-4 rounded-sm mt-5 
                                                        ${(option?.icon != 'Edit' && option?.icon != 'Add' && option?.icon != 'Set') ? 'cursor-pointer' : ''}`}
                                                                onClick={() => {
                                                                    (option?.icon != 'Edit' && option?.icon != 'Add' && option?.icon != 'Set') ? setType(option) : null
                                                                }}>
                                                                <div className={`flex ${option?.titleSmall ? 'items-center' : 'items-start'} justify-between`}>
                                                                    {
                                                                        option?.data ?
                                                                            <>
                                                                                <div className="">
                                                                                    <h1 className={`text-title_md ${option?.data ? '' : 'text-secondaryText'}`}>
                                                                                        {
                                                                                            (option?.type == 'per_night' || option?.type == 'weekend_price' || option?.type == 'minimum_price' || option?.type == 'maximum_price')
                                                                                                ? '$'
                                                                                                : ''
                                                                                        }
                                                                                        {
                                                                                            (option?.type != "smart_price") ?
                                                                                                <>
                                                                                                    {option?.data}
                                                                                                </>
                                                                                                :
                                                                                                <span className={`text-p2`}>
                                                                                                    {option?.titleSmall}
                                                                                                </span>
                                                                                        }
                                                                                        {
                                                                                            (option?.type == 'weekly_discount' || option?.type == 'monthly_discount')
                                                                                                ? '%'
                                                                                                : ''
                                                                                        }
                                                                                    </h1>
                                                                                    {
                                                                                        option?.subTitle && <h1 className='text-xxs text-secondaryText my-1'>{option?.subTitle}</h1>
                                                                                    }
                                                                                </div>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                {option?.titleSmall ?
                                                                                    <div className="">
                                                                                        <h1 className={`text-p2 ${option?.subTitle ? '' : 'text-secondaryText'}`}>{option?.titleSmall}</h1>
                                                                                       
                                                                                    </div>
                                                                                    : <h1 className='text-title_md'>{option?.title}</h1>}
                                                                            </>

                                                                    }
                                                                    {
                                                                        !!option?.data ?
                                                                            <>
                                                                                {
                                                                                    option?.type == "smart_price" ?
                                                                                        <Form.Item name="is_destination" initialValue={false} noStyle>
                                                                                            <Switch checked={isSwitchOn} onChange={handleSwitchToggle} />
                                                                                        </Form.Item>
                                                                                        :
                                                                                        <h1 onClick={() => {
                                                                                            setType(option)
                                                                                        }} className='text-p underline text-primary cursor-pointer'>
                                                                                            {option?.icon ? option?.icon : "Edit"}
                                                                                        </h1>
                                                                                }

                                                                            </>
                                                                            :
                                                                            <>
                                                                                <h1 onClick={() => {
                                                                                    setType(option)
                                                                                }} className='text-p underline text-primary cursor-pointer'>
                                                                                    {option?.icon ? option?.icon : "Add"}
                                                                                </h1>
                                                                            </>

                                                                    }

                                                                </div>
                                                                {
                                                                    option?.titleSmall ? null : <>
                                                                        <h1 className='text-p2 text-secondaryText my-1'>{option?.subTitle}</h1>
                                                                        <h1 className='text-xxs text-secondaryText'>{option?.des}</h1>
                                                                    </>
                                                                }
                                                            </div>)
                                                    }
                                                </div>
                                        }
                                    </div>)
                                    }
                                </div>
                            </>}
            </Form>
        </div>
    )
}
export default CalendarSidebar