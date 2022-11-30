const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        comments: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        comments: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        comments: null,
        isFetching: false,
        error: true,
      };
      case "UPDATE_START":
        return {
          ...state,
          isFetching:true
        };
      case "UPDATE_SUCCESS":
        return {
          comments: action.payload,
          isFetching: false,
          error: false,
        };
      case "UPDATE_FAILURE":
        return {
          comments: state.comments,
          isFetching: false,
          error: true,
        };
    case "LOGOUT":
      return {
        comments: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default Reducer;