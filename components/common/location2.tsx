import {Autocomplete, GoogleMap, Marker} from "@react-google-maps/api";
import {Form, notification} from "antd";
import React, {useEffect, useState} from "react";
import {MdOutlineMyLocation} from "react-icons/md";
import {useMapLoaded} from "../../helpers/map";

interface LocationInput2Props {
    country: string;
    rules?: any[];
    className?: string;
    name: string;
    label?: string;
    showMap: boolean;
    value?: any;
    onChange?: (value: any) => void;
}

const LocationInput2: React.FC<LocationInput2Props> = ({
    country,
    rules,
    className,
    name,
    showMap,
    label,
    value,
    onChange,
}) => {
    const isGoogleMapLoaded = useMapLoaded()

    return (
        <Form.Item
            name={name}
            rules={rules}
            className={`mb-5 ${className}`}
            initialValue={{
                name: '',
                lat: '',
                lng: ''
            }}
            required
            label={label}
        >
            {isGoogleMapLoaded ? (
                <MapSelector
                    country={country}
                    showMap={showMap}
                    value={value}
                    onChange={onChange}
                />
            ) : <input className="hidden"/> }
        </Form.Item>
    );
}

export default LocationInput2;

interface MapSelectorProps {
    value?: any;
    onChange?: (value: any) => void;
    country: string;
    height?: number;
    showMap: boolean;
}

export const MapSelector: React.FC<MapSelectorProps> = ({
    value,
    onChange,
    country,
    height = 300,
    showMap
}) => {
    const [zoom, setZoom] = useState(10);
    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523
    });

    useEffect(() => {
        if (country) {
            if (!value?.name) {
                let geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address: country }).then(({ results }) => {
                    if (results?.length > 0) {
                        onChange?.({
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
        if (value?.lat && value?.lng) {
            setCenter({
                lat: value?.lat,
                lng: value?.lng
            });
            setZoom(13);
        }
    }, [value]);

    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    function showError(error: GeolocationPositionError) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                notification.error({
                    message: 'User denied the request for Geolocation.'
                });
                break;
            case error.POSITION_UNAVAILABLE:
                notification.error({
                    message: 'Location information is unavailable.'
                });
                break;
            case error.TIMEOUT:
                notification.error({
                    message: 'The request to get user location timed out.'
                });
                break;
            // case error.UNKNOWN_ERROR:
            //     notification.error({
            //         message: 'An unknown error occurred.'
            //     });
            //     break;
        }
    }

    const getLocation = (location: { lat: number, lng: number }) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location }).then((response) => {
            if (response.results[0]) {
                onChange?.({
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
        <>
            <div className="relative">
                <Autocomplete
                    onLoad={setAutocomplete}
                    onPlaceChanged={() => {
                        let addressObject = autocomplete?.getPlace();
                        if (addressObject) {
                            onChange?.({
                                name: addressObject?.formatted_address,
                                lat: addressObject?.geometry?.location?.lat(),
                                lng: addressObject?.geometry?.location?.lng(),
                                country: addressObject?.address_components.find((c) => c.types.includes('country'))?.short_name,
                                country_long: addressObject?.address_components.find((c) => c.types.includes('country'))?.long_name,
                                city: addressObject?.address_components.find((c) => c.types.includes('locality'))?.long_name,
                            });
                        }
                    }}
                >
                    <input
                        className="border-none focus:outline-none mt-2 w-full rounded-full bg-gray-100 focus:bg-white h-10 pl-2 !pr-10"
                        value={value?.name}
                        onChange={(e) => {
                            onChange?.({
                                ...value,
                                name: e.target.value,
                            });
                        }}
                    />
                </Autocomplete>
                <MdOutlineMyLocation
                    role="button"
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
                                message: 'Geolocation is not supported by this browser.'
                            });
                        }
                    }}
                    size={18}
                    className="absolute top-2/3 right-3 transform -translate-y-1/2 text-gray-800"
                />
            </div>

            {showMap && (
                <GoogleMap
                    mapContainerStyle={{
                        width: "100%",
                        height: height,
                        borderRadius: 5,
                        marginBottom: 8,
                        marginTop: 8
                    }}
                    // className="rounded mt-4"
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
                    {value?.lat && value?.lng && (
                        <Marker
                            position={{
                                lat: value?.lat,
                                lng: value?.lng
                            }}
                            draggable
                            onDragEnd={(e) => {
                                let location = {
                                    lat: e.latLng?.lat(),
                                    lng: e.latLng?.lng()
                                };
                                getLocation(location);
                            }}
                        />
                    )}
                </GoogleMap>
            )}
        </>
    );
}
