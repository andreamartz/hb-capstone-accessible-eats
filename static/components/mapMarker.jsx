"use strict";

const MapMarker = ({markerOptions,
    openInfoWindow,
}) => {
    const [marker, setMarker] = React.useState();

    // put a marker on the map; remove it on unmount
    React.useEffect(() => {
        if (!marker) {
            const newMarker = new google.maps.Marker();
            newMarker.addListener('click', () => {
                openInfoWindow(newMarker);
            });
            setMarker(newMarker);
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