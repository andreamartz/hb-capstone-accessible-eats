"use strict";

const Feedback = ({business, 
    feedbackType,
    setFeedbackType,
}) => {
    if (feedbackType === 'user') {
        return (
            <>
                <UserFeedback business={business}/>
            </>
        );
    }

    return (
        <AggregateFeedback business={business}/>
    );
}