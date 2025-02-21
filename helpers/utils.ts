
export const statusClass = {
    'Under Approval': 'status-warning',
    'Approved': 'status-info',
    'Published': 'status-success',
    'Unpublished': 'status-secondary',
    'Rejected': 'status-danger',
    'suspended': 'status-danger',
    'pending': 'status-warning',
    'approved': 'status-info',
    'rejected': 'status-danger',
    'processing': 'status-info',
    'active': 'status-info',
    'completed': 'status-success',
    'complete': 'status-success',
    'cancelled': 'status-danger',
    'failed': 'status-danger',
    'refunded': 'status-danger',
    'on-hold': 'status-warning',
    'trash': 'status-info',
    'accepted': 'status-info',
    'started': 'status-success',
    'driver_pending': 'status-danger',
    'user_pending': 'status-danger',
    'ride': 'status-danger',
    'add_money': 'status-success',
    'break': 'status-warning',
    'paid': 'status-info',
    'expired': 'status-danger',
}

export const categories = [
    {
        title: "House",
        icon: "user-rounded",
        value: 'house',
    },
    {
        title: "Apartment",
        icon: "user-group",
        value: 'apartment'
    },
    {
        title: "Barn",
        icon: "broken-building",
        value: 'barn'
    },
    {
        title: "Bed & Breakfast",
        icon: "broken-industry",
        'value': 'bed_breakfast'
    },
    {
        title: "Boat",
        icon: "broken-bank",
        value: 'boat'
    },
    {
        title: "Cabin",
        icon: "broken-bank",
        value: 'cabin'
    },
    {
        title: "Camper",
        icon: "broken-bank",
        value: 'camper'
    }, {
        title: "Casa Particular",
        icon: "broken-bank",
        value: 'casa_particular'
    }
]

export const host_types = [
    {
        title: "An Enter Place",
        description: "Guest have the whole place to themselves",
        icon: "entire-place",
        value: 'entire_place'
    },
    {
        title: "A Room",
        description: "Guests have their own room in a home, plus access to shared spaces.",
        icon: "room",
        value: 'private_room'
    },
    {
        title: "A Shared Room",
        description: "Guests sleep in a room or common area that may be shared with you or others.",
        icon: "broken-building",
        value: 'shared_room'
    },
]

export const reservations = [
    {
        title: "Approve or decline requests",
        description: "Guests must ask if they can book.",
        icon: "message-black",
        value: 'request'
    },
    {
        title: "Use Instant Book",
        description: "Guests can book automatically.",
        icon: "thunder",
        value: 'instant'
    }
]

export const firstReservation = [
    {
        title: "Any guest",
        description: "Get reservations faster when you welcome anyone from the community.",
        value: "any"
    },
    {
        title: "An experienced guest",
        description: "For your first guest, welcome someone with a good track record and who can offer tips for how to be a great Host.",
        value: "experienced"
    },
]

export const discounts = [
    {
        title: "New listing promotion",
        description: "Offer 20% off your first 3 bookings",
        value: 'promotion',
        discounts: 20
    },
    {
        title: "Weekly discount",
        description: "For stays of 7 nights or more",
        value: 'weekly_discount',
        discounts: 10
    },
    {
        title: "Monthly discount",
        description: "For stays of 28 nights or more",
        value: 'monthly_discount',
        discounts: 20
    }
]
export const lastStep = [
    {
        title: "Exterior security cameras",
        value: 'security',
    },
    {
        title: "Noise decibel monitors",
        value: 'monitors',
    },
    {
        title: "Weapons",
        value: 'weapons',
    }
]

export const places = [
    {
        title: "Next destination",
        icon: "education",
        value: 'next_destination'
    },
    {
        title: "Next destination",
        icon: "education",
        value: 'next_destination1'
    },
    {
        title: "Next destination",
        icon: "education",
        value: 'next_destination2'
    },
    {
        title: "Next destination",
        icon: "education",
        value: 'next_destination3'
    },
]

export const interest = [
    {
        label: "Out Doors",
        icon: "out-doors",
        value: 'out-doors'
    },
    {
        label: "Yoga",
        icon: "yoga",
        value: 'yoga'
    },
    {
        label: "History",
        icon: "history",
        value: 'history'
    },
    {
        label: "Shopping",
        icon: "shopping",
        value: 'shopping'
    },
    {
        label: "Photography",
        icon: "photography",
        value: 'photography'
    },
    {
        label: "Edu",
        icon: "education",
        value: 'edu'
    },
    {
        label: "Song",
        icon: "song",
        value: 'song'
    },
]

export const basicsItems = [
    {
        name: "guests",
        label: "Guests",
        max: 16,
        min: 1,
    },
    {
        name: "bedrooms",
        label: "Bedrooms",
        max: 16,
        min: 0,
    },
    {
        name: "beds",
        label: "Beds",
        max: 16,
        min: 1,
    },
    {
        name: "bathrooms",
        label: "Bathrooms",
        max: 16,
        min: 0,
    },
]

export const bathroomItems = [
    {
        name: "private",
        label: "Private and attached",
        short_description: "It’s connected to the guest’s room and is just for them.",
        max: 16,
        min: 0,
    },
    {
        name: "shared",
        label: "Shared",
        short_description: "It’s shared with other people.",
        max: 16,
        min: 0,
    },
    {
        name: "dedicated",
        label: "Dedicated",
        short_description: "It’s private, but accessed via a shared space, like a hallway.",
        max: 16,
        min: 0,
    }
]

export const occupancyItems = [
    {
        name: "me",
        label: "Me",
        icon: "user-rounded-black",
    },
    {
        name: "family",
        label: "My family",
        icon: "family",
    },
    {
        name: "guests",
        label: "Other guests",
        icon: "guests-icon",
    },
    {
        name: "roommates",
        label: "Roommates",
        icon: "roommates",
    },
]

export const currencies = [
    {label: "United States Dollar - $", value: "USD"},
    {label: "Argentine Peso - $", value: "ARS"},
    {label: "Euro - €", value: "EUR"},
    {label: "British Pound Sterling - £", value: "GBP"},
    {label: "Canadian Dollar - $", value: "CAD"},
    {label: "Australian Dollar - $", value: "AUD"},
    {label: "Japanese Yen - ¥", value: "JPY"},
    {label: "Swiss Franc - CHF", value: "CHF"},
    {label: "Chinese Yuan - ¥", value: "CNY"},
    {label: "Indian Rupee - ₹", value: "INR"},
    {label: "Brazilian Real - R$", value: "BRL"},
    {label: "Mexican Peso - $", value: "MXN"},
    {label: "South African Rand - R", value: "ZAR"},
    {label: "South Korean Won - ₩", value: "KRW"},
]

export const getTimeFormat = seconds => {
    return seconds > 0 ? `${(seconds / 3600).toFixed(0)}:${((seconds / 60 >> 0) % 60).toString().padStart(2, '0')}` : ''
}

export const toAssetUrl = (url) => {
    if (!url) return ''
    if(url.startsWith('local')) {
        return url.replace('local', '')
    }
    if (typeof url === 'string') {
        return url ? `${process.env.asset_url}assets/${url}` : ''
    }
    try {
        return URL.createObjectURL(url)
    } catch (e) {
        return ''
    }
}


export const addQueryToUrl = (query: Object, pathname = '') => {
    let url = new URL(window.location.href)
    Object.keys(query).forEach(key => {
        if (!!query[key]) {
            url.searchParams.set(key, query[key])
        } else {
            url.searchParams.delete(key)
        }
    })
    return (pathname || url.pathname) + url.search
}
