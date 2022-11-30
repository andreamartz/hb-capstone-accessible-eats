"use strict";

const InfoWindow = ({map,
    infoOptions,
    markerOptions,
}) => {
    const [infoWindow, setInfoWindow] = React.useState();
    // need state that shows whether infoWindow is open
    const [infoWindowIsOpen, setInfoWindowIsOpen] = React.useState(false);

    // these are method names that need to be defined on InfoWindow:
        // infoWindow.close()
        // infoWindow.open()
    const openInfoWindow = (marker) => {
    //     setInfoWindowIsOpen(true);
        infoWindow.open({map, anchor: marker})
    }

    // const closeInfoWindow = () => {
    //     setInfoWindowIsOpen(false);
    // }

    // put an infoWindow on the map; remove it on unmount
    React.useEffect(() => {
        if (!infoWindow) {
            setInfoWindow(new window.google.maps.InfoWindow({...infoOptions}));
        }

    // // remove infoWindow on unmount
    // return () => {
    //     if (infoWindow) {
    //         infoWindow.setMap(null)
    //     }
    // }
    }, [infoWindow]);

    React.useEffect(() => {
        if (infoWindow) {
            infoWindow.setOptions(infoOptions);
        }
    }, [infoWindow]);

    return (
        <MapMarker map={map}
            markerOptions={markerOptions}
            infoWindow={infoWindow}
            infoWindowIsOpen={infoWindowIsOpen}
            openInfoWindow={openInfoWindow}
            // closeInfoWindow={closeInfoWindow}
        />
    );
}