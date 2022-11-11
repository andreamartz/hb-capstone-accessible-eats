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
    const [formData, setFormData] = React.useState({});
    const [formErrors, setFormErrors] = React.useState({});

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

    const handleFormChange = (evt) => {
        const { name, value } = evt.target;
        const newFormData = {...formData};
        // const newFormData = {...data}
        newFormData[name] = value;
        setFormData(newFormData);
        console.log(newFormData);
        // setData(newFormData);
    }

    const handleFormSubmit = async (evt, apiMethod) => {
        evt.preventDefault();
        const newPagesToShow = {...pagesToShow};
        let targetPage;

        try {
            // let result;
            // if (apiMethod === 'login') {
            //     result = await Api.login(loginData);
            // }

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
    } 
        }
        setFormData({});
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
                setCurrentUser={setCurrentUser}
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
                {userFeedbackPage && <UserFeedbackPage currentUser={currentUser}/>}
                {signupPage && <SignupPage />}
                {loginPage && <LoginPage currentUser={currentUser} 
                    setCurrentUser={setCurrentUser}
                    pagesToShow={pagesToShow}
                    setPagesToShow={setPagesToShow}
                    loggingIn={loggingIn}
                    setLoggingIn={setLoggingIn}
                    formData={formData}
                    setFormData={setFormData}
                    handleFormChange={handleFormChange}
                    handleFormSubmit={handleFormSubmit}
                />}
            </div>
        </>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));