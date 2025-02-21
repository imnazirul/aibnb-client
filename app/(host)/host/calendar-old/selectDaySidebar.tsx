import { Form, Tooltip } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../../../../components/common/icon';
import Button from '../../../../components/common/button';
import { useOutsideClick } from '../../../../helpers/hooks';
import { CalendarPrice } from '../../../../components/calendar/calender-price';
import PriceTooltip from '../../../../components/calendar/price-tooltip';
import GuestSelector from '../../../../components/calendar/guest-selector';
import PetSelector from '../../../../components/calendar/pet-selector';
import PriceBreakdown from '../../../../components/calendar/price-breakdown';

interface DayProps {
    type?: string;
    typeTitle?: string;
    typeSubTitle?: string;
    typeDes?: string;
    price?: string;
    title?: string;
    subTitle?: string;
    item?: string;
    icon?: string | JSX.Element;
    des?: string;
}

const SelectDaySidebar = ({ selectedDates, setTab, setSelectedDates, onCloseBottom }) => {
    const [form] = Form.useForm()
    const [type, setType] = useState<DayProps | undefined>(undefined);
    const [price, setPrice] = useState<string>('')
    const [priceBreakDownType, setPriceBreakDownType] = useState<string>('')
    const [guests, setGuest] = useState({ type: '', adults: 0, children: 0, infants: 0 });
    const [pets, setPets] = useState({ type: '', pets: 0 });
    const priceBreakDownRef = useRef<any>(null);
    const data = useMemo(() => ({ adults: 1, children: 1, infants: 0, per_night: 20, pets: 0 }), []);

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                per_night: data.per_night || 0,
            });
            setGuest({ type: '', adults: data.adults || 0, children: data.children || 0, infants: data.infants || 0 });
            setPets({ type: '', pets: data.pets || 0 });
        }
    }, [data, form]);

    useOutsideClick(
        priceBreakDownRef,
        () => setPriceBreakDownType(undefined)
    )

    let formattedDates;
    if (selectedDates.length === 0) {
        setTab("pricing");
    } else if (selectedDates.length === 1) {
        formattedDates = selectedDates[0]?.dateStr;
    } else {
        let month = selectedDates[0]?.dateStr?.split(" ")[0];
        let days = selectedDates.map(date => date?.dateStr?.split(" ")[1]);
        let sequential = true;
        for (let i = 1; i < days.length; i++) {
            if (parseInt(days[i]) !== parseInt(days[i - 1]) + 1) {
                sequential = false;
                break;
            }
        }
        if (sequential) {
            formattedDates = `${month} ${days[0]}-${days[days.length - 1]}`;
        } else {
            formattedDates = `${selectedDates.length} Nights`;
        }
    }

    const items = [
        {
            title: formattedDates
        },
        {
            options: [
                {
                    type: "per_night",
                    typeTitle: "Per Night",
                    icon: "Edit",
                    data: 15
                }
            ]
        },
        {
            options: [
                {
                    titleSmall: "Guest total",
                    typeTitle: "Price breakdown",
                    subTitle: "Price breakdown",

                    typeDes: "Adjust guests and pets, and we’ll show you the final price.",
                    icon: <Icon name={"right-arrow"} />,
                    type: "guest_total"
                },
                {
                    titleSmall: <div className='flex gap-1 items-center'><Icon name={"search-location"} /> <span>View similar listings</span></div>,
                    typeTitle: "View similar listings",
                    subTitle: "View similar listings",
                    icon: <Icon name={"right-arrow"} />,
                    type: "similar_listings"
                },
                {
                    titleSmall: "Add private note",
                    typeTitle: "Your private note",
                    subTitle: "Add private note",
                    icon: <Icon name={"right-arrow"} />,
                    type: "private_note"
                }
            ]
        }
    ]

    const handleSubmit = (values) => {
        setType(undefined)
        setTab("selectDay")
        console.log(values)
        console.log("date", selectedDates?.map(date => date?.date.format('YYYY-MM-DD')))
        console.log("guests", guests)
        console.log("pets", pets)
    }

    return (
        <div className="">
            <Form form={form}
                onFinish={(values) => {
                    handleSubmit(values)
                }}>
                {type?.type ?
                    <>
                        {(type?.type == 'per_night' || type?.type == "guest_total" || type?.type == "private_note" || type?.type == "similar_listings") &&
                            <div className="">
                                <h1 className="text-main text-title_md text-center mt-2">{type?.typeTitle}</h1>
                                {<h4 className="text-c1 text-center mt-2">{type?.typeSubTitle}</h4>}
                                {<p className="text-center text-s text-secondaryText mt-2">{type?.typeDes}</p>}
                                {type.type === 'per_night' && (
                                    <div className="mt-6 border-[1px] border-dashed border-webBorder px-4">
                                        <Form.Item name={type?.type} noStyle initialValue={1}>
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
                                            <Tooltip color={'white'} placement="bottomRight" trigger={['click', 'hover']} title={
                                                <PriceTooltip form={form} type={type?.type} />}
                                            >
                                                {
                                                    price ?
                                                        <span onClick={() => setPrice(price)} className="cursor-pointer"><Icon name={"up-arrow"} /></span>
                                                        :
                                                        <span onClick={() => setPrice(price)} className="cursor-pointer"><Icon name={"down-arrow"} /></span>
                                                }
                                            </Tooltip>
                                        </div>


                                    </div>
                                )}

                                {type.type === 'private_note' && (
                                    <div className="mt-6">
                                        <Form.Item name={type?.type} noStyle>
                                            <textarea className="w-full border border-webBorder rounded-sm p-4" placeholder="Add private note" />
                                        </Form.Item>
                                    </div>
                                )}

                                {type.type === 'guest_total' && (
                                    <div className="mt-6">

                                        <div className="flex items-center justify-center">
                                            <div className="w-full my-2">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div ref={priceBreakDownRef} className="flex items-center space-x-2">
                                                        <GuestSelector
                                                            priceBreakDownType={priceBreakDownType}
                                                            setPriceBreakDownType={setPriceBreakDownType}
                                                            guests={guests}
                                                            setGuest={setGuest}
                                                        />

                                                        <PetSelector
                                                            priceBreakDownType={priceBreakDownType}
                                                            setPriceBreakDownType={setPriceBreakDownType}
                                                            pets={pets}
                                                            setPets={setPets}
                                                        />
                                                    </div>
                                                </div>
                                                <PriceBreakdown
                                                    data={data}
                                                    selectedDates={selectedDates}
                                                    guests={guests}
                                                    pets={pets}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-5 mt-6">
                                    {type.type != 'guest_total' && (
                                        <Button className='!py-[12px] !text-h4 rounded text-white'>
                                            Save
                                        </Button>
                                    )}
                                    <button onClick={() => setType({})} className="border-[1px] border-primary py-[11px] text-h4 rounded text-primary hover:bg-primary hover:text-white duration-500 ">Cancel</button>
                                </div>

                            </div>}
                    </>
                    :
                    <>
                        <div className="sidebar-option">
                            {items?.map((item: any, i: number) =>
                                <div key={i} className="">
                                    <div className={`${i == 0 ? 'flex justify-between items-center' : ''} mt-2`}>
                                        <h1 className='text-cs'>{item?.title}</h1>
                                        {item.subTitle && <p className='text-xxs text-secondaryText mt-1'>{item.subTitle}</p>}
                                        {
                                            i === 0 && <div onClick={() => { setTab("pricing"); setSelectedDates([]); onCloseBottom() }} className="w-[41px] h-[41px] rounded-full flex items-center justify-center cursor-pointer bg-[#F7F7F7] mt-2">
                                                <Icon name={"cancel"} />
                                            </div>
                                        }
                                    </div>
                                    {
                                        <div className="space-y-5">
                                            {
                                                item?.options?.map((option: any, i: number) =>
                                                    <div key={i} className={`border border-webBorder p-4 rounded-sm mt-5 
                                                        ${option?.icon != 'Edit' ? 'cursor-pointer' : ''}`}
                                                        onClick={() => {
                                                            option?.icon != 'Edit' ? setType(option) : null
                                                        }}
                                                    >
                                                        <div className={`flex ${option?.titleSmall ? 'items-center' : 'items-start'} justify-between`}>
                                                            {
                                                                option?.data ?
                                                                    <>
                                                                        <div className="">
                                                                            <h1 className={`text-title_md ${option?.data ? '' : 'text-secondaryText'}`}>
                                                                                {
                                                                                    (option?.type == 'per_night')
                                                                                        ? '$'
                                                                                        : ''
                                                                                }
                                                                                {option?.data}
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
                                                                        <h1 onClick={() => {
                                                                            setType(option)
                                                                        }} className='text-p underline text-primary cursor-pointer'>
                                                                            {option?.icon ? option?.icon : "Edit"}
                                                                        </h1>
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
    );
};

export default SelectDaySidebar;