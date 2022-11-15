"use strict";

const UserFeedback = ({business}) => {
    // console.log("BUSINESS.FEEDBACKS[0]: ", business.feedbacks[0]);
    // TODO: if there will be multiple feedbacks for a business from one user,
        // will need to change the following line:
    const {chair_parking, ramp, auto_door} = business.feedbacks[0];
    console.log("FDBK VARS: ", chair_parking, ramp, auto_door);
    return (
        <>
            <h5 className="card-title">My Feedback</h5>
            <p className="card-text mb-0">Accessible parking: <span>{chair_parking.toString()}</span></p>
            <p className="card-text mb-0">Ramp to front door: <span>{ramp.toString()}</span></p>
            <p className="card-text mb-0">Automatic front door: <span>{auto_door.toString()}</span></p>
            {/* <p className="card-text mb-0">Accessible parking: {chair_parking.toString()}</p>
            <p className="card-text mb-0">Ramp to front door: {ramp.toString()}</p>
            <p className="card-text mb-0">Automatic front door: {auto_door.toString()}</p> */}
        </>
    );
}