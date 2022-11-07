"use strict";

const HomePage = ({currentUser, 
    pagesToShow, 
    setPagesToShow,
    currentBusiness,
    setCurrentBusiness
}) => {
    const [searchTerm, setSearchTerm] = React.useState('55438');
    const [businesses, setBusinesses] = React.useState([]);
    const [loadMap, setLoadMap] = React.useState(false);

    // const [options, setOptions] = React.useState({
    //             zoom: 10,
    //             center: {lat: 44.8242, lng: -93.3742}
    //         });
    const [options, setOptions] = React.useState({
        zoom: 10,
        // center is updated when cardsList renders
        center: {},
    });
     const [mapMarkers, setMapMarkers] = React.useState([]);

    return (
        <>

            <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {loadMap && <GoogleMap options={options} 
                setOptions={setOptions} 
                businesses={businesses}
            />}
            <CardList searchTerm={searchTerm}
                businesses={businesses}
                setBusinesses={setBusinesses}
                loadMap={loadMap}
                setLoadMap={setLoadMap}
                options={options}
                setOptions={setOptions}
                pagesToShow={pagesToShow}
                setPagesToShow={setPagesToShow}
                currentBusiness={currentBusiness}
                setCurrentBusiness={setCurrentBusiness}
            />
        </>
    );
}
            {/* TODO: uncomment and comment the two lines below once login is working */}
            {/* {currentUser && <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} */}
