"use strict";

const initialState = {
    signupFirstName: '',
    signupLastName: '',
    signupUsername: '',
    signupPassword: '',
    message: '',
    success: null,
    loading: false,
}

const signupReducer = (state, action) => {
    switch (action.type) {
      case 'signup': {
        return {
          ...state,
          loading: true,
          message: '',
          success: null,
        }
      }
      case 'resetForm': {
        return {
          ...state,
          signupFirstName: '',
          signupLastName: '',
          signupUsername: '',
          signupPassword: '',
        }
      }
      case 'setForm': {
        return {
          ...state,
          signupFirstName: action.signupFirstName,
          signupLastName: action.signupLastName,
          signupUsername: action.signupUsername,
          signupPassword: action.signupPassword,
        }
      }
      case 'setField': {
        return {
          ...state,
          [action.field]: action.value,
        }
      }
      case 'setMessage': {
        return {
          ...state,
          message: action.value,
        }
      }
      case 'setSuccess': {
        return {
          ...state,
          success: action.value,
        }
      }
      case 'setLoading': {
        return {
          ...state,
          loading: action.value,
        }
      }
      default:
        break;
    }
    return state;
  }
  
const SignupForm = ({ pagesToShow, setPagesToShow, setCurrentUser }) => {
    // const METHOD = 'signup';

    const [ state, dispatch ] = React.useReducer(signupReducer, initialState);
    const { 
        signupFirstName, 
        signupLastName, 
        signupUsername, 
        signupPassword, 
        message, 
        success, 
        loading 
    } = state;

    const handleChange = async (evt) => {
        // evt.preventDefault();
        const { name, value } = evt.target;
        dispatch({ type: 'setField', field: name, value, });
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        console.log("INSIDE HANDLESUBMIT");

        dispatch({ type: 'signup', });

        let firstName = signupFirstName;
        let lastName = signupFirstName;
        let username = signupFirstName;
        let password = signupFirstName;

        const result = await Api.signup({ firstName, lastName, username, password, });
        console.log("RESULT: ", result);

        if (result.success) {
          setCurrentUser(result.user);
          dispatch({ type: 'resetForm', });
          const newPagesToShow = {...pagesToShow, homePage: true, signupPage: false };
          setPagesToShow(newPagesToShow);
        }
        dispatch({ type: 'setMessage', value: result.message, });
        dispatch({ type: 'setSuccess', value: result.success, });
        dispatch({ type: 'setLoading', value: false, });
    }

    return (
        <>
            <div className="form-container mx-auto mt-5">
                <h1 className="my-3">Let's get you signed up!</h1>
                {/* <h2 className="my-2">Enter your user information to register.</h2> */}
                {/* <form className="my-4" action="" onSubmit={(evt) => {handleSubmit(evt, METHOD)}}> */}
                <form className="my-4" action="" onSubmit={handleSubmit}>
                    {message && <p className={success ? "message-success" : "message-failure"}>{message}</p>}
                    <div className="form-floating mb-3">
                        <input type="text" 
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
                        <input type="text" 
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
                        <input type="text" 
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
                        <input type="password" 
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
                         {loading ? 'Logging in...' : 'Sign up'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}