"use strict";

/** Show a list of business cards.
 *   * by default, loads businesses for zip code 55438
 *   * loads max of 25 businesses from searched zip code
 */ 

const CardList = ({searchTerm, businesses, setBusinesses}) => {

    React.useEffect(() => {
        async function getBusinessesOnMount() {
            const result = await Api.getBusinesses(searchTerm);
            if (result) {
                setBusinesses(result);
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