import React from 'react';
import Icon from '../../../../components/common/icon';

interface Item {
    key: number;
    icon: React.ReactNode;
    name: string;
}

const About: React.FC = () => {
    const items: Item[] = [
        {
            key: 1,
            icon: <Icon name="pet" />,
            name: "Animals",
        },
        {
            key: 2,
            icon: <Icon name="board" />,
            name: "Board games",
        },
        {
            key: 3,
            icon: <Icon name="chess" />,
            name: "Chess",
        },
        {
            key: 4,
            icon: <Icon name="skating" />,
            name: "Figure skating",
        },
        {
            key: 5,
            icon: <Icon name="food" />,
            name: "Food",
        },
        {
            key: 6,
            icon: <Icon name="movie" />,
            name: "Movies",
        },
        {
            key: 7,
            icon: <Icon name="outdoor" />,
            name: "Outdoors",
        },
        {
            key: 8,
            icon: <Icon name="reading" />,
            name: "Reading",
        },
        {
            key: 9,
            icon: <Icon name="show-board" />,
            name: "Snowboarding",
        },
        {
            key: 10,
            icon: <Icon name="travel" />,
            name: "Travel",
        },
    ];

    return (
        <div className="container">
            <h2 className="text-title_sss my-10">Ask Rachel & Stu about</h2>
            <div className="flex gap-4 flex-wrap">
                {items.map(item => (
                    <div
                        key={item.key}
                        className="w-fit flex items-center gap-3 border h-[40px] rounded-[20px] px-3"
                    >
                        <p className="w-[20px] h-[20px]">{item.icon}</p>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;
