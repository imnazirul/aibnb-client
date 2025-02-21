import { ConfigProvider, Tabs } from 'antd';
import React, { useState } from 'react';
import TabView from './items/tab';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import MapView from '../../../../../../components/common/map';
import { toAssetUrl } from '../../../../../../helpers/utils';
import Svg from '../../../../../../components/common/svg';
import { IoSettings } from 'react-icons/io5';
import Image from 'next/image';
import Icon from '../../../../../../components/common/icon';

const ListingSidebar = ({ data, getData, elements, setSection, section, form }) => {
    const router = useRouter();
    const [current, setCurrent] = useState('space')
    return (
        <div>
            <TabView value='space' current={current}>
                <div className="py-8 pl-6 h-[calc(100vh-170px)] md:h-[calc(100vh-110px)]">
                    <div className="pb-4 border-b">
                        <div className="flex items-center space-x-5 ">
                            <div onClick={() => router.back()} className='cursor-pointer'>
                                <FaArrowLeft className='h-8 w-8 p-2 rounded-full bg-secondary' />
                            </div>
                            <h1 className="text-main text-title_lg">Listing editor</h1>
                        </div>
                    </div>
                    <ConfigProvider
                        theme={{
                            components: {
                                Tabs: {
                                    itemColor: '#374151',
                                    itemHoverColor: '#000000',
                                    itemSelectedColor: '#000000',
                                    itemActiveColor: '#000000',
                                    inkBarColor: '#000000',

                                },
                            },
                        }}>
                        <Tabs
                            defaultActiveKey="1"
                            items={[
                                {
                                    key: '1',
                                    label: <>
                                        <span
                                            className={`rounded-[40px] px-4 py-1 cursor-pointer ${current === 'space' ? ' bg-secondary' : 'text-secondaryText bg-secondary'}`}
                                        >
                                            Your Space
                                        </span>
                                    </>,
                                    children: (
                                        <YourSpace
                                            setSection={setSection}
                                            form={form}
                                            data={data}
                                            getData={getData}
                                            section={section} />
                                    ),
                                },
                                {
                                    key: '2',
                                    label: <>
                                        <span
                                            className={`rounded-[40px] px-4 py-1 cursor-pointer ${current === 'arrival' ? 'bg-secondary' : 'text-secondaryText bg-secondary'}`}
                                        >
                                            Arrival guide
                                        </span> </>,
                                    children: (
                                        <div>
                                            <p>Arrival guide</p>
                                        </div>
                                    ),
                                },
                                {
                                    key: '3',
                                    label: <>
                                        <div className="flex justify-end w-full mr-auto">
                                            <IoSettings className='h-8 w-8 p-2 rounded-full bg-secondary cursor-pointer' />
                                        </div>
                                    </>,
                                    children: (
                                        <div>
                                            <p>Pricing</p>
                                        </div>
                                    ),
                                }
                            ]}
                        />

                    </ConfigProvider>
                </div>
            </TabView>
        </div>
    );
};

export default ListingSidebar;


const YourSpace = ({ setSection, form, data, getData, section }) => {
    return (
        <div className=''>

            <div
                role="button"
                onClick={() => {
                    setSection('photo_tour')
                    form.resetFields()
                    form.setFieldsValue({
                        uid: data.uid,
                        images: data?.images?.map((img, index) => ({
                            uid: `-${index + 1}`,
                            name: img,
                            status: 'done',
                            url: toAssetUrl(img),
                        })),
                    })
                }}
                className={`drop-shadow-xl bg-white rounded-lg p-6 mb-4 border-2 border-white ${section === 'photo-tour' ? 'border-2 border-secondaryText' : ''}`}>
                <h2 className='capitalize mb-2 text-h4'>Photo Tour</h2>
                <div className='flex items-center text-secondaryText pb-3 gap-4'>
                    <div className='flex items-center justify-center gap-0.5'>
                        <Icon name={'bed-primary'} />
                        <span className='text-xs'>{data?.bedrooms} Bedrooms</span>
                    </div>
                    <div className='flex items-center justify-center gap-0.5'>
                        <Icon name={'room-primary'} />
                        <span className='text-xs'>{data?.rooms} Rooms</span>
                    </div>
                    <div className='flex items-center justify-center gap-0.5'>
                        <Icon name={'bath-primary'} />
                        <span className='text-xs'>{data?.bathrooms} Bathrooms</span>
                    </div>
                </div>
                <div className='flex flex-col mt-4 justify-center items-center gap-4 relative'>
                    <Image
                        width={500}
                        height={500}
                        crossOrigin='anonymous'
                        src={toAssetUrl(data?.images[1])}
                        alt=""
                        className='w-[150px] h-[130px] aspect-square object-cover rounded-md absolute z-0 -rotate-[7deg] border left-[15%] ' />
                    <Image
                        width={500}
                        height={500}
                        crossOrigin='anonymous'
                        src={toAssetUrl(data?.images[0])}
                        alt=""
                        className='w-[150px] aspect-square object-cover rounded-md z-10 ' />
                    <Image
                        width={500}
                        height={500}
                        crossOrigin='anonymous'
                        src={toAssetUrl(data?.images[2])}
                        alt=""
                        className='w-[150px] h-[130px] aspect-square object-cover rounded-md absolute z-0 rotate-[7deg] border right-[15%]' />

                    <div className='absolute bg-white z-30 px-3 py-1 rounded-[20px] top-[10%] left-[35%]'> {data?.images?.length} photos</div>
                </div>
            </div>

            <div
                role="button"
                onClick={() => {
                    setSection('title')
                    form.resetFields()
                    form.setFieldsValue({ uid: data.uid, title: data?.title })
                }}
                className={`drop-shadow-xl bg-white rounded-lg p-6 mb-4 border-2 border-white ${section === 'title' ? 'border-2 border-secondaryText' : ''}`}>
                <p className="text-p text-black">Title</p>
                <p className="text-c1 font-semibold text-gray-500 mt-1">{data?.title}</p>
            </div>

            <div
                role="button"
                onClick={() => {
                    setSection('property_type')
                    form.resetFields()
                    form.setFieldsValue({ uid: data?.uid, type: data?.type, category: data?.category?._id, title: data?.title, bedrooms: data?.bedrooms, bathrooms: data?.bathrooms})
                }}
                className={`drop-shadow-xl bg-white rounded-lg p-6 mb-4 border-2 border-white ${section === 'property_type' ? 'border-2 border-secondaryText' : ''}`}>
                <p className="text-p text-black">Property Type</p>
                <p className="text-p2 font-semibold text-gray-500 mt-1 capitalize">{data?.type?.split("_").join(" ")} . {data?.category?.name}</p>
            </div>

            <div
                role="button"
                onClick={() => {
                    setSection('guests')
                    form.resetFields()
                    form.setFieldsValue({ uid: data.uid, guests: data?.guests })
                }}
                className={`drop-shadow-xl bg-white rounded-lg p-6 mb-4 border-2 border-white ${section === 'property_type' ? 'border-2 border-secondaryText' : ''}`}>
                <p className="text-p text-black">Number of guests</p>
                <p className="text-p2 font-semibold text-gray-500 mt-1 capitalize">{data?.guests} guests</p>
            </div>

            <div
                role="button"
                onClick={() => {
                    setSection('description')
                    form.resetFields()
                    form.setFieldsValue({ uid: data.uid, description: data?.description })
                }}
                className={`drop-shadow-xl bg-white rounded-lg p-6 mb-4 border-2 border-white ${section === 'property_type' ? 'border-2 border-secondaryText' : ''}`}>
                <p className="text-p text-black">Description</p>
                <p className="text-p2 font-semibold text-gray-500 mt-1 capitalize">{data?.description?.length > 30 ? data?.description?.slice(0, 30) + '...' : data?.description}</p>
            </div>

            <div
                role="button"
                onClick={() => {
                    setSection('location');
                    form.resetFields()
                    // form.setFieldsValue({
                    //     uid: data.uid,
                    //     location: {
                    //         country: data?.location?.country_long, street: data?.location?.name,
                    //         apartment: data?.location?.apartment, city: data?.location?.city, state: data?.location?.country_long, zip: data?.location?.zip
                    //     }
                    // })
                    form.setFieldsValue({ uid: data.uid, location: data?.location })
                }}
                className={`drop-shadow-xl bg-white rounded-lg p-6 mb-4 border-2 border-white ${section === 'location' ? 'border-2 border-secondaryText' : ''}`}>
                <p className="text-p text-black">Location</p>
                <div className="mt-4">
                    <MapView
                        center={data?.location}
                        markers={[data?.location]}
                    />
                </div>
                <p className="text-p2 font-semibold text-gray-500 mt-1 capitalize">{data?.location?.name}</p>
            </div>

            <div
                role="button"
                onClick={() => {
                    setSection('about_host');
                    form.resetFields()
                    form.setFieldsValue({ uid: data.uid, owner: data?.owner })
                }}
                className={`drop-shadow-xl bg-white rounded-lg p-6 mb-4 border-2 border-white ${section === 'about_host' ? 'border-2 border-secondaryText' : ''}`}>
                <p className="text-p text-black">About the host</p>
                <div className='flex flex-col items-center justify-center gap-1.5 mt-2'>
                    {
                        data?.owner?.image ?
                        <img crossOrigin='anonymous' src={toAssetUrl(data?.owner?.image)} alt="" className='w-[150px] h-[150px] rounded-full' />
                        :
                        <img src='/user.png' className='w-[150px] h-[150px] rounded-full'></img>

                    }

                    <p className="text-p2 font-semibold text-gray-500 mt-1 capitalize">{data?.owner?.name}</p>
                    <p className="text-p text-black">Started hosting in </p>
                </div>
            </div>

            <div
                role="button"
                onClick={() => {
                    setSection('booking_type')
                    form.resetFields()
                    form.setFieldsValue({ uid: data.uid, booking_type: data?.booking_type })
                }}
                className={`drop-shadow-xl bg-white rounded-lg p-6 mb-4 border-2 border-white ${section === 'booking_type' ? 'border-2 border-secondaryText' : ''}`}>
                <p className="text-p text-black">Instant book</p>
                <p className="text-p2 font-medium text-gray-500 mt-1 capitalize">{data?.booking_type === 'instant' ? 'Turned on: Guests can book automatically ' :
                    'Turned off: Manually accept or decline booking requests'}
                </p>
            </div>

            <div
                role="button"
                onClick={() => {
                    setSection('amenities')
                    form.resetFields()
                    // form.setFieldsValue({ uid: data.uid, amenities: data?.amenities })
                }}
                className={`drop-shadow-xl text-black bg-white rounded-lg p-6 mb-4 border-2 border-white ${section === 'amenities' ? 'border-2 border-secondaryText' : ''}`}>
                <p className="text-p">Amenities</p>
                <div className="space-y-4 mt-4">
                    {
                        data?.amenities?.slice(0, 3).map((item, index) => <div key={index} className='flex items-center gap-4'>
                            <Svg src={toAssetUrl(item.icon)} />
                            <p className="text-h5">{item.name}</p>
                        </div>)
                    }
                    {data?.amenities?.length > 3 && <p>+{data?.amenities?.length - 3} more</p>}
                </div>
            </div>

        </div>
    )
}