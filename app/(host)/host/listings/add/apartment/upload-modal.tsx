import React, { useRef } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { RiDeleteBinFill } from 'react-icons/ri';
import { Form, Input, Upload } from 'antd';

const UploadModal = ({
    setImages,
    images,
    showModal,
    selectedFiles,
    setSelectedFiles,
    closeModal,
    triggerFileInput,
    handleFileChange,
    handleDeleteSelectedImage,
    handleUpload,


}) => {
    const dialogRef = useRef<HTMLInputElement | any>(null);
    return (
        <>
            {showModal && (
                <div
                    role="dialog"
                    aria-label="Upload files"
                    aria-modal="true"
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 py-10 flex items-center justify-center px-3 z-50"
                >
                    <div className={`bg-white rounded-lg shadow-lg w-full max-w-[568px] overflow-y-auto relative  h-[80vh] ${selectedFiles.length > 2 ? 'h-[80vh] ' : 'h-auto'}`}>
                        <button
                            onClick={() => {
                                closeModal();
                                setSelectedFiles([])
                            }}
                            aria-label="Close"
                            type="button"
                            className="absolute top-5 left-4 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                        {selectedFiles?.length <= 0 && <button
                            onClick={() => dialogRef?.current?.upload?.uploader?.fileInput?.click()}
                            // aria-label="Close"
                            type="button"
                            className="absolute top-5 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <FaPlus className="text-xl" />
                        </button>}
                        <header className="flex justify-center items-center mb-5 pt-5">
                            <div className='flex flex-col items-center'>
                                <h1 className="text-h4">Upload Photos</h1>
                                <p className='text-xxs text-secondaryText'>
                                    {selectedFiles.length > 0
                                        ? `${selectedFiles.length} ${selectedFiles.length === 1 ? 'image selected' : 'images selected'}`
                                        : 'No items selected'}
                                </p>
                            </div>
                            <div></div>
                        </header>

                        <div className={`p-5 ${selectedFiles.length > 4 ? 'h-auto overflow-y-auto' : 'h-auto overflow-y-auto'}`}>
                            {(selectedFiles.length <= 0) && (
                                <Form.Item name="images" initialValue={[]} className='absolute' noStyle>
                                    <Upload.Dragger
                                        fileList={selectedFiles}
                                        disabled={selectedFiles.length >= 5}
                                        showUploadList={false}
                                        ref={dialogRef}
                                        onChange={handleFileChange}
                                        multiple
                                        listType="picture"
                                    >
                                        <div className=" md:!h-[270px] h-[200px] p-4 mb-4 flex flex-col items-center justify-center gap-2 ">

                                            <h3 className='text-title_sss'>Drag and drop</h3>
                                            <p className='text-sb'>or browse for photos</p>
                                            <button
                                                type='button'
                                                className='px-5 py-3 bg-black text-white rounded-[10px] z-30'
                                                disabled={selectedFiles.length >= 5}
                                            >
                                                Browse
                                            </button>
                                        </div>
                                    </Upload.Dragger>

                                </Form.Item>

                            )}

                            {selectedFiles.length > 0 && (
                                <div className={`mt-2.5 grid md:grid-cols-2 grid-cols-1 gap-4 mb-4 ${selectedFiles.length > 4 && 'h-[80%] overflow-auto pe-3'}`}>
                                    {selectedFiles.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={file?.originFileObj ? URL.createObjectURL(file?.originFileObj) : URL.createObjectURL(file)}
                                                alt={`Preview ${index}`}
                                                className="w-full h-[252px] mb-4 rounded-lg border border-gray-300 shadow-sm"
                                            />
                                            <button
                                                onClick={() => handleDeleteSelectedImage(index)}
                                                type='button'
                                                className="absolute top-2 right-2 p-2 rounded-full bg-black text-white"
                                            >
                                                <RiDeleteBinFill />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <footer className="flex border-t justify-between p-5">
                            <button
                                type="button"
                                className="duration-500 hover:bg-gray-50 rounded-[10px] z-30 text-c1"
                                onClick={() => {
                                    // setImages(selectedFiles);
                                    // setSelectedFiles([]);
                                    closeModal();
                                }}
                                disabled={selectedFiles.length === 0}
                            >
                                Done
                            </button>
                            <button
                                type="button"
                                className="px-5 py-3 bg-black text-white rounded-[10px] z-30"
                                onClick={handleUpload}
                                disabled={selectedFiles.length === 0}
                            >
                                Upload
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
};

export default UploadModal;