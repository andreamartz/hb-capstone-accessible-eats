"use strict";

const AggregateFeedback = ({business}) => {
    const {pct_chair_parking,
        pct_ramp,
        pct_auto_door,
        comments
    } = business.feedback_aggregated;

    return (
        <>
            <h6 className="card-title">What users say 
                <span> <i className="bi bi-info-circle" 
                   title="The percentage of users who agree that each 
                   accessibility feature is present at the restaurant.
                   Hover over each feature below to learn more.">
                    </i>
                </span>
            </h6>
            <p className="card-text mb-0 agg-fdbk" title="Agreement that this restaurant provides enough accessible parking">Accessible parking: 
                <span> {pct_chair_parking}{pct_chair_parking != "No feedback given" && "%"}</span>
                <span> </span>
                <span>
                    {pct_chair_parking >= 80 && <i className="bi bi-emoji-smile-fill"></i>}
                    {pct_chair_parking <= 50 && <i className="bi bi-emoji-frown-fill"></i>}
                    {pct_chair_parking > 50 && pct_chair_parking < 80 && <i className="bi bi-emoji-neutral-fill"></i>}
                </span>
            </p>
            <p className="card-text mb-0 agg-fdbk" title="Agreement that this restaurant has a ramp leading to the front door">Ramp to door: 
                <span> {pct_ramp}{pct_ramp != "No feedback given" && "%"}</span>
                <span> </span>
                <span>
                    {pct_ramp >= 80 && <i className="bi bi-emoji-smile-fill"></i>}
                    {pct_ramp <= 50 && <i className="bi bi-emoji-frown-fill"></i>}
                    {pct_ramp > 50 && pct_ramp < 80 && <i className="bi bi-emoji-neutral-fill"></i>}
                </span>
            </p>
            <p className="card-text mb-0 agg-fdbk" title="Agreement that this restaurant has an automatic front door">Automatic door: 
                <span> {pct_auto_door}{pct_auto_door != "No feedback given" && "%"}</span>
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