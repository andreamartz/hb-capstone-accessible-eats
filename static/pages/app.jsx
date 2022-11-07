"use strict";
// Main App

/**
 * if user is logged out, show 
 *   - home page with login and register options
 *   - logged out nav bar
 * 
 * if user is logged in,  
 * 
 */

const App = () => {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [loggingIn, setLoggingIn] = React.useState(false);
    const [currentBusiness, setCurrentBusiness] = React.useState(null);

    const [pagesToShow, setPagesToShow] = React.useState({
        businessDetailsPage: true,
        feedbackFormPage: true,
        homePage: true,
        loginPage: true,
        signupPage: true,
        userFeedbackPage: true,
        userProfilePage: true,
    });

    const {
        businessDetailsPage,
        feedbackFormPage,
        homePage,
        loginPage,
        signupPage,
        userFeedbackPage,
        userProfilePage,
    } = pagesToShow;

    const handleClick = (evt) => {
        const targetPage = evt.target.dataset.page;
        let newPagesToShow = {...pagesToShow};
        for (const page in pagesToShow) {
            newPagesToShow[page] = page === targetPage ? true : false;
        }
        setPagesToShow(newPagesToShow);
    } 

    return (
        // TODO: find out how to use React fragment here instead of div
        <>
            {/* <div className="container-fluid">
                <Navbar />
            </div> */}
            <Navigation pagesToShow={pagesToShow} 
                setPagesToShow={setPagesToShow}
                currentUser={currentUser}
            />
            <div className="container">
                {homePage && 
                    <HomePage currentUser={currentUser}
                        pagesToShow={pagesToShow}
                        setPagesToShow={setPagesToShow}
                        currentBusiness={currentBusiness}
                        setCurrentBusiness={setCurrentBusiness}
                    />
                }
                {businessDetailsPage && currentBusiness && <BusinessDetailsPage currentBusiness={currentBusiness}
                    setCurrentBusiness={setCurrentBusiness}/>}
                {feedbackFormPage && <FeedbackFormPage currentUser={currentUser}/>}
                {userProfilePage && <UserProfilePage />}
                {userFeedbackPage && <UserFeedbackPage />}
                {signupPage && <SignupPage />}
                {loginPage && <LoginPage currentUser={currentUser} 
                    setCurrentUser={setCurrentUser}
                    pagesToShow={pagesToShow}
                    setPagesToShow={setPagesToShow}
                    loggingIn={loggingIn}
                    setLoggingIn={setLoggingIn}/>}
            </div>
        </>
    );
}


ReactDOM.render(<App />, document.querySelector('#root'));