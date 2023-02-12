"use strict";

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

    const handleChange = async (evt) => {
        const { name, value } = evt.target;
        dispatch({ type: 'updateField', 
          payload: { name, value, }
        });
    }

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

        if (result.success) {
          setCurrentUser(user);

          dispatch({ type: 'getFeedback', payload: {
            loading: true, 
            message: result.message,
            success: result.success,
          }});
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