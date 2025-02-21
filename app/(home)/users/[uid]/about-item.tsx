
import React from 'react';
import Icon from '../../../../components/common/icon';

interface AboutItemProps {
    items: Array<{
        key: number;
        icon: JSX.Element;
        name: string;
    }>;
}

const AboutItem: React.FC = () => {
    const items: AboutItemProps['items'] = [
        {
            key: 1,
            icon: <Icon name={'music-player'} />,
            name: "Favorite song in high school: Anything by Muse!",
        },
        {
            key: 2,
            icon: <Icon name={'clock'} />,
            name: "I spend too much time: Piano, reading and painting!",
        },
        {
            key: 3,
            icon: <Icon name={'masic'} />,
            name: "Most useless skill: Epic yo-yo player.",
        },
        {
            key: 4,
            icon: <Icon name={'multy-star'} />,
            name: "What makes my home unique: Full of love & attention to details.",
        },
        {
            key: 5,
            icon: <Icon name={'pet'} />,
            name: "Pets: Remi and Hank (our fur babies)",
        },
        {
            key: 6,
            icon: <Icon name={'education'} />,
            name: "Where I went to school: Southern England.",
        },
        {
            key: 7,
            icon: <Icon name={'brass-band'} />,
            name: "Fun fact: I played in a Brass Band for 15 years!",
        },
        {
            key: 8,
            icon: <Icon name={'love'} />,
            name: "I'm obsessed with: Piano & Brunch!",
        },
        {
            key: 9,
            icon: <Icon name={'biography'} />,
            name: "My biography title: Love, Martinis & fashion.",
        },
        {
            key: 10,
            icon: <Icon name={'english'} />,
            name: "Speaks English and Thai",
        },
        {
            key: 11,
            icon: <Icon name={'live'} />,
            name: "Lives in Surat Thani, Thailand",
        },
        {
            key: 12,
            icon: <Icon name={'guests'} />,
            name: "For guests, I always: Support, kindness & accessibility",
        },
        {
            key: 13,
            icon: <Icon name={'media'} />,
            name: "What's for breakfast: Eggs Benedict hands down!",
        },
    ];

    return (
        <div>
            <h1 className='text-xlBold'>About Rachel & Stu</h1>
            <div className='mt-8 grid md:grid-cols-2 gap-x-5 gap-y-2'>
                {items.map((item) => (
                    <div
                        key={item.key}
                        className="flex gap-3 pb-6 text-p2 h-fit"
                    >
                        <span className='w-[25px] h-[25px] flex items-center'>
                            {item.icon}
                        </span>
                        <p className='text-p2'>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutItem;
