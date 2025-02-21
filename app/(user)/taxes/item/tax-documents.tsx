import React from 'react';
import Button from '../../../../components/common/button';
import Icon from '../../../../components/common/icon';


const TaxDocuments = () => {
    return (
        <div className='text-[#222222]'>
            <p className='text-p2'>Tax documents required for filing taxes are available to review and download here.</p>
            <p className='text-p2'>You can also file taxes using detailed earnings info, available in the <span className='text-p1 underline'>earnings summary.</span></p>
            <div className="border-t mt-10">
                {
                    [1, 2, 3, 4].map((item, index) => <div key={index} className="py-12 border-b">
                        <h2 className='text-title_sss mb-2'>{2020 + index}</h2>
                        <p className='text-p2 text-[#6A6A6A]'>No tax document issued.</p>
                    </div>)
                }
            </div>

            <div className="mt-12">
                <h2 className='text-title_sss mb-1'>Need help?</h2>
                <p className='text-p2'>Get answers to questions about taxes in our Help Center.</p>
            </div>

        </div>
    );
};

export default TaxDocuments;