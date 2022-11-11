// Form for user to provide feedback on accessibility.

function FeedbackForm({currentUser, handleFeedbackSubmit}) {
    const [chairParking, setChairParking] = React.useState(null)
    const [ramp, setRamp] = React.useState(null)
    const [autoDoor, setAutoDoor] = React.useState(null)
    const [comment, setComment] = React.useState("")


    return (
        <>
            <h1>How accessible is this restaurant?</h1>
            <form action="">
                <p>
                    Please provide feedback only if you either use a wheelchair or
                    have a personal experience helping a loved one in a wheelchair
                    at this restaurant.
                </p>
                <div className="input-group mb-3">
                    <div className="input-group-text">
                        <input className="form-check-input mt-0"
                            type="checkbox"
                            value=""
                            aria-label="Checkbox for adequate parking input" />
                    </div>
                    <input type="text"
                        readOnly
                        className="form-control"
                        value="This restaurant provides enough accessible parking."
                        aria-label="Readonly input" />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-text">
                        <input className="form-check-input mt-0"
                            type="checkbox"
                            value=""
                            aria-label="Checkbox for adequate parking input" />
                    </div>
                    <input type="text"
                        readOnly
                        className="form-control"
                        value="This restaurant provides enough accessible parking."
                        aria-label="Readonly input" />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-text">
                        <input className="form-check-input mt-0"
                            type="checkbox"
                            value=""
                            aria-label="Checkbox for adequate parking input" />
                    </div>
                    <input type="text"
                        readOnly
                        className="form-control"
                        value="This restaurant provides enough accessible parking."
                        aria-label="Readonly input" />
                </div>
                <div className="form-floating">
                    <textarea className="form-control"
                        placeholder="Leave a comment here"
                        id="feedbackComment"
                    >
                    </textarea>
                    <label htmlFor="feedbackComment">
                        Please share any other information related to the accessibility of this restaurant
                    </label>
                </div>
                <button type="submit" 
                    className="btn btn-outline-primary"
                >
                    Submit
                </button>

            </form>
        </>
    )
}