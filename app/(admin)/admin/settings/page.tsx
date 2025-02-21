"use client"

import PageTitle from "../../../../components/admin/common/title";
import Card from "../../../../components/admin/common/card";
import FormInput from "../../../../components/form/input";
import {Form} from "antd";
import FormImage from "../../../../components/form/file";
import {useAction, useFetch} from "../../../../helpers/hooks";
import {fetchSettings, postSettings} from "../../../../helpers/backend";

const Settings = () => {

    const [data, getData] = useFetch(fetchSettings)

    console.log(data)


    return (
        <>
            <PageTitle title="Settings"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="General">
                    <Form layout="vertical" onFinish={values => {
                        values.logo = values.logo[0]?.originFileObj
                        return useAction(postSettings, values, () => {
                            // @ts-ignore
                            getData({})
                        })
                    }}>
                        <FormInput
                            name="title"
                            label="Title"
                            required/>
                        <FormInput
                            name="description"
                            label="Description"
                            textArea
                            required/>
                        <FormImage
                            name="logo"
                            label="Logo"
                            required/>
                        <button className="btn-primary">Submit</button>
                    </Form>
                </Card>
            </div>
        </>
    )
}


export default Settings