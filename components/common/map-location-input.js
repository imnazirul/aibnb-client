"use client"

import {Autocomplete, GoogleMap, Marker} from "@react-google-maps/api";
import {Form, notification} from "antd";
import {Fragment, useEffect, useState} from "react";
import {MdOutlineMyLocation} from "react-icons/md";
import {useMapLoaded} from "../../helpers/map";

const LocationInput = ({ country, rules, className, name, label, onComplete }) => {
    const isGoogleMapLoaded = useMapLoaded()
    return (
        <>
            <Form.Item
                name={name}
                label={label}
                rules={rules}
                className={`mb-5 ${className}`}
                initialValue={{
                    name: '',
                    lat: '',
                    lng: ''
                }}
                
            >
                {isGoogleMapLoaded ? <MapSelector country={country} onComplete={onComplete} /> : <input/>}
            </Form.Item>

        </>
    )
}

export default LocationInput


export const MapSelector = ({ value, onChange, country, height = 300, onComplete }) => {
    const [zoom, setZoom] = useState(10);
    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523
    })

    useEffect(() => {
        if (!!country) {
            if (!value?.name) {
                let geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address: country }).then(({ results }) => {
                    if (results?.length > 0) {
                        const location = {
                            name: '',
                            lat: results[0]?.geometry?.location?.lat(),
                            lng: results[0]?.geometry?.location?.lng(),
                            country: results[0]?.address_components.find((c) => c.types.includes('country'))?.short_name,
                            country_long: results[0]?.address_components.find((c) => c.types.includes('country'))?.long_name,
                            city: results[0]?.address_components.find((c) => c.types.includes('locality'))?.long_name,
                        };
                        onChange(location);
                        onComplete && onComplete(location);
                    }
                })
            }
        }
    }, [country])

    useEffect(() => {
        if (!!value?.lat && !!value?.lng) {
            setCenter({
                lat: value?.lat,
                lng: value?.lng
            })
            setZoom(13)
        }

    }, [value])

    const [autocomplete, setAutocomplete] = useState(null);


    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                notification.error({
                    title: 'Error',
                    message: 'User denied the request for Geolocation.'
                })
                break;
            case error.POSITION_UNAVAILABLE:
                notification.error({
                    title: 'Error',
                    message: 'Location information is unavailable.'
                })
                break;
            case error.TIMEOUT:
                notification.error({
                    title: 'Error',
                    message: 'The request to get user location timed out.'
                })
                break;
            case error.UNKNOWN_ERROR:
                notification.error({
                    title: 'Error',
                    message: 'An unknown error occurred.'
                })
                break;
        }
    }

    const getLocation = location => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location }).then((response) => {
            if (response.results[0]) {
                const locationDetails = {
                    name: response.results[0].formatted_address,
                    lat: location.lat,
                    lng: location.lng,
                    country: response.results[0].address_components.find((c) => c.types.includes('country'))?.short_name,
                    country_long: response.results[0].address_components.find((c) => c.types.includes('country'))?.long_name,
                    city: response.results[0].address_components.find((c) => c.types.includes('locality'))?.long_name,
                };
                onChange(locationDetails);
                onComplete && onComplete(locationDetails);
            }
        });
    };
    return (

        <>

            <div className="relative">
                <Autocomplete
                    onLoad={setAutocomplete}
                    onPlaceChanged={() => {
                        let addressObject = autocomplete.getPlace();
                        const locationDetails = {
                            name: addressObject.formatted_address,
                            lat: addressObject.geometry.location.lat(),
                            lng: addressObject.geometry.location.lng(),
                            country: addressObject.address_components.find((c) => c.types.includes('country'))?.short_name,
                            country_long: addressObject.address_components.find((c) => c.types.includes('country'))?.long_name,
                            city: addressObject.address_components.find((c) => c.types.includes('locality'))?.long_name,
                        };
                        onChange(locationDetails);
                        onComplete && onComplete(locationDetails);
                    }}
                    children={<input
                        className="border w-full p-3 rounded-md !h-10 pl-2 !mb-4 !pr-10"
                        value={value?.name}
                        onChange={(e) => {
                            onChange({
                                ...value,
                                name: e.target.value,
                            })
                        }}
                    />}
                />
                <MdOutlineMyLocation
                    role="button"
                    onClick={() => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position) => {
                                let location = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                }
                                getLocation(location)
                            }, showError);
                        } else {
                            Notification.error({
                                title: 'Error',
                                message: 'Geolocation is not supported by this browser.'
                            })
                        }

                    }}
                    size={25}
                    className="absolute top-2 right-2 transform -translate-y-0 text-red-800" />
            </div>


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
                    }
                    getLocation(location)
                }} />}

            </GoogleMap>

        </>

    )
}