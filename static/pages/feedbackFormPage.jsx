"use strict";

const FeedbackFormPage = ({ currentUser }) => {
    const handleFeedbackSubmit = (evt) => {
        evt.preventDefault();
    }
    return (
        // <div>FeedbackFormPage</div>
        <FeedbackForm currentUser={currentUser}
            handleFeedbackSubmit={handleFeedbackSubmit}
        />
    )
}