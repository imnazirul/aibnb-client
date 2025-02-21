import React from 'react';

const PriceBreakdown = ({ data, selectedDates, guests, pets }) => {
    return (
        <>
            <div className="flex justify-between mb-2 text-secondaryText text-ssb">
                <span>${data?.per_night} x {selectedDates.length} nights</span>
                <span className="ml-1">${Number(data?.per_night * selectedDates.length)}</span>
            </div>
            {
                guests.adults > 0 && (
                    <div className="flex justify-between mb-2 text-secondaryText text-ssb">
                        <span>Extra guest fees</span>
                        <span>${Number(10 * guests.adults)}</span>
                    </div>
                )
            }
            {
                pets.pets > 0 && (
                    <div className="flex justify-between mb-2 text-secondaryText text-ssb">
                        <span>Pet fee</span>
                        <span>${Number(10 * pets.pets)}</span>
                    </div>
                )
            }
            <div className="flex justify-between mb-2 text-secondaryText text-ssb">
                <span>Special offer</span>
                <span>- $4</span>
            </div>
            <div className="flex justify-between mb-2 text-secondaryText text-ssb">
                <span>Cleaning fee</span>
                <span>$10</span>
            </div>
            <div className="flex justify-between mb-2 text-secondaryText text-ssb">
                <span>Guest service fee</span>
                <span>$4</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-sb mb-4">
                <span>Guest total</span>
                <span className='text-primary'>
                    ${Number(data?.per_night * selectedDates.length) + Number(10 * guests.adults) + Number(10 * pets.pets) - 4 + 10 + 4}
                </span>
            </div>
            <div className="flex justify-between text-sb">
                <span>You earn</span>
                <span className='text-primary'>
                    ${Number(data?.per_night * selectedDates.length) + Number(10 * guests.adults) + Number(10 * pets.pets) - 4 + 10 + 4 - 4}
                </span>
            </div>
        </>
    );
};

export default PriceBreakdown;