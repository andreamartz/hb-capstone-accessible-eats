"use strict";

const UserFeedback = ({business}) => {
    // TODO: if there will be multiple feedbacks for a business from one user,
        // will need to change the following line:
    const {chair_parking, ramp, auto_door} = business.feedbacks[0];
    return (
        <>
            <h6 className="card-title">My Feedback</h6>
            <p className="card-text mb-0" title="Agreement that this restaurant provides enough accessible parking">
                Accessible parking: 
                <span> {chair_parking.toString()}</span>
                <span> </span>
                <span>
                    {chair_parking && <i className="bi bi-emoji-smile-fill"></i>}
                    {!chair_parking && <i className="bi bi-emoji-frown-fill"></i>}
                </span>
            </p>
            <p className="card-text mb-0" title="Agreement that this restaurant has a ramp leading to the front door">
                Ramp to door: 
                <span> {ramp.toString()}</span>
                <span> </span>
                <span>
                    {ramp && <i className="bi bi-emoji-smile-fill"></i>}
                    {!ramp && <i className="bi bi-emoji-frown-fill"></i>}
                </span>
            </p>
            <p className="card-text mb-0" title="Agreement that this restaurant has an automatic front door">
                Automatic door: 
                <span> {auto_door.toString()}</span>
                <span> </span>
                <span>
                    {auto_door && <i className="bi bi-emoji-smile-fill"></i>}
                    {!auto_door && <i className="bi bi-emoji-frown-fill"></i>}
                </span>
            </p>
        </>
    );
}