import React, { useEffect, useState } from 'react';
import LocationInput from '../../../../../../components/common/map-location-input';
import CountryInput from '../../../../../../components/form/country';
import FormField from '../../../../../../components/form/input-field';

const PlaceLocated = ({ form }) => {
    const [place, setPlace] = useState<any>(null);
    const [country, setCountry] = useState<string | undefined>(undefined);

    useEffect(() => {
        console.log("place", place);
        form.setFieldsValue(
            {
                location: {
                    country: place?.country_long,
                    street: place?.name,
                    apartment: place?.apartment,
                    city: place?.city || country,
                    state: place?.country_long,
                    zip: place?.zip
                }
            }
        );
    }, [place]);
    return (
        <>
            <div className="w-full">
                {
                    place ?
                        <h2 className='text-xlMedium mb-2'>Confirm your address</h2>
                        :
                        <h2 className='text-xlMedium mb-2'>Where's your place located?</h2>
                }
                <p className='text-p2 text-secondaryText'>Your address is only shared with guests after they’ve made a reservation.</p>
                {
                    place &&
                    <div className='mt-4'>
                        <CountryInput label={"Select country/region"} name={["location", "country"] as any} whitelist={undefined}
                            setCountry={setCountry} required />
                        <FormField label="Street Address" name={["location", "street"]} required
                            placeholder='Street Address' />
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <FormField name={["location", "apartment"]} label="Apt,suite. (Optional)" placeholder='Apr,Suite' />
                            <FormField name={["location", "city"]} label={"City / Town / Village"} placeholder='Your city' />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <FormField name={["location", "state"]} label="State/Province/Country/Region"
                                placeholder='State/Province' />
                            <FormField name={["location", "zip"]} label="Zip Code" placeholder='Ex. 91580' />
                        </div>
                    </div>
                }
                <div className="mt-4">
                    <div className=' my-4'>
                        <div className="w-full">
                            <div className='rounded-lg'>
                                <div className='w-full'>
                                    <LocationInput
                                        country={""}
                                        name="location"
                                        className={'-mt-3'}
                                        rules={[{ required: true, message: 'Please select pickup point' }]}
                                        label={'Select Pickup Address'}
                                        onComplete={(value) => setPlace(value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    );
};

export default PlaceLocated;