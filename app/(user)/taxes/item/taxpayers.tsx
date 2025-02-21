'use client';
import React, { useState } from 'react';
import Button from '../../../../components/common/button';
import { Form, Modal, Radio } from 'antd';
import FormField from '../../../../components/form/input-field';
import CountryInput from '../../../../components/form/country';


const Taxpayers = () => {
    const [open, setOpen] = useState(false)
    const [addTax, setAddTax] = useState(false)
    return (
        <div className='text-[#222222]'>
            <div className="space-y-16 mt-8">
                <div className="">
                    <div className="flex flex-col">
                        <h2 className='text-title_sss mb-1'>Taxpayer information</h2>
                        <p className='text-p2'>Tax info is required for most countries/regions. <span className='text-p1 underline'>Learn more</span></p>
                        <Button onClick={() => {
                            setOpen(true)
                            setAddTax(false)
                        }} className='!bg-black text-white mt-6 rounded-md !py-2.5 w-fit'>Add tax info</Button>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col">
                        <h2 className='text-title_sss mb-1'>Value Added Tax (VAT)</h2>
                        <p className='text-p2'>If you are VAT-registered, please add your VAT ID. <span className='text-p1 underline'>Learn more</span></p>
                        <Button onClick={() => {
                            setAddTax(true)
                            setOpen(true)
                        }} className='!bg-black text-white mt-6 rounded-md !py-2.5 w-fit'>Add VAT ID Number</Button>
                    </div>
                </div>
                <div>
                    <h2 className='text-title_sss mb-1'>Need help?</h2>
                    <p className='text-p2'>Get answers to questions about taxes in our Help Center.</p>
                </div>
            </div>
            <Modal className='profile-image' title={<h1 className='pt-4 pb-2 text-center text-p'>{addTax ? 'Add VAT ID Number' : 'Add tax info'}</h1>} open={open} onCancel={() => setOpen(false)} footer={null}>
                {addTax ? <div className="">
                    <p className='pt-5 px-5 border-t text-p2'>If you are registered with the European Commission, verification may take up to 48 hours. Well send you an email when its finished. More information on VAT IDs can be found here.</p>
                    <Form className='tax-form' onFinish={(values) => console.log(values)} layout='vertical'>
                        <div className="border-b p-5 ">
                            <CountryInput name={'country'}></CountryInput>
                            <FormField name={'vat_number'} placeholder='Add VAT ID Number'></FormField>
                            <FormField name={'registration'} placeholder='Name on Registration'></FormField>
                            <FormField name={'address'} placeholder='Address'></FormField>
                            <FormField name={'city'} placeholder='City'></FormField>
                            <FormField name={'region'} placeholder='Province or Region'></FormField>
                            <FormField name={'zip'} placeholder='Zip/postal code'></FormField>
                        </div>
                        <div className="flex p-4 items-center justify-between">
                            <Button type='button' onClick={() => setOpen(false)} className='text-black text-p border border-black !bg-transparent w-fit !py-3'>Cancel</Button>
                            <Button type='submit' onClick={() => setOpen(false)} className='!bg-black text-p text-white  rounded-md !py-2.5 w-fit'>Continue</Button>
                        </div>
                    </Form>

                </div> : <div className="text-h5">
                    <p className='text-p2 pt-5 px-5 border-t'>To get started, select a country/region to add your tax info.</p>
                    <Form className='' onFinish={(values) => console.log(values)}>
                        <Form.Item name={'country'} className='px-5 py-10 border-b !mb-0'>
                            <Radio.Group className='w-full flex flex-col'>
                                <Radio className='border-b py-4 text-p2' value={'usa'}>United States</Radio>
                                <Radio className='border-b py-4 text-p2' value={'ca'}>Canada</Radio>
                                <Radio className='py-4 text-p2' value={'uk'}>United Kingdom</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <div className="flex p-4 items-center justify-between">
                            <Button type='button' onClick={() => setOpen(false)} className='text-black text-p underline !bg-transparent w-fit !px-0 !py-0'>Cancel</Button>
                            <Button type='submit' onClick={() => setOpen(false)} className='!bg-black text-p text-white  rounded-md !py-2.5 w-fit'>Continue</Button>
                        </div>
                    </Form>
                </div>}
            </Modal>
        </div>
    );
};

export default Taxpayers;