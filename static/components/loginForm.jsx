"use strict";

const LoginForm = ({formData,
    loginMessage,
    setLoginMessage,
    handleFormChange,
    handleFormSubmit,
}) => {
    const METHOD = 'login';

    React.useEffect(() => {
        return () => {
            setLoginMessage(null);
        }
    }, []);

    return (
        <>
            <div className="form-container mx-auto mt-5">
                <form className="my-4" action="" onSubmit={(evt) => {handleFormSubmit(evt, METHOD)}} >
                    <h1 className="my-3">Login to get started!</h1>
                    {/* <h2 className="my-2">Enter your username and password to login.</h2> */}
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
                    <div className="form-floating mb-3">
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
                    <div className="d-grid gap-2">
                        <button type="submit" 
                            className="btn btn-lg btn-outline-primary"
                        >
                            Login 
                        </button>
                    </div>
                </form>
                <p className={`${loginMessage?.success ? "message-success" : "message-failure"}`}>{loginMessage?.message}</p>
            </div>
        </>
    )
}