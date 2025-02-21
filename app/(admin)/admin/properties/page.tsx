"use client"

import PageTitle from "../components/title";
import {useFetch} from "../../../../helpers/hooks";
import {fetchProperties} from "../../../../helpers/backend";
import Table from "../components/table";
import {host_types, statusClass} from "../../../../helpers/utils";
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter()
    const [data, getData] = useFetch(fetchProperties)


    return (
        <>
            <PageTitle
                title="Properties"
            />
            <Table
                columns={[
                    {
                        text: 'Title',
                        dataField: 'title'
                    },
                    {
                        text: 'Category',
                        dataField: 'category',
                        formatter: (value) => value?.name
                    },
                    {
                        text: 'Type',
                        dataField: 'type',
                        formatter: (value) => host_types.find(category => category.value === value)?.title
                    },
                    {
                        text: 'Rooms',
                        dataField: 'rooms'
                    },
                    {
                        text: 'Bedrooms',
                        dataField: 'bedrooms'
                    },
                    {
                        text: 'Bathrooms',
                        dataField: 'bathrooms'
                    },
                    {
                        text: 'Address',
                        dataField: 'location',
                        className: '!max-w-[200px] truncate',
                        formatter: (value) => value?.name
                    },
                    {
                        text: 'Status',
                        dataField: 'status',
                        formatter: (status) => <span className={statusClass[status]}>{status}</span>
                    },
                ]}
                data={data}
                pagination
                onView={({uid}) => router.push(`/admin/property/${uid}`)}

            />
        </>
    )
}

export default Page;