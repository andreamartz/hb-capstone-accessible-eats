"use strict";

const UserProfilePage = ({currentUser,
    formData,
    setFormData,
    handleFormChange,
    handleFormSubmit,
}) => {
    if (!currentUser) {
        return (
            <p>UserProfilePage: You must be logged in to view this page!</p>
        )
    }
    console.log("CURRENT USER FROM PROFILE PAGE: ", currentUser);
    return (
        <>
            <div>UserProfilePage</div>
            <UserProfileForm currentUser={currentUser}
                formData={formData}
                setFormData={setFormData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit} 
            />
        </>
    )
}