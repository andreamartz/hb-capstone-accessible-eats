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
    const [businesses, setBusinesses] = React.useState([]);
    const [formData, setFormData] = React.useState({});
    const [formErrors, setFormErrors] = React.useState({});

    const [pagesToShow, setPagesToShow] = React.useState({
        businessDetailsPage: true,
        feedbackFormPage: true,
        homePage: true,
        loginPage: true,
        signupPage: true,
        userFeedbackPage: false,
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

    const handleSetPagesToShow = (evt, targetPage) => {
        const newPagesToShow = {...pagesToShow};
        for (const page in pagesToShow) {
            newPagesToShow[page] = page === targetPage ? true : false;
        }
        setPagesToShow(newPagesToShow);
    }

    const handleFormChange = (evt) => {
        const { name, value } = evt.target;
        const newFormData = {...formData};
        newFormData[name] = value;
        setFormData(newFormData);
        console.log(newFormData);
    }

    const handleFormSubmit = async (evt, apiMethod) => {
        evt.preventDefault();
        const newPagesToShow = {...pagesToShow};
        let targetPage;

        try {
            const result = await Api[apiMethod](formData);

            if (result.success) {
                if (apiMethod === "login") {
                    setCurrentUser(result.user);
                    targetPage = "homePage";
                } else if (apiMethod === "signUp") {
                    targetPage = "loginPage";
                }

                for (const page in pagesToShow) {
                    newPagesToShow[page] = page === targetPage ? true : false;
                }
                setPagesToShow(newPagesToShow);

            } else {
                console.log("SUCCESS FALSE RESULT: ", result);
            }
        } catch (err) {
            console.log("RESULT-fail: ", err);
            setFormErrors(err);
            return { success: false, err };
        }
        setFormData({});
    }

    return (
        <>
            <Navigation pagesToShow={pagesToShow} 
                setPagesToShow={setPagesToShow}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />
            <div className="container">
                {homePage && 
                    <HomePage currentUser={currentUser}
                        pagesToShow={pagesToShow}
                        setPagesToShow={setPagesToShow}
                        currentBusiness={currentBusiness}
                        setCurrentBusiness={setCurrentBusiness}
                        businesses={businesses}
                        setBusinesses={setBusinesses}
                    />
                }
                {businessDetailsPage && currentBusiness && 
                    <BusinessDetailsPage currentBusiness={currentBusiness}
                        setCurrentBusiness={setCurrentBusiness}
                        handleSetPagesToShow={handleSetPagesToShow}
                    />
                }
                {feedbackFormPage && 
                    <FeedbackFormPage 
                        currentUser={currentUser}
                        formData={formData}
                        handleFormChange={handleFormChange}
                        handleFormSubmit={handleFormSubmit}
                    />}
                {userProfilePage && <UserProfilePage currentUser={currentUser} />}
                {userFeedbackPage && <UserFeedbackPage currentUser={currentUser}
                    pagesToShow={pagesToShow}
                    setPagesToShow={setPagesToShow}
                    businesses={businesses}
                    setBusinesses={setBusinesses}
                    currentBusiness={currentBusiness}
                    setCurrentBusiness={setCurrentBusiness}
                />}
                {signupPage && <SignupPage formData={formData} 
                    handleFormChange={handleFormChange}
                    handleFormSubmit={handleFormSubmit}
                />}
                {loginPage && <LoginPage formData={formData}
                    handleFormChange={handleFormChange}
                    handleFormSubmit={handleFormSubmit}
                />}
            </div>
        </>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));