"use strict";

const SignupPage = ({pagesToShow, setPagesToShow, currentUser, setCurrentUser}) => {
    return (
        <>
            <SignupForm pagesToShow={pagesToShow}
                setPagesToShow={setPagesToShow}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser} 
            />
        </>

    )
}