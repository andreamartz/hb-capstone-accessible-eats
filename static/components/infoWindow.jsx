"use strict";

const InfoWindow = ({map,
    infoOptions,
    markerOptions,
}) => {
    const infoWindow = React.useRef(null);

    const openInfoWindow = (marker) => {
        infoWindow.current?.open({map, anchor: marker});
    }

    // put an infoWindow on the map
    React.useEffect(() => {
        //infoWindow.current = new window.google.maps
        if (!infoWindow.current) {
            infoWindow.current = new window.google.maps.InfoWindow({...infoOptions});
        }
        infoWindow.current.setOptions(infoOptions);
    }, []);

    return (
        <MapMarker map={map}
            markerOptions={markerOptions}
            openInfoWindow={openInfoWindow}
        />
    );
}