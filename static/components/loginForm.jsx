"use strict";

const LoginForm = ({formData,
    handleFormChange,
    handleFormSubmit,
}) => {
    const METHOD = 'login';

    return (
        <>
            <div>LoginForm</div>
            <form action="" onSubmit={(evt) => {handleFormSubmit(evt, METHOD)}} >
            {/* <form action="" onSubmit={(evt) => {handleFormSubmit}} > */}

            {/* <form action="" onSubmit={handleFormSubmit} > */}

                <div className="form-floating mb-3">
                    <input type="text" 
                        className="form-control" 
                        id="loginUsername" 
                        name="loginUsername"
                        value={formData.username}
                        placeholder="Username"
                        onChange={handleFormChange}
                    />
                    <label htmlFor="loginUsername">Username</label>
                </div>
                <div className="form-floating">
                    <input type="password" 
                        className="form-control" 
                        id="loginPassword" 
                        name="loginPassword"
                        value={formData.password}
                        placeholder="Password"
                        onChange={handleFormChange}
                    />
                    <label htmlFor="loginPassword">Password</label>
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