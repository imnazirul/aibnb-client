import React from "react";

interface CardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}


const Card = ({children, title, className}: CardProps) => {
    return (
        <div className={`bg-white rounded-md ${className}`}>
            {title && <h3 className="text-xl font-semibold px-6 py-3 border-b">{title}</h3>}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}

export default Card;