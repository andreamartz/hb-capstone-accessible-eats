const signupReducer = (state, action) => {
  switch (action.type) {
    case 'signup': {
      console.log("INSIDE SIGNUP ACTION");
      return {
        ...state,
        loading: true,
        message: '',
        success: null,
      }
    }
    case 'getFeedback': {
      console.log("INSIDE GETFEEDBACK ACTION");
      const { 
        loading,
        message,
        success,
      } = action.payload;

      let newState = {
        ...state,
        loading,
        message,
        success,
      };

      if (success) {
        newState = {
          ...newState,
          signupFirstName: '',
          signupLastName: '',
          signupUsername: '',
          signupPassword: '',
        }
      } 
      return newState;
    } 
    case 'updateField': {
      console.log("INSIDE SETFIELD ACTION");
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      }
    }
    default:
      break;
  }
  return state;
}