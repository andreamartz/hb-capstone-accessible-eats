"use strict";

function Card({business}) {
    const { place_name, yelpId, location, display_phone, coordinates, photo } = business;
    const { address1, address2, address3, city, state, zip_code, country } = location;
    
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={photo} className="img-fluid rounded-start" alt="" />

                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{place_name}</h5>
                        <p className="card-text mb-0">{address1}</p>
                        <p className="card-text mb-2">{city}, {state} {zip_code}</p>
                        <p className="card-text">{display_phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}