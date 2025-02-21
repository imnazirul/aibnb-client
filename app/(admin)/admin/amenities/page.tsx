"use client"

import {useFetch} from "../../../../helpers/hooks";
import {delAmenity, fetchAmenities} from "../../../../helpers/backend";
import PageTitle from "../components/title";
import Table from "../components/table";
import {toAssetUrl} from "../../../../helpers/utils";
import Svg from "../../../../components/common/svg";
import {useRouter} from "next/navigation";

const Amenities = () => {
    const {push} = useRouter()
    const [data, getData] = useFetch(fetchAmenities)

    const columns = [
        {
            text: 'Category',
            dataField: 'category',
            formatter: (value: any) => value?.name
        },
        {
            text: 'Name',
            dataField: 'name'
        },
        {
            text: 'Slug',
            dataField: 'slug'
        },
        {
            text: 'Icon',
            dataField: 'icon',
            formatter: (value: string) => <Svg src={toAssetUrl(value)}/>
        },
        {
            text: 'Position',
            dataField: 'sort'
        }
    ]


    return (
        <>
            <PageTitle title="Amenities"/>
            <Table
                columns={columns}
                data={data}
                item="Amenity"
                onAdd={() => {
                    push('/admin/amenities/add')
                }}
                onEdit={values => {
                    push(`/admin/amenities/${values.uid}`)
                }}
                onDelete={delAmenity}
                onReload={getData}
            />
        </>
    )
}

export default Amenities;