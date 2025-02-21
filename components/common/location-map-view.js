"use client"

import {GoogleMap, Marker, StreetViewPanorama} from "@react-google-maps/api";
import {Form, notification} from "antd";
import {useEffect, useState} from "react";
import Icon from "./icon";
import {useMapLoaded} from "../../helpers/map";

const LocationMapView = ({country, rules, className, name, height}) => {
    const isGoogleMapLoaded = useMapLoaded()

    return (
        <>
            <Form.Item
                name={name}
                rules={rules}
                className={`mb-5 ${className}`}
                initialValue={{
                    name: '',
                    lat: '',
                    lng: ''
                }}
            >
                {isGoogleMapLoaded && <MapSelector country={country} height={height}/>}
            </Form.Item>
        </>
    );
}

export default LocationMapView;

export const MapSelector = ({value, onChange, country, height}) => {
    const [zoom, setZoom] = useState(10);
    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523
    });
    const [streetViewVisible, setStreetViewVisible] = useState(false);

    useEffect(() => {
        if (!!country) {
            if (!value?.name) {
                let geocoder = new google.maps.Geocoder();
                geocoder.geocode({address: country}).then(({results}) => {
                    if (results?.length > 0) {
                        onChange({
                            name: '',
                            lat: results[0]?.geometry?.location?.lat(),
                            lng: results[0]?.geometry?.location?.lng(),
                            country: results[0]?.address_components.find((c) => c.types.includes('country'))?.short_name,
                            country_long: results[0]?.address_components.find((c) => c.types.includes('country'))?.long_name,
                            city: results[0]?.address_components.find((c) => c.types.includes('locality'))?.long_name,
                        });
                    }
                });
            }
        }
    }, [country]);

    useEffect(() => {
        if (!!value?.lat && !!value?.lng) {
            setCenter({
                lat: value?.lat,
                lng: value?.lng
            });
            setZoom(13);
        }
    }, [value]);

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                notification.error({
                    title: 'Error',
                    message: 'User denied the request for Geolocation.'
                });
                break;
            case error.POSITION_UNAVAILABLE:
                notification.error({
                    title: 'Error',
                    message: 'Location information is unavailable.'
                });
                break;
            case error.TIMEOUT:
                notification.error({
                    title: 'Error',
                    message: 'The request to get user location timed out.'
                });
                break;
            case error.UNKNOWN_ERROR:
                notification.error({
                    title: 'Error',
                    message: 'An unknown error occurred.'
                });
                break;
        }
    }

    const getLocation = location => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({location}).then((response) => {
            if (response.results[0]) {
                onChange({
                    name: response.results[0].formatted_address,
                    lat: location.lat,
                    lng: location.lng,
                    country: response.results[0].address_components.find((c) => c.types.includes('country'))?.short_name,
                    country_long: response.results[0].address_components.find((c) => c.types.includes('country'))?.long_name,
                    city: response.results[0].address_components.find((c) => c.types.includes('locality'))?.long_name,
                });
            }
        });
    }

    return (
        <div className="relative">
            <button
                onClick={() => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                            let location = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            getLocation(location);
                        }, showError);
                    } else {
                        notification.error({
                            title: 'Error',
                            message: 'Geolocation is not supported by this browser.'
                        });
                    }
                }}
                className="absolute top-2 right-2 text-main font-bold px-4 py-3 rounded shadow-xl z-[999] bg-white"
            >
                Adjust
            </button>


            <button
                onClick={() => setStreetViewVisible(!streetViewVisible)}
                className="absolute top-20 right-2 text-main font-bold px-1 py-1.5 rounded shadow-xl z-[999] bg-white"
            >
                {streetViewVisible ? <Icon name="pegman-red"/> : <Icon name="pegman"/>}
            </button>

            <GoogleMap
                mapContainerStyle={{
                    width: "100%",
                    height: height,
                    borderRadius: 5,
                    marginBottom: 8
                }}
                className="rounded"
                center={center}
                zoom={zoom}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    fullscreenControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    zoomControlOptions: {
                        position: 9
                    }
                }}
            >
                {value?.lat && value?.lng && <Marker position={{
                    lat: value?.lat,
                    lng: value?.lng
                }} draggable={true} onDragEnd={(e) => {
                    let location = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                    };
                    getLocation(location);
                }}/>}

                {streetViewVisible && (
                    <StreetViewPanorama
                        position={center}
                        visible={true}
                        options={{
                            position: center,
                            pov: {heading: 100, pitch: 0},
                            zoom: 1
                        }}
                    />
                )}
            </GoogleMap>
        </div>
    );
}
