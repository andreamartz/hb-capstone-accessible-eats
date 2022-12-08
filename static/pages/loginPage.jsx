"use strict";

const LoginPage = ({formData,
    loginMessage,
    setLoginMessage,
    handleFormChange,
    handleFormSubmit,
}) => {

    return (
        <>
            <LoginForm formData={formData}
                loginMessage={loginMessage}
                setLoginMessage={setLoginMessage}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
            />
        </>
    )
}