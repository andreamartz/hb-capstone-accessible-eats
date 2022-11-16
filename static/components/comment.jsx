"use strict";

const Comment = ({feedback, business}) => {
    return (
        <div className="card card-with-info mb-3">
            <div className="row g-0">
                <div>
                    <div className="card-body">
                        {/* <h5 className="card-title" onClick={handleCardClick}>{place_name}</h5> */}
                        {/* <h5 className="card-title">{place_name}</h5> */}
                        <p className="card-text mb-0">{feedback.comment}</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}