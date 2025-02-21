import React from 'react';
import LeftBar from './leftbar';
import UserContent from './content';
const Users = () => {
    return (
        <div className='container mb-20'>
            <div className="max-w-[1120px]  mx-auto flex lg:flex-row flex-col xl:gap-20 lg:gap-10 gap-6   ">
                <LeftBar />
                <UserContent/>              
            </div>
        </div>
    );
};

export default Users;