import { getServerData } from "../../../../helpers/server";
import Details from "./details";
import PropertyPhotos from "./photos";
import Reviews from "./reviews";
import PropertyTitle from "./title";
import PropertyLocation from "./location";
import Host from "./host";
import ThingsKnow from "./things";
import Booking from "./booking";

const Property = async ({ params }) => {
    const data = await getServerData('/property/' + params?.uid, {
        cache: 'no-cache'
    })

    if(data?.error) {
        return <div>{data.msg}</div>
    }

    return (
        <>
            <div className="container">
                <div
                    id="booking_details"
                    className="hidden">
                    <Booking data={data?.data} />
                </div>
                <div
                    id="property_details"
                    className="max-w-[1120px] mx-auto relative">
                    <PropertyTitle data={data?.data} />
                    <PropertyPhotos data={data?.data} />
                    <Details data={data?.data} />
                    <Reviews />
                    <PropertyLocation data={data?.data} />
                    <Host data={data?.data} />
                    <ThingsKnow />
                </div>
            </div>

        </>
    )
}


export default Property;