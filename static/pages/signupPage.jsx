"use strict";

const SignupPage = ({pagesToShow, setPagesToShow, setCurrentUser}) => {
    return (
        <>
            <SignupForm pagesToShow={pagesToShow}
                setPagesToShow={setPagesToShow}
                setCurrentUser={setCurrentUser} 
            />
        </>

    )
}