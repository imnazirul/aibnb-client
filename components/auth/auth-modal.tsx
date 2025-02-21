import React from 'react';
import { Modal } from 'antd';

interface AuthModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    children: React.ReactNode;
    width?: number;
    maskClosable?: boolean;
    uploaded?: string
}

const AuthModal = ({ open, setOpen, title, children, width, maskClosable }: AuthModalProps) => {
    return (
        <Modal
            className='modal-style'
            maskClosable={maskClosable}
            open={open}
            onCancel={() => setOpen(false)}
            title={<h1 className='text-black text-h4 text-center pb-4'>{title}</h1>}
            footer={null}
            width={width}
            destroyOnClose={true}
            centered
        >
            {children}

        </Modal>
    );
};

export default AuthModal;