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