import React, { useState } from 'react';
import { ImageCards } from '../../../../../../../components/form/image';
import Icon from '../../../../../../../components/common/icon';
import { Checkbox, Form, Switch } from 'antd';
import { interest, places } from '../../../../../../../helpers/utils';
import Button from '../../../../../../../components/common/button';
import CustomModal from '../../../../../../../components/common/custom-modal';
import FormField from '../../../../../../../components/form/input-field';
import LanguageMultiselect from './language-multiselect';

const AboutHost = ({ form, handleSubmit }) => {
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [modalType, setModalType] = useState()
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleSwitchToggle = () => {
        setIsSwitchOn(!isSwitchOn);
        if (!isSwitchOn) {
            places.map((item) => {
                console.log(item.value, "checked");
            });
        } else {
            places.map((item) => {
                console.log(item.value, "un-checked");
            });
        }
    };

    const aboutItemData = [
        { label: "Where I went to school:", value: "Khulna Zilla School", icon: "education", type: 'school_name', title: "Where did you go to school?", subtitle: "Whether it’s home school, high school, or trade school, name the school that made you who you are." },

        { label: "Where i live:", value: "Khulna, Bangladesh", icon: "icon-word", type: 'address', title: "Where do you live?", subtitle: "Whether it’s a city, a neighborhood, or a village, tell us where you call home." },

        { label: "Decade I was born:", value: "2000", icon: "education", type: 'decade', title: "Decade you were born?", subtitle: "Don’t worry, other people won’t be able to see your exact birthday." },

        { label: "I’b obsessed  with:", value: "", icon: "education", type: 'obsessed', title: "What are you obsessed with?", subtitle: "Share whatever you can’t get enough of—in a good way. Example: Baking rosemary focaccia." },

        { label: "My most useless skill:", value: "", icon: "education", type: 'skill', title: "What’s your most useless skill?", subtitle: 'Share a surprising but pointless talent you have. Example: Shuffling cards with one hand.' },

        { label: "I spend too much time", value: "", icon: "icon-watch", type: 'spend_time', title: "What do you spend too much time doing?", subtitle: "Share an activity or hobby you spend lots of free time on. Example: Watching cat videos or playing chess." },

        { label: "My work:", value: "UI/UX Designer", icon: "icon-work", type: 'my_work', title: 'What do you do for work?', subtitle: "Tell us what your profession is. If you don’t have a traditional job, tell us your life’s calling. Example: Nurse, parent to four kids, or retired surfer." },

        { label: "Languages I speak:", value: "English, Bangla", icon: "icon-language", type: 'languages', title: 'Languages you speak', subtitle: "" },
        { label: "My favorite song in high school:", value: "", icon: "education", type: "favorite_song", title: 'What was your favorite song in high school?', subtitle: 'However embarrassing, share the tune you listened to on repeat as a teenager.' },

        { label: "My fun fact", value: "", icon: "education", type: "fun_fact", title: 'What’s a fun fact about you?', subtitle: 'Share something unique or unexpected about you. Example: I was in a music video or I’m a juggler.' },
        { label: "My biography title would be", value: "", icon: "icon-bookmarks", type: 'biography', title: 'What would your biography title be?', subtitle: 'If someone wrote a book about your life, what would they call it? Example: Born to Roam or Chronicles of a Dog Mom.' },
        { label: "Pets", value: "", icon: "icon-pets", type: 'pets', title: 'Do you have any pets in your life?', subtitle: 'Share any pets you have and their names. Example: My calico cat Whiskers, or Leonardo my speedy turtle.' },
    ]

    const data = [
        { label: 'English' },
        { label: 'Bangla' },
        { label: 'Arabic' },
        { label: 'Urdu' },
        { label: 'French' },
    ];

    const handleEdit = (values) => {
        setOpen(true);
        setTitle(values.title)
        setSubtitle(values.subtitle)
        setModalType(values.type)
        form.setFieldsValue({

        })
    }

    const handleFinish = (values) => {
        handleSubmit(values);
        setOpen(false);
    };

    return (
        <div>
            <h1 className='text-main text-title_lg mb-10'>About host </h1>
            <ImageCards name="user_image" max={1} />
            <p className='text-main mt-5 mb-10 text-wrap'>
                The information you share will be used across Appstick to help other guests and Hosts get to know you.
            </p>
            <div className='about-setting'>
                {
                    aboutItemData.map((item, index) => (
                        <AboutItem
                            label={item.label}
                            value={item.value}
                            icon={item.icon}
                            key={index}
                            onEdit={() => handleEdit({ title: item.title, subtitle: item.subtitle, type: item.type })}
                        />
                    ))
                }
            </div>
            <div className='flex justify-between items-center mt-10 mb-4'>
                <h1 className='text-main text-title_lg'>
                    Where you’ve been
                </h1>
                <Form.Item name="is_destination" initialValue={false}>
                    <Switch checked={isSwitchOn} onChange={handleSwitchToggle} />
                </Form.Item>
            </div>
            <p className='text-main text-p2'>
                Choose whether other people can see all the places you’ve been on Appstick.
            </p>
            <PlaceCategory isSwitchOn={isSwitchOn} />

            <div className='flex flex-col mt-10 mb-4'>
                <h1 className='text-main text-title_lg'>
                    What You're into
                </h1>
                <p className='text-main'>
                    Find common ground with other guests and Hosts by adding interests to your profile.
                </p>
                <div className="flex flex-wrap gap-2.5 my-6">
                    {interest.map((item, index) => (
                        <div
                            className="about_interest flex items-center space-x-2.5"
                            key={index}
                        >
                            <Icon name={item.icon} />
                            <h3 className="group-hover:text-primary text-s text-main">{item.label}</h3>
                        </div>
                    ))}
                </div>
                <div
                    className='text-p text-main underline cursor-pointer w-fit'
                    onClick={() => handleEdit({ title: 'What are you into?', subtitle: 'Pick some interests you enjoy that you want to show on your profile.', type: 'intro' })}
                >
                    Edit Intro
                </div>
            </div>


            <CustomModal open={open} setOpen={setOpen} title={title} subTitle={subtitle}>
                <Form form={form} onFinish={handleFinish}>
                    <div className='my-2'>

                        {
                            modalType === "school_name" &&
                            <FormField label="" name="school_name" placeholder='Where I want to school:' />
                        }
                        {
                            modalType === "address" &&
                            <FormField label="" name="address" placeholder='Where I live:' />
                        }
                        {
                            modalType === "decade" &&
                            <div className='flex justify-between items-center'>
                                <div className='flex flex-col text-secondaryText'>
                                    <span>Show the decade i was born</span>
                                    <span>Born in the 90s</span>
                                </div>
                                <Form.Item name={"decade"} initialValue={false}>
                                    <Switch checkedChildren="" />
                                </Form.Item>
                            </div>
                        }
                        {
                            modalType === "obsessed" &&
                            <FormField label="" name="obsessed" placeholder='What are you obsessed with:' />
                        }
                        {
                            modalType === 'skill' &&
                            <FormField label="" name="skill" placeholder='What’s your most useless skill:' />
                        }
                        {
                            modalType === 'spend_time' &&
                            <FormField label="" name="spend_time" placeholder='What do you spend too much time doing:' />
                        }
                        {
                            modalType === 'my_work' &&
                            <FormField label="" name="my_work" placeholder='What do you do for work:' />
                        }
                        {
                            modalType === 'languages' &&
                            <div className='my-4 flex flex-col'>
                                <input type="text" className='px-4 py-2 rounded-[40px] border-2 border-secondary bg-secondary w-[80%]' placeholder='Search for a languages....' />
                                <div className='flex flex-col gap-4 mt-10 w-full'>
                                    <LanguageMultiselect name='languages' options={data} />
                                </div>
                            </div>
                        }
                        {
                            modalType === 'favorite_song' &&
                            <FormField label="" name="favorite_song" placeholder='What was your favorite song:' />
                        }
                        {
                            modalType === 'fun_fact' &&
                            <FormField label="" name="fun_fact" placeholder='What’s a fun fact about you:' />
                        }
                        {
                            modalType === 'biography' &&
                            <FormField label="" name="biography" placeholder='My biography title would be:' />
                        }
                        {
                            modalType === 'pets' &&
                            <FormField label="" name="pets" placeholder='Do you have any pets in your life:' />
                        }
                        {
                            modalType === 'intro' &&
                            <div className=''>
                                <div className="flex flex-wrap gap-2.5 my-2.5 ">
                                    <IntroMultiselect name='interests' options={interest} />
                                </div>
                            </div>
                        }
                        <div className="flex justify-between items-center">
                            <div onClick={() => setOpen(false)}
                                className='text-main text-p underline !cursor-pointer'>
                                Close
                            </div>
                            <Button type='submit' className="text-white">Save</Button>
                        </div>
                    </div>
                </Form>
            </CustomModal>
        </div>
    );
};

export default AboutHost;


interface AboutItemProps {
    label: string;
    value: string | undefined;
    icon?: string;
    onEdit: () => void;

}

const AboutItem = ({ label, value, icon, onEdit }: AboutItemProps) => {
    return (
        <div onClick={onEdit} className='about-item cursor-pointer'>
            <div className='about-body'>
                <div className='flex gap-1.5 items-center justify-center'>
                    <div className='flex gap-3 items-center justify-center'>
                        <Icon name={icon} />
                        <label className='about-label cursor-pointer'>{label}</label>
                    </div>
                    <span className=''>{value}</span>
                </div>
                <div className='edit-btn'>
                    <Icon name='arrow-right' />
                </div>
            </div>
        </div>
    );
};

interface PlaceCategoryProps {
    isSwitchOn: boolean;
}

const PlaceCategory = ({ isSwitchOn }: PlaceCategoryProps) => {
    return (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-6">
            {places.map((item, index) => (
                <div
                    className={`border p-5 rounded-md flex flex-col justify-center items-center gap-4 h-[120px] group ${isSwitchOn ? 'bg-primary-50 border-primary-500 hover:border text-main' : 'hover:bg-primary-50 hover:border-primary-500 hover:border'} cursor-pointer`}
                    key={index}
                >
                    <Icon name={item.icon} />
                    <div className="">
                        <h3 className={`group-hover:text-primary text-s ${isSwitchOn ? 'text-primary' : 'text-main'}`}>{item.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    )
}


export const IntroMultiselect = ({ name, options }) => {
    const Input = ({ value, onChange }: any) => {
        return (
            <div className="flex flex-wrap gap-2.5 my-2.5">
                {options.map((val, index) => {
                    const isSelected = value?.includes(val.label); // Check if the current item is selected
                    return (
                        <div
                            key={index}
                            role="button"
                            onClick={() => {
                                if (isSelected) {
                                    onChange(value.filter((v) => v !== val.label)); // Deselect if already selected
                                } else {
                                    onChange([...value, val.label]); // Select if not selected
                                }
                            }}
                            className={`flex items-center px-3 py-1.5 border rounded-full cursor-pointer duration-300
                                ${isSelected ? ' text-white border-black' : 'hover:border-black'}
                            `}
                        >
                            <div className="flex gap-x-2 items-center">
                                <Icon name={val.icon} />
                                <p className={`text-p1 capitalize text-black`}>
                                    {val.label}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <Form.Item name={name} initialValue={[]}>
            <Input />
        </Form.Item>
    );
};