"use client"

import {useFetch} from "../../../../helpers/hooks";
import {fetchHosts} from "../../../../helpers/backend";
import PageTitle from "../components/title";
import Table from "../components/table";
import {useRouter} from "next/navigation";
import {statusClass} from "../../../../helpers/utils";

const Hosts = () => {
    const router = useRouter()
    const [data, getData] = useFetch(fetchHosts)


    return (
        <>
            <PageTitle title="Hosts"/>
            <Table
                columns={[
                    {
                        text: 'Name',
                        dataField: 'name'
                    },
                    {
                        text: 'Email',
                        dataField: 'email'
                    },
                    {
                        text: 'Phone',
                        dataField: 'phone'
                    },
                    {
                        text: 'Citizenship',
                        dataField: 'host',
                        formatter: (host) => host?.citizenship
                    },
                    {
                        text: 'Address',
                        dataField: 'host',
                        className: '!max-w-[200px] truncate',
                        formatter: (host) => `${host?.address?.street}, ${host?.address?.city}, ${host?.address?.state}, ${host?.address?.country}`
                    },
                    {
                        text: 'Status',
                        dataField: 'host',
                        formatter: (host) => <span className={statusClass[host.status]}>{host?.status}</span>
                    },
                ]}
                data={data}
                pagination
                onView={({uid}) => router.push(`/admin/host/${uid}`)}
            />
        </>
    )
}

export default Hosts;