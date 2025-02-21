import AccountInfoModal from "./modal";
import React, {useState} from "react";
import {Checkbox, Form, Input, notification, Radio, Space, Steps} from "antd";
import {useUser} from "../../../../contexts/user";
import Icon from "../../../../components/common/icon";
import Link from "next/link";
import CountryInput, {CityInput} from "../../../../components/form/country";
import FormField from "../../../../components/form/input-field";
import DateInput from "../../../../components/form/date";
import Button from "../../../../components/common/button";
import {postHostInfo} from "../../../../helpers/backend";

const AccountVerification = () => {
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const {user, getUser} = useUser();
    const [currentStep, setCurrentStep] = useState(0);
    const [accountType, setAccountType] = useState('personal')
    const [hostType, setHostType] = useState('individual')
    const [country, setCountry] = useState<string | undefined>(undefined);
    const [country2, setCountry2] = useState<string | undefined>(undefined);
    const [manager, setManager] = useState(false)

    const [info, setInfo] = useState(null)
    const [managerInfo, setManagerInfo] = useState(null)

    let steps = [
        {
            title: "Which best describes this account?",
            subtitle: "This information helps you get the right hosting features and helps us comply with local laws and regulations.",
            modalWidth: 600,
        },
        {
            title: "Which best describes this account?",
            subtitle: "This information helps you get the right hosting features and helps Appstick comply with local laws and regulations.",
            modalWidth: 1130,
        },
        {
            title: "How will you be hosting?",
            subtitle: "This helps us ask the right questions in the next few steps.",
            modalWidth: 770
        },
        {
            title: "Confirm your info",
            subtitle: "In this step, add details for you and only you. So even if you’re setting this up on behalf of a business, it’s still your info that’s required.",
            modalWidth: 880
        },
        {
            title: "Add required account info",
            subtitle: "This information is required for anyone who hosts or helps out with hosting.",
            modalWidth: 770,
        },
        {
            title: "Does anyone else manage this account?",
            subtitle: "Let us know if anyone else logs into this account. We'll ask you for their information next.",
            modalWidth: 770,
        },
        {
            title: "Add an account manager",
            subtitle: "This helps us make sure they’ll be able to access your account. These details will be used to verify their identity, so please make sure everything’s accurate.",
            modalWidth: 770,
        },
        {
            title: "Add required account info",
            subtitle: "This information is required for anyone who hosts or helps out with hosting.",
            modalWidth: 850,
        },
    ]

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
            {!user?.host?.account_type && (
                <div className="bg-warning-50 p-4 border border-warning rounded flex justify-between items-center">
                    <div>
                        <p className="font-medium">Account info is Needed</p>
                        <p className="text-sm text-gray-700">Required to get paid</p>
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
                setOpen={setShow}
                title={steps[currentStep]?.title}
                subTitle={steps[currentStep]?.subtitle}
                width={steps[currentStep]?.modalWidth}>
                {currentStep === 0 && <Introduction/>}
                {currentStep === 1 && <DescribeAccount value={accountType} onChange={setAccountType}/>}
                {currentStep === 2 && <WhoWilHosting value={hostType} onChange={setHostType}/>}
                {currentStep === 3 &&
                    <LegalInfo form={form} country={country} setCountry={setCountry} user={user}/>}
                {currentStep === 4 &&
                    <RequireAccountInfo current={1} data={{
                        accountType,
                        hostType,
                        user,
                        personal: info,
                        setCurrentStep
                    }}/>}
                {currentStep === 5 && <ManageAccount value={manager} onChange={setManager}/>}
                {currentStep === 6 && <AccountManager form2={form2} country={country2} setCountry={setCountry2}/>}
                {currentStep === 7 &&
                    <RequireAccountInfo current={2} data={{
                        accountType,
                        hostType,
                        user,
                        setCurrentStep,
                        personal: info,
                        hasManager: manager,
                        manager: managerInfo
                    }}/>}
                <div className="flex justify-between items-center">
                    <div onClick={() => {
                        if (currentStep === 0) {
                            setShow(false)
                            return
                        }
                        if (currentStep === 3 && !['personal', 'joint'].includes(accountType)) {
                            setCurrentStep(currentStep - 2)
                            return
                        }
                        if (currentStep === 7) {
                            setCurrentStep(currentStep - (manager ? 1 : 2))
                            return
                        }
                        setCurrentStep(currentStep - 1)
                    }}
                         className='text-main text-p underline !cursor-pointer'>
                        {currentStep > 1 ? 'Back' : 'Close'}
                    </div>
                    <Button onClick={() => {
                        if (currentStep > 6) {
                            return handleSubmit({
                                action: 'info',
                                account_type: accountType,
                                host_type: hostType,
                                personal: info,
                                has_manager: manager,
                                manager: managerInfo

                            })

                        }
                        if (currentStep === 1 && !['personal', 'joint'].includes(accountType)) {
                            setCurrentStep(currentStep + 2)
                            return
                        }
                        if (currentStep === 3) {
                            form.validateFields().then((values) => {
                                setInfo(values)
                                setCurrentStep(4)
                            }).catch(e => {
                            })
                            return;
                        }
                        if (currentStep === 5) {
                            setCurrentStep(currentStep + (manager ? 1 : 2))
                            return;
                        }
                        if (currentStep === 6) {
                            form2.validateFields().then((values) => {
                                setManagerInfo(values)
                                setCurrentStep(7)
                            }).catch(e => {
                            })
                            return;
                        }
                        setCurrentStep(currentStep + 1)
                    }} className="text-white !bg-black w-[140px] h-[54px]">
                        {currentStep > 6 ? 'Confirm' : 'Next'}
                    </Button>
                </div>
            </AccountInfoModal>
        </>
    )
}

export default AccountVerification;


const Introduction = () => {
    return (
        <>
            <div className="my-6">
                <p className="text-main text-title_md mb-4">Why it’s important</p>
                <ul className="list-disc list-outside text-main text-p2 pl-5">
                    <li>We’ll use this to verify your account</li>
                    <li>These details are required by law</li>
                    <li>Inaccurate or missing information can delay payouts or limit your account access</li>
                </ul>
            </div>
        </>
    )
}


const accountTypes = [
    {
        title: "My Account",
        description: "Individual or sole property",
        icon: "user-rounded",
        value: 'personal'
    },
    {
        title: "Joint account",
        description: "Share with a friend, family member, or business partner",
        icon: "user-group",
        value: 'joint'
    },
    {
        title: "Private company",
        description: "A business that's not publicly listed and does not have shares that are publicly traded on a stock exchange",
        icon: "broken-building",
        value: 'private-company'
    },
    {
        title: "Public Company",
        description: "A business whose shares are usually listed and traded on a stock exchange (ex: NYSE or NASDAQ)",
        icon: "broken-industry",
        value: 'public-company'
    },
    {
        title: "Government-owned company",
        description: "A business entity or state-owned enterprise, wholly or majority owned by a government body",
        icon: "broken-bank",
        value: 'government'
    }
]


const DescribeAccount = ({value, onChange}) => {

    return (
        <div className="my-6">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {
                    accountTypes.map((item, index) => (
                        <div
                            role="button"
                            onClick={() => onChange(item.value)}
                            className={`border p-5 rounded-md flex flex-col gap-4 w-[340px] h-[200px] hover:bg-primary-50${value === item.value ? ' bg-primary-50 border-primary' : ''}`}
                            key={index}>
                            <Icon name={item.icon}/>
                            <div>
                                <h3 className="text-main text-h4">{item.title}</h3>
                                <p className="text-secondaryText text-p2">{item.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


const hostTypes = [
    {
        title: "As a private individual",
        description: "Typically, hosting isn't your primary profession or source of income and you may host with friends or family.",
        value: 'individual'
    },
    {
        title: "As a registered business",
        description: "Hosting is your primary profession or source of income and you may host multiple listings.",
        value: 'business'
    },
]

const WhoWilHosting = ({value, onChange}) => {

    return (
        <div className="my-6">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {
                    hostTypes.map((item, index) => (
                        <div
                            role="button"
                            onClick={() => onChange(item.value)}
                            className={`border p-5 rounded-md flex flex-col gap-4 w-[340px] h-[200px] hover:bg-primary-50${value === item.value ? ' bg-primary-50 border-primary' : ''}`}
                            key={index}>
                            <div>
                                <h3 className="text-main text-h4 mb-1">{item.title}</h3>
                                <p className="text-secondaryText text-p2">{item.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const LegalInfo = ({form, country, setCountry, user}) => {
    return (
        <>
            <div className="my-6">
                <label className="text-secondaryText">This is a legal requirement for account verification, so these are
                    not
                    necessarily the details that will show up on your listing or account profile. You’ll be able to edit
                    those separately in your account.</label>
                <div className="mt-6">
                    <p className="text-main text-p mb-2">Full legal name</p>
                    <p className="text-secondaryText mb-4">This is the legal name attached to your account and is part
                        of
                        your verified identity.</p>

                    <Input className="form-input text-p1 w-full mb-3" readOnly defaultValue={user?.name}/>

                    <div className="flex gap-1 md:flex-row flex-col">
                        <span className="text-secondaryText mr-2 text-s">
                            If you make edits, we'll verify you again.
                        </span>
                        <Link className="text-main text-p underline" href="/host/verification">
                            Edit legal name
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col mt-10 mb-6">
                    <label className="text-main text-c1 mb-4">
                        Home address
                    </label>
                    <span className="text-secondaryText">
                        Enter your primary address, where you actually live (usually on utility bills). This can be different from an Appstick listing address.
                    </span>
                </div>


                <Form
                    layout="vertical"
                    form={form}
                >
                    <CountryInput label={"Select country/region"} name={["address", "country"] as any}
                                  whitelist={undefined} setCountry={setCountry} required/>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField label="Street Address" name={["address", "street"]} placeholder='Street Address'/>
                        <FormField name={["address", "apartment"]} label="Apt,suite. (Optional)"
                                   placeholder='Apr,Suite'/>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <CityInput label={"Select City"} name={["address", "city"] as any} country={country} required
                                   onSelect={undefined}/>
                        <FormField name={["address", "state"]} label="State/Province/Country/Region"
                                   placeholder='State/Province'/>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField name={["address", "zip"]} label="Zip Code" placeholder='Ex. 91580'/>
                    </div>
                    <DateInput
                        label="Date Of Birth"
                        name="dob"
                        required
                    />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <CountryInput
                            label={"Place of birth"}
                            name="place_of_birth"
                            required/>
                        <CountryInput
                            label={"Citizenship"}
                            name="citizenship"
                            required/>
                    </div>
                </Form>
            </div>
        </>
    )
}


const RequireAccountInfo = ({current, data}) => {

    const items = [
        {
            title: <p className="text-main text-p1 whitespace-nowrap">Account description</p>,
            description: (
                <div className="flex flex-col justify-start items-start text-secondaryText text-s">
                    <p>{accountTypes.find(d => d.value === data?.accountType)?.title}</p>
                    {['personal', 'joint']?.includes(data?.accountType) &&
                        <p className="text-left whitespace-nowrap">{hostTypes.find(d => d.value === data?.hostType)?.title}</p>}
                </div>
            )
        },
        {
            title: <p className="text-main text-p1 whitespace-nowrap text-left w-full">Your info</p>,
            description: <div className="text-secondaryText text-s flex flex-col items-start">
                <p>
                    {data?.user?.name}
                </p>
                <div className="text-left">
                    {data?.personal?.address?.street}, {data?.personal?.address?.city}, {data?.personal?.address?.state}, {data?.personal?.address?.country}, {data?.personal?.address?.zip}
                    <p className="whitespace-nowrap">Born {data?.personal?.dob?.format('DD/MM/YYYY')} in {data?.personal?.place_of_birth}</p>
                    Citizen of {data?.personal?.citizenship}
                </div>
                <a
                    role="button"
                    onClick={() => data?.setCurrentStep(3)}
                    className="text-main hover:underline underline text-p3 mt-4 hover:text-primary">Edit</a>
            </div>
        },
        {
            title: <p className="text-main text-p1 whitespace-nowrap text-left w-full">Account manager</p>,
            description: (
                <div className="text-left">
                    {!!data?.hasManager || 'None'}
                    {!!data?.hasManager && (
                        <div className="text-secondaryText text-s flex flex-col items-start">
                            <p>
                                {data?.manager?.name}
                            </p>
                            <div className="text-left">
                                {data?.manager?.address?.street}, {data?.manager?.address?.city}, {data?.manager?.address?.state}, {data?.manager?.address?.country}, {data?.personal?.address?.zip}
                                <p className="whitespace-nowrap">Born {data?.manager?.dob?.format('DD/MM/YYYY')} in {data?.manager?.place_of_birth}</p>
                                Citizen of {data?.manager?.citizenship}
                            </div>
                            <a
                                role="button"
                                onClick={() => data?.setCurrentStep(6)}
                                className="text-main hover:underline underline text-p3 mt-4 hover:text-primary">Edit</a>
                        </div>
                    )}
                </div>
            )
        },
    ];

    return (
        <>
            <div className="my-6 pr-28">
                <Steps size="small" current={current} labelPlacement="vertical" items={items}
                       className='mb-5 ant_steps text-primary'/>
            </div>
        </>
    )
}

const ManageAccount = ({onChange, value}) => {
    return (
        <>
            <div className="flex sm:flex-col flex-row">
                <Radio.Group onChange={e => onChange(e.target.value)} name='role' value={value} className='mt-4 '>
                    <Space direction="horizontal" className='gap-6'>
                        <Radio className='text-main text-s hover:text-primary border px-4 py-2 rounded-md w-[160px]'
                               value={true}>
                            {"Yes"}
                        </Radio>
                        <Radio className='text-main text-s hover:text-primary border px-4 py-2 rounded-md w-[160px]'
                               value={false}>
                            {"No,its Just me"}
                        </Radio>
                    </Space>
                </Radio.Group>
            </div>
        </>
    )
}

const AccountManager = ({form2, country, setCountry}) => {
    return (
        <>
            <div className="my-6">
                <Form
                    layout="vertical"
                    form={form2}
                >
                    <div className="mt-6">
                        <FormField name="name" label="Full legal name" placeholder='John Doe' required/>
                        <FormField name="email" label="Eamil" placeholder='john@email.com' required/>
                    </div>
                    <div className="flex flex-col mt-10 mb-6">
                        <label className="text-main text-c1 mb-4">
                            Home address
                        </label>
                        <span className="text-secondaryText">
                            Enter your primary address, where you actually live (usually on utility bills). This can be different from an Appstick listing address.
                        </span>
                    </div>
                    <CountryInput label={"Select country/region"} name={["address", "country"] as any}
                                  whitelist={undefined} setCountry={setCountry} required/>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField label="Street Address" name={["address", "street"]} required
                                   placeholder='Street Address'/>
                        <FormField name={["address", "apartment"]} label="Apt,suite. (Optional)"
                                   placeholder='Apr,Suite'/>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <CityInput label={"Select City"} name={["address", "city"] as any} country={country} required
                                   onSelect={undefined}/>
                        <FormField name={["address", "state"]} label="State/Province/Country/Region"
                                   placeholder='State/Province'/>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField name={["address", "zip"]} label="Zip Code" placeholder='Ex. 91580'/>
                    </div>
                    <DateInput
                        label="Date Of Birth"
                        name="dob"
                        required
                    />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <CountryInput
                            label={"Place of birth"}
                            name="place_of_birth"
                            required/>
                        <CountryInput
                            label={"Citizenship"}
                            name="citizenship"
                            required/>
                    </div>
                    <Form.Item
                        name="agree"
                        rules={[
                            {
                                required: true,
                                message: 'Please agree with this term'
                            }
                        ]}
                        valuePropName="checked"
                    >
                        <Checkbox className='text-secondaryText text-p3'>
                            <span className=''>
                                I am authorized to manage this account on behalf of the business.
                            </span>
                        </Checkbox>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}