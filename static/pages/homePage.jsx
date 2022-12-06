"use strict";

const HomePage = ({currentUser, 
    pagesToShow, 
    setPagesToShow,
    currentBusiness,
    setCurrentBusiness,
    businesses,
    setBusinesses,
    feedbackType,
    setFeedbackType,
    searchTerm,
    setSearchTerm,
    showComments,
    setShowComments,
}) => {
    const [loadMap, setLoadMap] = React.useState(false);
    const [options, setOptions] = React.useState({
        zoom: 11,
        // center is updated when cardList renders
        center: {},
    });

    React.useEffect(() => {
        // Get the list of businesses in the searched zip code
        async function getBusinessesOnMount() {
            setLoadMap(false);
            const result = await Api.getBusinesses(searchTerm);

            if (result) {
                setBusinesses(result);
            }
        }
        getBusinessesOnMount();
        return () => {
            setBusinesses([]);
        }
    }, [searchTerm]);

    React.useEffect(() => {
        // Get the coordinates for zip code - used to center the map
        async function getZipCodeCoordsOnMount() {
            setLoadMap(false);
            const newOptions = {...options};

            const result = await Api.getZipCodeCoords(searchTerm);

            if (result) {
                const {location} = result.results[0].geometry;
                newOptions.center = location;
                setOptions(newOptions);
                setLoadMap(true);
            }
        }
        getZipCodeCoordsOnMount();
        return () => {
            setLoadMap(false);
        }
    }, [searchTerm]);


    React.useEffect(() => {
        setShowComments(false);
    }, []);


    if (!businesses) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <SiteInfo />
            <SearchForm searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                currentUser={currentUser}
            />
            {loadMap && <GoogleMap options={options} 
                setOptions={setOptions} 
                businesses={businesses}
            />}
            <CardList businesses={businesses}
                pagesToShow={pagesToShow}
                setPagesToShow={setPagesToShow}
                currentBusiness={currentBusiness}
                setCurrentBusiness={setCurrentBusiness}
                feedbackType={feedbackType}
                setFeedbackType={setFeedbackType}
                showComments={showComments}
                setShowComments={setShowComments}
            />
        </>
    );
}