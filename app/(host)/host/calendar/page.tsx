"use client"

import Calender from "./calendar";
import {useEffect, useState} from "react";
import Settings from "./settings";
import {useFetch} from "../../../../helpers/hooks";
import {fetchPropertyCalendar, fetchPropertyElements} from "../../../../helpers/backend";
import {useUser} from "../../../../contexts/user";

const Page = () => {
    const {user} = useUser()
    const [dates, setDates] = useState([])
    const [data, getData, {loading}] = useFetch(fetchPropertyCalendar, {}, false)
    useEffect(() => {
        if (!!user?.properties?.[0]?.uid) {
            getData({
                uid: user?.properties?.[0]?.uid
            })
        }
    }, [user])


    return (
        <div className="flex">
            <div className="flex-grow border-r">
                <Calender
                    selected={dates}
                    setSelected={setDates}
                    data={data}
                    getData={getData}
                    loading={loading}
                />
            </div>
            <div className="availability-setting show">
                <Settings
                    selected={dates}
                    setSelected={setDates}
                    data={data}
                    getData={getData}
                />
            </div>
        </div>
    )


}
export default Page;



