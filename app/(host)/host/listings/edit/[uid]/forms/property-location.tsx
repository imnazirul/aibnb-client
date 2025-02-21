import React, { useState } from 'react';
import LocationMap from '../../../../../../../components/common/location-map';
import CountryInput from '../../../../../../../components/form/country';
import FormField from '../../../../../../../components/form/input-field';

const PropertyLocationEdit = ({ data }) => {
    const [country, setCountry] = useState<string | undefined>(undefined);

    return (
        <div className='my-5 md:my-5 px-36'>
            <h3 className='text-title_lg text-main capitalize'>Location</h3>
            <div className="mt-10">
                <LocationMap
                    country={country}
                    name="location"
                    className="-mt-3"
                    rules={[{ required: true, message: 'Please select pickup point' }]}
                />

            </div>
            <div className='mt-4'>
                <CountryInput label={"Select country/region"} name={["location", "country_long"] as any} whitelist={undefined}
                    setCountry={setCountry} required />
                <FormField label="Street Address" name={["location", "name"]} required
                    placeholder='Street Address' />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField name={["location", "apartment"]} label="Apt,suite. (Optional)" placeholder='Apr,Suite' />
                    <FormField name={["location", "city"]} label={"City / Town / Village"} placeholder='Your city' />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField name={["location", "country_long"]} label="State/Province/Country/Region"
                        placeholder='State/Province' />
                    <FormField name={["location", "zip"]} label="Zip Code" placeholder='Ex. 91580' />
                </div>
            </div>
        </div>
    );
};

export default PropertyLocationEdit;