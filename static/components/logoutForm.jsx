"use strict";

const LogoutForm = ({formData,
    handleFormChange,
    handleFormSubmit,
}) => {
    return (
        <>
            <li id="logout" className="nav-link navigation-item" data-page="loginPage">LogoutForm</li>
            <form action="" onSubmit={(evt) => {handleFormSubmit(evt, 'logout')}} >
                <button type="submit" 
                    className="btn btn-outline-primary"
                >
                    Logout
                </button>
            </form>
        </>
    );
}