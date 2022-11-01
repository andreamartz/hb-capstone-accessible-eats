"use strict";

function Card(props) {
    const [businessDetails, setBusinessDetails] = React.useState({});
    const [coordinates, setCoordinates] = React.useState({});
    React.useEffect(() => {
        const getBusinessDetails = (businessId) => {
            const BASE_URL = 'http://localhost:5000/businesses'

            const url = `${BASE_URL}/${businessId}`;
        
            fetch(url)
                .then((response) => response.json())
                .then((jsonData) => {
                    setBusinessDetails(jsonData);
                    setCoordinates(jsonData.coordinates)
                    console.log(jsonData.coordinates);
                });
        }
        // TODO: replace hard-coded business id with passed in id from props
        getBusinessDetails("-JxgWP3A3n8cIfDpwZQ90w");
    }, []);
    
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