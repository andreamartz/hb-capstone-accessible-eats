"use strict";

const UserProfilePage = ({currentUser,
    setCurrentUser,
    formData,
    setFormData,
    setPagesToShow,
    handleFormChange,
    handleFormSubmit,
}) => {
    if (!currentUser) {
        return (
            <p>You must be logged in to view this page!</p>
        )
    }

    return (
        <>
            <UserProfileForm currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                formData={formData}
                setFormData={setFormData}
                setPagesToShow={setPagesToShow}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit} 
            />
        </>
    );
}