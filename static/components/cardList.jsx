"use strict";

/** Show a list of business cards.
 *   * by default, loads businesses for zip code 55438
 *   * loads max of 25 businesses from searched zip code
 */ 

const CardList = ({
    businesses, 
    pagesToShow, 
    setPagesToShow,
    currentBusiness,
    setCurrentBusiness
}) => {

    if (!businesses) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            {businesses.map((business) => (
                <Card key={business.yelp_id}
                    business={business}
                    pagesToShow={pagesToShow}
                    setPagesToShow={setPagesToShow}
                    currentBusiness={currentBusiness}
                    setCurrentBusiness={setCurrentBusiness}
                />
            ))}
        </>
    );
}