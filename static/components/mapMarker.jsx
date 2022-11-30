"use strict";

const MapMarker = ({map,
    markerOptions,
    infoWindow,
    infoWIndowIsOpen,
    openInfoWindow,
    // closeInfoWindow,
}) => {
    const [marker, setMarker] = React.useState();
    // props should include the open & close methods for the infoWindow
    // need handleHover fcn that sets the open/closed state for the infoWindow
        // may need two fcns
        // onMouseIn (onMouseOver??)
        // onMouseOut

    // const onMouseOver = (evt) => {
    //     openInfoWindow();
    // }

    // const onMouseOut = (evt) => {
    //     closeInfoWindow();
    // }


    // put a marker on the map; remove it on unmount
    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
            // infoWindow.open({map, anchor: marker});
            // infoWindow.open(map, marker);
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
            // infoWindow.open({map, anchor: marker});
            openInfoWindow(marker);
        }
    }, [marker, markerOptions]);


    return null;
}