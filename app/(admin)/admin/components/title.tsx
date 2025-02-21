import React from "react";

interface PageTitleProps {
    title: string
    suffix?: React.ReactNode
}

const PageTitle = ({title, suffix}: PageTitleProps) => {

    return (
        <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold">{title}</h3>
            <div className="flex items-center gap-4">
                {suffix}
            </div>
        </div>
    );

}

export default PageTitle;