"use strict";

const Navigation = ({currentUser, 
    setCurrentUser, 
    pagesToShow, 
    setPagesToShow,
    formData,
    handleFormChange,
    handleFormSubmit,
}) => {
    // create refs so that they will persist on re-renders
    const navbarRef = React.useRef(null);
    const collapseItemRef = React.useRef(null);

    // create the collapsible object inside of useEffect with empty 
        // dependencies array so that it will only run ONE time and not be 
        // reset on every re-render
    React.useEffect(() => {
        collapseItemRef.current = new bootstrap.Collapse(navbarRef.current);
    }, []);

    const handleNavClick = (evt) => {
        const logoutLinkId = evt.target?.id;

        // TODO: remove this "fake logged in user code"
        // const tempUser = {id: 1, first_name: "Megan", last_name: "Kelley"};
        // setCurrentUser(tempUser);
        
        if (logoutLinkId === "logout") {
            setCurrentUser(null);
        }
        const targetPage = evt.target.dataset.page;
        let newPagesToShow = {...pagesToShow};
        for (const page in pagesToShow) {
            newPagesToShow[page] = page === targetPage ? true : false;
        }

        setPagesToShow(newPagesToShow);
        // .hide() is a built-in function
        collapseItemRef.current.hide();
    }
    return (
        <nav className="navbar sticky-top navbar-expand-lg mb-3">
            <div className="container-fluid">
                <button className="navbar-toggler custom-toggler"
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarTogglerDemo03" 
                    aria-controls="navbarTogglerDemo03" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <p className="navbar-brand navigation-item"
                   id="navigation-brand"
                   onClick={handleNavClick}
                   data-page="homePage"
                >
                    Accessible Eats
                </p>
                <div className="collapse navbar-collapse"
                    id="navbarTogglerDemo03" ref={navbarRef}
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {currentUser && <li className="nav-link navigation-item"
                            onClick={handleNavClick}
                            data-page="userProfilePage"
                        >
                            My Profile
                        </li>}
                        {currentUser && <li className="nav-link navigation-item"
                            onClick={handleNavClick}
                            data-page="userFeedbackPage"
                        >
                            My Restaurants
                        </li>}
                        {!currentUser && <li className="nav-link navigation-item"
                            onClick={handleNavClick}
                            data-page="signupPage"
                        >
                            Sign up
                        </li>}
                        {!currentUser && <li className="nav-link navigation-item"
                            onClick={handleNavClick}
                            data-page="loginPage"
                        >
                            Login
                        </li>}
                        {currentUser && <li className="nav-link navigation-item"
                            onClick={(evt) => {handleFormSubmit(evt, 'logout')}}
                        >
                            Logout
                        </li>}
                    </ul>
                </div>
            </div>
        </nav>
    );
}