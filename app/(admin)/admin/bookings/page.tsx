"use client"

import {useFetch} from "../../../../helpers/hooks";
import {fetchBookings} from "../../../../helpers/backend";
import PageTitle from "../components/title";
import Table from "../components/table";
import dayjs from "dayjs";
import {statusClass} from "../../../../helpers/utils";
import {useRouter} from "next/navigation";

const Page = () => {
    const {push} = useRouter()
    const [data, getData] = useFetch(fetchBookings)

    const columns = [
        {
            text: 'Property',
            dataField: 'property',
            formatter: (value) => value?.title
        },
        {
            text: 'Address',
            dataField: 'property',
            formatter: (value) => value?.location?.name
        },
        {
            text: 'Booked By',
            dataField: 'user',
            formatter: (value) => value?.name
        },
        {
            text: 'Check In - Check Out',
            dataField: 'date',
            formatter: (_, data) => `${dayjs(data?.start_date).format('DD MMM')} - ${dayjs(data?.end_date).format('DD MMM')}`
        },
        {
            text: 'Status',
            dataField: 'status',
            formatter: d => <span className={statusClass[d]}>{d}</span>
        },
    ]


    return (
        <>
            <PageTitle title="Bookings"/>
            <Table
                columns={columns}
                data={data}
                item="Booking"
                onReload={getData}
                onView={({uid}) => {
                    push('/admin/bookings/' + uid)
                }}
                pagination
            />


        </>
    )
}

export default Page;