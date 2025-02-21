import Image from 'next/image';
import React from 'react';
import Icon from '../../../../components/common/icon';
import { toAssetUrl } from '../../../../helpers/utils';

const WhereSleep = ({ data }) => {
    return (
        <div className='border-t-2 border-secondary mt-8'>
            <div className='my-8 flex flex-col gap-2 '>
                <h1 className='text-title_md text-main mb-2'>Where you’ll sleep</h1>
                <div className='cursor-pointer w-fit'>
                    <Image
                        height={400}
                        width={320}
                        src={toAssetUrl(data?.images[0])}
                        className="h-48 object-cover mb-2 rounded-md"
                        alt=""
                    />
                    <p className='text-p text-main mt-4'>Bedroom</p>
                    <div className='flex gap-1'>
                        <span className='text-s text-gray-700'>1 double bed,</span>
                        <span className='text-s text-gray-700'>1 single bed</span>

                    </div>
                </div>

                <div className='flex gap-4'>
                    <div className='border rounded-lg flex flex-col p-6 w-[210px] gap-4'>
                        <div className='flex gap-1'>
                            <Icon name={'double-bed'} />
                            <Icon name={'single-bed'} />
                            <Icon name={'floor-mat'} />
                        </div>
                        <div className=''>
                            <p className='text-p'>Bedroom 1</p>
                            <span className='text-s'>1 double bed, 1 floor mattress
                            </span>
                        </div>
                    </div>

                    <div className='border rounded-lg flex flex-col p-6 w-[210px] gap-4'>
                        <div className='flex gap-1'>
                            <Icon name={'double-bed'} />
                            <Icon name={'single-bed'} />
                            <Icon name={'floor-mat'} />
                        </div>
                        <div className=''>
                            <p className='text-p'>Bedroom 2</p>
                            <span className='text-s text-wrap'>1 double bed, 1 single bed, 1 floor mattress
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhereSleep;