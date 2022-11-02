"use strict";

function Card(props) {
    // TODO: Remove hard-coded yelpId
    const yelpId = "-JxgWP3A3n8cIfDpwZQ90w";
    const [businessDetails, setBusinessDetails] = React.useState({});
    // TODO: remove useState for coords
    const [coordinates, setCoordinates] = React.useState({});

    React.useEffect(() => {
        // TODO: review why we call the getBusinessDetails fcn from inside the ...OnMount fcn
        async function getBusinessDetails() {
            // TODO: remove hard-coded yelpId
            const details = await Api.getBusinessDetails(yelpId);
            if (details) {
                setBusinessDetails(details);
                // TODO: remove if not needed (setting state for coords)
                setCoordinates(businessDetails.coordinates);
            } else {
                console.log("NO DETAILS: ", details);
            }
        }
        getBusinessDetails();
    }, [yelpId]);
    
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    {/* <img src="https://s3-media1.fl.yelpcdn.com/bphoto/9ejXGr29i_Qon28S9uQcHg/o.jpg" className="img-fluid rounded-start" alt="" /> */}
                    <img src={businessDetails.photo} className="img-fluid rounded-start" alt="" />

                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{businessDetails.place_name}</h5>
                        <p className="card-text">{businessDetails.display_address}</p>
                        <p className="card-text">{businessDetails.display_phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}