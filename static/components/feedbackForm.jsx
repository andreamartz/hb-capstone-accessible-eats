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
    const [form, setForm] = React.useState({});
    // React.useEffect(() => {
    //     setFormData({
    //         user_id: currentUser.id,
    //         business_id: business.id,
    //         feedbackChairParkingChecked: false,
    //         feedbackRampChecked: false,
    //         feedbackAutoDoorChecked: false,
    //         feedbackComment: '',
    //     });
    //     return () => {
    //         setFormData(null);
    //     }
    // }, []);


    // ******* to control checkbox input: https://www.robinwieruch.de/react-checkbox/
    // const handleChange = (evt) => {
        // console.log(evt.target);
        // const { name, value } = evt.target;
        // const newFormData = {...formData};
        // newFormData[name] = value;
        // setFormData(newFormData);
        // console.log(newFormData);
    // }
    const handleChange = (evt) => {
        // console.log("EVT.TARGET: ", evt.target);
        const {name} = evt.target;
        // const newFormData = {...formData};
        const newForm = {...form};
        if (name === "feedbackComment") {
            // newFormData[name] = evt.target.value;
            newForm[name] = evt.target.value;
        } else {
            // newFormData[name] = !evt.target.checked;
            newForm[name] = !evt.target.checked;
        }
        // console.log("NEWFORMDATA: ", newFormData);
        console.log("NEWFORM: ", newForm);
        // setFormData(newFormData);
        setForm(newForm);
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
                            id="feedbackChairParkingChecked"
                            name="feedbackChairParkingChecked"
                            // value={formData.feedbackChairParkingChecked}
                            checked={formData.feedbackChairParkingChecked}
                            onChange={handleChange}
                            // onChange={!formData.feedbackChairParkingChecked}
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
                            id="feedbackRampChecked"
                            name="feedbackRampChecked"
                            // value={formData.feedbackRampChecked}
                            checked={formData.feedbackRampChecked}
                            onChange={handleChange}
                            // onChange={() => !formData.feedbackRampChecked}
                            type="checkbox"
                            aria-label="Checkbox to indicate whether there is a ramp to the front door" 
                        />
                    </div>
                    <input type="text"
                        readOnly
                        className="form-control"
                        value="This restaurant has a ramp leading to the front door."
                        aria-label="Readonly input" 
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-text">
                        <input className="form-check-input mt-0"
                            disabled={!currentUser}
                            id="feedbackAutoDoorChecked"
                            name="feedbackAutoDoorChecked"
                            // value={formData.feedbackAutoDoorChecked}
                            checked={formData.feedbackAutoDoorChecked}
                            onChange={handleChange}
                            // onChange={() => !formData.feedbackAutoDoorChecked}
                            type="checkbox"
                            aria-label="Checkbox indicating whether the front door is automatic" 
                        />
                    </div>
                    <input type="text"
                        readOnly
                        className="form-control"
                        value="This restaurant has an automatic front door."
                        aria-label="Readonly input" 
                    />
                </div>
                <div className="form-floating">
                    <textarea className="form-control"
                        disabled={!currentUser}
                        id="feedbackComment"
                        name="feedbackComment"
                        value={formData.feedbackComment}
                        onChange={handleChange}
                        placeholder="Leave a comment here"
                    >
                    </textarea>
                    <label htmlFor="feedbackComment">
                        Share additional accessibility information here.
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