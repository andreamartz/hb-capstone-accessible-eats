"use strict";

const HomePage = ({currentUser, 
    pagesToShow, 
    setPagesToShow,
    currentBusiness,
    setCurrentBusiness,
    businesses,
    setBusinesses
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
    React.useEffect(() => {
        async function getBusinessesOnMount() {
            setLoadMap(false);
            const result = await Api.getBusinesses(searchTerm);
            const newOptions = {...options};

            // TODO: find a better way to get the coordinates for the center of the map;
                // consider a way to get the coords for the zip code in question
            if (result) {
                // gets coords for the first result in the list of businesses
                const {latitude, longitude} = result[0].coordinates;

                newOptions.center = {
                    lat: latitude, 
                    lng: longitude
                }

                setBusinesses(result);
                setOptions(newOptions);
                setLoadMap(true);
            }
        }
        getBusinessesOnMount();
    }, [searchTerm]);


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
