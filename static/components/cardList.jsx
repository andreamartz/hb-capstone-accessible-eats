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
    setCurrentBusiness,
    feedbackType,
    setFeedbackType,
    showComments,
    setShowComments,
}) => {
    if (!businesses) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            {/* <div className="row row-cols-1 row-cols-md-2 g-4"> */}
            <div className="row row-cols-1 row-cols-sm-2 g-4">

                {businesses.map((business, idx) => (
                    <>
                        <Card key={`${idx}${business.yelp_id}100000`}
                            business={business}
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
                ))}
            </div>
        </>
    );
}