import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const Header = ({
    images,
    selectedFiles,
    openModal
}) => {
    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='text-main text-xlMedium'>
                    {selectedFiles.length > 0
                        ? `Choose at least 5 photos`
                        : "Add some photos of your apartment"}
                </h1>
                {
                    images.length > 0  && (
                        <button
                            aria-label="Select photos"
                            type="button"
                            onClick={openModal}
                            className='hover:bg-gray-100 rounded-full p-2'
                        >
                            <AiOutlinePlus className="text-xl font-semibold" />
                        </button>
                    )
                }
            </div>
            <p className='text-secondaryText text-h5 mt-5 line-clamp-2 '>
                {selectedFiles.length > 0
                    ? ``
                    : "You'll need 5 photos to get started. You can add more or make changes later."}
            </p>
        </>
    );
};

export default Header;