"use strict";

const GoogleMap = ({options, setOptions, businesses}) => {
    const mapRef = React.useRef(null);
    const [map, setMap] = React.useState();

    React.useEffect(() => {
        if (mapRef.current && !map) {
            // console.log("OPTIONS FROM MAP: ", options);
            setMap(new window.google.maps.Map(mapRef.current, {options}));
        }
    }, [mapRef, map]);

    return (
        <div id='map' ref={mapRef}>
            {businesses.map((business, idx) => (
                <MapMarker key={business.yelp_id} 
                    markerOptions={{
                        position: {
                            lat: business.coordinates.latitude,
                            lng: business.coordinates.longitude,
                        },
                        map,
                    }}
                />
            ))}
        </div>
    );
}