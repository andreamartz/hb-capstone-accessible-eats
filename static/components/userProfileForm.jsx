"use strict";

const UserProfileForm = ({currentUser,
    setCurrentUser,
    formData,
    setFormData,
    setPagesToShow,
    handleFormChange,
    handleFormSubmit,
}) => {
    // const {first_name, last_name, username, id} = currentUser;
    // const profileFirstName = first_name;
    // const profileLastName = last_name;
    // const profileUsername = username;
    // const data = {id, profileFirstName, profileLastName, profileUsername};
    // const [profileFormData, setProfileFormData] = React.useState(data);
    // const [message, setMessage] = React.useState(null);

    const {first_name, last_name, id} = currentUser;
    const firstName = first_name;
    const lastName = last_name;
    const data = {id, firstName, lastName, username: "", password: ""};

    //TODO:
    // React.useEffect to get the current user data, inc. username & password to 
        // set initial form data
    // setFormData(data);

    // React.useEffect(() => {
    //     if (Object.keys(currentUser).length) {
    //         setFormData(data);
    //     }
    // }, []);

    // const handleProfileFormChange = (evt) => {
    //     console.log("INSIDE HANDLE PROFILE FORM CHANGE");
    //     const {name} = evt.target;
    //     console.log(evt.target.name, evt.target.value);

    //     const newForm = {...profileFormData};
    //     newForm[name] = evt.target.value;
    //     setProfileFormData(newForm);
    // }

    // const handleProfileFormSubmit = async (evt, apiMethod) => {
    //     evt.preventDefault();
    //     const newPagesToShow = {...pagesToShow};
    //     const targetPage = 'userProfilePage';
    //     setCurrentUser(result.user);

    //     try {
    //         const result = await Api[apiMethod](profileFormData);
    //         console.log("RESULT: ", result);
    //         if (result.success) {
    //             for (const page in pagesToShow) {
    //                 newPagesToShow[page] = page === targetPage ? true : false;
    //             }
    //             console.log("PAGES TO SHOW: ", pagesToShow);
    //             setMessage("Profile update was successful!");
    //             setPagesToShow(newPagesToShow);
    //         }
    //     } catch (err) {
    //         return { success: false, err };
    //     }
    // }

    return (
        <>
            <div className="form-container mx-auto mt-5">
                <h1 className="my-3">Update your profile here.</h1>
                <form action="" onSubmit={(evt) => {handleFormSubmit(evt, updateProfile)}}>
                {/* <form action="" onSubmit={(evt) => {handleProfileFormSubmit(evt, updateProfile)}}> */}
                    <div className="form-floating mb-3">
                        <input type="text" 
                            className="form-control" 
                            id="profileFirstName"
                            name="profileFirstName"
                            value={formData.firstName}
                            // value={profileFormData.profileFirstName}
                            placeholder="First name"
                            // placeholder="{firstName}"
                            onChange={handleFormChange}
                            // onChange={handleProfileFormChange}

                        />
                        <label htmlFor="profileFirstName">First name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" 
                            className="form-control" 
                            id="profileLastName"
                            name="profileLastName"
                            value={formData.lastName}
                            // value={profileFormData.profileLastName}
                            placeholder="Last name"
                            // placeholder={lastName}
                            onChange={handleFormChange}
                            // onChange={handleProfileFormChange}

                        />
                        <label htmlFor="profileLastName">Last name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" 
                            className="form-control" 
                            id="profileUsername"
                            name="profileUsername"
                            value={formData.username}
                            // value={profileFormData.profileUsername}
                            placeholder="Username"
                            onChange={handleFormChange}
                            // onChange={handleProfileFormChange}

                        />
                        <label htmlFor="profileUsername">Username</label>
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" 
                            className="btn btn-lg btn-outline-primary"
                        >
                            Submit Changes
                        </button>
                    </div>
                </form>
                {/* <p className="mt-3">{message}</p> */}
            </div>
        </>
    )
}