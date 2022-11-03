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

function App() {
    const [currentUser, setCurrentUser] = React.useState(null)
    // const []

    return (
        // TODO: find out how to use React fragment here instead of div
        <>
            {/* <div className="container-fluid">
                <Navbar />
            </div> */}
            <div className="container">
                <HomeLoggedInPage />
                {/* <CardList zipCode={'55438'}/> */}
            </div>
        </>
    );
}


ReactDOM.render(<App />, document.querySelector('#root'));