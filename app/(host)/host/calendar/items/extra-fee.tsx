import React from 'react';
import Icon from '../../../../../components/common/icon';

const ExtraFees = ({ onBack, data, form, setTab }) => {
    return (
        <div>
            <div onClick={() => onBack()} className="w-[41px] h-[41px] rounded-full flex items-center justify-center cursor-pointer bg-[#F7F7F7] mt-2">
                <Icon name={"arrow-left2"} />
            </div>
            <h1 className="text-h4 my-6">Cleaning fee</h1>
            <div
                role="button"
                onClick={() => {
                    setTab('stay')
                    form.resetFields()
                    form.setFieldsValue({ uid: data.uid, fees: { stay: data?.fees?.stay } || 0 })
                }}
                className="border rounded-lg p-4 mb-4">
                <p className="font-medium text-gray-700">Per Stay</p>
                <p className="text-3xl font-semibold text-gray-700">${data?.fees?.stay || 0}</p>
            </div>

            <h1 className="text-h4 my-6">Pet fee</h1>
            <div
                role="button"
                onClick={() => {
                    setTab('pet')
                    form.resetFields()
                    form.setFieldsValue({ uid: data.uid, fees: { pet: data?.fees?.pet} || 0 })
                }}
                className="border rounded-lg p-4 mb-4">
                <p className="font-medium text-gray-700">Per Stay</p>
                <p className="text-3xl font-semibold text-gray-700">${data?.fees?.pet || 0}</p>
            </div>

            <h1 className="text-h4 my-6">Extra guest fee</h1>
            <div
                role="button"
                onClick={() => {
                    setTab('guest')
                    form.resetFields()
                    form.setFieldsValue({ uid: data.uid, fees: {guest: data?.fees?.guest} || 0 })
                }}
                className="border rounded-lg p-4 mb-4">
                <p className="font-medium text-gray-700">After 1 guest, per night</p>
                <p className="text-3xl font-semibold text-gray-700">${data?.fees?.guest || 0}</p>
            </div>
        </div>
    );
};

export default ExtraFees;