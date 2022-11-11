"use strict";

const UserProfilePage = ({currentUser}) => {
    if (!currentUser) {
        return (
            <p>You must be logged in to view this page!</p>
        )
    }
    return (
        <div>UserProfilePage</div>
        
    )
}