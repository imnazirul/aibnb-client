import React from 'react';
import { FaStar } from 'react-icons/fa';
import { GrManual } from 'react-icons/gr';
import { TiTick } from 'react-icons/ti';

const Profile: React.FC = () => {
    return (
        <div className='rounded-[15px] w-full bg-white p-6 profile-box flex justify-between items-center'>
            <div className="basis-2/3">
                <div className='flex items-center gap-4 flex-col justify-items-center'>
                    <div className='relative'>
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Avatar"
                            className='w-[100px] h-[100px] rounded-full object-cover'
                        />
                        <div className='w-8 h-8 bg-red-600 rounded-full absolute right-0 bottom-0 flex items-center justify-center'>
                            <TiTick size={20} className='text-white' />
                        </div>
                    </div>
                    <div className='text-center flex items-center flex-col'>
                        <h1 className='text-ssh mb-1'>Rakan</h1>
                        <p className='flex gap-x-1 text-p2 items-center'>
                            <GrManual className='-rotate-[180deg]' />
                            <span>SuperHost</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="basis-1/3">
                <div className='flex flex-col gap-4'>
                    <div className='border-b py-1'>
                        <h2 className='text-title_md font-bold'>1361</h2>
                        <p className='text-xxs'>Reviews</p>
                    </div>
                    <div className='border-b py-1'>
                        <h2 className='text-title_md font-bold flex items-center gap-1'>
                            4.87 <FaStar size={15} />
                        </h2>
                        <p className='text-xxs'>Rating</p>
                    </div>
                    <div className='border-b py-1'>
                        <h2 className='text-title_md font-bold'>2</h2>
                        <p className='text-xxs'>Years hosting</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
