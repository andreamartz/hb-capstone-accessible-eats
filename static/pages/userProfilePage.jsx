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

    return (
        <>
            <UserProfileForm currentUser={currentUser}
                formData={formData}
                setFormData={setFormData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit} 
            />
        </>
    );
}