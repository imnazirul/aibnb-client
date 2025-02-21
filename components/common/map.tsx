import {GoogleMap, Marker} from "@react-google-maps/api";
import {useMapLoaded} from "../../helpers/map";

const MapView = ({center, height = 200, zoom = 13, markers = []}) => {
    const isGoogleMapLoaded = useMapLoaded()


    return (
        <div>
            {isGoogleMapLoaded && (
                <GoogleMap
                    mapContainerStyle={{
                        width: "100%",
                        height: height,
                        borderRadius: 5,
                        marginBottom: 8
                    }}
                    center={center}
                    zoom={zoom}
                    options={{
                        disableDefaultUI: true,
                        zoomControl: false,
                        fullscreenControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        gestureHandling: "none"
                    }}
                >
                    {markers.map((marker, index) => (
                        <Marker key={index} position={marker}/>
                    ))}
                </GoogleMap>
            )}
        </div>
    )
}

export default MapView;