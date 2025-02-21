"use client";
import React, { useState } from 'react';
import { useUser } from '../../../contexts/user';
import { Form, message, Radio, Space } from 'antd';
import Button from '../../../components/common/button';
import { postHostInfo, updateUser } from '../../../helpers/backend';
import PhoneInput from 'react-phone-input-2';
import CustomModal from '../../../components/common/custom-modal';
import CountryInput, { CityInput } from '../../../components/form/country';
import FormInput from '../../../components/form/input';
import FormField from '../../../components/form/input-field';
import FormSelect from '../../../components/form/select';
import Icon from '../../../components/common/icon';
import ImageInput from '../../../components/form/image';

const page = () => {
    const { user, getUser } = useUser();
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState()
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [form] = Form.useForm();
    const [country, setCountry] = useState<string | undefined>(undefined);
    const [city, setCity] = useState('');
    const [value, setValue] = useState('license');
    const [loading, setLoading] = useState(false)

    const onChange = e => {
        setValue(e.target.value);
    };

    console.log("city", city)

    const handleNameEdit = (values) => {
        setOpen(true);
        setModalType(values.type)
        setTitle(values.title)
        setSubtitle(values.subtitle)
        form.setFieldsValue({
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            address: {
                street: user?.host?.address?.street,
                city: user?.host?.address?.city,
                state: user?.host?.address?.state,
                zip: user?.host?.address?.zip,
                country: user?.host?.address?.country,
                apartment: user?.host?.address?.apartment
            },
            emergency_contact: {
                name: user?.emergency_contact?.name,
                relationship: user?.emergency_contact?.relationship,
                email: user?.emergency_contact?.email,
                phone: user?.emergency_contact?.phone,
                language: user?.emergency_contact?.language
            },
        })
        setCountry(user?.host?.address?.country)
        setCity(user?.host?.address?.city)
    }

    const handleSubmit = async (values) => {
        // return console.log(values)
        if (!!values?.email || !!values?.name || values?.phone || values?.address || values?.emergency_contact) {
            setLoading(true)
            const { error, msg, data } = await updateUser({
                email: values?.email ? values?.email : undefined,
                name: values?.name ? values?.name : undefined,
                phone: values?.phone ? `+${values?.phone}` : undefined,
                host: {
                    address: {
                        street: values?.address?.street ? values?.address?.street : undefined,
                        city: values?.address?.city ? values?.address?.city : undefined,
                        state: values?.address?.state ? values?.address?.state : undefined,
                        zip: values?.address?.zip ? values?.address?.zip : undefined,
                        country: values?.address?.country ? values?.address?.country : undefined,
                        apartment: values?.address?.apartment ? values?.address?.apartment : undefined
                    },
                },
                emergency_contact: {
                    name: values?.emergency_contact?.name ? values?.emergency_contact?.name : undefined,
                    relationship: values?.emergency_contact?.relationship ? values?.emergency_contact?.relationship : undefined,
                    email: values?.emergency_contact?.email ? values?.emergency_contact?.email : undefined,
                    phone: values?.emergency_contact?.phone ? `+${values?.emergency_contact?.phone}` : undefined,
                    language: values?.emergency_contact?.language ? values?.emergency_contact?.language : undefined
                }
            });
            setLoading(false)
            if (error) {
                return message.error(msg);
            } else {
                message.success(msg);
                setOpen(false);
                getUser();
            }
        }

        if (values?.front_license || values?.back_license || values?.front_passport || values?.front_id || values?.back_id) {

            setLoading(true)
            values.action = 'identity'
            const { error, msg, data } = await postHostInfo(values);
            setLoading(false)
            if (error) {
                return message.error(msg);
            } else {
                message.success(msg);
                setOpen(false);
                getUser();
            }
        }
    }

    return (
        <div>
            <h2 className='text-main text-xlRegular mb-6'>Personal information</h2>
            <div className='account-setting'>
                <AccountItem
                    label="Full Name"
                    value={user?.name}
                    onEdit={() => handleNameEdit({ type: 'name', title: "Add required account info", subtitle: "This information is required for anyone who hosts or helps out with hosting on Appstick." })}
                />
                <AccountItem
                    label="Email address"
                    value={user?.email}
                    onEdit={() => handleNameEdit({ type: 'email', title: "Email address", subtitle: "Use an address you’ll always have access to." })}
                />

                <AccountItem
                    label="Phone number"
                    value={user?.phone}
                    onEdit={() => handleNameEdit({ type: 'phone', title: "Phone Number", subtitle: "You’ll use this number to get notifications, sign in, and recover your account." })}
                />
                <AccountItem
                    label="Verifying document"
                    value={user?.documents}
                    onEdit={() => handleNameEdit({ type: 'documents', title: "Let’s add your government ID", subtitle: "We’ll need you to add an official government ID. This step helps make sure you’re really you." })}
                />
                <AccountItem
                    label="Address"
                    value={<>{user?.host?.address?.country}, {user?.host?.address?.city}, {user?.host?.address?.street}.</>}
                    onEdit={() => handleNameEdit({ type: 'address', title: "Address", subtitle: "Use a permanent address where you can receive mail." })}
                />
                <AccountItem
                    label="Emergency contact"
                    value={user?.contact}
                    onEdit={() => handleNameEdit({ type: 'contact', title: "Emergency contact", subtitle: "A trusted contact we can alert in an urgent situation." })}
                />
            </div>

            <CustomModal open={open} setOpen={setOpen} title={title} subTitle={subtitle}>
                <div className='my-2'>
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={handleSubmit}
                    >
                        {
                            modalType === "name" &&
                            <FormField label="Full Name" name="name" required placeholder='Your Name' />
                        }
                        {
                            modalType === "email" && <>
                                <FormField label="Email Address" name="email" required placeholder='Your email' type='email' />
                            </>
                        }
                        {
                            modalType === "phone" && <>
                                <label className='text-main text-p1 mb-2'>Phone Number</label>
                                <Form.Item name={"phone"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your phone number!",
                                        },
                                    ]}>
                                    <PhoneInput
                                        enableSearch={true}
                                        country={"bd"}
                                    />
                                </Form.Item>
                            </>
                        }
                        {
                            modalType === "address" && <>
                                <CountryInput label={"Select country/region"} name={["address", "country"] as any} whitelist={undefined} setCountry={setCountry} required />
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <FormField label="Street Address" name={["address", "street"]} required placeholder='Street Address' />
                                    <FormField name={["address", "apartment"]} label="Apt,suite. (Optional)" placeholder='Apr,Suite' />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <CityInput label={"Select City"} name={["address", "city"] as any} country={country} required onSelect={undefined}
                                        region={city}
                                    />
                                    <FormField name={["address", "state"]} label="State/Province/Country/Region" placeholder='State/Province' />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <FormField name={["address", "zip"]} label="Zip Code" placeholder='Ex. 91580' />
                                </div>
                            </>
                        }
                        {
                            modalType === "contact" && <>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <FormField label="Full Name" name={["emergency_contact", "name"]} required placeholder='EX: Jhon Doe' />

                                    <FormField name={["emergency_contact", "relationship"]} label="Relationship" placeholder='EX: Father' />
                                </div>
                                <FormSelect name={["emergency_contact", "language"]} label="Preferred Language (optional)" options={[
                                    { label: 'English', value: 'en' },
                                    { label: 'Spanish', value: 'es' },
                                    { label: 'French', value: 'fr' },
                                    { label: 'German', value: 'de' },
                                    { label: 'Chinese', value: 'zh' },
                                    { label: 'Japanese', value: 'ja' },
                                    { label: 'Korean', value: 'ko' },
                                    { label: 'Russian', value: 'ru' },
                                    { label: 'Portuguese', value: 'pt' },
                                    { label: 'Hindi', value: 'hi' }
                                ]} placeholder="Select" className="" />

                                <FormField type='email' label="Email" name={["emergency_contact", "email"]} placeholder='EX:jhondoe@gmail.com' />

                                <label className='text-main text-p1 mb-2'>Phone Number</label>
                                <Form.Item name={["emergency_contact", "phone"]}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your phone number!",
                                        },
                                    ]}>
                                    <PhoneInput
                                        enableSearch={true}
                                        country={"bd"}
                                    />
                                </Form.Item>
                            </>
                        }
                        {
                            modalType === "documents" && <>

                                <CountryInput whitelist={undefined} label={"Select country/region"} name={["country"] as any} setCountry={setCountry} required />

                                <div className="flex  mt-6">
                                    <Radio.Group onChange={onChange} name='role' value={value} className='mb-4'>
                                        <Space direction="vertical" className='gap-6'>
                                            <Radio className='text-main text-h4 hover:text-primary' value={"license"}>
                                                {"Driving License"}
                                            </Radio>
                                            <Radio className='text-main text-h4 hover:text-primary' value={"passport"}>
                                                {"Passport"}
                                            </Radio>
                                            <Radio className='text-main text-h4 hover:text-primary' value={"id_card"}>
                                                {"Identity card"}
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                                {
                                    value === 'license' &&
                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-2'>
                                        <ImageInput
                                            label="Front Side License"
                                            name={['front_license']}
                                            required
                                        />
                                        <ImageInput
                                            label="Back Side License"
                                            name={['back_license']}
                                            required
                                        />
                                    </div>
                                }

                                {
                                    value === 'passport' &&
                                    <div className='grid grid-cols-1 gap-4 mb-2'>
                                        <ImageInput
                                            label="Front Side Passport"
                                            name={['front_passport']}
                                            required
                                        />
                                    </div>

                                }
                                {
                                    value === 'id_card' &&
                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-2'>
                                        <ImageInput
                                            label="Front Side ID Card"
                                            name={['front_id']}
                                            required
                                        />
                                        <ImageInput
                                            label="Back Side ID Card"
                                            name={['back_id']}
                                            required
                                        />
                                    </div>
                                }
                            </>
                        }
                        <div className="flex justify-between items-center">
                            <div onClick={() => setOpen(false)}
                                className='text-main text-p underline !cursor-pointer'>
                                Close
                            </div>
                            <Button disabled={loading} className="text-white">Save</Button>
                        </div>
                    </Form>
                </div>
            </CustomModal>
        </div>
    );
};

export default page;

interface AccountItemProps {
    label: string;
    value: any;
    onEdit: () => void;
    isEditable?: boolean;
}

const AccountItem: React.FC<AccountItemProps> = ({ label, value, onEdit, isEditable = true }) => {
    return (
        <div className='account-item'>
            <div className='account-body'>
                <div className='flex flex-col'>
                    <label className='account-label'>{label}</label>
                    <span className=''>{value || 'not provided'}</span>
                </div>
                {isEditable && (
                    <div onClick={onEdit} className='edit-btn'>
                        {value ? 'Edit' : 'Add'}
                    </div>
                )}
            </div>
        </div>
    );
};