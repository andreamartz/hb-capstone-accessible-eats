"use strict";

const LoginPage = ({formData,
    handleFormChange,
    handleFormSubmit,
}) => {

    return (
        <>
            <div>LoginPage</div>
            <LoginForm formData={formData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
            />
        </>
    )
}