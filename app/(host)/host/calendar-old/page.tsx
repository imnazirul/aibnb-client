"use client";
import { Calendar, ConfigProvider, Drawer, Dropdown } from "antd";
import en_GB from "antd/lib/locale/en_GB";
import CalendarSidebar from "./calendarSidebar";
import { RiArrowDownSLine } from "react-icons/ri";
import dayjs from "dayjs";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AvailabilitySidebar from "./availabilitySidebar";
import SelectDaySidebar from "./selectDaySidebar";
import { HiMenuAlt1 } from "react-icons/hi";

const Page = () => {
    const [month, setMonth] = useState(dayjs())
    const [tab, setTab] = useState('pricing')
    const [selectedDates, setSelectedDates] = useState<{ dateStr: string, date: any }[]>([]);
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const showDrawerBottom = () => {
        setOpenDrawer(true);
    }

    const onCloseBottom = () => {
        setOpenDrawer(false);
        setSelectedDates([])
    }

    const data: any = {
        per_night: 20,
        weekend_price: 10,
    }

    const handleDateClick = (value: any) => {
        const dateStr = value.format('MMM DD');
        const date = value
        setSelectedDates(prevSelectedDates => {
            if (prevSelectedDates.some(selectedDate => selectedDate.dateStr === dateStr)) {
                return prevSelectedDates.filter(selectedDate => selectedDate.dateStr !== dateStr);
            } else {
                return [...prevSelectedDates, { dateStr, date }];
            }
        });
        setTab("selectDay")
        if (window.innerWidth < 768) {
            showDrawerBottom();
        }
    }

    return (
        <div className="container mx-auto flex h-[calc(100vh-20vh)]">
            <div className="calender-side-bar text-main slim-scroll">
                {
                    tab != 'selectDay' &&
                    <div className="bg-secondary flex justify-center items-center py-1.5">
                        <button onClick={() => setTab('pricing')} className={`px-6 py-3 hover:bg-primary-50 hover:text-primary hover:duration-150 hover:ease-in-out text-ssb ${tab === 'pricing' ? 'border border-primary bg-primary-50 text-primary' : 'border border-secondary hover:border-primary'}`}>Pricing</button>
                        <button onClick={() => setTab('availability')} className={`px-6 py-3 hover:bg-primary-50 hover:text-primary hover:duration-150 hover:ease-in-out text-ssb ${tab === 'availability' ? 'border border-primary bg-primary-50 text-primary' : 'border border-secondary hover:border-primary'}`}>Availability</button>
                    </div>
                }

                <>
                    {tab === 'pricing' && <CalendarSidebar />}
                    {tab === 'availability' && <AvailabilitySidebar />}
                    {tab === 'selectDay' && <SelectDaySidebar onCloseBottom={onCloseBottom} selectedDates={selectedDates} setSelectedDates={setSelectedDates} setTab={setTab} />}

                </>
            </div>

            <div className="text-3xl mx-2 md:my-0 block md:hidden absolute">
                <HiMenuAlt1 className="cursor-pointer text-black" onClick={showDrawer} />
            </div>

            <Drawer placement="left" title="" onClose={onClose} open={open} width={300}>
                {
                    tab != 'selectDay' &&
                    <div className="bg-secondary flex justify-center items-center py-1.5">
                        <button onClick={() => setTab('pricing')} className={`px-6 py-3 hover:bg-primary-50 hover:text-primary hover:duration-150 hover:ease-in-out text-ssb ${tab === 'pricing' ? 'border border-primary bg-primary-50 text-primary' : 'border border-secondary hover:border-primary'}`}>Pricing</button>
                        <button onClick={() => setTab('availability')} className={`px-6 py-3 hover:bg-primary-50 hover:text-primary hover:duration-150 hover:ease-in-out text-ssb ${tab === 'availability' ? 'border border-primary bg-primary-50 text-primary' : 'border border-secondary hover:border-primary'}`}>Availability</button>
                    </div>
                }

                <>
                    {tab === 'pricing' && <CalendarSidebar />}
                    {tab === 'availability' && <AvailabilitySidebar />}
                </>
            </Drawer>

            <Drawer placement="bottom" title="" onClose={onCloseBottom} open={openDrawer} width={300}>
                <>
                    {tab === 'selectDay' && <SelectDaySidebar onCloseBottom={onCloseBottom} selectedDates={selectedDates} setSelectedDates={setSelectedDates} setTab={setTab} />}
                </>
            </Drawer>



            <ConfigProvider
                locale={en_GB}
                theme={{
                    components: {
                        Calendar: {
                            fontFamily: "sans",
                            miniContentHeight: 30,
                        },
                    },
                }}>
                <div className="md:pl-6 pl-0">
                    <Calendar
                        onChange={setMonth}
                        value={month}
                        className="main-calender"
                        fullCellRender={(value) => {
                            let isCurrentMonth = value.format('MM') === month.format('MM');
                            let isPastDate = value.isBefore(dayjs(), 'day');
                            let isWeekend = value.day() === 0 || value.day() === 6;
                            let isSelected = selectedDates.some(selectedDate => selectedDate.dateStr === value.format('MMM DD'));
                            return (
                                <>
                                    {isCurrentMonth && <>
                                        <div className={`lg:h-[125px] md:h-[110px] h-[100px] main-cell md:p-4 p-2.5 ${value.isSame(dayjs(), 'day') ? 'active' : ''} ${value.isSame(month, 'month') ? '' : 'opacity-50'} ${isPastDate ? 'cursor-not-allowed' : ''} ${isSelected ? 'bg-webBorder border' : ''}`}
                                            onClick={!isPastDate ? () => handleDateClick(value) : undefined}
                                        >
                                            <div className="flex items-start flex-col justify-between h-full">
                                                <p className="text-left text-main text-p2">{value?.format('D')}</p>
                                                {
                                                    !isWeekend && data?.per_night &&
                                                    <p className="text-left !text-[#414141] !text-p">${data?.per_night}</p>
                                                }
                                                {
                                                    isWeekend && data?.weekend_price &&
                                                    <p className="text-left !text-[#414141] !text-p">${data?.weekend_price}</p>
                                                }
                                            </div>
                                        </div>
                                    </>}
                                </>
                            )
                        }}
                        headerRender={({ value, type, onChange, onTypeChange }) => {
                            return (
                                <div className="flex flex-col md:flex-row justify-between items-center">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h2 className="text-main text-title_md ml-3 md:ml-0">{value.format('MMMM')} {value?.format('YYYY')}</h2>
                                        <div className="flex gap-2">
                                            <button
                                                role="button"
                                                onClick={() => {
                                                    onChange(value.add(-1, 'month'))
                                                }}>
                                                <FiChevronLeft size={20} />
                                            </button>
                                            <button
                                                role="button"
                                                className="disabled:opacity-50"
                                                onClick={() => {
                                                    onChange(value.add(1, 'month'))
                                                }}
                                            >
                                                <FiChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Dropdown menu={{
                                            items: [
                                                {
                                                    key: '1',
                                                    label: "Hotel Relax",
                                                },
                                            ]
                                        }}
                                            overlayStyle={{ width: 180, borderRadius: 4 }}
                                            placement="bottomRight"
                                            className="border-secondary border-2 rounded-sm">
                                            <div className="flex px-4 py-2 gap-2 justify-between items-center cursor-pointer">
                                                <img src="/106.png" alt="" className="w-[30px] h-[30px] rounded-sm object-cover" />
                                                <span className="text-sb">Hotel Relax</span>
                                                <RiArrowDownSLine className="w-6 h-6" />
                                            </div>
                                        </Dropdown>
                                        <Dropdown menu={{
                                            items: [
                                                {
                                                    key: '1',
                                                    label: <>
                                                        <span className="text-sb">Month</span>
                                                    </>
                                                },
                                                {
                                                    key: '2',
                                                    label: <>
                                                        <span className="text-sb">Year</span>
                                                    </>
                                                },
                                            ]
                                        }}
                                            overlayStyle={{ width: 110, borderRadius: 4 }}
                                            placement="bottomRight"
                                            className="border-secondary border-2 rounded-sm">
                                            <div className="flex px-4 py-2 gap-2 justify-between items-center cursor-pointer">
                                                <span className="text-sb">Month</span>
                                                <RiArrowDownSLine className="w-6 h-6" />
                                            </div>
                                        </Dropdown>
                                    </div>
                                </div>
                            )
                        }}
                    />
                </div>


            </ConfigProvider>
        </div>

    )
}

export default Page;