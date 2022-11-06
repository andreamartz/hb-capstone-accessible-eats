"use strict";

const HomePage = ({currentUser}) => {
    const [searchTerm, setSearchTerm] = React.useState('55438');
    const [businesses, setBusinesses] = React.useState([]);
    const [options, setOptions] = React.useState({
                zoom: 12,
                center: {lat: 42.3601, lng: -71.0589}
            });
     const [mapMarkers, setMapMarkers] = React.useState([]);

    return (
        <>

            <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <GoogleMap options={options} setOptions={setOptions} />
        </>
    );
}
            {/* TODO: uncomment and comment the two lines below once login is working */}
            {/* {currentUser && <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} */}
            {/* <CardList searchTerm={searchTerm}
                      businesses={businesses}
                      setBusinesses={setBusinesses} 
            /> */}