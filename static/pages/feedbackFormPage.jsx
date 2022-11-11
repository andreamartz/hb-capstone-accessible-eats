"use strict";

const FeedbackFormPage = ({ currentUser,
    formData,
    handleFormChange,
    handleFormSubmit,
}) => {
    const handleFeedbackSubmit = (evt) => {
        evt.preventDefault();
    }
    if (!currentUser) {
        return <p>You must be logged in to see this page!</p>
    }
    return (
        <>
            <div>FeedbackFormPage</div>
            <FeedbackForm currentUser={currentUser}
                // handleFeedbackSubmit={handleFeedbackSubmit}
                formData={formData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
            />
        </>

    )
}