import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {getPlaceDetail} from "../../../../helpers/server";
import GoogleMap from 'google-maps-react-markers'
import Image from "next/image";
import {toAssetUrl} from "../../../../helpers/utils";


const Map = ({data, getData}) => {
    const [map, setMap] = useState(null)
    const [property, setProperty] = useState(null)
    const isPropertyActive = _id => property?._id === _id

    const isMapLoaded = map !== null

    const searchParams = useSearchParams()
    useEffect(() => {
        if (isMapLoaded) {
            if (!!searchParams.get('place_id')) {
                getPlaceDetail(searchParams.get('place_id')).then((res) => {
                    let addr = res.result
                    map.panTo({
                        lat: addr.geometry.location.lat,
                        lng: addr.geometry.location.lng
                    })
                    updateBounds(map.getBounds())
                })
            } else {
                map.setZoom(2)
                map.panTo({
                    lat: 29.2985,
                    lng: 15.5510
                })
                getData()
            }
        }
    }, [isMapLoaded]);


    const updateBounds = (bounds: any) => {
        let ne = bounds?.getNorthEast();
        let sw = bounds?.getSouthWest();
        getData({
            ne_lat: ne?.lat(),
            ne_lng: ne?.lng(),
            sw_lat: sw?.lat(),
            sw_lng: sw?.lng(),
        })
    }


    return (
        <GoogleMap
            apiKey={process.env.google_map}
            defaultCenter={{
                lat: 0,
                lng: 0
            }}
            defaultZoom={12}
            options={{
                disableDefaultUI: true,
                zoomControl: true,
                gestureHandling: 'greedy',
                clickableIcons: false,
            }}
            onGoogleApiLoaded={({map, maps}) => {
                setMap(map)
                maps.event.addListener(map, 'zoom_changed', () => {
                    updateBounds(map.getBounds())
                    setProperty(null)
                })
                maps.event.addListener(map, 'dragstart', () => {
                    updateBounds(map.getBounds())
                    setProperty(null)
                })
            }}
        >

            {data?.map((property: any, index: number) => (
                <Marker
                    key={index}
                    lat={property.location.lat}
                    lng={property.location.lng}
                    label={`$${property.price}`}
                    active={isPropertyActive(property._id)}
                    onClick={() => {
                        setProperty(property)
                    }}
                />
            ))}
            {!!property && (
                <Info
                    lat={property.location.lat}
                    lng={property.location.lng}
                    property={property}/>
            )}
        </GoogleMap>

    )
}


export default Map;

const Info = ({property}: any) => {
    return (
        <div
            role="button"
            className="info w-72 font-sans absolute bottom-2 -translate-x-1/2 z-30 shadow">
            <div className="bg-white rounded-md relative">
                <Image
                    src={toAssetUrl(property.images[0])}
                    alt=""
                    className="w-full h-40 object-cover rounded-r-md rounded-l-md"
                    width={400}
                    height={400}
                />
                <div className="p-3 flex flex-col gap-1 z-40">
                    <p className="text-sm font-semibold">{property?.title}</p>
                    <p className="text-sm">{property?.location?.name}</p>
                    <p className="font-medium text-base">{property?.price}</p>
                </div>
            </div>
            <div
                className="absolute w-4 border-b border-r border-gray-500 border-opacity-30 h-4 bg-white left-1/2 -translate-x-1/2 z-30 transform rotate-45 -bottom-2">
            </div>
        </div>
    )
}

const Marker = ({label, onClick, active}: any) => {
    return (
        <div
            onClick={onClick}
            role="button"
            className={`marker ${active ? 'active' : ''}`}>
            {label}
        </div>
    );
};
