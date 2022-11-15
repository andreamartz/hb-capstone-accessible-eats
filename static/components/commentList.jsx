"use strict";

const CommentList = ({
    businesses, 
    pagesToShow, 
    setPagesToShow,
    currentBusiness,
    setCurrentBusiness,
}) => {

    if (!businesses) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <p>CommentsList component</p>
            {/* {businesses.map((business) => (
                <Comment key={business.yelp_id}
                    business={business}
                    pagesToShow={pagesToShow}
                    setPagesToShow={setPagesToShow}
                    currentBusiness={currentBusiness}
                    setCurrentBusiness={setCurrentBusiness}
                />
            ))} */}
        </>
    );
}