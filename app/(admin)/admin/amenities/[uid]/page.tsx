"use client";

import PageTitle from "../../components/title";
import AmenityForm from "../add/form";
import {Form} from "antd";
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {fetchAmenity} from "../../../../../helpers/backend";
import {toAssetUrl} from "../../../../../helpers/utils";

const EditAmenity = () => {
    const [form] = Form.useForm()
    const {uid} = useParams()
    useEffect(() => {
        fetchAmenity({uid}).then(({error, data}) => {
            if (!error) {
                form.setFieldsValue({
                    ...data,
                    icon: data.icon ? [{
                        uid: '-1',
                        name: 'icon.svg',
                        status: 'done',
                        url: toAssetUrl(data.icon)
                    }] : []
                })
            }
        })
    }, [uid])


    return (
        <>
            <PageTitle title="Edit Amenity"/>
            <AmenityForm form={form}/>
        </>
    )
}

export default EditAmenity