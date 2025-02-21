"use client"
import React, { useEffect, useState } from 'react'
import Icon from '../../../../components/common/icon'
import { Form, Radio, Space } from 'antd'
import Button from '../../../../components/common/button'
import { MultiselectDays } from '../../../../components/calendar/multiselect-days'
import { GuestInput } from '../../../../components/calendar/guest-input'

interface OptionDetail {
    id: number;
    name: string;
    value: string;
}
interface TaxOption {
    type?: string;
    typeTitle?: string;
    typeSubTitle?: string;
    typeDes?: string;
    price?: string;
    title?: string;
    subTitle?: string;
    item?: string;
    icon?: string | JSX.Element;
    days?: OptionDetail[];
    times?: OptionDetail[];
    preTimes?: OptionDetail[];
    withdrow?: OptionDetail[];
    more?: OptionDetail[];
    des?: string;
}


const AvailabilitySidebar = () => {
    const [form] = Form.useForm()
    const [type, setType] = useState<TaxOption | undefined>(undefined);
    const [value, setValue] = useState<number>(1);
    const [active, setActive] = useState<number>(1);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setValue(newValue);
        setActive(newValue);
    };

    const data: any = {
        min_night: 2,
        max_night: 24,
    }

    useEffect(() => {
        if (!!data) {
            form.setFieldsValue({
                min_night: data?.min_night || 0,
                max_night: data?.max_night || 0,
            })
        }
    }, [data]);

    const items = [
        {
            title: "Trip length",
            optionTitle: "Custom trip lengths",
            options: [
                {
                    type: "min_night",
                    title: "1",
                    subTitle: "Minimum nights",
                    typeTitle: "Minimum nights",
                    icon: "Edit",
                    data: data.min_night
                },
                {
                    type: "max_night",
                    title: "365",
                    subTitle: "Maximum nights",
                    typeTitle: "Maximum nights",
                    icon: "Edit",
                    data: data.max_night
                }
            ]
        },
        {
            title: "Availability",
            options: [
                {
                    type: "advance_notice",
                    titleSmall: "Advance Notice",
                    des: "How much notice do you need between a guest booking their arrival?",
                    subTitle: "Advance Notice",
                    icon: <Icon name={"right-arrow"} />,
                    days: [
                        { id: 1, name: "Same Day", value: 'same_day' },
                        { id: 2, name: "At least 1 day", value: 'at least 1 day' },
                        { id: 3, name: "At least 2 days", value: 'at least 2 day' },
                        { id: 4, name: "At least 3 days", value: 'at least 3 day' },
                        { id: 5, name: "At least 7 days", value: 'at least 7 day' }
                    ]

                },

                {
                    type: "advance_notice_time",
                    titleSmall: "Same day advance notice",
                    des: "Gests can book on the same days as check-in until this time",
                    subTitle: "Same day advance notice",
                    icon: <Icon name={"right-arrow"} />,
                    days: [
                        { id: 1, name: "6:00 AM", value: "6:00 AM" },
                        { id: 2, name: "7:00 AM", value: "7:00 AM" },
                        { id: 3, name: "8:00 AM", value: "8:00 AM" },
                        { id: 4, name: "9:00 AM", value: "9:00 AM" },
                        { id: 5, name: "10:00 AM", value: "10:00 AM" },
                        { id: 6, name: "11:00 AM", value: "11:00 AM" },
                        { id: 7, name: "12:00 PM", value: "12:00 PM" },
                        { id: 8, name: "1:00 PM", value: "1:00 PM" },
                        { id: 9, name: "2:00 PM", value: "2:00 PM" },
                        { id: 10, name: "3:00 PM", value: "3:00 PM" },
                        { id: 11, name: "4:00 PM", value: "4:00 PM" },
                        { id: 12, name: "5:00 PM", value: "5:00 PM" },
                        { id: 13, name: "6:00 PM", value: "6:00 PM" }
                    ]
                },

                {
                    type: "preparation_time",
                    titleSmall: "Preparation time",
                    des: "How many nights before and after each reservation do you need to block off?",
                    subTitle: "Preparation time",
                    icon: <Icon name={"right-arrow"} />,
                    days: [
                        { id: 1, name: "None", value: 'none' },
                        { id: 2, name: "1 night before and after each reservation", value: '1 night before' },
                        { id: 3, name: "2 nights before and after each reservation", value: '2 night before' }
                    ]
                },

                {
                    type: "availability_window",
                    titleSmall: "Availability window",
                    des: "How far in advance can guests book?",
                    subTitle: "Availability window",
                    icon: <Icon name={"right-arrow"} />,
                    days: [
                        { id: 1, name: "Dates unavailable by default", value: 'dates unavailable' },
                        { id: 2, name: "24 Months in Advance", value: '24 months in advance' },
                        { id: 3, name: "12 Months in Advance", value: '12 months in advance' },
                        { id: 4, name: "9 Months in Advance", value: '9 months in advance' },
                        { id: 5, name: "6 Months in Advance", value: '6 months in advance' },
                        { id: 6, name: "3 Months in Advance", value: '3 months in advance' }
                    ]
                },
                {
                    type: "more_activity",
                    titleSmall: "Restricted check-in",
                    des: "Guests won’t be able to book your place if their stay starts on these days.",
                    subTitle: "Restrict check-in and checkout days",
                    icon: <Icon name={"right-arrow"} />,
                    moreTitle: "Restricted check-out",
                    moreSub: "Guests won’t be able to book your place if their stay starts on these days.",
                    days: [
                        { id: 1, name: "Sunday", value: 'sunday' },
                        { id: 2, name: "Monday", value: 'monday' },
                        { id: 3, name: "Tuesday", value: 'tuesday' },
                        { id: 4, name: "Wednesday", value: 'wednesday' },
                        { id: 5, name: "Thursday", value: 'thursday' },
                        { id: 6, name: "Friday", value: 'friday' },
                        { id: 7, name: "Saturday", value: 'saturday' },
                    ],
                },

            ]
        },

    ]

    const handleSubmit = (values) => {
        setType({})
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
                        {(type?.type == 'max_night' || type?.type == 'min_night' || type?.type == 'advance_notice' || type?.type == 'advance_notice_time' || type?.type == 'preparation_time' || type?.type == 'availability_window' || type?.type == 'more_activity') && <div className="">
                            <h1 className="text-main text-title_md text-center mt-6">{type?.typeTitle}</h1>
                            {<h4 className="text-c1 text-center mt-2">{type?.typeSubTitle}</h4>}
                            {<p className="text-center text-s text-secondaryText mt-2">{type?.typeDes}</p>}
                            {(type.type === 'max_night' || type.type === 'min_night') && (
                                <div className="mt-6 border-[1px] border-dashed border-webBorder px-4">
                                    <Form.Item name={type?.type} noStyle initialValue={1}>
                                        <GuestInput className='w-[10rem] my-6 !text-primary text-xlMedium' isIncrementOrDecrement />
                                    </Form.Item>
                                    <div className='mb-2.5'>
                                        <Form.Item noStyle shouldUpdate>
                                            {() => {
                                                let maxNights = form.getFieldValue('max_night')
                                                let minNights = form.getFieldValue('min_night')
                                                let nights = Number(maxNights) < Number(minNights)
                                                return (
                                                    <span className="text-error text-wrap text-center">
                                                        {nights ? `Your maximum stay is ${maxNights} nights. Minimum nights must be less than the maximum.` : ''}
                                                    </span>
                                                )
                                            }}
                                        </Form.Item>
                                    </div>
                                </div>
                            )}

                            {['advance_notice', 'advance_notice_time', 'preparation_time', 'availability_window', 'more_activity'].includes(type.type ?? '') && (
                                <div className="w-full">
                                    <div className="w-full">
                                        <div
                                            onClick={() => setType(undefined)}
                                            className="w-[41px] cursor-pointer h-[41px] rounded-full flex items-center justify-center bg-[#F7F7F7]"
                                        >
                                            <Icon name="arrow-left2" />
                                        </div>
                                        {
                                            type?.type == 'more_activity' && (
                                                <div className='mt-8'>
                                                    <h1 className="text-main text-title_md text-center">
                                                        {(type as any).titleSmall}
                                                    </h1>
                                                    <p className="text-center text-p2 text-main opacity-[0.9] mt-2">
                                                        {type?.des}
                                                    </p>
                                                </div>
                                            )
                                        }

                                        <div className="mt-6 flex flex-col gap-5">
                                            {
                                                type?.type != 'more_activity' &&
                                                <Form.Item name={type?.type} noStyle>
                                                    <Radio.Group onChange={onChange as any} value={value}>
                                                        <Space direction="vertical" className="w-full flex flex-col gap-5">
                                                            {type?.days?.map((option) => (
                                                                <div className='' key={option.id}>
                                                                    <Radio value={option.value} className={`text-start flex flex-row-reverse justify-between border cursor-pointer ${active === option.id ? 'border-primary bg-primary-50' : 'bg-secondary hover:border-primary hover:bg-primary-50 border-secondary'} duration-200 px-4 py-[10px] rounded-[2px] flex items-center justify-between`}
                                                                        children={<h2 className="text-p2 text-main text-start">{option.name}</h2>}
                                                                    >
                                                                    </Radio>
                                                                </div>

                                                            ))}
                                                        </Space>
                                                    </Radio.Group>
                                                </Form.Item>
                                            }

                                            {
                                                type?.type == 'more_activity' && (
                                                    <Form.Item name={['restrict', 'check_in']} initialValue={[]}>
                                                        <MultiselectDays options={type?.days} name={['restrict', 'check_in']} />
                                                    </Form.Item>
                                                )
                                            }

                                            {type?.type == 'more_activity' && (

                                                <div className=''>
                                                    <h1 className="text-main text-title_md text-center">
                                                        {(type as any).titleSmall && (type as any)?.moreTitle}
                                                    </h1>
                                                    <p className="text-center text-p2 text-main opacity-[0.9] mt-2">
                                                        {(type as any).moreSub && (type as any)?.moreSub}
                                                    </p>
                                                </div>
                                            )}

                                            {
                                                type?.type == 'more_activity' && (
                                                    <Form.Item name={['restrict', 'check_out']} initialValue={[]} noStyle>
                                                        <MultiselectDays options={type?.days} name={['restrict', 'check_out']} />
                                                    </Form.Item>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col gap-5 mt-6">
                                <Button className='!py-[12px] !text-h4 rounded text-white'>
                                    Save
                                </Button>
                                <button onClick={() => setType({})} className="border-[1px] border-primary py-[11px] text-h4 rounded text-primary hover:bg-primary hover:text-white duration-500 ">Cancel</button>
                            </div>

                        </div>}
                    </>
                    :
                    <>
                        <div className="sidebar-option">
                            {items?.map((item: any, i: number) => <div key={i} className="">
                                <div className={`${i == 0 ? 'flex justify-between items-center' : ''} mt-8`}>
                                    <h1 className='text-cs'>{item?.title}</h1>
                                    {item.subTitle && <p className='text-xxs text-secondaryText mt-1'>{item.subTitle}</p>}
                                </div>
                                {
                                    (item?.title === 'Trip length') ?
                                        item?.options?.map((option: any, ci: number) => <div className='bg-white border border-webBorder rounded-sm mt-6'>
                                            <div key={ci} className={`flex justify-between items-start p-4`}>
                                                {
                                                    option?.data ?
                                                        <div className="">
                                                            <h1 className='text-title_md'>{option?.data}</h1>
                                                            <h1 className='text-p2 text-secondaryText'>{option?.subTitle}</h1>
                                                        </div>
                                                        :
                                                        <div className="">
                                                            <h1 className='text-title_md'>{option?.title}</h1>
                                                            <h1 className='text-p2 text-secondaryText'>{option?.subTitle}</h1>
                                                        </div>
                                                }
                                                <h1 onClick={() => {
                                                    setType(option)
                                                }} className='text-p underline text-primary cursor-pointer'>{option?.icon}</h1>
                                            </div>
                                        </div>)
                                        : <div className="space-y-5">
                                            {
                                                item?.options?.map((option: any, i: number) =>
                                                    <div key={i} className={`border border-webBorder p-4 rounded-sm mt-5 
                                                        ${option?.icon != 'Edit' ? 'cursor-pointer' : ''}`}
                                                        onClick={() => {
                                                            option?.icon != 'Edit' ? setType(option) : null
                                                        }}>
                                                        <div className={`flex ${option?.titleSmall ? 'items-center' : 'items-start'} justify-between`}>
                                                            {
                                                                option?.titleSmall ?
                                                                    <div className="">
                                                                        <h1 className={`text-p ${option?.subTitle ? '' : 'text-secondaryText'}`}>{option?.titleSmall}</h1>
                                                                        {
                                                                            option?.subTitle && <h1 className='text-p2 text-secondaryText my-1'>{option?.subTitle}</h1>
                                                                        }
                                                                    </div>
                                                                    : <h1 className='text-title_md'>{option?.title}</h1>
                                                            }
                                                            <h1 onClick={() => {
                                                                setType(option)
                                                            }} className='text-p underline text-primary cursor-pointer'>{option?.icon}</h1>
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

export default AvailabilitySidebar
