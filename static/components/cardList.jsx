"use strict";

/** Show a list of business cards.
 *   * by default, loads businesses for zip code 55438
 *   * loads max of 25 businesses from searched zip code
 */ 

const CardList = ({zipCode}) => {
    const [businesses, setBusinesses] = React.useState([]);

    React.useEffect(() => {
        async function getBusinessesOnMount() {
            const result = await Api.getBusinesses(zipCode);
            if (result) {
                setBusinesses(result);
            }
        }
        getBusinessesOnMount();
    }, []);

    if (!businesses) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            {businesses.map((business, idx) => (
                <div key={business.yelpId}>
                    <Card yelpId={business.yelpId} />
                    <Card business={business} />
                </div>
            ))}
        </div>
    );
}