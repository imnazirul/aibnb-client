"use client"
import React, { useState, Suspense } from 'react'
import { Form, Modal } from 'antd'
import { FiMinusCircle, FiPlus, FiSearch } from 'react-icons/fi'
import { useRouter, useSearchParams } from 'next/navigation'
import { TiTick } from 'react-icons/ti'
import Svg from '../../../../../../../components/common/svg'
import { toAssetUrl } from '../../../../../../../helpers/utils'
import { IoIosArrowBack } from 'react-icons/io'

const Amenities = ({ data, elements, form, handleSubmit }) => {
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [details, setDetails] = useState(null)
    const router = useRouter()

    // Wrapping the content inside Suspense to handle useSearchParams properly
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AmenitiesContent 
                data={data} 
                elements={elements} 
                form={form} 
                handleSubmit={handleSubmit} 
                router={router} 
                open={open} 
                setOpen={setOpen} 
                edit={edit} 
                setEdit={setEdit} 
                details={details} 
                setDetails={setDetails} 
            />
        </Suspense>
    )
}

const AmenitiesContent = ({ data, elements, form, handleSubmit, router, open, setOpen, edit, setEdit, details, setDetails }) => {
    const query = useSearchParams()
    const action = query.get('action')

    const Input = ({ value, onChange } : any) => {
        return (
            <div className="px-14 space-y-8">
                {elements?.map((item) => (
                    <div key={item._id} className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <Svg src={toAssetUrl(item.icon)} />
                            <div>
                                <h1 className="text-main text-h5">{item.name}</h1>
                            </div>
                        </div>
                        <button 
                            onClick={() => {
                                if (value?.includes(item._id)) {
                                    onChange(value.filter((v) => v !== item._id))
                                } else {
                                    onChange([...value, item._id])
                                }
                            }} 
                            type='button' 
                            className={`${value?.includes(item._id) ? 'bg-black' : 'bg-[#F7F7F7]'} rounded-[40px] p-2`}
                        >
                            {value?.includes(item._id) ? <TiTick color='white' size={18} /> : <FiPlus size={18} />}
                        </button>
                    </div>
                ))}
            </div>
        )
    }

    const handleFinish = (values) => {
        handleSubmit(values)
        setOpen(false);
        form.resetFields()
    };

    return (
        <div className="flex item-start justify-between">
            <div className='w-full md:w-1/2 mx-auto'>
                <div className="flex items-start gap-3 md:gap-12 w-full mt-10">
                    {action == 'add' && (
                        <div onClick={() => router.push('?action')} className='cursor-pointer mt-2'>
                            <IoIosArrowBack className='h-10 w-10 p-2 rounded-full bg-secondary' />
                        </div>
                    )}
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-main text-title_lg">Amenities</h1>
                                <p className="text-p2 text-secondaryText">You’ve added these to your listing so far.</p>
                            </div>
                            {action !== 'add' && (edit ? (
                                <button 
                                    onClick={() => setEdit(!edit)} 
                                    type='submit' 
                                    className='bg-[#F7F7F7] rounded-[40px] text-p px-4 py-2'
                                >
                                    Done
                                </button>
                            ) : (
                                <div className="flex items-center gap-2 text-p">
                                    <button 
                                        onClick={() => setEdit(!edit)} 
                                        type='button' 
                                        className='bg-[#F7F7F7] rounded-[40px] px-5 py-[10px]'
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        type='button' 
                                        className='bg-[#F7F7F7] rounded-[40px] p-3'
                                    >
                                        <FiPlus onClick={() => router.push('?action=add')} size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 w-full">
                            {data?.amenities?.map((item, index) => (
                                <div 
                                    className={`flex items-center justify-between w-full py-5 ${edit && 'px-5 rounded-md hover:bg-[#F7F7F7]'}`} 
                                    key={index}
                                >
                                    <div className="flex items-center gap-5">
                                        {edit ? (
                                            <FiMinusCircle 
                                                onClick={() => {
                                                    setOpen(true)
                                                    setDetails(item)
                                                }} 
                                                size={24} 
                                            />
                                        ) : (
                                            <Svg src={toAssetUrl(item?.icon)} />
                                        )}
                                        <div>
                                            <h1 className="text-main text-h5">{item?.name}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Modal 
                                centered 
                                open={open} 
                                onCancel={() => {
                                    setOpen(false)
                                    setDetails(null)
                                }} 
                                footer={null}
                            >
                                {details?._id && (
                                    <div className="flex text-h4 flex-col items-center justify-between pt-10">
                                        <Svg src={toAssetUrl(details?.icon)} />
                                        <h1 className='text-back text-center py-6'>This amenity will be removed from your listing:</h1>
                                        <h1 className='text-back text-center pb-6'>{details?.name}</h1>
                                        <div className="w-full space-y-3">
                                            <button
                                                onClick={() => {
                                                    const amenities = data?.amenities;
                                                    if (amenities?.map?.((item) => item._id === details?._id)) {
                                                        form.setFieldsValue({
                                                            amenities: amenities.filter((item) => item._id !== details?._id)
                                                        });
                                                    }
                                                    const amenitiesIds = form.getFieldValue('amenities').map((item) => item._id);
                                                    handleFinish({ amenities: amenitiesIds });
                                                }}
                                                type='button' 
                                                className='bg-black w-full text-white rounded-md px-5 py-[10px]'
                                            >
                                                Remove
                                            </button>
                                            <button 
                                                type='button' 
                                                onClick={() => setOpen(false)} 
                                                className='hover:bg-[#F7F7F7] w-full text-black rounded-md px-5 py-[10px]'
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            {action == 'add' && (
                <div>
                    <div className="hidden md:block w-[560px] md:flex-shrink-0 overflow-hidden border-l">
                        <div className="overflow-y-auto">
                            <div className="h-[calc(100vh-230px)] md:h-[calc(100vh-170px)]">
                                <div className="px-14 flex items-center justify-between py-10 sticky top-0 z-10 bg-white">
                                    <h1 className='text-title_lg text-black'>Add amenities</h1>
                                </div>
                                <Form.Item name="amenities" initialValue={[...data?.amenities?.map(item => item._id)] || []}>
                                    <Input />
                                </Form.Item>
                                <div className="flex px-14 items-center justify-end border-t py-10 sticky bottom-0 bg-white">
                                    <button type='submit' className='bg-black text-white text-h5 py-3 px-5 rounded-md'>Done</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Amenities
