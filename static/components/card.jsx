"use strict";

const Card = ({business, 
    pagesToShow, 
    setPagesToShow, 
    setCurrentBusiness,
    feedbackType,
    setFeedbackType,
}) => {
    const { place_name, location, display_phone, photo } = business;
    const { address1, city, state, zip_code } = location;
    const feedbacks = business?.feedbacks ? business.feedbacks : []

    let newPagesToShow = {...pagesToShow};
    const handleCardClick = () => {
        const targetPage = 'businessDetailsPage';

        for (const page in pagesToShow) {
            newPagesToShow[page] = page === targetPage ? true : false;
        }
        setCurrentBusiness(business);
        setPagesToShow(newPagesToShow);
    }

    return (
        <div className="card card-with-info mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={photo} className="img-fluid rounded-start horiz-card-photo" alt="" onClick={handleCardClick} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title" onClick={handleCardClick}>{place_name}</h5>
                        <p className="card-text mb-0">{address1}</p>
                        <p className="card-text mb-2">{city}, {state} {zip_code}</p>
                        <p className="card-text">{display_phone}</p>
                        {/* {feedbacks && <p className="card-text">Ramp: hard-code</p>} */}
                        <Feedback business={business}
                            feedbackType={feedbackType}
                            setFeedbackType={setFeedbackType}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}