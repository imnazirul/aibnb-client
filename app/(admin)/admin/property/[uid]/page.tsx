"use client"

import {useActionConfirm, useFetch} from "../../../../../helpers/hooks";
import {
    fetchProperty,
    postHostApproval,
    postHostRejection,
    postPropertyApproval,
    postPropertyRejection
} from "../../../../../helpers/backend";
import PageTitle from "../../components/title";
import {DetailsTable} from "../../components/table";
import {categories, host_types, statusClass, toAssetUrl} from "../../../../../helpers/utils";
import {useState} from "react";
import {Form, Modal} from "antd";
import FormInput from "../../../../../components/form/input";

const Details = ({params}) => {

    const [reject, setReject] = useState(false)

    const [data, getData] = useFetch(fetchProperty, {
        uid: params.uid
    })


    return (
        <>
            <PageTitle
                title="Properties Details"
                suffix={(
                    <>
                        {data?.status === 'pending' && (
                            <>
                                <button
                                    onClick={() => {
                                        return useActionConfirm(postPropertyApproval, {
                                            uid: params.uid
                                        }, () => {
                                            getData();
                                        }, 'Are you sure you want to approve this property?', 'Approve')
                                    }}
                                    className="btn-primary">
                                    Approve
                                </button>
                                <button
                                    onClick={() => {
                                        setReject(true)
                                    }}
                                    className="btn-danger">
                                    Reject
                                </button>
                            </>
                        )}
                    </>
                )}
            />
            <Modal
                open={reject}
                onCancel={() => setReject(false)}
                title="Reject Host"
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={(values) => {
                        return useActionConfirm(postPropertyRejection, {
                            uid: params.uid,
                            reason: values.reason
                        }, () => {
                            getData();
                            setReject(false)
                        }, 'Are you sure you want to reject this property?', 'Reject')
                    }}
                >
                    <FormInput name="reason" label="Reason" textArea required/>
                    <button
                        type="submit"
                        className="btn-danger">
                        Reject
                    </button>
                </Form>

            </Modal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <DetailsTable
                        column={[
                            {
                                text: 'Title',
                                dataField: 'title'
                            },
                            {
                                text: 'Description',
                                dataField: 'description'
                            },
                            {
                                text: 'Category',
                                dataField: 'category',
                                formatter: (value) => categories.find(category => category.value === value)?.title
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
                            ...(data?.status === 'rejected' ? [
                                {
                                    text: 'Reject Reason',
                                    dataField: 'reject_reason',
                                }
                            ] : [])
                        ]}
                        data={data}
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data?.['images']?.map((image, index) => (
                            <div key={index} className="h-40 bg-gray-200 rounded-md overflow-hidden">
                                <img
                                    src={toAssetUrl(image)}
                                    crossOrigin={"anonymous"}
                                    className="object-cover h-full w-full" alt=""/>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        {data?.['amenities1']?.length > 0 && (
                            <div className="flex gap-4 items-center flex-wrap">
                                {data?.['amenities1']?.map((amenity, index) => (
                                    <span key={index} className="bg-white px-4 py-2 text-center rounded-md">{amenity}</span>
                                ))}
                            </div>
                        )}
                        {data?.['amenities2']?.length > 0 && (
                            <div className="flex gap-4 items-center flex-wrap">
                                {data?.['amenities2']?.map((amenity, index) => (
                                    <span key={index} className="bg-white px-4 py-2 text-center rounded-md">{amenity}</span>
                                ))}
                            </div>
                        )}
                        {data?.['amenities3']?.length > 0 && (
                            <div className="flex gap-4 items-center flex-wrap">
                                {data?.['amenities3']?.map((amenity, index) => (
                                    <span key={index} className="bg-white px-4 py-2 text-center rounded-md">{amenity}</span>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    )

}

export default Details;