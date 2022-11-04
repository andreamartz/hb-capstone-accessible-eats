"use strict";

const Navigation = ({currentUser, pagesToShow, setPagesToShow}) => {
    const handleNavClick = (evt) => {
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
                        <li className="nav-link navigation-item"
                            onClick={handleNavClick}
                            data-page="userProfilePage"
                        >
                            My Profile
                        </li>
                        <li className="nav-link navigation-item"
                            onClick={handleNavClick}
                            data-page="userFeedbackPage"
                        >
                            My Restaurants
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}