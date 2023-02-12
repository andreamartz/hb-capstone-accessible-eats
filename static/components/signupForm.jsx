"use strict";

const SignupForm = ({ currentUser, handleChange, handleSubmit, handleClick, state, }) => {

    const { 
        signupFirstName, 
        signupLastName, 
        signupUsername, 
        signupPassword, 
        message, 
        success, 
        loading 
    } = state;

    return (
        <>
            <div className="form-container mx-auto mt-5">
                <h1 className="my-3">Let's get you signed up!</h1>
                <form className="my-4" action="" onSubmit={handleSubmit}>
                    {message && 
                    <p className={success ? "message-success" : "message-failure"}>{message}
                            {success &&
                            <button type="button" onClick={handleClick}
                                className="ms-3 btn btn-sm btn-outline-primary"
                            >
                                Go to Login
                            </button>}
                    </p>}
                    <div className="form-floating mb-3">
                        <input required
                            type="text" 
                            className="form-control" 
                            id="signupFirstName"
                            name="signupFirstName"
                            value={signupFirstName}
                            placeholder="First name"
                            onChange={handleChange}
                        />
                        <label htmlFor="signupFirstName">First name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input required
                            type="text" 
                            className="form-control" 
                            id="signupLastName"
                            name="signupLastName"
                            value={signupLastName}
                            placeholder="Last name"
                            onChange={handleChange}
                        />
                        <label htmlFor="signupLastName">Last name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input required
                            type="text" 
                            className="form-control" 
                            id="signupUsername"
                            name="signupUsername"
                            value={signupUsername}
                            placeholder="Username"
                            onChange={handleChange}
                        />
                        <label htmlFor="signupUsername">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input required
                            type="password" 
                            className="form-control" 
                            id="signupPassword"
                            name="signupPassword"
                            value={signupPassword}
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <label htmlFor="signupPassword">Password</label>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" 
                            className="btn btn-lg btn-outline-primary"
                            disabled={loading || success}
                        >
                         {loading ? 'Please wait...' : 'Sign up'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}