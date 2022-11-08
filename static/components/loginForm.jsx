"use strict";

const LoginForm = ({currentUser, 
    setCurrentUser, 
    loggingIn, 
    setLoggingIn,
    pagesToShow,
    setPagesToShow
}) => {
    const [formData, setFormData] = React.useState({});
    const [formErrors, setFormErrors] = React.useState({});

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        const newFormData = {...formData};
        newFormData[name] = value;
        setFormData(newFormData);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const loginData = {
            username: formData.loginUsername,
            password: formData.loginPassword,
        };
        console.log("LOGIN DATA: ", loginData);

        try {
            const result = await Api.login(loginData);
            if (result.success) {
                setCurrentUser(result.user);
                const newPagesToShow = {...pagesToShow};
                const targetPage = "homePage";
                for (const page in pagesToShow) {
                    newPagesToShow[page] = page === targetPage ? true : false;
                }
                setPagesToShow(newPagesToShow);
            } else {
                console.log("SUCCESS FALSE RESULT: ", result);
            }
        } catch (err) {
            console.log("ERR: ", err);
            setFormErrors(err);
            console.log("RESULT-fail: ", err);
            return { success: false, err };
        }
        
        // setFormData({});
    }

    return (
        <>
            {/* <div>LoginForm</div> */}
            <form action="" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" 
                        className="form-control" 
                        id="loginUsername" 
                        name="loginUsername"
                        value={formData.username}
                        placeholder="Username"
                        onChange={handleChange} />
                    <label htmlFor="loginUsername">Username</label>
                </div>
                <div className="form-floating">
                    <input type="password" 
                        className="form-control" 
                        id="loginPassword" 
                        name="loginPassword"
                        value={formData.password}
                        placeholder="Password"
                        onChange={handleChange} />
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