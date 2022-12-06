"use strict";

const UserProfileForm = ({currentUser,
    formData,
    setFormData,
    handleFormChange,
    handleFormSubmit,
}) => {
    const {first_name, last_name, id} = currentUser;
    const firstName = first_name;
    const lastName = last_name;
    const data = {id, firstName, lastName, username: "", password: ""};

    //TODO:
    // React.useEffect to get the current user data, inc. username & password to 
        // set initial form data
    // setFormData(data);

    return (
        <>
            <div className="form-container mx-auto mt-5">
                <h1 className="my-3">Update your profile here.</h1>
                {/* <h2 className="my-2">You can do that here.</h2> */}
                <form action="" onSubmit={(evt) => {handleFormSubmit(evt, updateProfile)}}>
                    <div className="form-floating mb-3">
                        <input type="text" 
                            className="form-control" 
                            id="profileFirstName"
                            name="profileFirstName"
                            value={formData.firstName}
                            placeholder="First name"
                            onChange={handleFormChange}
                        />
                        <label htmlFor="profileFirstName">First name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" 
                            className="form-control" 
                            id="profileLastName"
                            name="profileLastName"
                            value={formData.lastName}
                            placeholder="Last name"
                            onChange={handleFormChange}
                        />
                        <label htmlFor="profileLastName">Last name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" 
                            className="form-control" 
                            id="profileUsername"
                            name="profileUsername"
                            value={formData.username}
                            placeholder="Username"
                            onChange={handleFormChange}
                        />
                        <label htmlFor="profileUsername">Username</label>
                    </div>

                    <div class="d-grid gap-2">
                        <button type="submit" 
                            className="btn btn-lg btn-outline-primary"
                        >
                            Submit Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}