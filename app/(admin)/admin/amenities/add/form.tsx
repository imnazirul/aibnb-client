"use client";

import {Form} from "antd";
import {fetchAmenityCategories, patchAmenity, postAmenity} from "../../../../../helpers/backend";
import {useAction, useFetch} from "../../../../../helpers/hooks";
import FormInput, {HiddenInput} from "../../../../../components/form/input";
import FormSelect from "../../../../../components/form/select";
import FormImage from "../../../../../components/form/file";
import FormRadio from "../../../../../components/form/radio";
import {useRouter} from "next/navigation";
import FormCheckbox from "../../../../../components/form/checkbox";
import {clearApiCache} from "../../../../../helpers/server";

const AmenityForm = ({form}: {
    form?: any
}) => {
    const {push} = useRouter()
    const [elements] = useFetch(fetchAmenityCategories)

    return (
        <div className="bg-white p-6 rounded">
            <Form
                form={form}
                layout="vertical"
                onFinish={values => {
                    values.icon = values.icon[0]?.originFileObj ?? undefined
                    let func = !!values?.uid ? patchAmenity : postAmenity
                    return useAction(func, values, () => {
                        clearApiCache('property_filter')
                        push('/admin/amenities')
                    })
                }}>
                <HiddenInput name="uid"/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <FormSelect
                        label="Category"
                        name="category"
                        options={elements?.map((element: any) => ({label: element.name, value: element._id}))}
                        required/>
                    <FormInput name="name" label="Name" required/>
                    <div>
                        <FormInput name="sort" label="Position" required/>
                        <FormImage
                            name="icon"
                            label="Icon"
                            accept="image/svg+xml"
                            required/>
                    </div>
                    <div>
                        <FormInput name="description" label="Description" textArea/>
                        <FormRadio
                            name="type"
                            label="Show in Add Form"
                            options={[
                                {label: 'No', value: ''},
                                {label: 'Favorite', value: 'favorite'},
                                {label: 'Standout', value: 'standout'},
                                {label: 'Safety', value: 'safety'}
                            ]}
                            initialValue={''}
                        />
                        <FormCheckbox
                            name="filter"
                            label="Show as Filter"
                            initialValue={false}
                        />
                    </div>
                </div>
                <button className="btn-primary mt-2">Submit</button>
            </Form>
        </div>
    )
}

export default AmenityForm