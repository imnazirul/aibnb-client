import {useJsApiLoader} from "@react-google-maps/api";

export const useMapLoaded = () => {
    const { isLoaded: isGoogleMapLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.google_map,
        libraries: ["places"]
    });
    return isGoogleMapLoaded
}


export const getCenterPoints = (points) => {
    if (points.length === 0) {
        return {
            lat: 0,
            lng: 0
        }
    }
    const lat = points.reduce((acc, point) => acc + point.lat, 0) / points.length
    const lng = points.reduce((acc, point) => acc + point.lng, 0) / points.length
    return {
        lat,
        lng
    }
}