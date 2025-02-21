import React, { useEffect, useRef, useState } from "react";
// import Icon from "../../../components/common/icon";
// import { Checkbox, Collapse, Slider, Switch } from "antd";
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Banner from "../../../components/common/banner";
// import Categories from "../../../components/home/main/categories";
// import MainCard from "../../../components/common/card";
// import Image from "next/image";
// import LocationMap from "../../../components/common/location-map";


const Page: React.FC = () => {
    // const [type, setType] = useState<string>("");
    // const [open, setOpen] = useState<boolean>(false);
    // const [value, setValue] = useState([0, 
    //     50]);
    // const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    // console.log("🚀 ~ selectedAmenities:", selectedAmenities)

    // const handleCheckboxChange = (checkedValues: string[]) => {
    //     setSelectedAmenities(checkedValues);
    // }

    const roomsData = [
        {
            title: "Bedrooms",
            details: ["Any", "1", "2", "3", "4", "5", "6+"],
        },
        {
            title: "Beds",
            details: ["Any", "1", "2", "3", "4", "5", "6+"],
        },
        {
            title: "Garages",
            details: ["Any", "1", "2", "3", "4", "5", "6+"],
        },
    ];





    // const items = [
    //     {
    //         key: "1",
    //         label: <p className="text-c1 py-4">Price Range</p>,
    //         children: (
    //             <div className="border-b-[1px] border-[#EEE] pb-6">
    //                 <Image
    //                     src={"/shape.png"}
    //                     width={500}
    //                     height={500}
    //                     alt="range image"
    //                     className="w-full h-full"
    //                 />
    //                 <Slider
    //                     tooltip={{
    //                         open: true,
    //                         placement: "bottom",
    //                         formatter: (value) => `$ ${value}`,
    //                         overlayClassName: "!bg-white", 
    //                     }}
    //                     range
    //                     value={value}
    //                     onChange={setValue}
                       
    //                 />
    //             </div>
    //         ),
    //     },
    //     {
    //         key: "2",
    //         label: <h1 className="text-c1 py-4">Rooms and beds</h1>,
    //         children: (
    //             <div className="border-b-[1px] border-[#EEE] space-y-3 pb-4">
    //                 {roomsData.map((data, index) => (
    //                     <div key={index} className="">
    //                         <h1 className="text-p1 mb-2">{data?.title}</h1>
    //                         <div className="flex items-center justify-between text-ssb gap-2">
    //                             {data?.details?.map((_, i) => (
    //                                 <button
    //                                     className="hover:bg-primary-50 hover:border-primary text-primary duration-150 ease-in-out md:px-4 px-3 py-2 border rounded-[2px]"
    //                                     key={i}
    //                                 >
    //                                     {_}
    //                                 </button>
    //                             ))}
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         ),
    //     },
    //     {
    //         key: "3",
    //         label: <h1 className="text-c1 py-4">Amenities</h1>,
    //         children: (
    //             <div className="border-b-[1px] border-[#EEE] space-y-3 pb-4">
    //                 <Checkbox.Group
    //                     value={selectedAmenities}
    //                     onChange={handleCheckboxChange}
    //                     className="flex flex-col gap-3"
    //                 >
    //                     {amenities?.map((data, index) => (
    //                         <div key={index} className="">
    //                             <Checkbox value={data?.id} className="text-xs">
    //                                 {data?.label}
    //                             </Checkbox>
    //                         </div>
    //                     ))}
    //                 </Checkbox.Group>
    //                 <div className="flex items-center gap-1 cursor-pointer">
    //                     <h1 className="text-sb text-primary">See more</h1>
    //                     <Icon name="down-arrow" />
    //                 </div>
    //             </div>
    //         ),
    //     },
    //     {
    //         key: "4",
    //         label: <h1 className="text-c1 py-4">Booking options</h1>,
    //         children: (
    //             <div className="border-b-[1px] border-[#EEE] space-y-3 pb-4">
    //                 <div className="flex justify-between items-center">
    //                     <div className="">
    //                         <h1 className="text-p1">Instant Book</h1>
    //                         <p className="text-[12px]">
    //                             Listing you can book without Host approval
    //                         </p>
    //                     </div>
    //                     <Switch />
    //                 </div>
    //                 <div className="flex justify-between items-center">
    //                     <div className="">
    //                         <h1 className="text-p1">Instant Book</h1>
    //                         <p className="text-[12px]">
    //                             Listing you can book without Host approval
    //                         </p>
    //                     </div>
    //                     <Switch />
    //                 </div>
    //             </div>
    //         ),
    //     },
    //     {
    //         key: "5",
    //         label: <h1 className="text-c1 py-4">Top-tier stays</h1>,
    //         children: (
    //             <div className="flex items-center border-b-[1px] border-[#EEE] gap-4 pb-4">
    //                 <div className="border border-[#EEE] rounded-sm p-3">
    //                     <Icon name={"guest"} />
    //                     <h1 className="text-p1 mt-2 mb-1">Guest favorites</h1>
    //                     <p className="text-secondaryText text-s">
    //                         The most loved homes on Airbnb, according to guests
    //                     </p>
    //                 </div>
    //                 <div className="border border-[#EEE] rounded-sm p-3">
    //                     <Icon name={"guest"} />
    //                     <h1 className="text-p1 mt-2 mb-1">Guest favorites</h1>
    //                     <p className="text-secondaryText text-s">
    //                         The most loved homes on Airbnb, according to guests
    //                     </p>
    //                 </div>
    //             </div>
    //         ),
    //     },
    //     {
    //         key: "6",
    //         label: <h1 className="text-c1 py-4">Property type</h1>,
    //         children: (
    //             <div className="items-center border-b-[1px] border-[#EEE] pb-4">
    //                 <Checkbox.Group className="w-full grid grid-cols-2 gap-x-4 gap-y-3">
    //                     <div className="flex items-center justify-between border border-[#EEE] rounded-sm p-3 w-full">
    //                         <div className="flex items-center gap-2">
    //                             <Icon name={"guest"} />
    //                             <div className="text-p1">Home</div>
    //                         </div>
    //                         <Checkbox value="1"></Checkbox>
    //                     </div>
    //                     <div className="flex items-center justify-between border border-[#EEE] rounded-sm p-3 w-full">
    //                         <div className="flex items-center gap-2">
    //                             <Icon name={"guest"} />
    //                             <div className="text-p1">Apartment</div>
    //                         </div>
    //                         <Checkbox value="2"></Checkbox>
    //                     </div>
    //                     <div className="flex items-center justify-between border border-[#EEE] rounded-sm p-3 w-full">
    //                         <div className="flex items-center gap-2">
    //                             <Icon name={"guest"} />
    //                             <div className="text-p1">Guesthouse</div>
    //                         </div>
    //                         <Checkbox value="3"></Checkbox>
    //                     </div>
    //                     <div className="flex items-center justify-between border border-[#EEE] rounded-sm p-3 w-full">
    //                         <div className="flex items-center gap-2">
    //                             <Icon name={"guest"} />
    //                             <div className="text-p1">Hotel</div>
    //                         </div>
    //                         <Checkbox value="4"></Checkbox>
    //                     </div>
    //                 </Checkbox.Group>
    //             </div>
    //         ),
    //     },
    //     {
    //         key: "7",
    //         label: <h1 className="text-c1 py-4">Accessibility features</h1>,
    //         children: (
    //             <div className="border-b-[1px] border-[#EEE] space-y-3 pb-4">
    //                 {accessibility?.map((data, index) => (
    //                     <div key={index} className="">
    //                         <Checkbox.Group>
    //                             <Checkbox value={data?.value} className="text-xs">
    //                                 {data?.label}
    //                             </Checkbox>
    //                         </Checkbox.Group>
    //                     </div>
    //                 ))}
    //             </div>
    //         ),
    //     },
    //     {
    //         key: "8",
    //         label: <h1 className="text-c1 py-4">Host Language</h1>,
    //         children: (
    //             <div className="border-b-[1px] border-[#EEE] space-y-3 pb-4">
    //                 {hostLangudages?.map((data, index) => (
    //                     <div key={index} className="">
    //                         <Checkbox.Group>
    //                             <Checkbox value={data?.id} className="text-xs">
    //                                 {data?.label}
    //                             </Checkbox>
    //                         </Checkbox.Group>
    //                     </div>
    //                 ))}

    //             </div>
    //         ),
    //     },
    // ];

    return (
        <>
            <Banner tab1={"Stay"} tab2={"Experience"} bg={"/bg.jpg"} />
            {/* <div className="w-[95%] mx-auto mt-16  ">
                <div
                    className="flex items-star text-main relative gap-10
                "
                >
                    <div
                        className={`w-[30%] relative h-fit stays  2xl:w-[32.9%] xl:w-[54.6%] hidden xl:block bg-white shadow-price`}
                    >
                        <LocationMap
                            country="bangladesh"
                            name="location"
                            className="z-40"
                            rules={[
                                { required: true, message: "Please select pickup point" },
                            ]}
                        />
                        <div className="flex mt-5 items-center z-0 justify-between py-[15px] px-4 bg-secondary rounded-[2px]">
                            <h1 className="text-pt">Filter</h1>
                            <h1 className="text-ssb text-primary cursor-pointer">
                                Clear All
                            </h1>
                        </div>
                        <div className="mx-4 mt-6">
                            {type == "room" ? (
                                <div onClick={() => setType("")} className="cursor-pointer">
                                    {" "}
                                    <Icon name="up-arrow" />
                                </div>
                            ) : (
                                <div onClick={() => setType("room")} className="cursor-pointer">
                                    {" "}
                                    <Icon name="down-arrow" />
                                </div>
                            )}
                        </div>
                        {type == "room" && (
                            <div className="mt-4 mx-4">
                                <div className="flex items-center justify-between text-sb">
                                    <button className="px-6 py-3 hover:bg-primary-50 hover:text-primary hover:duration-150 hover:ease-in-out border border-primary bg-primary-50 text-primary hover:border-primary">
                                        Any type
                                    </button>
                                    <button>Room</button>
                                    <button>Entire home</button>
                                </div>
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={["1"]}
                                    expandIcon={({ isActive }) =>
                                        isActive ? (
                                            <MdKeyboardArrowUp className="text-c1 w-5 h-5 mt-[32px]" />
                                        ) : (
                                            <MdKeyboardArrowDown className="text-c1 w-5 h-5  mt-[32px]" />
                                        )
                                    }
                                    expandIconPosition="end"
                                    style={{
                                        background: "#fff",
                                    }}
                                    items={items}
                                />
                            </div>
                        )}
                    </div>
                    <div className="w-full relative ">
                        <div className="mx-auto flex  relative h-fit items-center w-full">
                            <div
                                onClick={() => setOpen(!open)}
                                className="w-[40px]  xl:hidden mr-4 h-[40px] rounded-full bg-secondary text-main flex items-center justify-center"
                            >
                                <Image
                                    src={"/controller.png"}
                                    width={500}
                                    height={200}
                                    alt="controller"
                                    className="w-[25px] h-[25px] rounded-full"
                                />
                            </div>
                            {open ? (
                                <div
                                    className={`w-full md:w-[450px]  xl:hidden bg-white ${open ? "scale-0" : "scale-100"
                                        }'} shadow-price absolute left-0 top-20 z-50 right-0 `}
                                >
                                    <LocationMap
                                        country="bangladesh"
                                        name="location"
                                        className=""
                                        rules={[
                                            { required: true, message: "Please select pickup point" },
                                        ]}
                                    />
                                    <div className="flex mt-5 items-center justify-between py-[15px] px-4 bg-secondary rounded-[2px]">
                                        <h1 className="text-pt">Filter</h1>
                                        <h1 className="text-ssb text-primary">Clear All</h1>
                                    </div>

                                    {!type && (
                                        <div className="mt-4 mx-4 h-[70vh] overflow-y-auto">
                                            <div className="flex items-center justify-between text-sb">
                                                <button className="px-6 py-3 hover:bg-primary-50 hover:text-primary hover:duration-150 hover:ease-in-out border border-primary bg-primary-50 text-primary hover:border-primary">
                                                    Any type
                                                </button>
                                                <button>Room</button>
                                                <button>Entire home</button>
                                            </div>
                                            <Collapse
                                                bordered={false}
                                                defaultActiveKey={["1"]}
                                                expandIcon={({ isActive }) =>
                                                    isActive ? (
                                                        <MdKeyboardArrowUp className="text-c1 w-5 h-5" />
                                                    ) : (
                                                        <MdKeyboardArrowDown className="text-c1 w-5 h-5" />
                                                    )
                                                }
                                                expandIconPosition="end"
                                                style={{
                                                    background: "#fff",
                                                }}
                                                items={items}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                ""
                            )}

                            <div className=" flex xl:gap-10 md:gap-5 gap-3  items-center  justify-center relative mt-2">
                                <div className="group category-item relative flex flex-col gap-2 items-center ">
                                    <img
                                        className="category-img"
                                        src={"/home.png"}
                                        alt="home icon"
                                    />
                                    <h1 className="category-title text-secondaryText font-semibold group-hover:text-primary">
                                        All
                                    </h1>
                                </div>
                                <div className="w-[1px] h-[40px] bg-[#C5C5C5] "></div>
                            </div>
                            <Categories
                                // mt=" gap-6 absolute left-[90px] md:w-[90%] 2xl:w-[95%] w-[75%] sm:w-[90%] "
                                // leftArrow={"hidden"}
                                // rightArrow={"hidden md:block"}
                            />
                        </div>
                        <div className=" mt-10">
                            <h3 className="text-css text-main">Over 1,000 places</h3>
                            <div className="mt-5 w-full grid 2xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((data, index) => (
                                    <MainCard key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div> 
            </div>*/}
        </>
    );
};

export default Page;
