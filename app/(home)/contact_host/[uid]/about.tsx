import React from 'react';

const About = () => {
    return (
        <div className='mt-8 pb-8 border-b'>
            <h3 className='text-title_sss'>Most travelers ask about</h3>
            <div className='mt-7 flex flex-col'>
                <h3 className='text-p'>Price and availability</h3>
                <ul className='list-disc ps-5 flex flex-col gap-1 mt-1 '>
                    <li >Get a 10% discount on stays longer than a week.</li>
                    <li>Elisabeth’s home is available from Oct 1 – 6. Book soon.</li>
                    <li>Cancel up to 24 hours before check-in and get a full refund. After that, cancel before check-in and get a full refund, minus the first night and service fee.</li>
                </ul>
            </div>
        </div>
    );
};

export default About;