"use strict";

const FeedbackFormPage = ({ currentUser,
    business,
    formData,
    setFormData,
    handleFormChange,
    handleFormSubmit,
    pagesToShow,
    setPagesToShow,
}) => {
    if (!currentUser) {
        return <p>You must be logged in to see this page!</p>
    }
    console.log("INFO FROM FEEDBACK FORM PAGE: ", currentUser, business);
    return (
        <>
            <div>FeedbackFormPage</div>
            <FeedbackForm currentUser={currentUser}
                // handleFeedbackSubmit={handleFeedbackSubmit}
                business={business}
                formData={formData}
                setFormData={setFormData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
                pagesToShow={pagesToShow}
                setPagesToShow={setPagesToShow}
            />
        </>
    )
}