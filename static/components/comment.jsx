"use strict";

const Comment = ({feedback, 
    pagesToShow,
}) => {
    const {businessDetailsPage} = pagesToShow;

    return (
        <div className="card card-with-info mb-3">
            <div className="row g-0">
                <div>
                    <div className="card-body comment-card-body">
                        <p className="card-text mb-0">{feedback.comment}</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}