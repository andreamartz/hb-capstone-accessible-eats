"use strict";

// Form for user to provide feedback on accessibility of a business

const FeedbackForm = ({currentUser, 
    // handleFeedbackSubmit,
    business,
    formData,
    setFormData,
    handleFormChange,
    handleFormSubmit,
    pagesToShow,
    setPagesToShow,
}) => {
    const [form, setForm] = React.useState({
        user_id: currentUser.id,
        business_id: business.id,
        feedbackChairParkingChecked: false,
        feedbackRampChecked: false,
        feedbackAutoDoorChecked: false,
        feedbackComment: '',
    });
    const handleChange = (evt) => {     // WORKS
        const {name} = evt.target;

        const newForm = {...form};
        if (name === "feedbackComment") {
            newForm[name] = evt.target.value;
        } else {
            newForm[name] = evt.target.checked;
        }
        setForm(newForm);
        // setFormData(newForm);
    }

    const handleSubmit = async (evt, apiMethod) => {
        evt.preventDefault();
        const newPagesToShow = {...pagesToShow};
        // let targetPage;
        const targetPage = 'userFeedbackPage';

        try {
            const result = await Api[apiMethod](form);

            if (result.success) {
                for (const page in pagesToShow) {
                    newPagesToShow[page] = page === targetPage ? true : false;
                }
                setPagesToShow(newPagesToShow);
            } else {
            }
        } catch (err) {
            // setFormErrors(err);
            return { success: false, err };
        }
    }

    return (
        <>
            <div className="form-container mx-auto mt-5">
                <form action="" onSubmit={(evt) => {handleSubmit(evt, 'giveFeedback')}}>
                    <h1 className="my-3">How accessible is this restaurant?</h1>
                    <p className="my-3 form-instructions">
                        Please provide feedback only if you either use a wheelchair or
                        have a personal experience helping a loved one in a wheelchair
                        at this restaurant.
                    </p>
                    <p className="my-3 form-instructions">
                        Check all that apply.
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
                    <div className="form-floating mb-3">
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
                    <div className="d-grid gap-2">
                        <button type="submit" 
                            className="btn btn-lg btn-outline-primary"
                        >
                            Submit 
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}