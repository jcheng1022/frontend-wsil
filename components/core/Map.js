'use client';

import React, {useCallback, useState} from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};



function MyComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })
    const center = {
        lat: 45.7128,
        lng: -74.0060
    };
    const [map, setMap] = useState(null)
    const [zoom, setZoom] = useState(5)
    const {coords, setCoords} = useState(center)
    // const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to New York City

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        const idk = bounds.getCenter();
        console.log(idk, 22)

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={coords}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            {/*<></>*/}
            <Marker position={{   lat: coords?.lat,
                lng: coords?.lng }} />
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)
