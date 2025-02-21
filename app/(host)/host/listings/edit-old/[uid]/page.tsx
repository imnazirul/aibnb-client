"use client";
import React, { useEffect, useState } from 'react';
import MainLoader, { hideLoader } from '../../../../../../components/common/loader';
import { fetchProperty, fetchPropertyElements, fetchUser, patchProperty } from '../../../../../../helpers/backend';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '../../../../../../components/common/icon';
import { CgMenuRound } from 'react-icons/cg';
import { Drawer, Form } from 'antd';
import { FaArrowLeft } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import Button from '../../../../../../components/common/button';
import DescriptionForm from './forms/description-form';
import AmenitiesForm from './forms/amenities-form';
import PropertyForm from './forms/property-form';
import GuestForm from './forms/guest-form';
import LocationMap from '../../../../../../components/common/location-map';
import LocationForm from './forms/location';
import AccessibilityForm from './forms/accessibility-form';
import BookForm from './forms/book-form';
import AboutHost from './forms/about-host';
import HouseRulesForm from './forms/house-rules-form';
import SafetyForm from './forms/safety-form';
import CancellationPolicy from './forms/cancellation-policy';
import PhotoForm from './forms/photo-form';
import { useAction, useFetch } from '../../../../../../helpers/hooks';
import Textarea from '../../add-old/forms/textarea';
import { toAssetUrl } from '../../../../../../helpers/utils';
import MapView from "../../../../../../components/common/map";
import Svg from "../../../../../../components/common/svg";

interface EditPageProps {
    params: any;
}

const page = ({ params }: EditPageProps) => {
    const router = useRouter();
    const [form] = Form.useForm()
    const page = usePathname();
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [space, setSpace] = useState('space');
    const [type, setType] = useState("photos");
    const [activeLink, setActiveLink] = useState("photos");
    const [data, getData] = useFetch(fetchProperty, false)

    const [elements] = useFetch(fetchPropertyElements)

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const onTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        fetchUser({}).then(({ error, data }) => {
            if (error === false && data.role === "user") {
                hideLoader();
                setUser(data);
            } else {
                router.push("/login");
            }
        });
    }, []);

    useEffect(() => {
        if (!!params.uid) {
            getData({ uid: params.uid })
        }
    }, [params.uid])

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
                location: {
                    lat: data?.location?.lat,
                    lng: data?.location?.lng,
                    city: data?.location?.city,
                    country: data?.location?.country,
                    country_long: data?.location?.country_long,
                    name: data?.location?.name,
                }
            });
        }
    }, [data]);

    const handleSubmit = async values => {
        return useAction(patchProperty, { uid: params.uid, ...values }, () => {
            getData()
        })
    }

    const links = [
        {
            data: <>
                <div
                    className={`cursor-pointer ${activeLink === 'photos' ? 'border-primary text-primary' : ''}`}
                    onClick={() => { setType('photos'); onTop(); setActiveLink('photos'); }}
                >
                    <div className='p-4'>
                        <h2 className='capitalize mb-2'>{data?.title}</h2>
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
                        <div className='flex flex-col justify-center items-center gap-4'>
                            <img
                                crossOrigin='anonymous'
                                src={toAssetUrl(data?.images[0])}
                                alt=""
                                className='w-[150px] aspect-square object-cover rounded-md' />
                        </div>
                    </div>
                </div>
            </>
        },
        { title: "title", type: "title", subtitle: <>{data?.title}</> },
        { title: "property type", type: "property_type", subtitle: <div className='capitalize'>{data?.type?.split("_").join(" ")}</div> },
        { title: "number of guests", type: "guest", subtitle: `${data?.guests} guest` },
        {
            title: "description", type: "description", subtitle: (
                <p className="line-clamp-2 w-full">{data?.description}</p>
            )
        },
        {
            data: <>
                <div
                    className={`cursor-pointer ${activeLink === 'amenities' ? 'border-primary text-primary' : ''}`}
                    onClick={() => { setType('amenities'); onTop(); setActiveLink('amenities'); }}
                >
                    <div className='flex flex-col gap-4 p-4'>
                        <h2 className='capitalize'>amenities</h2>
                        <div className='flex flex-col  gap-4'>
                            {
                                data?.amenities.slice(0, 3)?.map((amenity, index) => (
                                    <div className='flex gap-2' key={index}>
                                        <Svg src={toAssetUrl(amenity?.icon)} />
                                        <p className='text-secondaryText text-p2'>{amenity?.name}</p>
                                    </div>
                                ))
                            }
                            {data?.amenities.length > 3 && (
                                <div className='flex gap-2'>
                                    <p className='text-secondaryText text-p2'>+{data?.amenities.length - 3} more</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        },
        { title: "accessibility features", type: "accessibility", subtitle: "add details" },
        // figma not processed 
        // { title: "co-host", href: "#", subtitle: "add details" },
        { title: "instant book", type: "book", subtitle: "turned off: manually accept or decline booking requests" },
        {
            data: <>
                <div className={`flex flex-col cursor-pointer ${activeLink === 'location' ? 'border-primary text-primary' : ''}`}
                    onClick={() => { setType('location'); onTop(); setActiveLink('location') }}>
                    <h2 className='capitalize p-4'>Location</h2>
                    <div className="mt-2 p-2">
                        <MapView
                            center={data?.location}
                            markers={[data?.location]}

                        />
                    </div>
                </div>
            </>
        },
        {
            data: <>
                <div
                    className={`cursor-pointer ${activeLink === 'about_host' ? 'border-primary text-primary' : ''}`}
                    onClick={() => { setType('about_host'); onTop(); setActiveLink('about_host') }}
                >
                    <h2 className='capitalize p-4'>about the host</h2>

                    <div className='flex flex-col justify-center items-center gap-4 h-[300px]'>
                        <img crossOrigin='anonymous' src={toAssetUrl(user?.image)} alt="" className='w-[150px] h-[150px] rounded-full' />
                        <div>
                            <h2 className='text-title_lg text-main'>{user?.name}</h2>
                            <p className='text-secondaryText text-p2'>starts hosting in 2024</p>
                        </div>
                    </div>
                </div>
            </>
        },
        {
            data: <>
                <div
                    className={`cursor-pointer ${activeLink === 'house_rules' ? 'border-primary text-primary' : ''}`}
                    onClick={() => { setType('house_rules'); onTop(); setActiveLink('house_rules') }}
                >
                    <div className='flex flex-col gap-4 p-4'>
                        <h2 className='capitalize'>house rules</h2>
                        <div className='flex flex-col  gap-4'>
                            <div className='flex gap-2'>
                                <Icon name="clock" />
                                <p className='text-secondaryText text-p2'>check-in after 3:00 pm</p>
                            </div>
                            <div className='flex gap-2'>
                                <Icon name="user-id" />
                                <p className='text-secondaryText text-p2'>1 guest maximum</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        },
        {
            data: <>
                <div
                    className={`cursor-pointer ${activeLink === 'guest_safety' ? 'border-primary text-primary' : ''}`}
                    onClick={() => { setType('guest_safety'); onTop(); setActiveLink('guest_safety') }}
                >
                    <div className='flex flex-col gap-4 p-4'>
                        <h2 className='capitalize'>guest safety</h2>
                        <div className='flex flex-col  gap-4'>
                            <div className='flex gap-2'>
                                <Icon name="frame" />
                                <p className='text-secondaryText text-p2'>smoke alarm installed</p>
                            </div>
                            <div className='flex gap-2'>
                                <Icon name="music" />
                                <p className='text-secondaryText text-p2'>noise decibel monitor present</p>
                            </div>
                            <div className='flex gap-2'>
                                <Icon name="icon-p" />
                                <p className='text-secondaryText text-p2'>free parking on premises</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        },
        { title: "cancellation policy", type: "cancellation_policy", subtitle: "flexible" },
        { title: "custom link", type: "custom_link", subtitle: "add details" }
    ]

    if (!user || !data?._id) {
        return (
            <>
                <MainLoader />
            </>
        );
    }
    return (
        <div>
            <div className="container my-12 mx-auto">
                <div className="md:flex mt-[32px] h-[80vh]">
                    <div className="host-edit-sidebar ">
                        <div className="pb-4 border-b">
                            <div className="flex items-center space-x-5 ">
                                <div onClick={() => router.back()} className='cursor-pointer'>
                                    <FaArrowLeft className='h-8 w-8 p-2 rounded-full bg-secondary' />
                                </div>
                                <h1 className="text-main text-title_lg">Listing editor</h1>
                            </div>
                        </div>
                        <ul className="mt-2 max-w-md overflow-x-hidden pr-2 slim-scroll">
                            <div className='flex gap-4 justify-between items-center'>
                                <div className='border rounded-[40px] flex gap-5 justify-between p-1'>
                                    <span onClick={() => setSpace('space')}
                                        className={`rounded-[40px] px-4 py-1 cursor-pointer ${space === 'space' ? '!text-white bg-primary' : 'text-secondaryText bg-secondary'}`}
                                    >
                                        Your Space
                                    </span>
                                    <span onClick={() => setSpace('guide')} className={`rounded-[40px] px-4 py-1 cursor-pointer ${space === 'guide' ? '!text-white bg-primary' : 'text-secondaryText bg-secondary'}`}>
                                        arrival guide
                                    </span>
                                </div>
                                <IoSettings className='h-8 w-8 p-2 rounded-full bg-secondary cursor-pointer' />
                            </div>
                            {
                                links.map((link, index) => (
                                    <li
                                        key={index}
                                        className={`list text-h4 border rounded-md hover:border-primary
                                    ${type === link.type
                                                ? "text-primary border-primary"
                                                : "text-main"
                                            }`}
                                    >

                                        {
                                            link.data
                                                ? link.data
                                                : <div
                                                    className="flex flex-col gap-2.5 cursor-pointer items-start p-4"
                                                    onClick={() => { setType(link.type); onTop(); setActiveLink(link.type) }}
                                                >
                                                    <h2 className='capitalize'>{link?.title}</h2>
                                                    <div className='text-secondaryText text-p2 w-full'>
                                                        {link?.subtitle}
                                                    </div>
                                                </div>
                                        }

                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <CgMenuRound className="text-3xl mt-1.5 block lg:hidden cursor-pointer" onClick={showDrawer} />
                    <div className="dashboard-shadow host-edit-main">
                        {/* form  */}
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                            {
                                type === "title" &&
                                <div className='mb-6'>
                                    <Textarea name="title" label="Title" placeholder="My cozy place in the city" max={50} className="text-title_md text-center" />
                                </div>

                            }
                            {
                                type === "photos" &&
                                <PhotoForm form={form} handleSubmit={handleSubmit} data={data} />
                            }
                            {
                                type === "property_type" &&
                                <PropertyForm categories={elements?.categories} />
                            }
                            {
                                type === "guest" &&
                                <GuestForm />
                            }
                            {
                                type === "amenities" &&
                                <AmenitiesForm data={data} form={form} handleSubmit={handleSubmit} />
                            }
                            {
                                type === "book" &&
                                <BookForm />
                            }
                            {
                                type === "house_rules" &&
                                <HouseRulesForm form={form} handleSubmit={handleSubmit} />
                            }
                            {
                                type === "guest_safety" &&
                                <SafetyForm />
                            }
                            {
                                type === "location" &&
                                <LocationForm />
                            }
                            {
                                type === "description" &&
                                <DescriptionForm />
                            }
                            {
                                type === "accessibility" &&
                                <AccessibilityForm />
                            }
                            {
                                type === "about_host" &&
                                <AboutHost form={form} handleSubmit={handleSubmit} />
                            }
                            {
                                type === 'cancellation_policy' &&
                                <CancellationPolicy form={form} handleSubmit={handleSubmit} />
                            }
                            {
                                type === 'custom_link' &&
                                <div className='mb-6'>
                                    <Textarea name="custom_link" label="Custom Title" placeholder="" max={50} className="text-title_md text-center" />
                                </div>
                            }
                            {
                                type !== "description" && type !== "amenities" && type !== "location" && type !== "accessibility" && type !== "about_host" && type !== "cancellation_policy" && type !== 'photos' &&
                                <hr />
                            }
                            <div className='flex justify-end md:mb-0 mb-4'>
                                {
                                    type !== "description" && type !== "amenities" && type !== "location" && type !== "accessibility" && type !== "about_host" && type !== "cancellation_policy" && type !== 'photos' &&
                                    <Button className='mt-2 !text-white'>
                                        Save
                                    </Button>
                                }
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

            <Drawer placement="left" title="" onClose={onClose} open={open}>
                <ul className="flex flex-col gap-4 mb-8">
                    {
                        links.map((link, index) => (
                            <li
                                key={index}
                                className={`list text-h4 border rounded-md hover:border-primary
                                    ${type === link.type
                                        ? "text-primary border-primary"
                                        : "text-main"
                                    }`}
                            >

                                {
                                    link.data
                                        ? link.data
                                        : <div
                                            className="flex flex-col gap-2.5 cursor-pointer items-start p-4"
                                            onClick={() => { setType(link.type); onTop(); setActiveLink(link.type); setOpen(false) }}
                                        >
                                            <h2 className='capitalize'>{link?.title}</h2>
                                            <span className='text-secondaryText text-p2'>
                                                {link?.subtitle}
                                            </span>
                                        </div>
                                }

                            </li>
                        ))
                    }
                </ul>
            </Drawer>
        </div>
    );
};

export default page;