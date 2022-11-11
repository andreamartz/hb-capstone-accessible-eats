"use strict";

const SignupPage = ({formData,
    handleFormChange,
    handleFormSubmit,
}) => {
    return (
        <>
            <div>SignupPage</div>
            <SignupForm formData={formData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit} 
            />
        </>

    )
}