import React, { useState } from 'react';
import Icon from '../../../../components/common/icon';
import { Modal } from 'antd';

interface Item {
    key: number;
    icon: React.ReactNode;
    description: string;
}

const Info: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const items: Item[] = [
        {
            key: 1,
            icon: <Icon name={'tick-icon'} />,
            description: "Identity ",
        },
        {
            key: 2,
            icon: <Icon name={'tick-icon'} />,
            description: "Email address ",
        },
        {
            key: 3,
            icon: <Icon name={'tick-icon'} />,
            description: "Phone number ",
        },
    ];

    return (
        <>
            <div className="my-10 border rounded-[20px] px-5 py-6 h-fit">
                <h1 className='text-title_sss mb-6'>Rachel & Stu's confirmed information</h1>
                {items.map((item) => (
                    <div
                        key={item.key}
                        className="flex items-center gap-3 pb-6 text-p2"
                    >
                        {item.icon}
                        <p className="flex items-center justify-between w-full">
                            <span className="text-main text-c1">
                                {item.description}
                                <span className="text-main">{item.description}</span>
                            </span>
                        </p>
                    </div>
                ))}
                <button onClick={() => setOpen(true)} className='text-ssb underline'>Learn about identity verification</button>
            </div>

            <Modal
                className='xl:!w-[30%] lg:!w-[50%] sm:!w-[60%] !w-[90%] h-[80vh] overflow-auto rounded-lg'
                open={open}
                onCancel={() => setOpen(false)}
                centered
                title={<p className='text-p text-center'>What is identity verification?</p>}
                footer={null}
            >
                <div className='w-full mt-6 border-t'>
                    <p className='mt-4 mb-2 text-ssb'>Someone being “Identity verified,” or having an identity verification badge, only means that they have provided info in order to complete our identity verification process. This process has safeguards, but is not a guarantee that someone is who they claim to be. <span className='underline text-p cursor-pointer'>Learn more</span></p>
                </div>
            </Modal>
        </>
    );
};

export default Info;
