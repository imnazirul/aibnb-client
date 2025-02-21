"use client"

import {useActionConfirm, useFetch} from "../../../../../helpers/hooks";
import {fetchHost, postHostApproval, postHostRejection} from "../../../../../helpers/backend";
import PageTitle from "../../components/title";
import {DetailsTable} from "../../components/table";
import {statusClass, toAssetUrl} from "../../../../../helpers/utils";
import {Form, Modal} from "antd";
import {useState} from "react";
import FormInput from "../../../../../components/form/input";
import dayjs from "dayjs";

const Details = ({params}) => {

    const [reject, setReject] = useState(false)

    let [data, getData] = useFetch(fetchHost, {
        uid: params.uid
    })


    return (
        <>
            <PageTitle
                title="Host Details"
                suffix={(
                    <>
                        {data?.['host']?.status === 'pending' && (
                            <>
                                <button
                                    onClick={() => {
                                        return useActionConfirm(postHostApproval, {
                                            uid: params.uid
                                        }, () => {
                                            getData();
                                        }, 'Are you sure you want to approve this host?', 'Approve Host')
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
                        return useActionConfirm(postHostRejection, {
                            uid: params.uid,
                            reason: values.reason
                        }, () => {
                            getData();
                            setReject(false)
                        }, 'Are you sure you want to reject this host?', 'Reject Host')
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
                <div className="flex flex-col gap-6">
                    <DetailsTable
                        title="Host Info"
                        column={[
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
                                formatter: (host) => <span className={statusClass[host?.status]}>{host?.status}</span>
                            },
                            ...(data?.['host']?.status === 'rejected' ? [
                                {
                                    text: 'Reject Reason',
                                    dataField: 'host',
                                    formatter: (host) => host?.reject_reason
                                }
                            ] : [])

                        ]}
                        data={data}
                    />
                    {data?.['host']?.has_manager && (
                        <DetailsTable
                            title="Manager Info"
                            column={[
                                {
                                    text: 'Name',
                                    dataField: 'name',
                                },
                                {
                                    text: 'Email',
                                    dataField: 'email',
                                },
                                {
                                    text: 'Address',
                                    dataField: 'address',
                                    formatter: (address) => `${address?.street}, ${address?.city}, ${address?.state}, ${address?.country}`
                                },
                                {
                                    text: 'DOB',
                                    dataField: 'dob',
                                    formatter: (dob) => dayjs(dob).format('DD MMM YYYY')
                                },
                                {
                                    text: 'Place of Birth',
                                    dataField: 'place_of_birth',
                                },
                                {
                                    text: 'Citizenship',
                                    dataField: 'citizenship',
                                },
                            ]}
                            data={data?.['host']?.['manager']}
                        />
                    )}


                </div>
                <div>
                    <DetailsTable
                        title="Identity"
                        column={[
                            {
                                text: 'Country',
                                dataField: 'country'
                            },
                            {
                                text: 'ID Type',
                                dataField: 'type',
                                formatter: (value) => value === 'national_id' ? 'National ID' : value === 'passport' ? 'Passport' : 'Driving License'
                            },
                            {
                                text: 'Front',
                                dataField: 'front',
                                formatter: (value) => (
                                    <img
                                        className="h-60"
                                        crossOrigin="anonymous"
                                        src={toAssetUrl(value)}
                                        alt=""/>
                                )
                            },
                            {
                                text: 'Back',
                                dataField: 'back',
                                formatter: (value) => (
                                    <img
                                        className="h-60"
                                        crossOrigin="anonymous"
                                        src={toAssetUrl(value)}
                                        alt=""/>
                                )
                            },

                        ]}
                        data={data?.['host']?.['identity']}
                    />
                </div>
            </div>
        </>
    )

}

export default Details;