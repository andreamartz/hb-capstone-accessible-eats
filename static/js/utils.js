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
    case 'getFeedback': {
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