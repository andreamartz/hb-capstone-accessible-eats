"use strict";

/** Show a list of business cards.
 *   * by default, loads businesses for zip code 55438
 *   * loads max of 25 businesses from searched zip code
 */ 

const CardList = ({searchTerm, 
    businesses, 
    setBusinesses, 
    options, 
    setOptions,
    loadMap,
    setLoadMap
}) => {

    React.useEffect(() => {
        async function getBusinessesOnMount() {
            setLoadMap(false);
            const result = await Api.getBusinesses(searchTerm);
            const newOptions = {...options};
            console.log("NEW OPTIONS - OLD: ", newOptions);
            console.log("OPTIONS FROM CARD LIST: ", options);
            if (result) {

                console.log("COORDS: ", result[0].coordinates);
                const {latitude, longitude} = result[0].coordinates;
                console.log("LATITUDE: ", latitude);
                console.log("LONGITUDE: ", longitude);

                newOptions.center = {
                    lat: latitude, 
                    lng: longitude
                }

                console.log("NEW OPTIONS: ", newOptions);

                setBusinesses(result);
                setOptions(newOptions);
                setLoadMap(true);
            }
        }
        getBusinessesOnMount();
    }, [searchTerm]);

    if (!businesses) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            {businesses.map((business, idx) => (
                <Card key={business.yelpId} business={business} />
            ))}
        </>
    );
}