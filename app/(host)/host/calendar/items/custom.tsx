import Tab from "./tab";
import dayjs from "dayjs";
import {FiX} from "react-icons/fi";
import {useAction} from "../../../../../helpers/hooks";
import {patchProperty} from "../../../../../helpers/backend";
import {
    formatPrice,
    getAdditionalCharge,
    getDiscountPrice,
    getPrice,
    getTotalDiscount
} from "../../../../../helpers/property";

const CustomPricing = ({form, data, currentTab, onReload, setTab, selected, setSelected}) => {


    return (
        <>
            <Tab
                value='custom_pricing'
                current={currentTab}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-2xl font-semibold underline">{getDates(selected)}</p>
                        <button
                            onClick={() => setSelected([])}>
                            <FiX size={18}/>
                        </button>
                    </div>
                    <Availability
                        data={data}
                        dates={selected}
                        onReload={onReload}
                        onMixed={() => {
                            setTab('availability')
                            form.resetFields()
                            form.setFieldsValue({uid: data.uid, custom: {dates: selected, open: undefined}})
                        }}
                    />

                    <Price
                        dates={selected}
                        data={data}
                        setTab={setTab}
                        form={form}
                    />

                    <GuestTotal
                        data={data}
                        dates={selected}
                    />
                </div>
            </Tab>
        </>
    )
}

export default CustomPricing;


export const Price = ({dates, data, setTab, form}) => {
    const prices = dates?.map(d => getPrice(dayjs(d, 'YYYY-MM-DD'), data))
    const isSame = prices?.every((price, _, arr) => price === arr[0])
    let min = Math.min(...prices)
    let max = Math.max(...prices)

    return (
        <div
            role="button"
            onClick={() => {
                setTab('custom_price')
                form.resetFields()
                form.setFieldsValue({uid: data.uid, custom: {dates, price: isSame ? prices[0] : 0}})
            }}
            className="border rounded-lg mb-4">
            <p className="text-3xl font-semibold text-gray-700 p-6">${isSame ? prices[0] : `${min} - $${max}`}</p>

            {data?.promotions?.new && (
                <div className="p-4 border-t">
                    ${isSame ? formatPrice(prices[0] * 0.8) : `${formatPrice(min * 0.8)} - $${formatPrice(max * 0.8)}`} with new listing discount
                </div>
            )}
        </div>
    )
}

export const GuestTotal = ({data, dates}) => {
    let total = dates?.reduce((acc, date) => {
        let price = getDiscountPrice(dayjs(date, 'YYYY-MM-DD'), data)
        let additionalCharge = getAdditionalCharge(data)
        return acc + price + additionalCharge

    }, 0)


    return (
        <div className="border rounded-lg mb-4 p-6">
            Guest Total ${total % 1 === 0 ? total : total.toFixed(2)}
        </div>
    )

}


const Availability = ({data, onReload, dates, onMixed}) => {

    let isAllOpen = dates?.every(date => !!data?.custom?.[date]?.open)
    let isAllBlocked = dates?.every(date => !data?.custom?.[date]?.open)

    const handleUpdate = (open: boolean) => {
        return useAction(patchProperty, {
            uid: data?.uid,
            custom: {
                dates,
                open
            }
        }, () => {
            onReload()
        }, false,)
    }

    return (
        <div className="mb-6">
            {(isAllBlocked || isAllOpen) ? (
                <div className="flex border bg-gray-100 rounded-full p-1 relative">
                    <div
                        className={`absolute w-1/2 ${isAllOpen ? 'left-1' : 'right-1'} bg-gray-900 rounded-full top-1 bottom-1`}/>
                    <div
                        role="button"
                        onClick={() => handleUpdate(true)}
                        className={`w-1/2 text-center hover:underline p-1.5 ${isAllOpen ? 'text-white' : ''} z-10`}>
                        Open Night
                    </div>
                    <div
                        role="button"
                        onClick={() => handleUpdate(false)}
                        className={`w-1/2 text-center hover:underline p-1.5 ${!isAllOpen ? 'text-white' : ''} z-10`}>
                        Blocked
                    </div>
                </div>
            ) : (
                <button
                    onClick={onMixed}
                    className="border rounded-full p-2.5 text-center font-medium text-gray-800 w-full">
                    Edit Availability
                </button>
            )}

        </div>
    )

}


const getDates = (dates) => {
    if (dates.length === 1) {
        return dayjs(dates[0])?.format('MMM DD')
    }
    if (dates.length > 1) {
        let minDate = dayjs(dates[0])
        let maxDate = dayjs(dates[dates.length - 1])
        for (let i = 0; i < dates.length; i++) {
            let date = dayjs(dates[i])
            if (date.isBefore(minDate)) {
                minDate = date
            }
            if (date.isAfter(maxDate)) {
                maxDate = date
            }
        }
        if (maxDate.diff(minDate, 'days') === dates?.length - 1) {
            return `${minDate.format('MMM DD')} - ${maxDate.format('MMM DD')}`
        } else {
            return `${dates.length} nights`
        }
    }
    return ''
}