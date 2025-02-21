import Image from 'next/image';
import React from 'react';

const AddPhoto = ({
    selectedFiles,
    openModal
}) => {
    return (
        <>
            {(selectedFiles?.length <= 0 || selectedFiles?.length > 0 ) && (
                <div className='max-w-[640px] mt-[15px] md:h-[420px] h-[250px]  rounded-[15px] border-2 border-dotted bg-[#F7F7F7] flex flex-col items-center justify-center'>
                    <Image src={'/camera.png'} width={500} height={300} alt='camera' className='md:w-[199px] w-[100px] md:h-[191px] h-[100px]' />
                    <button
                        type='button'
                        onClick={openModal}
                        className="border-main md:px-5 px-3 md:py-[14px] py-[8px] rounded-[8px] border capitalize"
                    >
                        add photo
                    </button>
                </div>
            )}
        </>
    );
};

export default AddPhoto;