import React from 'react';
import { Modal } from 'antd';

interface CustomModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: any;
    children: React.ReactNode;
    subTitle?: string;
    width?: number;
    maskClosable?: boolean;
    uploaded?:string
}

const CustomModal: React.FC<CustomModalProps> = ({ open, setOpen, title, children, subTitle, width, maskClosable, uploaded }) => {
    return (
        <Modal
            className={uploaded}
            maskClosable={maskClosable}
            open={open}
            onCancel={() => setOpen(false)}
            title={<h1 className='text-main text-xlRegular'>{title}</h1>}
            footer={null}
            width={width}
            destroyOnClose={true}
        >
            <span className='text-secondaryText text-p2'>
                {subTitle}
            </span>
            {children}

        </Modal>
    );
};

export default CustomModal;