"use strict";

const CommentList = ({business, currentUser}) => {
    return (
        <>
            {business.feedbacks.map((feedback) => (
                <Comment key={`${feedback.id}${business.yelp_id}`}
                    business={business}
                    feedback={feedback}
                />
            ))}
        </>
    );
}