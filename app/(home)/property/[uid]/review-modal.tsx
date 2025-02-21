'use client'
import { Input, Modal } from "antd";
import Image from "next/image";
import Icon from "../../../../components/common/icon";
import Comments from "./comments";
import OverRating from "./rating";
import FormSelect from "../../../../components/form/select";

interface ReviewProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    guests: any;
    comments: any;
}

const ReviewModal = ({ open, setOpen, guests, comments }: ReviewProps) => {
    const priceList = [
        { _id: 1, name: 'Most Recent', value: 'mostRecent' },
        { _id: 2, name: 'Highest Rated', value: 'highestRated' },
        { _id: 3, name: 'Highest Rated', value: 'highestRated' },
    ]

    return (
        <>
            <Modal
                className="property-section lg:!w-[90%] xl:!w-[80%] 2xl:!w-[60%] !w-[90%] "
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                width="60%"
                style={{ top: 10 }}
            >
                <div className="flex lg:flex-row flex-col  lg:gap-10 gap-6 xl:gap-0 w-full pt-8">
                    <div className="lg:w-2/5 w-full xl:px-10 md:px-3  ">
                        <div className='border-b pb-6 w-full'>
                            <div className='guest_content'>
                                <Image src={"/p1.avif"} width={500} height={500} alt='logo' className='guest-img ' />
                                <h1 className='text-d1'>4.96</h1>
                                <Image src={"/p2.avif"} width={500} height={500} alt='logo' className='guest-img' />
                            </div>
                            <div className='guest-favorite'>
                                <h2 className='lg:text-title_sss md:text-cs text-h4 mb-2'>Guest favorite</h2>
                                <p className='lg:text-h5 md:text-p2 text-xxs text-center  text-[#6a6a6a]'>One of the most loved homes on Airbnb based on ratings, reviews, and reliability </p>
                            </div>
                        </div>
                        <OverRating guests={guests} />
                    </div>
                    <div className="lg:w-3/5 w-full overflow-hidden md:px-6">
                        <div className='flex justify-between overflow-y-auto'>
                            <h1 className='text-[26px] font-medium'>{comments.length} reviews</h1>
                            <FormSelect initialValue={priceList[0]} className='!border !w-[160px]  !py-3 !px-2 rounded-[40px] !hover:border-black' name={''} options={priceList} />
                        </div>
                        <Input prefix={<Icon name="search" />} placeholder="Search reviews" className='py-3 px-3 mt-2 mb-4 focus:outline-none rounded-[40px]' />
                        <div className='flex flex-col gap-8 lg:h-[700px] md:h-[500px] h-[400px] overflow-y-auto '>
                            <Comments comments={comments} />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default ReviewModal;