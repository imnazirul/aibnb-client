"use client"
import React, { useEffect, useState, Suspense } from 'react';
import { useFetch } from '../../../../../../helpers/hooks';
import { fetchProperty, fetchPropertyElements } from '../../../../../../helpers/backend';
import MainLoader from '../../../../../../components/common/loader';
import ListingSidebar from './sidebar';
import MainSection from './items/main-section';
import { Form } from 'antd';
import { useSearchParams } from 'next/navigation';

const Page = ({ params }: any) => {
    const [data, getData] = useFetch(fetchProperty, false)
    const [section, setSection] = useState('photo_tour')
    const [elements] = useFetch(fetchPropertyElements)
    const [form] = Form.useForm()

    return (
        <Suspense fallback={<MainLoader />}>
            <PageContent 
                params={params} 
                data={data} 
                getData={getData} 
                elements={elements} 
                form={form} 
                section={section} 
                setSection={setSection} 
            />
        </Suspense>
    );
};

const PageContent = ({ params, data, getData, elements, form, section, setSection }) => {
    const query = useSearchParams();
    const action = query.get('action');

    useEffect(() => {
        if (!!params.uid) {
            getData({ uid: params.uid });
        }
    }, [params.uid]);

    if (!data?._id) {
        return (
            <>
                <MainLoader />
            </>
        );
    } else {
        form.setFieldsValue({ uid: data?.uid, images: data?.images });
    }

    return (
        <div className="flex">
            {action !== 'add' && (
                <div className="hidden md:block w-[560px] md:flex-shrink-0 overflow-hidden border-r">
                    <div className="px-14 overflow-y-auto">
                        <ListingSidebar data={data} getData={getData} elements={elements} setSection={setSection} section={section} form={form} />
                    </div>
                </div>
            )}
            <div className="flex-grow">
                <div className="p-4">
                    <MainSection data={data} getData={getData} elements={elements} setSection={setSection} section={section} form={form} />
                </div>
            </div>
        </div>
    );
};

export default Page;
