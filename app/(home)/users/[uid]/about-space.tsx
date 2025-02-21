"use client";
import React, { useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

interface About {
    space: string;
    content: string;
}

interface Data {
    about: About;
}

const UserAboutSpace: React.FC = () => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const data: Data = {
        about: {
            space: `The bungalow has 1 bathroom and 1 double bed, 1 single bed 
                    the view is perfect and wonderful`,
            content: `
                Hey guys! <br/>
                We're husband and wife team Rachel and Stu along with our little boy Gabriel (6) and we have lived on this beautiful Island for over 8 years now. We love and cherish this little paradise we call home and feel really settled, content and happy here. <br/><br/>

                We know the Island like the back of our hand so can happily help you with some great Island tips and secret spots whether you are into Yoga, Partying, food, fitness or just chilling! <br/><br/>

                We want you to know that you are supported by us  when you come to stay and we'll take care of you like you're part of the family. We ensure our guests full privacy with the peace of mind knowing we're here if ever needed. <br/><br/>

                We also live in Hin Kong and for us, this is our home and a truly beautiful part of the Island. 
                We have a gorgeous and cheeky little Boy (Gabriel) who was born here. We like the quiet life, I love reading and painting, Stu loves woodwork and carpentry and Gabriel loves anything space or dinosaur related!! (and chicken and sticky rice!) We spend most weekends at the beach or at a pool, the odd date night (when we're lucky enough!!) but most of the time we just chill out as a family or hang out with our friends having dinners or BBQs with the kids. <br/><br/>

                We love to host and more importantly love meeting all our awesome guests from around the World! It's really cool to meet so many different people and to hear about their lives. <br/><br/>

                We hope you enjoy the Island as much as we do and look forward to hearing from you. 
                Namaste and with love
                Rachel and Stu and little Gabriel xx
            `
        }
    };

 
    const truncateText = (text: string, wordLimit: number): string => {
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    };

    return (
        <div className='border-secondary mt-10'>
            <div className='my-8'>
                <p
                    className='text-wrap text-p3 pr-6'
                    dangerouslySetInnerHTML={{ __html: showMore ? data.about.content : truncateText(data.about.content, 158) }}
                />
                <button
                    type='button'
                    className="flex items-center gap-1 mt-6"
                    onClick={() => setShowMore(!showMore)}
                >
                    <span className='underline text-p'>{showMore ? 'Read Less' : 'Read More'}</span>
                </button>
            </div>
        </div>
    );
};

export default UserAboutSpace;
