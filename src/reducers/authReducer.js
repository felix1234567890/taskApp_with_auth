const initialState = {
  isAuthenticated: false,
  token: null,
  error: null
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', JSON.stringify(action.token));
    case 'GET_TOKEN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.token
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...initialState
      };
    default:
      return state;
  }
};
export default authReducer;
