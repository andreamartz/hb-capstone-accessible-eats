"use strict";

const GoogleMap = ({options, setOptions}) => {
    const mapRef = React.useRef(null);
    const [map, setMap] = React.useState();

    React.useEffect(() => {
        if (mapRef.current && !map) {
            console.log("OPTIONS FROM MAP: ", options);
            setMap(new window.google.maps.Map(mapRef.current, {options}));
        }
    }, [mapRef, map]);

    return (
        <>
            {/* <Wrapper apiKey={MAPS_JS_API_KEY}> */}
                <p>Map component</p>
                <div id='map' ref={mapRef} />

                {/* <Map id='map' ref={mapRef}>
                    <MapMarker />
                </Map> */}
            {/* </Wrapper> */}
        </>
    );
}