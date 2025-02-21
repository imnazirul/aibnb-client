import React, { useState } from 'react';
import Icon from '../../../../../../components/common/icon';
import Counter from '../forms/count';
import CustomModal from '../../../../../../components/common/custom-modal';
import { Form } from 'antd';
import CountryInput, { CityInput } from '../../../../../../components/form/country';
import FormField from '../../../../../../components/form/input-field';
import Button from '../../../../../../components/common/button';
import LocationInput from '../../../../../../components/common/map-location-input';
import { it } from "node:test";
import {categories, host_types, toAssetUrl} from "../../../../../../helpers/utils";
import Svg from "../../../../../../components/common/svg";

const Step1 = ({elements}) => {


    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState<string | undefined>(undefined);

    const PlaceCategory = ({ value, onChange }: any) => {
        return (
            <div className="grid md:grid-cols-5 grid-cols-1 gap-6 mt-6">
                {elements?.categories.map((item, index) => (
                    <div
                        className={`border p-5 rounded-full flex flex-row gap-x-4 items-center h-[80px] group ${value === item._id ? 'bg-primary-50 border-primary-500 hover:border text-main' : 'hover:bg-primary-50 hover:border-primary-500 hover:border'} cursor-pointer`}
                        key={index}
                        onClick={() => onChange(item._id)}
                    >
                        <Svg
                            height={40}
                            width={40}
                            src={toAssetUrl(item.icon)} />
                        <div className="">
                            <h3 className={`group-hover:text-primary text-h4 ${value === item._id ? 'text-primary' : 'text-main'}`}>{item.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const PlaceType = ({ value, onChange }: any) => {
        return (
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-6">
                {
                    host_types.map((item, index) => (
                        <div
                            className={`border p-5 rounded-md flex flex-col gap-4 md:h-[134px] group ${value === item.value ? 'bg-primary-50 border-primary-500 hover:border text-primary' : 'hover:bg-primary-50 hover:border-primary-500 hover:border'} cursor-pointer`}
                            key={index}
                            onClick={() => onChange(item.value)}>
                            <div className='flex gap-x-4 items-center'>
                                <Icon name={item.icon} />
                                <h3 className={`${value === item.value ? 'text-primary' : 'text-main'} text-c1 group-hover:text-primary`}>{item.title}</h3>
                            </div>
                            <p className={`${value === item.value ? 'text-primary' : 'text-secondaryText'} text-s group-hover:text-primary`}>{item.description}</p>
                        </div>
                    ))
                }
            </div>
        )
    }

    const CounterInput = ({ label, name }) => {
        const Input = ({ value, onChange }: any) => {
            return (
                <div>
                    <span className="text-p1 text-main">{label}</span>
                    <div className="property_count md:w-[200px] h-16">
                        <Counter
                            className='gap-x-8'
                            count={value}
                            increment={() => onChange(value + 1)}
                            decrement={() => onChange((value - 1) || 1)} />
                    </div>
                </div>
            )
        }

        return (
            <Form.Item name={name} initialValue={1}>
                <Input />
            </Form.Item>
        )
    }


    return (
        <div>
            <div className="mt-20">
                <h3 className='text-xlMedium text-main'>Which of these best describes your place?</h3>
                <Form.Item
                    name="category"
                    rules={[{ required: true, message: 'Please select a value' }]}
                >
                    <PlaceCategory />
                </Form.Item>
            </div>

            <div className="mt-10">
                <h3 className='text-xlMedium text-main'>What type of place will guests have?</h3>
                <Form.Item
                    name="type"
                    rules={[{ required: true, message: 'Please select a value' }]}
                >
                    <PlaceType />
                </Form.Item>
            </div>

            <div className="mt-10">
                <h3 className='text-xlMedium text-main'>Let's start with the basics</h3>
                <p className='text-p2 text-secondaryText mt-1'>You'll add more details later, like bed types.</p>

                <div className="flex lg:flex-row flex-col gap-x-6 mt-6">
                    <CounterInput label="Rooms" name="rooms" />
                    <CounterInput label="Bed" name="bedrooms" />
                    <CounterInput label="Bathroom" name="bathrooms" />
                </div>
            </div>

            <div className="mt-10">
                <h3 className='text-xlMedium text-main'>How many guests fit comfortably in your place?</h3>
                <div className='mt-6'>
                    <CounterInput label="" name="guests" />
                </div>
            </div>

            <div className="mt-10">
                <div className="flex justify-between lg:flex-row flex-col lg:items-center">
                    <div>
                        <h3 className='text-xlMedium text-main'>Where's your place located?</h3>
                        <p className='text-p2 text-secondaryText mt-1'>Your address is only shared with guests after
                            they’ve
                            made a reservation.</p>
                    </div>

                    <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => setOpen(true)}>
                        <Icon name="map-location" />
                        <p className='text-h4 text-primary'>Enter Address Manually</p>
                    </div>
                </div>

                <div className="mt-4">
                    <div className=' my-4'>
                        <div className="w-full">
                            <div className='rounded-lg'>
                                <div className='w-full'>
                                    <LocationInput
                                        country={"bangladesh"}
                                        name="location"
                                        className={'-mt-3'}
                                        rules={[{ required: true, message: 'Please select pickup point' }]}
                                        label={'Select Pickup Address'}
                                        onComplete={(value) => console.log("vale", value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CustomModal open={open} setOpen={setOpen} title={"Confirm your address"}
                subTitle={"Your address is only shared with guests after they’ve made a reservation."}>
                <CountryInput label={"Select country/region"} name={["address", "country"] as any} whitelist={undefined}
                    setCountry={setCountry} required />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField label="Street Address" name={["address", "street"]} required
                        placeholder='Street Address' />
                    <FormField name={["address", "apartment"]} label="Apt,suite. (Optional)" placeholder='Apr,Suite' />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <CityInput label={"Select City"} name={["address", "city"] as any} country={country} required
                        onSelect={undefined} />
                    <FormField name={["address", "state"]} label="State/Province/Country/Region"
                        placeholder='State/Province' />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField name={["address", "zip"]} label="Zip Code" placeholder='Ex. 91580' />
                </div>

                <div className="flex justify-between items-center">
                    <div onClick={() => setOpen(false)}
                        className='text-main text-p underline !cursor-pointer'>
                        Close
                    </div>
                    <Button className="text-white">Confirm</Button>
                </div>
            </CustomModal>
        </div>
    );
};

export default Step1;