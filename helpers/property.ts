export const getPrice = (date, data) => {
    let price = data?.price
    if (!!data?.weekend_price) {
        if ([5, 6].includes(date.day())) {
            price = data?.weekend_price
        }
    }
    let custom = data?.custom?.[date.format('YYYY-MM-DD')]?.price
    if (!!custom) {
        price = custom
    }
    return price
}


export const getDiscountPrice = (date, data) => {
    let price = getPrice(date, data)
    return getTotalDiscount(price, data)
}


export const getTotalDiscount = (price, data) => {
    if(!!data?.promotions?.new) {
        price = price * 0.8
    }
    return price
}


export const getAdditionalCharge = (data) => {
    let additionalCharge = 0
    if (!!data?.fees) {
        additionalCharge += data?.fees?.stay || 0
        additionalCharge += data?.fees?.pet || 0
        additionalCharge += data?.fees?.guest || 0
    }
    return additionalCharge

}

export const formatPrice = (price) => {
    return (price % 1 === 0 ? price : price?.toFixed(2)) || 0
}