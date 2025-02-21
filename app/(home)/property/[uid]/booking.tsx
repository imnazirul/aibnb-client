"use client"

import {Modal, notification, Radio, Tooltip} from "antd";
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";
import {FiChevronLeft} from "react-icons/fi";
import {toAssetUrl} from "../../../../helpers/utils";
import {FaStar} from "react-icons/fa";
import {formatPrice, getDiscountPrice} from "../../../../helpers/property";
import dayjs from "dayjs";
import {useState} from "react";
import {postBooking, postBookingIdent} from "../../../../helpers/backend";
import PaymentForm from "./payment";

const Booking = ({data}) => {
    const router = useRouter()
    const [payType, setPayType] = useState('pay_later')
    const params = useSearchParams()
    const from = dayjs(params.get('from'), 'YYYY-MM-DD')
    const to = dayjs(params.get('to'), 'YYYY-MM-DD')

    const [loading, setLoading] = useState(false)

    let prices = []
    const available = false
    for (let start = dayjs(from); start.isBefore(dayjs(to)); start = start.add(1, 'day')) {
        prices.push({
            date: start,
            price: getDiscountPrice(start, data)
        })
    }
    let nights = prices.length
    const subtotal = prices.reduce((acc, item) => acc + item.price, 0)
    let cleaning = (data?.fees?.stay || 0) * nights
    const total = subtotal + cleaning + (0)

    const guests = (+params.get('adults') || 1) + (+params.get('children') || 0)

    const onBack = () => {
        setPayment({})
        document.querySelector('#property_details')?.classList.remove('hidden')
        document.querySelector('#booking_details')?.classList.add('hidden')
    }

    const [payment, setPayment] = useState<any>({})
    const [showPayment, setShowPayment] = useState(false)


    const handlePayment = async () => {
        if (!!payment?._id) {
            setShowPayment(true)
            return
        }
        setLoading(true)
        let res = await postBookingIdent({
            property: data._id,
            amount: +formatPrice(payType === 'pay_now' ? total : total * .25),
            type: payType === 'pay_now' ? 'full' : 'partial'
        })
        if (res.error) {
            setLoading(false)
            notification.error({
                message: 'Error',
                description: res.msg
            })
            return
        }
        setPayment(res.data)
        setShowPayment(true)
    }


    const handleBooking = async () => {
        setLoading(true)
        let res = await postBooking({
            property: data._id,
            start_date: from.format('YYYY-MM-DD'),
            end_date: to.format('YYYY-MM-DD'),
            adults: +params.get('adults') || 1,
            children: +params.get('children') || 0,
            infants: +params.get('infants') || 0,
            pets: +params.get('pets') || 0,
            days: nights,
            prices: prices.reduce((acc, item) => {
                acc[item.date.format('YYYY-MM-DD')] = item.price
                return acc
            }, {}),
            subtotal,
            cleaning,
            total,
            ident: payment.ident,
        })
        if (res.error) {
            setLoading(false)
            notification.error({
                message: 'Error',
                description: res.msg
            })
            return
        }
        setLoading(false)
        router.push('/bookings')
    }


    const PayType = ({onChange, value}) => {
        return (
            <div className="">
                <Radio.Group className='w-full' value={value}>
                    <label
                        className='bg-white text-black flex justify-between items-center border-t-2 border-r-2 border-l-2 p-2 rounded-tl-lg rounded-tr-lg cursor-pointer'
                        onClick={() => onChange('pay_now')}
                        htmlFor={`radio_pay_now`}
                    >
                        <div className="">
                            <h1 className="text-p">Pay in full</h1>
                            <p className='text-p2 text-secondaryText'>Pay the total (${formatPrice(total)}) now and you
                                are all set</p>
                        </div>
                        <Radio rootClassName='!w-5 !h-5' value={'pay_now'} id={`radio_pay_now`}/>
                    </label>
                    <label
                        className='bg-white text-black flex justify-between items-center border-2 p-2 rounded-bl-lg rounded-br-lg cursor-pointer'
                        onClick={() => onChange('pay_later')}
                        htmlFor={`radio_pay_later`}
                    >
                        <div className="">
                            <h1 className="text-p">Pay part now, part later</h1>
                            <p className='text-p2 text-secondaryText'>${formatPrice(total * .25)} due today,
                                ${formatPrice(total * .75)} on {from.format('MMM DD, YYYY')}. No extra fees</p>
                        </div>
                        <Radio rootClassName='!w-5 !h-5' value={'pay_later'} id={`radio_pay_later`}/>
                    </label>
                </Radio.Group>
            </div>
        )
    }

    return (
        <div className="py-12 mx-auto max-w-[1120px]">
            <div className="flex items-center gap-4 mb-10">
                <FiChevronLeft
                    role="button"
                    onClick={() => onBack()}
                    size={24}/>
                <p className="text-2xl font-medium">Confirm and Pay</p>
            </div>

            <Modal
                title="Confirm and Pay"
                open={showPayment}
                footer={null}
                onCancel={() => setShowPayment(false)}
                destroyOnClose={true}
            >
                <PaymentForm
                    clientSecret={payment?.client_secret}
                    publishableKey={payment?.pub_key}
                    onSuccess={() => {
                        setShowPayment(false)
                        return handleBooking()
                    }}
                    onFailed={() => {
                        setLoading(false)
                    }}
                />

            </Modal>

            <div className="md:flex-row flex flex-col-reverse gap-20 ">
                <div className="basis-[55%]">
                    <div className="flex justify-between items-center border-2 rounded-lg px-4 py-2.5">
                        <div className="flex flex-col">
                            <p className="text-p text-black">This is a rare find</p>
                            <span className="text-p2 text-gray-500">This place is usually booked.</span>
                        </div>
                        <Image src="/diamond.jpeg" alt="" className="w-20 h-20" width={120} height={120}/>
                    </div>
                    <h2 className="text-h4 mt-8 mb-4">Your trip</h2>
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <p className="text-p text-black">Dates</p>
                                <span
                                    className="text-p2 text-gray-500">{from.format('MMM DD')}-{from.isSame(to, 'months') ? to.format('DD') : to.format('MMM DD')}</span>
                            </div>
                            <span onClick={() => onBack()} className="text-p underline cursor-pointer">Edit</span>

                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <p className="text-p text-black">Guests</p>
                                <span className="text-p2 text-gray-500">{guests} Guests</span>
                            </div>
                            <span onClick={() => onBack()} className="text-p underline cursor-pointer">Edit</span>
                        </div>
                    </div>
                    <div className="border-t-2 border-b-2 py-8 my-6">
                        <h2 className="text-title_md text-black">Choose how to pay</h2>
                        <div className="mt-6">
                            <PayType value={payType} onChange={setPayType}/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-title_md text-black">Pay with</h2>
                        <div className="flex gap-1">
                            <Image src="/paypal1.jpg" alt="" className="w-12 h-12 object-contain" width={100}
                                   height={100}/>
                            <Image src="/master.png" alt="" className="w-12 h-12 object-contain" width={100}
                                   height={100}/>
                            <Image src="/visa.png" alt="" className="w-12 h-12 object-contain" width={100}
                                   height={100}/>
                            <Image src="/paypal1.jpg" alt="" className="w-12 h-12 object-contain" width={100}
                                   height={100}/>
                        </div>
                    </div>


                    <button
                        disabled={loading}
                        onClick={handlePayment}
                        className="w-full mt-6 bg-pink-600 disabled:opacity-70 text-white py-3 rounded-lg font-bold mb-4 hover:bg-pink-700 transition duration-200"
                    >
                        {loading ? 'Loading...' : 'Confirm and pay'}
                    </button>

                </div>

                <div className="basis-[35%]">
                    <div className="p-5 bg-white shadow-xl rounded-xl border-2">
                        <div className="grid grid-cols-4 gap-4 pb-5 border-b">
                            <div className="col-span-1">
                                {data?.images[0] ? <Image className="rounded-md h-[90px] object-cover"
                                                          src={toAssetUrl(data?.images[0])} alt="" width={120}
                                                          height={120}/> : null}
                            </div>
                            <div className="col-span-3 flex flex-col justify-between h-full">
                                <div className="">
                                    <p className="text-p1 text-secondaryText">Entire rental unit</p>
                                    <h2 className="text-p text-main text-wrap">{data?.title}</h2>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <FaStar/>
                                    <span>5.00 (3 reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 mt-5">
                            <div className="flex justify-between">
                                <span>${formatPrice(prices[0]?.price)} x {nights} nights</span>
                                <span>${formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <Tooltip color={'white'} arrow={false} placement="bottomRight" trigger={['click']}
                                         title={<PriceBreakdown title={"Cleaning fee"} data={10} subtotal={220}/>}>
                                    <span className="underline cursor-pointer">Cleaning fee</span>
                                </Tooltip>
                                <span>${formatPrice(cleaning)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-p">Total USD</span>
                                <span>${formatPrice(total)}</span>
                            </div>
                            {payType === 'pay_later' && (
                                <>
                                    <div className="flex justify-between pt-4 border-t border-gray-300 font-semibold">
                                        <span className="text-p">Due now</span>
                                        <span>${formatPrice(total * .25)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Due {from.format('MMM DD, YYYY')}</span>
                                        <span>${formatPrice(total * .75)}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Booking


const PriceBreakdown = ({data, subtotal, title}) => {
    return (
        <div className='w-[280px] bg-white border rounded-md py-5 shadow-2xl'>
            <div className='border-b pb-4'>
                <h2 className="text-p text-center">{title}</h2>
            </div>
            <div className='px-5'>
                <div className="space-y-2 mt-2 text-p3">
                    <div className="flex justify-between">
                        <span>Price is </span>
                        <span>${formatPrice(data)}</span>
                    </div>
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between text-p1">
                    <span>Total Base Price</span>
                    <span>${formatPrice(subtotal)}</span>
                </div>
            </div>
        </div>
    )
}