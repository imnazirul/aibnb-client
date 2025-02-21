import React from "react";
import {Modal} from "antd";

interface AccountInfoModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    children: React.ReactNode;
    subTitle: string;
    width?: number;
}

const AccountInfoModal: React.FC<AccountInfoModalProps> = ({open, setOpen, title, children, subTitle, width}) => {
    return (
        <Modal
            maskClosable={false}
            open={open}
            onCancel={() => setOpen(false)}
            title={<h1 className='text-main text-title_lg'>{title}</h1>}
            footer={null}
            width={width}
        >
            <span className='text-secondaryText text-p2'>
                {subTitle}
            </span>
            {children}

        </Modal>
    );
};

export default AccountInfoModal;