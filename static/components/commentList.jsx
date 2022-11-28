"use strict";

const CommentList = ({business, currentUser}) => {

    console.log("BUSINESS: ", business);
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