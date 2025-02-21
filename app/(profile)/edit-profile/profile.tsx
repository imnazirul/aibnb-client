import React, { useState } from "react";
import CustomModal from "../../../components/common/custom-modal";
import { Form, message, Switch } from "antd";
import FormField from "../../../components/form/input-field";
import LanguageMultiselect from "../../(host)/host/listings/edit-old/[uid]/forms/language-multiselect";
import Icon from "../../../components/common/icon";
import CountryInput, { CityInput } from "../../../components/form/country";
import LocationInput from "../../../components/common/map-location-input";
import Button from "../../../components/common/button";
import { updateUser } from "../../../helpers/backend";
import { RiGraduationCapLine } from "react-icons/ri";
import { IoBriefcaseOutline, IoLanguage, IoTimeOutline } from "react-icons/io5";
import { TiGlobeOutline } from "react-icons/ti";
import { PiBookBookmarkBold } from "react-icons/pi";
import { MdOutlinePets } from "react-icons/md";


const data = [
    { label: "English" },
    { label: "Bangla" },
    { label: "Arabic" },
    { label: "Urdu" },
    { label: "French" },
];

const YourProfile = ({ user, getUser, form }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [country, setCountry] = useState<string | undefined>(undefined);
    const [city, setCity] = useState("");
    const [customAddress, setCustomAddress] = useState(true);
    const [born, setBorn] = useState(false);


    const items = [
        {
            key: 1,
            icon: <RiGraduationCapLine size={24} className="text-[#4b4e53]" />,
            description: "Where I went to school: ",
            detail: <>{user?.school_name}</>,
            modalDetails: {
                name: "school_name",
                title: "Where did you go to school?",
                subTitle:
                    "Whether it’s home school, high school, or trade school, name the school that made you who you are.",
                placeholder: "Where I want to school:",
            },
        },
        {
            key: 2,
            icon: <IoBriefcaseOutline size={24} className="text-[#4b4e53]" />,
            description: "My Work: ",
            detail: <>{user?.my_work}</>,
            modalDetails: {
                name: "my_work",
                title: "What do you do for work?",
                subTitle:
                    "Tell us what your profession is. If you don’t have a traditional job, tell us your life’s calling. Example: Nurse, parent to four kids, or retired surfer.",
                placeholder: "My Work:",
                characters: "30",
            },
        },
        {
            key: 3,
            icon: <TiGlobeOutline size={24} className="text-[#4b4e53]" />,
            description: "Where i live: ",
            detail: (
                <>
                    {user?.host?.address?.country}, {user?.host?.address?.city},{" "}
                    {user?.host?.address?.street}.
                </>
            ),
            modalDetails: {
                name: "address",
                title: "Where you live",
                placeholder: "Search for your city",
            },
        },
        {
            key: 4,
            icon: <IoLanguage size={24} className="text-[#4b4e53]" />,
            description: "Languages I speak: ",
            detail: <>{user?.languages}</>,
            modalDetails: {
                name: "languages",
                title: "Languages you speak",
                placeholder: "Search for a language",
            },
        },
        {
            key: 5,
            icon: <RiGraduationCapLine size={24} className="text-[#4b4e53]" />,
            description: "Decade I was born: ",
            detail: <>{user?.decade}</>,
            modalDetails: {
                toggleName: "decade",
                title: "Decade you were born",
                subTitle:
                    "Don’t worry, other people won’t be able to see your exact birthday.",
            },
        },
        {
            key: 6,
            icon: <RiGraduationCapLine size={24} className="text-[#4b4e53]" />,
            description: "My favorite song in high school: ",
            detail: <>{user?.favorite_song}</>,
            modalDetails: {
                name: "favorite_song",
                title: "What was your favorite song in high school?",
                subTitle:
                    "However embarrassing, share the tune you listened to on repeat as a teenager.",
                placeholder: "My favorite song in high school:",
                characters: "40",
            },
        },
        {
            key: 7,
            icon: <RiGraduationCapLine size={24} className="text-[#4b4e53]" />,
            description: "I’b obsessed  with: ",
            detail: <>{user?.obsessed}</>,
            modalDetails: {
                name: "obsessed",
                title: "What’s your obsession with?",
                subTitle:
                    "Share whatever you can’t get enough of—in a good way. Example: Baking rosemary focaccia.",
                placeholder: "I’m obsessed with:",
                characters: "40",
            },
        },
        {
            key: 8,
            icon: <RiGraduationCapLine size={24} className="text-[#4b4e53]" />,
            description: "My fun fact: ",
            detail: <>{user?.fun_fact}</>,
            modalDetails: {
                name: "fun_fact",
                title: "What’s a fun fact about you?",
                subTitle:
                    "Share whatever you can’t get enough of—in a good way. Example: Baking rosemary focaccia.",
                placeholder: "i’m obsessed with:",
                characters: "40",
            },
        },
        {
            key: 9,
            icon: <RiGraduationCapLine size={24} className="text-[#4b4e53]" />,
            description: "My most useless skill: ",
            detail: <>{user?.skill}</>,
            modalDetails: {
                name: "skill",
                title: "What’s your most useless skill?",
                subTitle:
                    "Share a surprising but pointless talent you have. Example: Shuffling cards with one hand.",
                placeholder: "My most useless skill:",
                characters: "40",
            },
        },
        {
            key: 10,
            icon: <PiBookBookmarkBold size={24} className="text-[#4b4e53]" />,
            description: "My biography title would be: ",
            detail: <>{user?.biography}</>,
            modalDetails: {
                name: "biography",
                title: "What would your biography title be?",
                subTitle:
                    "If someone wrote a book about your life, what would they call it? Example: Born to Roam or Chronicles of a Dog Mom.",
                placeholder: "My biography title would be:",
                characters: "40",
            },
        },
        {
            key: 11,
            icon: <IoTimeOutline size={24} className="text-[#4b4e53]" />,
            description: "I spend too much time: ",
            detail: <>{user?.spend_time}</>,
            modalDetails: {
                name: "spend_time",
                title: "What do you spend too much time doing?",
                subTitle:
                    "Share an activity or hobby you spend lots of free time on. Example: Watching cat videos or playing chess.",
                placeholder: "i spent too much time:",
                characters: "40",
            },
        },
        {
            key: 12,
            icon: <MdOutlinePets size={24} className="text-[#4b4e53]" />,
            description: "Pets: ",
            detail: <>{user?.pets}</>,
            modalDetails: {
                name: "pets",
                title: "Do you have any pets in your life?",
                subTitle:
                    "Share any pets you have and their names. Example: My calico cat Whiskers, or Leonardo my speedy turtle.",
                placeholder: "Pets:",
                characters: "40",
            },
        },
    ];

    const handleEdit = (item) => {
        setSelectedItem(item?.modalDetails);
        setIsModalOpen(true);
        form.setFieldsValue({
            address: {
                street: user?.host?.address?.street,
                city: user?.host?.address?.city,
                state: user?.host?.address?.state,
                zip: user?.host?.address?.zip,
                country: user?.host?.address?.country,
                apartment: user?.host?.address?.apartment,
            },
        });
        setCountry(user?.host?.address?.country);
        setCity(user?.host?.address?.city);
    };

    const handleSubmit = async (values) => {
        if (values?.address) {
            const { error, msg, data } = await updateUser({
                host: {
                    address: {
                        street: values?.address?.street
                            ? values?.address?.street
                            : undefined,
                        city: values?.address?.city ? values?.address?.city : undefined,
                        state: values?.address?.state ? values?.address?.state : undefined,
                        zip: values?.address?.zip ? values?.address?.zip : undefined,
                        country: values?.address?.country
                            ? values?.address?.country
                            : undefined,
                        apartment: values?.address?.apartment
                            ? values?.address?.apartment
                            : undefined,
                    },
                },
            });
            if (error) {
                return message.error(msg);
            } else {
                message.success(msg);
                setIsModalOpen(false);
                getUser();
            }
        }

    };

    return (
        <>
            <h2 className="text-xlSemiBold">Your Profile</h2>
            <p className="text-p2 mt-3">
                The information you share will be used across Airbnb to help other
                guests and Hosts get to know you.{" "}
                <span className="font-semibold underline text-main">Learn more</span>
            </p>

            <div className="grid lg:grid-cols-2 gap-x-[60px] gap-y-10 mt-8">
                {items.map((item) => (
                    <div
                        key={item.key}
                        className="flex items-center gap-3 pb-6 border-b border-webBorder cursor-pointer text-p2"
                        onClick={() => handleEdit(item)}
                    >
                        {item?.icon}
                        <p className="flex items-center justify-between w-full">
                            <span className="text-secondaryText">
                                {item?.description}
                                <span className="text-main">{item?.detail}</span>
                            </span>
                        </p>
                    </div>
                ))}
            </div>

            <CustomModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title={selectedItem?.title}
                subTitle={selectedItem?.subTitle}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    {selectedItem?.name !== "languages" &&
                        selectedItem?.name !== "address" &&
                        selectedItem?.toggleName !== "decade" && (
                            <div className="mt-6">
                                <ValueInput
                                    name={selectedItem?.name}
                                    max={selectedItem?.characters}
                                    placeholder={selectedItem?.placeholder}
                                />
                            </div>
                        )}
                    {selectedItem?.name === "languages" && (
                        <div className="flex flex-col">
                            <FormField
                                label=""
                                name={selectedItem?.name}
                                placeholder={selectedItem?.placeholder}
                            />
                            <div className="-mt-8">
                                <LanguageMultiselect name="languages" options={data} />
                            </div>
                        </div>
                    )}
                    {selectedItem?.name === "address" && (
                        <div className="flex flex-col relative">
                            <div
                                className="flex gap-x-2 items-center absolute right-0  cursor-pointer w-fit"
                                onClick={() => setCustomAddress(!customAddress)}
                            >
                                <Icon name="map-location" />
                                {customAddress ? (
                                    <p className="text-c1 text-primary">Use Current Location</p>
                                ) : (
                                    <p className="text-c1 text-primary">Enter Address Manually</p>
                                )}
                            </div>
                            {customAddress ? (
                                <div className="mt-6">
                                    <CountryInput
                                        label={"Select country/region"}
                                        name={["address", "country"] as any}
                                        whitelist={undefined}
                                        setCountry={setCountry}
                                        required
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            label="Street Address"
                                            name={["address", "street"]}
                                            required
                                            placeholder="Street Address"
                                        />
                                        <FormField
                                            name={["address", "apartment"]}
                                            label="Apt,suite. (Optional)"
                                            placeholder="Apr,Suite"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <CityInput
                                            label={"Select City"}
                                            name={["address", "city"] as any}
                                            country={country}
                                            required
                                            onSelect={undefined}
                                            region={city}
                                        />
                                        <FormField
                                            name={["address", "state"]}
                                            label="State/Province/Country/Region"
                                            placeholder="State/Province"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            name={["address", "zip"]}
                                            label="Zip Code"
                                            placeholder="Ex. 91580"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-2">
                                    <LocationInput
                                        country={"bangladesh"}
                                        name="location"
                                        className={"mt-3"}
                                        rules={[
                                            { required: true, message: "Please select address" },
                                        ]}
                                        label={"Select Address"}
                                        onComplete={(value) => console.log("vale", value)}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    {selectedItem?.toggleName === "decade" && (
                        <div className="mt-6">
                            <div className="flex items-center justify-between -mt-3 text-p text-secondary-main">
                                <div className="">
                                    <h1 className="text-p">Show the decade I was born</h1>
                                    <h1 className="text-s text-secondaryText">Born in the 90s</h1>
                                </div>
                                <Form.Item name={"decade"} initialValue={false}>
                                    <Switch checked={born} onChange={() => setBorn(!born)} />
                                </Form.Item>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-between items-center border-t-[1px] border-[#EEE] pt-6 mt-8">
                        <h1
                            onClick={() => setIsModalOpen(false)}
                            className="text-main text-p underline !cursor-pointer"
                        >
                            Close
                        </h1>
                        <Button
                            type="submit"
                            onClick={() => setIsModalOpen(false)}
                            className="text-white !bg-black"
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </CustomModal>
        </>
    );
};

export default YourProfile;

interface ValueProps {
    name: String | [String],
    label?: String,
    max?: number,
    required?: boolean,
    placeholder?: string,
    textarea?: boolean
}

const ValueInput = ({ name, label, max = 20, required, placeholder, textarea }: ValueProps) => {

    const Input = ({ value, onChange }: any) => {
        const commonProps = {
            value,
            className: "form-input p-2 text-p1 w-full rounded-md",
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                let val = e.target.value;
                if (val.length <= max) {
                    onChange(val);
                } else {
                    onChange(val.substring(0, max));
                }
            },
            placeholder
        };

        return (
            <div className="">
                {textarea ? (
                    <textarea {...commonProps} rows={4} />
                ) : (
                    <input {...commonProps} />
                )}
                <div className="flex justify-between mt-2 text-p text-secondary-main">
                    <h1>{max ? `${value?.length}/${max}` : ''} <span className="text-s text-secondaryText">characters available</span>
                    </h1>
                    <h1 className="cursor-pointer" onClick={() => onChange('')}>Clear All</h1>
                </div>
            </div>
        );
    }

    return (
        <Form.Item
            name={name as any}
            className="mb-0"
            rules={[
                {
                    required: required,
                    message: 'Please enter ' + label
                }
            ]}
            initialValue=""
        >
            <Input />
        </Form.Item>
    );
}

