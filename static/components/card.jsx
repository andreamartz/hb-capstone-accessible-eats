"use strict";

const Card = ({business, 
    pagesToShow, 
    setPagesToShow,
    handleSetPagesToShow,
    currentBusiness,
    setCurrentBusiness,
    feedbackType,
    setFeedbackType,
    showComments,
    setShowComments,
}) => {

    const { place_name, location, display_phone, photo } = business;
    const { address1, city, state, zip_code } = location;
    const feedbacks = business?.feedbacks ? business.feedbacks : []

    let { userFeedbackPage, businessDetailsPage } = pagesToShow;

    let newPagesToShow = {...pagesToShow};
    const handleCardClick = () => {
        const targetPage = 'businessDetailsPage';

        for (let page in pagesToShow) {
            newPagesToShow[page] = page === targetPage ? true : false;
        }
        setCurrentBusiness(business);
        setPagesToShow(newPagesToShow);
    }

    return (
        <>
            <div className="col">
                <div className="card card-with-info mb-2">
                    <div className="row g-0">
                        <div className="col-lg-5 col-xl-4 photo-container">
                            <img src={photo} className="img-fluid rounded-start horiz-card-photo" alt="" onClick={handleCardClick} />
                        </div>
                        <div className="col-lg-7 col-xl-8 card-body-container">
                            <div className="card-body">
                                <h5 className="card-title card-title-place" onClick={handleCardClick}>{place_name}</h5>
                                <p className="card-text mb-0">{address1}</p>
                                <p className="card-text mb-2">{city}, {state} {zip_code}</p>
                                <p className="card-text mb-4">{display_phone}</p>
                                <Feedback business={business}
                                    feedbackType={feedbackType}
                                    setFeedbackType={setFeedbackType}
                                />
                                {/* {userFeedbackPage && <h6 className="card-title mt-3">Comment</h6>} */}
                                {/* {userFeedbackPage && showComments && <CommentList business={business}
                                              pagesToShow={pagesToShow}
                                />} */}
                            </div>
                        </div>
                        <div className="col-12">
                            {userFeedbackPage && <div className="card-footer">
                                {userFeedbackPage && <h6 className="card-title mt-3">Comment</h6>}
                                {userFeedbackPage && <p className="card-text mb-0">{business.feedbacks[0].comment}</p>}
                            </div>}
                        </div>
                    </div>

                </div>
                {!userFeedbackPage && showComments && <CommentList business={business}
                                              pagesToShow={pagesToShow}
                />}
            </div>
        </>
    );
}