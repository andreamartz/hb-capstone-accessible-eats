"use strict";

const SignupPage = ({formData,
    handleFormChange,
    handleFormSubmit,
}) => {
    return (
        <>
            <SignupForm formData={formData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit} 
            />
        </>

    )
}