"use strict";

const MapMarker = ({markerOptions}) => {
    const [marker, setMarker] = React.useState();

    // put a marker on the map; remove it on unmount
    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    // set options on the marker
    React.useEffect(() => {
        if (marker) {
            marker.setOptions(markerOptions);
        }
    }, [marker, markerOptions]);

    return null;
}