'use client'
import React, { useState } from 'react';
import Button from '../../../../components/common/button';
import { Form, Input, Radio } from 'antd';
import CustomModal from '../../../../components/common/custom-modal';
import FormSelect from '../../../../components/form/select';
import { PiBankLight } from "react-icons/pi";
import { SiPayoneer } from 'react-icons/si';
import FormDatePicker from '../../../../components/form/date-picker';

interface Option {
    id: number;
    title: string;
    description: string;
    note: string;
    note2?: string;
    icon: JSX.Element;
}

const SetupPament: React.FC = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);
    const [accountType, setAccountType] = useState<'Personal' | 'Business' | undefined>(undefined);
    const [payoutAccount, setPayoutAccount] = useState<string | null>(null);

    const options: Option[] = [
        {
            id: 1,
            title: "International wire transfer",
            description: "3-7 business days",
            note: "Fees may apply",
            icon: <PiBankLight size={40} />,
        },
        {
            id: 2,
            title: "Payoneer",
            description: "Prepaid debit Mastercard",
            note: "24 hours or less",
            note2: "Payoneer fees may apply",
            icon: <SiPayoneer size={40} />,
        },
    ];

    const handleSelect = (id: number) => {
        setSelected(id);
    };

    const countrys = [
        "Canada",
        "South Africa",
        "Pakistan",
        "Nepal",
        "India",
        "USA",
        "UK",
        "Japan",
        "China",
        "Australia",
        "New Zealand",
        "Singapore",
        "Bangladesh",
    ];
    const Accounts = [
        "New account holder",
    ];
    const Roles = [
        "Property owner",
        "Property manager",
        "Hosting service provider",
        "Other payee not listed above",
    ];

    const handleAccountTypeChange = (e: any) => {
        setAccountType(e.target.value);
    };

    const handlePayoutAccountChange = (value: string) => {
        setPayoutAccount(value);
    };

    const handleFormSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div>
            <div className="flex flex-col">
                <h2 className="text-main text-sh mb-6">How you’ll get paid</h2>
                <p className="text-p text-wrap">
                    Add at least one payout method so we know where to send your money.
                </p>
                <Button onClick={() => setOpen(true)} className="!bg-black text-white mt-6 rounded-md !py-4 w-fit">
                    Set up payouts
                </Button>
                <CustomModal maskClosable={false} open={open} setOpen={setOpen} title={<p className="text-center ">Add card details</p>} width={800}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFormSubmit}
                        className={selected ? "h-[75vh] overflow-y-auto pay-scroll px-8 mt-10" : ""}
                    >
                        <div>
                            <h2 className="text-main text-title_md mb-2 mt-5">Let's add a payout method</h2>
                            <p className="text-p">
                                To start, let us know where you'd like us to send your money.
                            </p>
                            <div className="selected mt-8">
                                <FormSelect
                                    className="w-full rounded-md focus:outline-none focus:ring-2  focus:ring-blue-500"
                                    name="country"
                                    placeholder='Select country'
                                    label={<p className='text-black font-semibold'>Billing country/region</p>}
                                    // initialValue="Bangladesh"
                                    options={countrys.map((country) => ({
                                        label: country,
                                        value: country,
                                    }))}
                                />
                                <p className='text-xxs text-[#717171] relative -top-2'>This is where you opened your financial account. <span className='underline text-black cursor-pointer font-semibold '>More info</span></p>
                            </div>
                            <div className='mt-8'>
                                <h3 className='text-black text-p font-semibold mb-2'>How would you like to get paid?</h3>
                                <p className='text-xxs text-[#717171] relative -top-2'>Payouts will be sent in USD.</p>
                            </div>
                            <div className="w-full mx-auto bg-white rounded-lg shadow-md mt-4 border overflow-hidden border-black payment-checkbox">
                                <Form.Item name={"bank"}>
                                    <Radio.Group className='w-full h-full rounded-md'>
                                        {options.map((option) => (
                                            <label
                                                key={option.id}
                                                className={`flex w-full overflow-hidden p-4 border-2 rounded-md cursor-pointer ${selected === option.id ? "bg-gray-100 border-black" : "border-white hover:border-black"}`}
                                                htmlFor={`radio-${option.id}`}
                                                onClick={() => handleSelect(option.id)}
                                            >
                                                <div className='w-full'>
                                                    <div className="flex gap-6">
                                                        {option.icon}
                                                        <div>
                                                            <h3 className="text-lg font-semibold">{option.title}</h3>
                                                            <p className="text-sm text-gray-600">{option.description}</p>
                                                            <p className="text-xs text-gray-500">{option.note}</p>
                                                            {option.note2 && (
                                                                <p className="text-xs text-gray-500">{option.note2}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Radio
                                                    id={`radio-${option.id}`}
                                                    checked={selected === option.id}
                                                    value={option.id}
                                                    className="custom-radio"
                                                />
                                            </label>
                                        ))}
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            {selected && (
                                <p className='text-s'>Payout reviews could result in holds or delays. <span className='font-bold underline cursor-pointer'>Learn more</span></p>
                            )}
                            {selected && (
                                <>
                                    <div className='selected mt-8'>
                                        <FormSelect
                                            className="w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            name="payoutAccount"
                                            placeholder='Select one'
                                            // initialValue={''}
                                            label={<p className='text-black font-semibold'>Whose bank account is it?</p>}
                                            options={Accounts.map((account) => ({
                                                label: account,
                                                value: account,
                                            }))}
                                            onChange={handlePayoutAccountChange}
                                        />
                                    </div>
                                    <p className='text-s relative -top-3'>Choose from people you’ve added to your Host account. <span className='font-bold underline cursor-pointer'>Learn more</span></p>
                                </>
                            )}
                        </div>
                        {payoutAccount && (
                            <div>
                                <Form.Item label="Type of bank account" className='mt-5' name={"accountType"}>
                                    <Radio.Group onChange={handleAccountTypeChange} value={accountType} className='flex flex-col gap-3 mt-3'>
                                        <Radio value="Personal">Personal</Radio>
                                        <Radio value="Business">Business</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        )}
                        {accountType && (
                            <div>
                                <div className='selected mt-8'>
                                    <p className='text-black text-lg font-semibold mb-2'>Account holder name</p>
                                    {accountType === 'Personal' ? (
                                        <>
                                            <Form.Item
                                                rules={[{ required: true, message: 'Please input your first name!' }]}
                                                label="First name"
                                                name={"first_name"}
                                            >
                                                <Input className='!border-black !py-3' placeholder="First name" />
                                            </Form.Item>
                                            <Form.Item
                                                rules={[{ required: true, message: 'Please input your last name!' }]}
                                                label="Last name"
                                                name={"last_name"}
                                            >
                                                <Input className='!border-black !py-3' placeholder="Last name" />
                                            </Form.Item>
                                            <FormDatePicker
                                                label="Date of birth"
                                                name={"date_of_birth"} 
                                               
                                                />
                                            <Form.Item
                                                label="Place of birth"
                                                name={"place-of-birth"}
                                                rules={[{ required: true, message: 'Please input your place of birth!' }]}
                                            >
                                                <Input className='!border-black !py-3' placeholder="Place of birth" />
                                            </Form.Item>
                                            <div className="selected mt-4">
                                                <FormSelect
                                                    rules={[{ required: true, message: 'Please input your citizenship!' }]}
                                                    className="w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    name="citizenship"
                                                    placeholder='Select citizenship'
                                                    // initialValue="Bangladesh"
                                                    label='Citizenship'
                                                    options={countrys.map((country) => ({
                                                        label: country,
                                                        value: country,
                                                    }))}
                                                />
                                            </div>
                                            <Form.Item
                                                rules={[{ required: true, message: 'Please input your street address!' }]}
                                                label="Street address"
                                                name={"street_address"}
                                            >
                                                <Input className='!border-black !py-3' placeholder="Street address" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Apt , suite, bldg. (optional)"
                                                name={"apt_number"}
                                            >
                                                <Input className='!border-black !py-3' placeholder="Apt , suite, bldg. (optional)" />
                                            </Form.Item>
                                            <Form.Item
                                                rules={[{ required: true, message: 'Please input your city!' }]}
                                                label="City"
                                                name={"city"}
                                            >
                                                <Input className='!border-black !py-3' placeholder="City" />
                                            </Form.Item>
                                            <div className='grid sm:grid-cols-2 sm:gap-2'>
                                                <Form.Item
                                                    rules={[{ required: true, message: 'Please input your state!' }]}
                                                    label="State"
                                                    name={"state"}
                                                >
                                                    <Input className='!border-black !py-3' placeholder="State" />
                                                </Form.Item>
                                                <Form.Item
                                                    rules={[{ required: true, message: 'Please input your zip code!' }]}
                                                    label="Zip code"
                                                    name={"zip_code"}
                                                >
                                                    <Input className='!border-black !py-3' placeholder="Zip code" />
                                                </Form.Item>
                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            <Form.Item
                                                rules={[{ required: true, message: 'Please input your business name!' }]}
                                                name={"business_name"}
                                            >
                                                <Input className='!border-black !py-3' placeholder="Business name" />
                                            </Form.Item>
                                            <Form.Item
                                                rules={[{ required: true, message: 'Please input your street address!' }]}
                                                label="Street address"
                                                name={"street_address"}
                                            >
                                                <Input className='!border-black !py-3' placeholder="Street address" />
                                            </Form.Item>
                                            <Form.Item
                                                rules={[{ required: true, message: 'Please input your apt , suite, bldg!' }]}
                                                label="Apt , suite, bldg. (optional)"
                                                name={"apt_number"}
                                            >
                                                <Input className='!border-black !py-3' placeholder="Apt , suite, bldg. (optional)" />

                                            </Form.Item>
                                            <Form.Item
                                                rules={[{ required: true, message: 'Please input your city!' }]}
                                                label="City"
                                                name={"city"}
                                            >
                                                <Input className='!border-black !py-3' placeholder="City" />
                                            </Form.Item>
                                            <div className='grid sm:grid-cols-2 sm:gap-2'>
                                                <Form.Item
                                                    rules={[{ required: true, message: 'Please input your state!' }]}
                                                    label="State"
                                                    name={"state"}
                                                >
                                                    <Input className='!border-black !py-3' placeholder="State" />
                                                </Form.Item>
                                                <Form.Item
                                                    rules={[{ required: true, message: 'Please input your zip code!' }]}
                                                    label="Zip code"
                                                    name={"zip_code"}
                                                >
                                                    <Input className='!border-black !py-3' placeholder="Zip code" />
                                                </Form.Item>
                                            </div>
                                        </>

                                    )}
                                    <p style={{ color: '#888', fontSize: '12px' }}>
                                        {accountType === 'Personal'
                                            ? "Enter the account holder's name exactly as it appears on bank statements. For accounts with multiple owners, enter one name only."
                                            : 'Enter the business or legal entity exactly as it appears on the account.'}
                                    </p>
                                </div>
                                <div className='selected mt-8'>
                                    <FormSelect
                                        className="w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="role"
                                        placeholder='Role'
                                        // initialValue={'Property Owner'}
                                        label={<p className='text-black font-semibold'>What’s their role?</p>}
                                        options={Roles.map((role) => ({
                                            label: role,
                                            value: role,
                                        }))}
                                    />
                                </div>
                            </div>
                        )}

                        <p className='text-s border-b py-6 text-center'>Next, you’ll be directed to our partner, WorldPay,  to enter your bank account info.</p>
                        <div className='flex justify-end mt-4'>
                            <Button className='!bg-black !text-white cursor-pointer'>Submit</Button>
                        </div>

                    </Form>
                </CustomModal>
            </div>
        </div>
    );
};

export default SetupPament;
