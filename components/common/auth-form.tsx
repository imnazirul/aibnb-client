"use client";
import React from 'react';

const AuthForm = ({children}) => {

    return (
        <div className=' max-w-[1320px] mx-auto px-3 my-10'>
            <div className="flex lg:bg-[#B4DADC] rounded-[20px]">
                <div className="hidden lg:flex flex-col justify-center items-center gap-8 md:gap-[75px] lg:pl-6 pb-10 pt-12 md:pt-[60px] sm:pb-16 md:justify-center lg:pb-[230px] px-3 sm:px-6 lg:px-6">
                    <img src="logo_1.png" alt="logo" className="w-[170px] h-[55px] md:w-[290px] md:h-[95px]" />
                    <img src="sign2.png" alt="logo" className="!w-[1050px] object-contain" />
                </div>

                <div className=" bg-white lg:rounded-tl-[60px] lg:rounded-bl-[60px] w-full md:w-[80%] lg:w-full mx-auto shadow-auth px-3 md:px-[28px] pb-[60px] lg:pb-0 pt-[40px] lg:pt-[60px]">
                    <div className="w-full flex flex-col justify-center">
                        {children}
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;