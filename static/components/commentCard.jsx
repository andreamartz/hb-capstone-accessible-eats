"use strict";

const CommentCard = ({business}) => {
    return (
        <>
            <p>CommentCard component</p>
            <p className="mb-0">{business.feedbacks[0].comment}</p>

            <div className="card card-with-info mb-3">
            <div className="row g-0">
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title"></h5>
                        <p className="card-text mb-0">{business[0].feedbacks.comment}</p>
                        {/* {feedbacks && <p className="card-text">Ramp: hard-code</p>} */}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}