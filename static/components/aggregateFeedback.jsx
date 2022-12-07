"use strict";

const AggregateFeedback = ({business}) => {
    const {pct_chair_parking,
        pct_ramp,
        pct_auto_door,
        comments
    } = business.feedback_aggregated;

    return (
        <>
            <h6 className="card-title">What users say</h6>
            <p className="card-text mb-0 agg-fdbk" title="Percentage who agree that this restaurant provides enough accessible parking">Accessible parking: 
                <span> {pct_chair_parking}%</span>
                <span> </span>
                <span>
                    {pct_chair_parking >= 80 && <i className="bi bi-emoji-smile-fill"></i>}
                    {pct_chair_parking <= 50 && <i className="bi bi-emoji-frown-fill"></i>}
                    {pct_chair_parking > 50 && pct_chair_parking < 80 && <i className="bi bi-emoji-neutral-fill"></i>}
                </span>
            </p>
            <p className="card-text mb-0 agg-fdbk" title="Percentage who agree that this restaurant has a ramp leading to the front door">Ramp to front door: 
                <span> {pct_ramp}%</span>
                <span> </span>
                <span>
                    {pct_ramp >= 80 && <i className="bi bi-emoji-smile-fill"></i>}
                    {pct_ramp <= 50 && <i className="bi bi-emoji-frown-fill"></i>}
                    {pct_ramp > 50 && pct_ramp < 80 && <i className="bi bi-emoji-neutral-fill"></i>}
                </span>
            </p>
            <p className="card-text mb-0 agg-fdbk" title="Percentage who agree that this restaurant has an automatic front door">Automatic front door: 
                <span> {pct_auto_door}%</span>
                <span> </span>
                <span>
                    {pct_auto_door >= 80 && <i className="bi bi-emoji-smile-fill"></i>}
                    {pct_auto_door <= 50 && <i className="bi bi-emoji-frown-fill"></i>}
                    {pct_auto_door > 50 && pct_auto_door < 80 && <i className="bi bi-emoji-neutral-fill"></i>}
                </span>
            </p>
        </>
    );
}