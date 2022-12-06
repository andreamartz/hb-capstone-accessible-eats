"use strict";

const LoginPage = ({formData,
    handleFormChange,
    handleFormSubmit,
}) => {

    return (
        <>
            <LoginForm formData={formData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
            />
        </>
    )
}