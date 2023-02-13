"use strict";

/* This is the parent component of the SignupForm.

   Business logic is handled here and the state-changing functions of handleChange, handleSubmit, and handleClick are passed to the presentational SignupForm child component.

  The reducer function is located in the static/js/utils.js file. It contains logic for handling three user actions: 
      * signup (i.e., user form submission), 
      * getFeedback (for state changes related to failure or success of the submission, such as a success or error message for the user), and 
      * updateField, which handles form control as the user types. 

  The handleSubmit function calls the asynchronous signup method on the Api class (located at static/js/api.js), which sends an HTTP POST request to the backend to create a new user. 
*/

const SignupPage = ({pagesToShow, setPagesToShow, currentUser, setCurrentUser, }) => {

    const initialState = {
        signupFirstName: '',
        signupLastName: '',
        signupUsername: '',
        signupPassword: '',
        message: '',
        success: null,
        loading: false,
    }

    const [ state, dispatch ] = React.useReducer(signupReducer, initialState);

    // Handle form control as the user types
    const handleChange = async (evt) => {
        const { name, value } = evt.target;
        dispatch({ type: 'updateField', 
          payload: { name, value, }
        });
    }

    // Handle user form submission
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        dispatch({ type: 'signup', });

        const { 
            signupFirstName, 
            signupLastName, 
            signupUsername, 
            signupPassword, 
        } = state;

        const user = { signupFirstName, signupLastName, signupUsername, };
        const userData = { ...user, signupPassword, };

        const result = await Api.signup(userData);

        // SIGNUP WAS SUCCESSFUL; a new user account was created.
        if (result.success) {
          // Note: Currently, the user state is handled at the top-level of the app. I will be refactoring this soon.
          setCurrentUser(user);

          dispatch({ type: 'getFeedback', payload: {
            loading: true, 
            message: result.message,
            success: result.success,
          }});

        // SIGNUP FAILED. The result.message tells us why.
        } else {
          dispatch({ type: 'getFeedback', payload: {
            loading: false,
            message: result.message,
            success: result.success,
          }});
        }
    }

    const handleClick = (evt) => {
        const newPagesToShow = { 
            ...pagesToShow, 
            signupPage: false, 
            loginPage: true 
        };
        setPagesToShow(newPagesToShow);
    }

    return (
        <>
            <SignupForm pagesToShow={pagesToShow}
                setPagesToShow={setPagesToShow}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleClick={handleClick}
                state={state}
            />
        </>

    )
}