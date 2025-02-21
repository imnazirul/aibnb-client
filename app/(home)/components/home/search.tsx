"use client"

import React, {useEffect, useRef, useState} from "react";
import {FiMapPin, FiSearch, FiX} from "react-icons/fi";
import SearchCounter from "../../../../components/home/search/search-counter";
import {useOutsideClick} from "../../../../helpers/hooks";
import {TabButton} from "../../../../components/home/search/search-bar";
import DateRangeSelector from "./date_range";
import dayjs from "dayjs";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {addQueryToUrl} from "../../../../helpers/utils";
import {searchLocation} from "../../../../helpers/server";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

const Search = () => {
    const [isStuck, setIsStuck] = useState(false);
    const onScroll = () => {
        setIsStuck(window.scrollY > 0);
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);


    return (
        <>
            <MainSearch isStuck={isStuck}/>
        </>
    )
}

export default Search;


export const MainSearch = ({isStuck}) => {
    const router = useRouter()
    const ref = useRef()
    useOutsideClick(ref, () => {
        setTab('')
    })

    useEffect(() => {
        if (isStuck) {
            document.querySelector('.sticky-tabs')?.classList.add('stuck');
            document.querySelector('.search-area')?.classList.add('stuck');
        } else {
            document.querySelector('.sticky-tabs')?.classList.remove('stuck');
            document.querySelector('.search-area')?.classList.remove('stuck');
        }
    }, [isStuck]);

    const [tab, setTab] = useState('')
    const [search, setSearch] = useState<any>({
        adults: 0,
        children: 0,
        infants: 0
    })
    const [filter, setFilter] = useState('')
    useEffect(() => {
        let searchParams = new URLSearchParams(window.location.search)
        setSearch({
            search: searchParams.get('search') || '',
            location: searchParams.get('location') || '',
            from: !!searchParams.get('from') ? dayjs(searchParams.get('from'), 'YYYY-MM-DD').toISOString() || '' : '',
            to: !!searchParams.get('to') ? dayjs(searchParams.get('to'), 'YYYY-MM-DD').toISOString() || '' : '',
            adults: parseInt(searchParams.get('adults')) || 0,
            children: parseInt(searchParams.get('children')) || 0,
            infants: parseInt(searchParams.get('infants')) || 0,
        })
    }, [])

    const onSearch = () => {
        document.querySelector('#main-search')?.classList.remove('mobile')
        setTab('')
        if (isStuck) {
            document.querySelector('.search-backdrop')?.classList.remove('show')
            document.querySelector('#main-search')?.classList.remove('show')
            window.scrollTo({
                top: 10,
            })
        }
        router.push(addQueryToUrl({
            ...search,
            from: !!search.from ? dayjs(search.from).format('YYYY-MM-DD') : '',
            to: !!search.to ? dayjs(search.to).format('YYYY-MM-DD') : '',
            place_id: search.place_id || '',
            search: '',
            tab: ''
        }, '/search'), {
            scroll: false
        })
    }

    const guests = search.adults + search.children

    return (
        <>
            <div
                role="button"
                onClick={() => {
                    document.querySelector('.search-backdrop')?.classList.add('show')
                    document.querySelector('#main-search')?.classList.add('mobile')
                }}
                className="md:hidden sticky top-0 p-4 w-screen">
                <div className="border flex items-center gap-4 rounded-full px-4 py-2.5">
                    <FiSearch size={24}/>
                    <div>
                        <p className="font-medium">Where to?</p>
                        <p className="text-xs text-gray-700">Any Where • Any Week • Add guests</p>
                    </div>
                </div>
            </div>
            <div
                onClick={() => {
                    document.querySelector('.search-backdrop')?.classList.remove('show')
                    document.querySelector('#main-search')?.classList.remove('show')
                }}
                className="search-backdrop"/>

            <div id="main-search" className={`search-area ${isStuck ? 'stuck' : ''}`}>
                <div>
                    <div className="search-area" ref={ref}>
                        <div
                            role="button"
                            onClick={() => {
                                document.querySelector('.search-backdrop')?.classList.remove('show')
                                document.querySelector('#main-search')?.classList.remove('mobile')
                            }}
                            className="md:hidden mb-2 -mt-1 z-50">
                            <FiX size={24}/>
                        </div>
                        <div
                            className="flex border border-gray-200 rounded-full bg-gray-100">
                            <SearchTab
                                title="Where"
                                type="input"
                                value={search.search || search.location || ''}
                                onChange={(e) => {
                                    if (!e.target.value) {
                                        search.location = ''
                                    }
                                    setSearch({
                                        ...search,
                                        search: e.target.value
                                    })
                                    clearTimeout(window['timer']);
                                    window['timer'] = setTimeout(() => {
                                        setFilter(e.target.value)
                                    }, 500);
                                }}
                                onClick={() => setTab('where')}
                                placeholder="Search Destination"
                                active={tab === 'where'}
                            />
                            <MiniTab title="Any Place" isStuck={isStuck}/>
                            <Divider/>
                            <SearchTab
                                title="Check In"
                                type="text"
                                value={search?.from ? dayjs(search.from).format('Do, MMM') : 'Add dates'}
                                onClick={() => setTab('from')}
                                active={tab === 'from'}
                            />
                            <Divider/>
                            <SearchTab
                                title="Check Out"
                                type="text"
                                value={search?.to ? dayjs(search.to).format('Do, MMM') : 'Add dates'}
                                onClick={() => setTab('to')}
                                active={tab === 'to'}
                            />
                            <MiniTab title="Any Week" isStuck={isStuck}/>
                            <Divider/>
                            <div className="flex-grow search-main">
                                <div
                                    className={`md:pl-5 pr-2.5 py-2.5 hover:bg-white h-full rounded-full ${tab === 'guest' ? 'bg-white' : ''}`}>
                                    <div className="flex justify-between gap-2">
                                        <div
                                            onClick={() => setTab('guest')}
                                            className="flex-grow"
                                            role="button"
                                        >
                                            <p className="text-xs font-medium mb-1">Who</p>
                                            <p className="text-xs text-gray-400 leading-none truncate max-w-[100px]">
                                                {guests > 0 && (
                                                    <>
                                                        {guests} guests
                                                        {search.infants > 0 && `, ${search.infants} infants`}
                                                    </>
                                                )}
                                                {guests === 0 && 'Add guests'}
                                            </p>
                                        </div>
                                        <div
                                            onClick={onSearch}
                                            role="button"
                                            className="bg-primary p-2.5 hidden md:flex justify-center items-center rounded-full text-white">
                                            <FiSearch size={18}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <MiniTab title="Any Guests" isStuck={isStuck}/>
                            <div
                                role={isStuck ? 'button' : ''}
                                onClick={() => {
                                    if (isStuck) {
                                        document.querySelector('.search-backdrop')?.classList.add('show')
                                        document.querySelector('#main-search')?.classList.add('show')
                                    }
                                }}
                                className="p-1.5 search-stuck">
                                <div className="bg-primary p-2 rounded-full text-white">
                                    <FiSearch size={14}/>
                                </div>
                            </div>
                        </div>
                        <div className="search-main">
                            <LocationTab
                                show={tab === 'where'}
                                setTab={setTab}
                                search={search}
                                setSearch={setSearch}
                                filter={filter}
                                setFilter={setFilter}
                            />
                            <DateTab
                                show={tab === 'from' || tab === 'to'}
                                setTab={setTab}
                                search={search}
                                setSearch={setSearch}
                            />
                            <GuestTab
                                show={tab === 'guest'}
                                search={search}
                                setSearch={setSearch}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:hidden absolute bottom-0 w-full flex justify-between items-center p-4">
                    <a
                        role="button"
                        onClick={() => {
                            setSearch({
                                adults: 0,
                                children: 0,
                                infants: 0
                            })
                        }}

                        className="text-red-500">Clear All</a>
                    <div
                        onClick={onSearch}
                        role="button"
                        className="bg-primary py-2.5 px-4 flex gap-2 justify-center items-center rounded-full text-white">
                        <FiSearch size={18}/>
                        Search
                    </div>
                </div>

            </div>
        </>
    )
}


interface SearchTabProps {
    title: string;
    type: string;
    value?: string;
    placeholder?: string;
    onClick?: () => void;
    onChange?: (e: any) => void;
    active?: boolean;
}


const SearchTab = ({title, type, value, placeholder, onChange, onClick, active}: SearchTabProps) => {
    return (
        <>
            <div className="flex-grow search-main overflow-hidden">
                <div
                    role="button"
                    onClick={onClick}
                    className={`md:pl-6 pr-4 pt-2.5 hover:bg-white h-full rounded-full ${active ? 'bg-white' : ''}`}>
                    <p className="text-xs font-medium">{title}</p>
                    {type == 'text' && (
                        <p className="text-xs text-gray-400 leading-none mt-[5px]">{value}</p>
                    )}
                    {type == 'input' && (
                        <input
                            value={value}
                            onChange={onChange}
                            className="outline-0 bg-transparent text-sm h-[12px] text-gray-400 placeholder:text-gray-400"
                            placeholder={placeholder}
                        />
                    )}
                </div>
            </div>
        </>
    )
}


const LocationTab = ({show, setTab: setSearchTab, search, setSearch, filter, setFilter}) => {
    const [history, setHistory] = useState([])
    const [predictions, setPredictions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const history = localStorage.getItem('search_history')
        if (history) {
            setHistory(JSON.parse(history))
        }
    }, [])
    const pushHistory = (location) => {
        if (history.find((item) => item.place_id === location.place_id)) {
            return
        }
        setHistory([
            ...history,
            location
        ])
        localStorage.setItem('search_history', JSON.stringify([
            ...history,
            location
        ]))
    }


    useEffect(() => {
        if (!!filter) {
            setLoading(true)
            searchLocation(filter).then((res) => {
                setPredictions(res.predictions)
                setLoading(false)
            })
        }
    }, [filter])

    const locations = [
        {
            name: 'Anywhere',
            img: '/img/world.png',
            value: 'anywhere'
        },
        {
            name: 'Middle East',
            img: '/img/middle-east.png',
            value: 'middle-east'
        }
    ]
    return (
        <>
            <div
                style={{zIndex: 9999999}}
                className={`absolute top-28 md:top-20 left-4 right-4 md:right-auto p-2 bg-white shadow-md border rounded-2xl ${show ? 'block' : 'hidden'}`}>
                {!!filter && (
                    <div className="w-full sm:min-w-[400px]">
                        {loading && (
                            <>
                                {Array(5).fill(5).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-100 rounded">
                                        <div className="bg-gray-200 p-2.5 rounded-full">
                                            <FiMapPin size={18} height={80}/>
                                        </div>
                                        <SkeletonTheme baseColor="#f4f4f4" highlightColor="#f9f9f9">
                                            <Skeleton width={300}/>
                                        </SkeletonTheme>
                                    </div>
                                ))}
                            </>
                        )}
                        {!loading && predictions.map((prediction, index) => (
                            <div
                                key={index}
                                role="button"
                                onClick={() => {
                                    console.log(prediction)
                                    pushHistory({
                                        place_id: prediction.place_id,
                                        description: prediction.description
                                    })
                                    setSearch({
                                        ...search,
                                        search: prediction.description,
                                        place_id: prediction.place_id,
                                        location: prediction.description
                                    })
                                    setSearchTab('from')
                                }}
                                className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-100 rounded">
                                <div className="bg-gray-200 p-2.5 rounded-full">
                                    <FiMapPin size={18}/>
                                </div>
                                <p className="text-xs text-gray-700">{prediction.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {!!filter || (
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className={`w-[350px] max-h-[35vh] md:max-h-[500px] overflow-y-auto slim-scroll ${history?.length > 0 ? 'block' : 'hidden'}`}>
                            <p className="font-medium px-4 py-2.5">Recent Searches</p>
                            {history.map((location, index) => (
                                <div
                                    key={index}
                                    role="button"
                                    onClick={() => {
                                        setSearch({
                                            ...search,
                                            search: location.description,
                                            place_id: location.place_id,
                                            location: location.description
                                        })
                                        setSearchTab('from')
                                    }}
                                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-100 rounded">
                                    <div className="bg-gray-200 p-2.5 rounded-full">
                                        <FiMapPin size={18}/>
                                    </div>
                                    <p className="text-xs text-gray-700">{location?.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="w-[350px]">
                            <div className="grid gap-6 grid-cols-2 p-4">
                                {locations.map((location, index) => (
                                    <div
                                        key={index}
                                        role="button"
                                        onClick={() => {
                                            setSearch({
                                                ...search,
                                                location: location.name
                                            })
                                            setSearchTab('from')
                                        }}
                                        className="flex flex-col gap-4 items-center">
                                        <Image
                                            className="h-40 w-40 rounded"
                                            src={location.img}
                                            height={400}
                                            width={400}
                                            alt=""/>
                                        <p className="text-gray-700">{location.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}


const Divider = () => {
    return (
        <div className="py-3">
            <hr className="h-full border-r border-gray-200"/>
        </div>
    )
}

const MiniTab = ({title, isStuck}) => {
    return (
        <div
            role={isStuck ? 'button' : ''}
            onClick={() => {
                if (isStuck) {
                    document.querySelector('.search-backdrop')?.classList.add('show')
                    document.querySelector('#main-search')?.classList.add('show')
                }
            }}
            className="search-stuck flex-grow">
            <div className="pl-8 pr-4 flex items-center h-full">
                <p className="text-xs text-gray-400 leading-none">{title}</p>
            </div>
        </div>
    )
}


const DateTab = ({show, setTab: setSearchTab, search, setSearch}) => {
    const [tab, setTab] = useState('dates')
    return (
        <div
            style={{zIndex: 9999999}}
            className={`absolute top-28 md:top-20 left-2 md:left-4 right-2 md:right-4 md:p-6 bg-white shadow-md border rounded-2xl ${show ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center pt-4 md:pt-0">
                <div className="bg-secondary rounded-full flex justify-center items-center cursor-pointer">
                    <TabButton dateTab={tab} setDateTab={setTab} name={'Dates'}/>
                    <TabButton dateTab={tab} setDateTab={setTab} name={'Month'}/>
                    <TabButton dateTab={tab} setDateTab={setTab} name={'Flexible'}/>
                </div>
            </div>
            {tab === 'dates' && (
                <div className="max-h-[calc(100vh-280px)] md:max-h-fit p-2 md:p-0 overflow-y-auto slim-scroll">
                    <DateRangeSelector
                        from={search.from}
                        to={search.to}
                        onChange={({from, to}) => {
                            setSearchTab(!!to ? 'to' : 'from')
                            setSearch({
                                ...search,
                                from,
                                to
                            })
                        }}
                    />
                </div>
            )}
            {tab === 'month' && (
                <>
                    <h1 className='text-center mt-6 text-c1 text-main'>Select Your Flexible Month</h1>
                    <p className="text-primary text-c1 text-center mt-4">
                        {/*{currentMonthName}, {currentYear} To {endMonthName}, {endThisYear}*/}
                    </p>
                    <div className="mt-6">
                        <div className="grid md:grid-cols-6 grid-cols-2 gap-4">
                            {/*{months.map((month) => (*/}
                            {/*    <div*/}
                            {/*        key={month}*/}
                            {/*        className={`h-[46px] border flex items-center justify-center rounded-sm cursor-pointer ${selectedMonths === month ? 'bg-primary' : ''}`}*/}
                            {/*        onClick={() => handleSelectMonth(month)}*/}
                            {/*    >*/}
                            {/*                                            <span*/}
                            {/*                                                className={`text-ssb text-center ${selectedMonths === month ? 'text-white' : 'text-main'}`}>*/}
                            {/*                                                {month} Month{month !== 1 ? 's' : ''}*/}
                            {/*                                            </span>*/}
                            {/*    </div>*/}
                            {/*))}*/}
                        </div>
                    </div>
                </>
            )}
            <div className="md:hidden flex justify-between items-center p-4">
                <button
                    onClick={() => {
                        setSearchTab('guest')
                    }}
                    className="py-2">
                    Skip
                </button>
                <button
                    onClick={() => {
                        setSearchTab('guest')
                    }}
                    className="bg-primary text-white rounded-full px-6 py-2">
                    Next
                </button>
            </div>
        </div>
    )
}


const GuestTab = ({
                      show, search, setSearch
                  }) => {
    return (
        <div
            style={{zIndex: 9999999}}
            className={`absolute left-4 md:left-auto top-[320px] md:top-20 md:right-0 p-6 bg-white shadow-md border rounded-2xl ${show ? 'block' : 'hidden'}`}>
            <div>
                <div className="flex gap-8 py-4 border-b border-gray-200 border-opacity-70">
                    <div className="flex-grow">
                        <h2 className="font-medium">Adults</h2>
                        <p className="text-sm leading-4 text-secondaryText">
                            Ages 13 or above
                        </p>
                    </div>
                    <SearchCounter
                        value={search.adults}
                        maxValue={16}
                        onIncrease={() =>
                            setSearch({
                                ...search,
                                adults: search.adults + 1
                            })
                        }
                        onDecrease={() =>
                            setSearch({
                                ...search,
                                adults: search.adults - 1
                            })
                        }
                    />
                </div>
            </div>
            <div>
                <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                    <div className="flex-grow">
                        <h2 className="font-medium">Children</h2>
                        <p className="text-sm leading-4 text-secondaryText">Ages 2-12</p>
                    </div>
                    <SearchCounter
                        value={search.children}
                        maxValue={5}
                        onIncrease={() =>
                            setSearch({
                                ...search,
                                children: search.children + 1
                            })
                        }
                        onDecrease={() =>
                            setSearch({
                                ...search,
                                children: search.children - 1
                            })
                        }
                    />
                </div>
            </div>
            <div>
                <div className="flex py-4">
                    <div className="flex-grow">
                        <h2 className="font-medium">Infants</h2>
                        <p className="text-sm leading-4 text-secondaryText">Under 2</p>
                    </div>
                    <SearchCounter
                        value={search.infants}
                        maxValue={5}
                        onIncrease={() =>
                            setSearch({
                                ...search,
                                infants: search.infants + 1
                            })
                        }
                        onDecrease={() =>
                            setSearch({
                                ...search,
                                infants: search.infants - 1
                            })
                        }
                    />
                </div>
            </div>
        </div>
    )
}


