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
    // const [searchTerm, setSearchTerm] = React.useState('55438');
    const [loadMap, setLoadMap] = React.useState(false);
    const [options, setOptions] = React.useState({
        zoom: 10,
        // center is updated when cardList renders
        center: {},
    });
    console.log("BUSINESSES FROM HOME PAGE BEFORE AJAX CALL: ", businesses)
    React.useEffect(() => {
        async function getBusinessesOnMount() {
            setLoadMap(false);
            const result = await Api.getBusinesses(searchTerm);

            if (result) {
                setBusinesses(result);
            }
        }
        getBusinessesOnMount();
        // added cleanup fcn to fix bug where
        return () => {
            console.log("HOMEPAGE CLEANUP RUNNING");
            setBusinesses([]);
        }
    }, [searchTerm]);

    React.useEffect(() => {
        async function setMapOptionsOnMount() {
            setLoadMap(false);
            const newOptions = {...options};

            // TODO: find a better way to get the coordinates for the center of the map;
                // consider a way to get the coords for the zip code in question
            // if there is a first business in the array
            if (businesses[0]) {
                // gets coords for the first result in the list of businesses
                console.log("BUS[0]: ", businesses[0]);
                const {latitude, longitude} = businesses[0]?.coordinates;

                newOptions.center = {
                    lat: latitude, 
                    lng: longitude
                }

                setOptions(newOptions);
                setLoadMap(true);
            }
        }
        setMapOptionsOnMount();
        return () => {
            setLoadMap(false);
        }
    }, [businesses]);
    
    React.useEffect(() => {
        setShowComments(false);
    }, []);

    console.log("CURRENT USER (from homepage): ", currentUser);
    // console.log("SHOW COMMENTS FROM HOMEPAGE: ", showComments);


    if (!businesses) {
        return <h1>Loading...</h1>
    }
    return (
        <>
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