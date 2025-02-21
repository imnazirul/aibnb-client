import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Icon from "../../../../../components/common/icon";
import { Carousel } from "antd";
import Link from "next/link";
import React, { useRef } from "react";
import { host_types, toAssetUrl } from "../../../../../helpers/utils";
import { MdLocationPin } from "react-icons/md";

const Property = ({ data }) => {

    const carouselRef = useRef(null);

    return (
        <div className='group card'>
            <div className='relative'>
                <div onClick={() => carouselRef.current.prev()} className='card-arrow-left group-hover:opacity-100'>
                    <AiOutlineLeft></AiOutlineLeft>
                </div>
                <div onClick={() => carouselRef.current.next()} className='card-arrow-right group-hover:opacity-100'>
                    <AiOutlineRight></AiOutlineRight>
                </div>
                {/* <div className={`card-type`}>
                    {host_types?.find(d => d.value === data?.type)?.title}
                </div> */}
                <div className={`absolute rounded right-2 top-2 px-3 py-2 bg-white flex items-center gap-2.5`}>
                    <Icon name="circle" />
                    In Process
                </div>
                <div className='relative -z-50 ant-carousel'>
                    <Carousel autoplay ref={carouselRef} >
                        {
                            data?.images?.map((item, index) => <div key={index} className='w-full h-[256px]'>
                                <img
                                    crossOrigin='anonymous'
                                    className='w-full rounded-t-md object-contain' src={toAssetUrl(item)} alt='' />
                            </div>)
                        }
                    </Carousel>
                </div>
            </div>
            <div className='py-2'>
                <div className='flex items-center justify-between'>
                    <Link href={`/host/listings/edit/${data?.uid}`}
                        className="w-[80%]">
                        <h1 className='text-c1 cursor-pointer capitalize group-hover:text-primary truncate'>
                            {data?.title}
                        </h1>
                    </Link>
                    <div className='flex justify-center items-center gap-0.5'>
                        <Icon name='star-primary' />
                        <span className='md:mt-0 text-secondaryText font-[14px]'>4.6</span>
                    </div>
                </div>
                <p className='pt-2 text-secondaryText flex items-center gap-1'>
                    <MdLocationPin className='w-4 h-4' />
                    <span className="truncate">{data?.location?.name}</span>
                </p>
            </div>
        </div>
    );
}

export default Property;