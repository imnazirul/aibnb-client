'use client'


import {useFetch} from "../../../../../helpers/hooks";
import {fetchProperty} from "../../../../../helpers/backend";

const Property = ({params}) => {

    const [data] = useFetch(fetchProperty, {
        uid: params.uid
    })

    return (
        <>

            </>
    )
}

export default Property;