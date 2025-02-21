"use client"

import {Form, Modal} from "antd";
import {useState} from "react";
import {useAction, useFetch} from "../../../../helpers/hooks";
import {delPropertyTag, fetchPropertyTags, patchPropertyTag, postPropertyTag} from "../../../../helpers/backend";
import PageTitle from "../components/title";
import Table from "../components/table";
import FormInput, {HiddenInput} from "../../../../components/form/input";
import FormImage from "../../../../components/form/file";
import {toAssetUrl} from "../../../../helpers/utils";
import Svg from "../../../../components/common/svg";

const Tags = () => {
    const [form] = Form.useForm()
    const [show, setShow] = useState(false)
    const [data, getData] = useFetch(fetchPropertyTags)

    const columns = [
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
            text: 'Description',
            dataField: 'description'
        },
        {
            text: 'Position',
            dataField: 'sort'
        }
    ]


    return (
        <>
            <PageTitle title="Tags"/>
            <Table
                columns={columns}
                data={data}
                item="Tag"
                onAdd={() => {
                    form.resetFields()
                    form.setFieldsValue({
                        sort: (data?.length ?? 0) + 1,
                        type: ''
                    })
                    setShow(true)
                }}
                onEdit={values => {
                    form.resetFields()
                    form.setFieldsValue({
                        ...values,
                        type: values.type ?? '',
                        icon: [{
                            uid: '-1',
                            name: 'icon.svg',
                            status: 'done',
                            url: toAssetUrl(values.icon)
                        }]
                    })
                    setShow(true)
                }}
                onDelete={delPropertyTag}
                onReload={getData}
            />

            <Modal
                open={show}
                width={600}
                onCancel={() => setShow(false)}
                title="Tag Details"
                footer={null}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={values => {
                        values.icon = values.icon[0]?.originFileObj ?? undefined
                        let func = !!values?.uid ? patchPropertyTag : postPropertyTag
                        return useAction(func, values, () => {
                            getData()
                            setShow(false)
                        })
                    }}>
                    <HiddenInput name="uid"/>
                    <FormInput name="name" label="Name" required/>
                    <FormInput name="description" label="Description" textArea/>
                    <FormInput name="sort" label="Position" required/>
                    <FormImage
                        name="icon"
                        label="Icon"
                        accept="image/svg+xml"
                        required/>
                    <button className="btn-primary mt-2">Submit</button>
                </Form>
            </Modal>
        </>
    )
}

export default Tags;