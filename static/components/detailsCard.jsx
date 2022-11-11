"use strict";

const DetailsCard = ({currentBusiness}) => {
    const { place_name, location, display_phone, photo } = currentBusiness;
    const { address1, city, state, zip_code } = location;

    return (
        <div>
            <div className="card">
                <div className="photo-container">
                    <img src={photo} className="card-img-top vert-card-photo" alt="" />
                </div>
                {/* <img src={photo} className="card-img-top" alt="" /> */}
                <div className="card-body">
                    <h5 className="card-title">{place_name}</h5>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}

                    <p className="card-text mb-0">{address1}</p>
                    <p className="card-text mb-2">{city}, {state} {zip_code}</p>
                    <p className="card-text">{display_phone}</p>
                </div>
            </div>
        </div>
    )
}