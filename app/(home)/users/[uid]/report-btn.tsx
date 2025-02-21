import React from 'react';
import { RiFlagFill } from 'react-icons/ri';

interface ReportBtnProps {
    setOpen: (open: boolean) => void;
}

const ReportBtn: React.FC<ReportBtnProps> = ({ setOpen }) => {
    return (
        <button
            type='button'
            className="flex items-center text-secondaryText gap-1 cursor-pointer"
            onClick={() => setOpen(true)}
        >
            <RiFlagFill className='w-4 h-4' />
            <span className='underline text-p'>Report this listing</span>
        </button>
    );
};

export default ReportBtn;
