"use strict";

function App() {
    return (
        // TODO: find out how to use React fragment here instead of div
        <div>
            {/* <div className="container-fluid">
                <Navbar />
            </div> */}
            <div className="container">
                {/* <CardList zipCode={55438}/> */}
                <Card yelpId="-JxgWP3A3n8cIfDpwZQ90w"/>
            </div>
        </div>
    );
}


ReactDOM.render(<App />, document.querySelector('#root'));