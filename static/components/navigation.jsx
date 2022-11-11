"use strict";

const Navigation = ({currentUser, 
    setCurrentUser, 
    pagesToShow, 
    setPagesToShow
}) => {
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
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <p className="navbar-brand navigation-item"
                   onClick={handleNavClick}
                   data-page="homePage"
                >
                    Accessible Eats
                </p>

                {/* <a className="navbar-brand" href="#">Accessible Eats</a> */}
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
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
                            data-page="loginPage"
                        >
                            Login
                        </li>}
                        {currentUser && <li id="logout"
                            className="nav-link navigation-item"
                            onClick={handleNavClick}
                            data-page="loginPage"
                        >
                            Logout
                        </li>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}