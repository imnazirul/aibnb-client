"use client";
import React, { useState } from "react";
import { useUser } from "../../../contexts/user";
import YourProfile from "./profile";
import { Form } from "antd";
import AboutUs from "./about-us";
import ProfileUploader from "./sidebar";
import Button from "../../../components/common/button";

const EditProfile = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [form] = Form.useForm();
    const { user, getUser } = useUser();

    return (
        <div className="max-w-[1220px] mx-auto  my-10 flex gap-20 px-3 md:px-40 xl:px-0 lg:flex-row flex-col items-center lg:items-start">
            <ProfileUploader form={form} />
            <div className="">
                <YourProfile
                    user={user}
                    getUser={getUser}
                    form={form}
                />
                <AboutUs
                    isSwitchOn={isSwitchOn}
                    setIsSwitchOn={setIsSwitchOn}
                    form={form}
                />
                <div className="border-t pt-8 flex justify-end w-full">
                    <Button href="/profile" className="!bg-black !text-white !rounded-[8]">Done</Button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
