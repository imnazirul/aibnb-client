'use client'
import React, { useState } from 'react';
import { SlOptions } from "react-icons/sl";
import EditModal from '../apartment/edit-modal';
import UploadModal from '../apartment/upload-modal';
import ImageSection from '../apartment/image-section';
import AddPhoto from '../apartment/add-photo';
import Header from '../apartment/header';

const Apartment = ({ form }) => {
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
    const [images, setImages] = useState<any[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [currentImageToEdit, setCurrentImageToEdit] = useState<string | null>(null);
    console.log("🚀 ~ Apartment ~ currentImageToEdit:", currentImageToEdit)

    const openModal = () => setShowModal(true);
    const openEditModal = (image: string) => {
        console.log("🚀 ~ openEditModal ~ image:", image)
        setCurrentImageToEdit(image);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setCurrentImageToEdit(null);
        setShowEditModal(false);
    };

    const handleFileChange = (event) => {
        if (event.fileList) {
            setSelectedFiles(event.fileList);
        }
    };
    // const handleFileChange = (event) => {
    //     if (event.fileList) {
    //         setSelectedFiles((prevSelectedFiles) => [
    //             ...prevSelectedFiles,
    //             ...event.fileList
    //         ]);
    //     }
    // };

    const handleUpload = async () => {
        form.setFieldsValue({
            images: [...images, ...selectedFiles]
        });
        setImages([...images, ...selectedFiles]);
        setSelectedFiles([]);
        setShowModal(false);
    };

    const handleDeleteImage = (index: number) => {
        console.log("index", index);
        setImages(prev => {
            const updatedFiles = prev.filter((_, i) => i !== index);
            form.setFieldsValue({
                images: updatedFiles
            });
            return updatedFiles;
        });
        closeEditModal();
    };

    const handleDeleteSelectedImage = (index: number) => {
        setSelectedFiles(prev => {
            const updatedFiles = prev.filter((_, i) => i !== index);
            form.setFieldsValue({
                images: updatedFiles
            });
            return updatedFiles;
        });
    };

    const handleSave = (updatedImage: string) => {
        console.log("save")
        // if (currentImageToEdit) {
        //     setUploadedImages(prev =>
        //         prev.map(img => (img === currentImageToEdit ? updatedImage : img))
        //     );
        //     closeEditModal();
        // }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const triggerFileInput = () => {
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        fileInput?.click();
    };

    return (
        <div className='container my-20 flex justify-center'>
            <div className='md:max-w-[640px] w-full'>
                <Header selectedFiles={selectedFiles} openModal={openModal} images={images} />

                {images.length > 0 ? null : <AddPhoto selectedFiles={selectedFiles} openModal={openModal} />}

                <ImageSection
                    openModal={openModal}
                    images={images}
                    selectedFiles={selectedFiles}
                    openEditModal={openEditModal}
                    handleDeleteImage={handleDeleteImage}
                    SlOptions={SlOptions}
                    handleUpload={handleUpload}
                />

                <UploadModal
                setImages={setImages}
                    setSelectedFiles={setSelectedFiles}
                    showModal={showModal}
                    selectedFiles={selectedFiles}
                    closeModal={closeModal}
                    triggerFileInput={triggerFileInput}
                    handleFileChange={handleFileChange}
                    handleDeleteSelectedImage={handleDeleteSelectedImage}
                    handleUpload={handleUpload}
                    images={images}
                />

                <EditModal
                    showEditModal={showEditModal}
                    currentImageToEdit={currentImageToEdit}
                    closeEditModal={closeEditModal}
                    handleSave={handleSave}
                />
            </div>
        </div>
    );
};

export default Apartment;
