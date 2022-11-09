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
    const [loadMap, setLoadMap] = React.useState(false);

    const [options, setOptions] = React.useState({
        zoom: 10,
        // center is updated when cardsList renders
        center: {},
    });
    React.useEffect(() => {
        async function getBusinessesOnMount() {
            setLoadMap(false);
            const result = await Api.getBusinesses(searchTerm);

            if (result) {
                setBusinesses(result);
            }
        }
        getBusinessesOnMount();
    }, [searchTerm]);

    React.useEffect(() => {
        async function setMapOptionsOnMount() {
            setLoadMap(false);
            const newOptions = {...options};

            // TODO: find a better way to get the coordinates for the center of the map;
                // consider a way to get the coords for the zip code in question
            if (businesses) {
                // gets coords for the first result in the list of businesses
                const {latitude, longitude} = result[0].coordinates;

                newOptions.center = {
                    lat: latitude, 
                    lng: longitude
                }

                setOptions(newOptions);
                setLoadMap(true);
            }
        }
        setMapOptionsOnMount();
    }, [businesses]);


    return (
        <>

            <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {loadMap && <GoogleMap options={options} 
                setOptions={setOptions} 
                businesses={businesses}
            />}
            <CardList businesses={businesses}
                pagesToShow={pagesToShow}
                setPagesToShow={setPagesToShow}
                currentBusiness={currentBusiness}
                setCurrentBusiness={setCurrentBusiness}
            />
        </>
    );
}