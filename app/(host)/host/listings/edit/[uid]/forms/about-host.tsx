import React, { useState } from 'react';
import { ImageCards, RoundedImageCards } from '../../../../../../../components/form/image';
import Icon from '../../../../../../../components/common/icon';
import CustomModal from '../../../../../../../components/common/custom-modal';
import { Checkbox, Form, Switch } from 'antd';
import FormField from '../../../../../../../components/form/input-field';
import LanguageMultiselect from '../../../edit-old/[uid]/forms/language-multiselect';
import Button from '../../../../../../../components/common/button';
import { interest } from '../../../../../../../helpers/utils';

const PropertyAboutHostEdit = ({ data, form, handleSubmit }) => {
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [modalType, setModalType] = useState()
    const [open, setOpen] = useState(false);

    const aboutItemData = [
        { label: "Where I went to school:", icon: "education", type: 'school_name', title: "Where did you go to school?", subtitle: "Whether it’s home school, high school, or trade school, name the school that made you who you are.", value: data?.owner?.school_name },

        { label: "Where i live:", icon: "icon-word", type: 'address', title: "Where do you live?", subtitle: "Whether it’s a city, a neighborhood, or a village, tell us where you call home.", value: data?.owner?.address },

        { label: "Decade I was born:", icon: "education", type: 'decade', title: "Decade you were born?", subtitle: "Don’t worry, other people won’t be able to see your exact birthday.", value: data?.owner?.decade },

        { label: "I’b obsessed  with:", icon: "education", type: 'obsessed', title: "What are you obsessed with?", subtitle: "Share whatever you can’t get enough of—in a good way. Example: Baking rosemary focaccia.", value: data?.owner?.obsessed },

        { label: "My most useless skill:", icon: "education", type: 'skill', title: "What’s your most useless skill?", subtitle: 'Share a surprising but pointless talent you have. Example: Shuffling cards with one hand.', value: data?.owner?.skill },

        { label: "I spend too much time", icon: "icon-watch", type: 'spend_time', title: "What do you spend too much time doing?", subtitle: "Share an activity or hobby you spend lots of free time on. Example: Watching cat videos or playing chess.", value: data?.owner?.spend_time },

        { label: "My work:", icon: "icon-work", type: 'my_work', title: 'What do you do for work?', subtitle: "Tell us what your profession is. If you don’t have a traditional job, tell us your life’s calling. Example: Nurse, parent to four kids, or retired surfer.", value: data?.owner?.my_work },

        { label: "Languages I speak:", icon: "icon-language", type: 'languages', title: 'Languages you speak', subtitle: "", value: data?.owner?.languages },
        { label: "My favorite song in high school:", icon: "education", type: "favorite_song", title: 'What was your favorite song in high school?', subtitle: 'However embarrassing, share the tune you listened to on repeat as a teenager.', value: data?.owner?.favorite_song },

        { label: "My fun fact", icon: "education", type: "fun_fact", title: 'What’s a fun fact about you?', subtitle: 'Share something unique or unexpected about you. Example: I was in a music video or I’m a juggler.', value: data?.owner?.fun_fact },
        { label: "My biography title would be", icon: "icon-bookmarks", type: 'biography', title: 'What would your biography title be?', subtitle: 'If someone wrote a book about your life, what would they call it? Example: Born to Roam or Chronicles of a Dog Mom.', value: data?.owner?.biography },
        { label: "Pets", icon: "icon-pets", type: 'pets', title: 'Do you have any pets in your life?', subtitle: 'Share any pets you have and their names. Example: My calico cat Whiskers, or Leonardo my speedy turtle.', value: data?.owner?.pets },
    ]

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
        <div className='my-5 md:my-5 px-36'>
            <h3 className='text-title_lg text-main capitalize mb-8'>About the Host</h3>
            <RoundedImageCards name="user_image" max={1} />
            <p className='text-main mt-5 mb-10 text-wrap text-secondary3'>
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
                            <h3 className="text-s text-main">{item.label}</h3>
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
                            <Button type='submit' className="text-white !bg-black">Save</Button>
                        </div>
                    </div>
                </Form>
            </CustomModal>

        </div>
    );
};

export default PropertyAboutHostEdit;



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


export const IntroMultiselect = ({ name, options }) => {
    const Input = ({ value, onChange }: any) => {
        return (
            <div className="flex flex-wrap gap-2.5 my-2.5 ">
                {options.map((val, index) => (
                    <div key={index}
                        role="button"
                        onClick={() => {
                            if (value?.includes(val.label)) {
                                onChange(value.filter((v) => v !== val.label))
                            } else {
                                onChange([...value, val.label])
                            }
                        }}
                        className="flex items-center px-3 py-1.5 border rounded-full cursor-pointer">
                        <div className="flex gap-x-2 items-center">
                            <Icon name={val.icon} />
                            <p className='text-p1 text-main capitalize'>{val.label}</p>
                            <div className="flex-1" />
                            <div className="gap-x-6">
                                <Checkbox
                                    checked={value?.includes(val.label)}
                                    className='text-secondaryText text-p3' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <Form.Item name={name} initialValue={[]}>
            <Input />
        </Form.Item>
    )
}