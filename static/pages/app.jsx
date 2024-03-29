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
    // currentUser has id, first_name, last_name, username as keys
    const [currentUser, setCurrentUser] = React.useState(null);
    const [loggingIn, setLoggingIn] = React.useState(false);
    const [currentBusiness, setCurrentBusiness] = React.useState(null);
    const [businesses, setBusinesses] = React.useState([]);
    const [formData, setFormData] = React.useState({});
    const [formErrors, setFormErrors] = React.useState({});
    const [feedbackType, setFeedbackType] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('55438');
    const [showComments, setShowComments] = React.useState(true);
    const [loginMessage, setLoginMessage] = React.useState(null);

    const [pagesToShow, setPagesToShow] = React.useState({
        businessDetailsPage: false,
        feedbackFormPage: false,
        homePage: true,
        loginPage: false,
        signupPage: false,
        userFeedbackPage: false,
        userProfilePage: false,
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
    }

    const handleFormSubmit = async (evt, apiMethod) => {
        evt.preventDefault();
        const newPagesToShow = {...pagesToShow};
        let targetPage;

        try {
            const result = await Api[apiMethod](formData);

            if (apiMethod === "login") {
                setLoginMessage(result);
            }
            if (result.success) {
                if (apiMethod === "login") {
                    setCurrentUser(result.user);
                    targetPage = "homePage";
                } else if (apiMethod === "logout") {
                    setCurrentUser(null);
                    targetPage = "homePage";
                } else if (apiMethod === "signup") {
                    targetPage = "loginPage";
                } else if (apiMethod === 'giveFeedback') {
                    targetPage = "userFeedbackPage";
                }

                for (const page in pagesToShow) {
                    newPagesToShow[page] = page === targetPage ? true : false;
                }
                setPagesToShow(newPagesToShow);
                setFormData({});
            } else {
            }
        } catch (err) {
            setFormErrors(err);
            return { success: false, err };
        }
    }

    return (
        <>
            <Navigation currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                pagesToShow={pagesToShow} 
                setPagesToShow={setPagesToShow}
                formData={formData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
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
                        feedbackType={feedbackType}
                        setFeedbackType={setFeedbackType}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        showComments={showComments}
                        setShowComments={setShowComments}
                    />
                }
                {businessDetailsPage && currentBusiness && 
                    <BusinessDetailsPage currentBusiness={currentBusiness}
                        setCurrentBusiness={setCurrentBusiness}
                        handleSetPagesToShow={handleSetPagesToShow}
                        pagesToShow={pagesToShow}
                        setPagesToShow={setPagesToShow}
                        feedbackType={feedbackType}
                        setFeedbackType={setFeedbackType}
                        showComments={showComments}
                        setShowComments={setShowComments}
                    />
                }
                {feedbackFormPage && 
                    <FeedbackFormPage 
                        currentUser={currentUser}
                        business={currentBusiness}
                        formData={formData}
                        setFormData={setFormData}
                        handleFormChange={handleFormChange}
                        handleFormSubmit={handleFormSubmit}
                        pagesToShow={pagesToShow}
                        setPagesToShow={setPagesToShow}
                    />}
                {userProfilePage && <UserProfilePage currentUser={currentUser}
                     setCurrentUser={setCurrentUser}
                     formData={formData}
                     setFormData={setFormData}
                     setPagesToShow={setPagesToShow}
                     handleFormChange={handleFormChange}
                     handleFormSubmit={handleFormSubmit}
                />}
                {userFeedbackPage && <UserFeedbackPage currentUser={currentUser}
                    pagesToShow={pagesToShow}
                    setPagesToShow={setPagesToShow}
                    businesses={businesses}
                    setBusinesses={setBusinesses}
                    currentBusiness={currentBusiness}
                    setCurrentBusiness={setCurrentBusiness}
                    feedbackType={feedbackType}
                    setFeedbackType={setFeedbackType}
                    showComments={showComments}
                    setShowComments={setShowComments}
                />}
                {signupPage && <SignupPage pagesToShow={pagesToShow}
                    setPagesToShow={setPagesToShow}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                />}
                {loginPage && <LoginPage formData={formData}
                    loginMessage={loginMessage}
                    setLoginMessage={setLoginMessage}
                    handleFormChange={handleFormChange}
                    handleFormSubmit={handleFormSubmit}
                />}
            </div>
        </>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));