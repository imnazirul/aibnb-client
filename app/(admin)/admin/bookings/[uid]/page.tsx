"use client"


import {useFetch} from "../../../../../helpers/hooks";
import {fetchBooking} from "../../../../../helpers/backend";
import PageTitle from "../../components/title";
import {DetailsTable} from "../../components/table";
import dayjs from "dayjs";
import {statusClass} from "../../../../../helpers/utils";

const BookingDetails = ({params}) => {

    let {uid} = params

    const [data] = useFetch(fetchBooking, {uid})


    return (
        <>
            <PageTitle title="Booking Details"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailsTable
                    title="Property Details"
                    column={[
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
                            text: 'Owner',
                            dataField: 'property',
                            formatter: (value) => value?.owner?.name
                        },
                        {
                            text: 'Contact Email',
                            dataField: 'property',
                            formatter: (value) => value?.owner?.email
                        },
                        {
                            text: 'Contact Phone',
                            dataField: 'property',
                            formatter: (value) => value?.owner?.phone
                        },
                    ]}
                    data={data}/>
                <DetailsTable
                    title="Booking Details"
                    column={[
                        {
                            text: 'Booked By',
                            dataField: 'user',
                            formatter: (value) => value?.name
                        },
                        {
                            text: 'Contact Email',
                            dataField: 'user',
                            formatter: (value) => value?.email
                        },
                        {
                            text: 'Contact Phone',
                            dataField: 'user',
                            formatter: (value) => value?.phone
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
                    ]}
                    data={data}/>


            </div>


        </>

    )
}

export default BookingDetails