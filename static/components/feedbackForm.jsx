"use strict";

// Form for user to provide feedback on accessibility of a business

const FeedbackForm = ({currentUser, 
    // handleFeedbackSubmit,
    business,
    formData,
    setFormData,
    handleFormChange,
    handleFormSubmit,
}) => {
    React.useEffect(() => {
        setFormData({
            user_id: currentUser.id,
            business_id: business.id,
            feedbackChairParkingChecked: false,
            feedbackRampChecked: false,
            feedbackAutoDoorChecked: false,
            feedbackComment: '',
        });
        return () => {
            setFormData(null);
        }
    }, []);

    // ******* to control checkbox input: https://www.robinwieruch.de/react-checkbox/
    const handleChange = (evt) => {
        console.log(evt.target);
        // const { name, value } = evt.target;
        // const newFormData = {...formData};
        // newFormData[name] = value;
        // setFormData(newFormData);
        // console.log(newFormData);
    }

    return (
        <>
            <h1>How accessible is this restaurant?</h1>
            <form action="" onSubmit={(evt) => {handleFormSubmit(evt, 'giveFeedback')}}>
                <p>
                    Please provide feedback only if you either use a wheelchair or
                    have a personal experience helping a loved one in a wheelchair
                    at this restaurant.
                </p>
                <div className="input-group mb-3">
                    <div className="input-group-text">
                        <input className="form-check-input mt-0"
                            disabled={!currentUser}
                            id="feedbackChairParking"
                            name="feedbackChairParking"
                            // value={formData.feedbackChairParking}
                            checked={formData.feedbackChairParkingChecked}
                            onChange={handleFormChange}
                            type="checkbox"
                            aria-label="Checkbox to indicate whether the restaurant provides enough accessible parking"
                        />
                    </div>
                    <input type="text"
                        readOnly
                        className="form-control"
                        value="This restaurant provides enough accessible parking."
                        aria-label="Readonly input" 
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-text">
                        <input className="form-check-input mt-0"
                            disabled={!currentUser}
                            id="feedbackRamp"
                            name="feedbackRamp"
                            // value={formData.feedbackRamp}
                            checked={formData.feedbackRampChecked}
                            onChange={handleFormChange}
                            type="checkbox"
                            aria-label="Checkbox for adequate parking input" 
                        />
                    </div>
                    <input type="text"
                        readOnly
                        className="form-control"
                        value="This restaurant provides enough accessible parking."
                        aria-label="Readonly input" 
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-text">
                        <input className="form-check-input mt-0"
                            disabled={!currentUser}
                            id="feedbackAutoDoor"
                            name="feedbackAutoDoor"
                            // value={formData.feedbackAutoDoor}
                            checked={formData.feedbackAutoDoorChecked}
                            onChange={handleFormChange}
                            type="checkbox"
                            aria-label="Checkbox for adequate parking input" 
                        />
                    </div>
                    <input type="text"
                        readOnly
                        className="form-control"
                        value="This restaurant provides enough accessible parking."
                        aria-label="Readonly input" 
                    />
                </div>
                <div className="form-floating">
                    <textarea className="form-control"
                        disabled={!currentUser}
                        id="feedbackComment"
                        name="feedbackComment"
                        value={formData.feedbackComment}
                        onChange={handleFormChange}
                        placeholder="Leave a comment here"
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