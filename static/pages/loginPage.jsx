"use strict";

// TODO: remove commented out code once login is working
// const Navigation = ({currentUser, pagesToShow, setPagesToShow}) => {
//     const handleNavClick = (evt) => {
//         const targetPage = evt.target.dataset.page;
//         let newPagesToShow = {...pagesToShow};
//         for (const page in pagesToShow) {
//             newPagesToShow[page] = page === targetPage ? true : false;
//         }
//         setPagesToShow(newPagesToShow);
//     } 


const LoginPage = ({currentUser, 
    setCurrentUser, 
    pagesToShow, 
    setPagesToShow, 
    loggingIn, 
    setLoggingIn}) => {

    let newPagesToShow = {...pagesToShow};
    let targetPage = 'loginPage';
    const handleLogin = async (evt) => {
        // TODO: define success
        if (success) {
            targetPage = homePage;
            // setCurrentUser();
        }
        setCurrentUser()
        setPagesToShow(newPagesToShow);
    }
    

    return (
        <>
            {/* <div>LoginPage</div> */}
            <LoginForm currentUser={currentUser} 
                setCurrentUser={setCurrentUser}
                loggingIn={loggingIn}
                setLoggingIn={setLoggingIn}
                pagesToShow={pagesToShow}
                setPagesToShow={setPagesToShow}
            />
        </>
    )
}