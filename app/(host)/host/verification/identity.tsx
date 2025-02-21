import AccountInfoModal from "./modal";
import CountryInput from "../../../../components/form/country";
import {useState} from "react";
import {Form, notification, Radio, Space} from "antd";
import {postHostInfo} from "../../../../helpers/backend";
import {useUser} from "../../../../contexts/user";
import Button from "../../../../components/common/button";
import ImageInput from "../../../../components/form/image";

const IdentityVerification = () => {
    const {user, getUser} = useUser()
    const [form] = Form.useForm();
    const [type, setType] = useState('driving_license')
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async values => {
        setLoading(true)
        let {error, msg} = await postHostInfo(values)
        setLoading(false)
        if (error === false) {
            setShow(false)
            getUser()
            notification.success({
                message: msg
            })
        } else {
            notification.error({
                message: msg
            })
        }
    }


    return (
        <>
            {!user?.host?.identity && (
                <div className="bg-warning-50 p-4 border border-warning rounded flex justify-between items-center">
                    <div>
                        <p className="font-medium">Identity verification needed</p>
                        <p className="text-sm text-gray-700">Required by jun 20</p>
                    </div>
                    <a
                        role="button"
                        onClick={() => setShow(true)}
                        className='text-primary underline text-p3 whitespace-pre'>
                        Get Verified
                    </a>
                </div>
            )}
            <AccountInfoModal
                open={show}
                setOpen={() => setShow(!show)}
                title=""
                subTitle=""
                width={800}
            >
                <div>
                    <h2 className='text-main text-title_md mb-6'>Personal information</h2>
                </div>
                <h1 className='text-main text-xlRegular mb-4'>Let’s add your government ID</h1>
                <p className='text-secondaryText text-p2 mb-3'>
                    We’ll need you to add an official government ID. This step helps make sure you’re really
                    you.</p>

                <Form
                    layout="vertical"
                    form={form}
                    onFinish={values => handleSubmit({
                        action: 'identity',
                        ...values
                    })}
                >
                    <CountryInput
                        label={"Select country/region"}
                        name={["country"] as any} required/>

                    <div className="flex  mt-6">
                        <Form.Item name="type">
                            <Radio.Group onChange={e => setType(e.target.value)} name='role'
                                         value={type} className='mb-4'>
                                <Space direction="vertical" className='gap-6'>
                                    <Radio className='text-main text-h4 hover:text-primary'
                                           value={"driving_license"}>
                                        {"Driving License"}
                                    </Radio>
                                    <Radio className='text-main text-h4 hover:text-primary' value={"passport"}>
                                        {"Passport"}
                                    </Radio>
                                    <Radio className='text-main text-h4 hover:text-primary' value={"national_id"}>
                                        {"Identity card"}
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    {type === 'driving_license' && (
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-2'>
                            <ImageInput
                                label="Front Side"
                                name={['front']}
                                required
                            />
                            <ImageInput
                                label="Back Side"
                                name={['back']}
                                required
                            />
                        </div>
                    )}

                    {type === 'passport' && (
                        <ImageInput
                            label="Front Side"
                            name={['front']}
                            required
                        />
                    )}
                    {
                        type === 'national_id' && (
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-2'>
                                <ImageInput
                                    label="Front Side"
                                    name={['front']}
                                    required
                                />
                                <ImageInput
                                    label="Back Side"
                                    name={['back']}
                                    required
                                />
                            </div>
                        )}
                    <div className="flex justify-between items-center mt-4">
                        <Button disabled={loading} className="text-white w-full bg-black">Save</Button>
                    </div>
                </Form>
            </AccountInfoModal>
        </>
    )
}

export default IdentityVerification;