"use client"

import {useAction, useFetch} from "../../../../../helpers/hooks";
import {
    delAmenityCategory,
    fetchAmenityCategories,
    patchAmenityCategory,
    postAmenityCategory
} from "../../../../../helpers/backend";
import PageTitle from "../../components/title";
import Table from "../../components/table";
import {useState} from "react";
import {Form, Modal} from "antd";
import FormInput, {HiddenInput} from "../../../../../components/form/input";

const Categories = () => {
    const [form] = Form.useForm()
    const [show, setShow] = useState(false)
    const [data, getData] = useFetch(fetchAmenityCategories)

    const columns = [
        {
            text: 'Name',
            dataField: 'name'
        },
        {
            text: 'Position',
            dataField: 'sort'
        }
    ]


    return (
        <>
            <PageTitle title="Categories"/>
            <Table
                columns={columns}
                data={data}
                item="Category"
                onAdd={() => {
                    form.resetFields()
                    form.setFieldsValue({
                        sort: (data?.length ?? 0) + 1
                    })
                    setShow(true)
                }}
                onEdit={values => {
                    form.resetFields()
                    form.setFieldsValue(values)
                    setShow(true)
                }}
                onDelete={delAmenityCategory}
                onReload={getData}
            />

            <Modal
                open={show}
                onCancel={() => setShow(false)}
                title="Category Details"
                footer={null}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={values => {
                        let func = !!values?.uid ? patchAmenityCategory : postAmenityCategory
                        return useAction(func, values, () => {
                            getData()
                            setShow(false)
                        })
                    }}>
                    <HiddenInput name="uid"/>
                    <FormInput name="name" label="Name" required/>
                    <FormInput name="sort" label="Position" required/>
                    <button className="btn-primary mt-2">Submit</button>
                </Form>
            </Modal>
        </>
    )
}

export default Categories;