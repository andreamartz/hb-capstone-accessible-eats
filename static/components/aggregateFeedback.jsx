"use strict";

const AggregateFeedback = ({business}) => {
    const {pct_chair_parking,
        pct_ramp,
        pct_auto_door,
    } = business.feedback_aggregated;

    return (
        <>
            <h5 className="card-title">Percent in agreement:</h5>
            <p className="card-text mb-0">Accessible parking: <span>{pct_chair_parking}</span>%</p>
            <p className="card-text mb-0">Ramp to front door: <span>{pct_ramp}</span>%</p>
            <p className="card-text mb-0">Automatic front door: <span>{pct_auto_door}</span>%</p>
        </>
    );
}