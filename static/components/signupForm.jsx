"use strict";

const SignupForm = ({formData,
    handleFormChange,
    handleFormSubmit,
}) => {
    const METHOD = 'signup';

    return (
        <>
            <div className="form-container mx-auto mt-5">
                <h1 className="my-3">Let's get you signed up!</h1>
                <h2 className="my-2">Enter your user information to register.</h2>
                <form className="my-4" action="" onSubmit={(evt) => {handleFormSubmit(evt, METHOD)}}>
                    <div className="form-floating mb-3">
                        <input type="text" 
                            className="form-control" 
                            id="signupFirstName"
                            name="signupFirstName"
                            value={formData.firstName}
                            placeholder="First name"
                            onChange={handleFormChange}
                        />
                        <label htmlFor="signupFirstName">First name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" 
                            className="form-control" 
                            id="signupLastName"
                            name="signupLastName"
                            value={formData.lastName}
                            placeholder="Last name"
                            onChange={handleFormChange}
                        />
                        <label htmlFor="signupLastName">Last name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" 
                            className="form-control" 
                            id="signupUsername"
                            name="signupUsername"
                            value={formData.username}
                            placeholder="Username"
                            onChange={handleFormChange}
                        />
                        <label htmlFor="signupUsername">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" 
                            className="form-control" 
                            id="signupPassword"
                            name="signupPassword"
                            value={formData.password}
                            placeholder="Password"
                            onChange={handleFormChange}
                        />
                        <label htmlFor="signupPassword">Password</label>
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" 
                            className="btn btn-lg btn-outline-primary"
                        >
                         Sign up
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}