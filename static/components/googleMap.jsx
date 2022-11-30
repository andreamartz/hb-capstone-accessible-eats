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
                // InfoWindow is parent of MapMarker
                <InfoWindow key={business.yelp_id}
                    map={map}
                    infoOptions={{
                        content: `<h5><b>${business.place_name}</b></h5>`,
                        // position: {
                        //     lat: business.coordinates.latitude,
                        //     lng: business.coordinates.longitude,
                        // },
                        // pixelOffset: 200,
                    }}
                    markerOptions={{
                        position: {
                            lat: business.coordinates.latitude,
                            lng: business.coordinates.longitude,
                        },
                        map,
                        title: business.place_name
                    }}
                />
            ))}
        </div>
    );
}