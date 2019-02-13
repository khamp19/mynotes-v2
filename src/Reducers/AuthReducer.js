//import your actions from authActions
import { GET_USER, SUCCESS, AUTH_ERROR } from '../Actions/AuthActions';

const defaultState = {
  getting_user: false,
  loggedIn: false, 
  username: '', 
  auth_error: ''
};

const AuthReducer = (state = defaultState, action) => {
  switch(action.type) {
    case GET_USER:
      return Object.assign({}, state, {
        getting_user: true, 
        loggedIn: false
      });
    case SUCCESS:
      return Object.assign({}, state, {
        getting_user: false,
        loggedIn: true,
        username: state.username.concat(action.username)
      });
    case AUTH_ERROR:
      return Object.assign({}, state, {
        getting_user: false, 
        error: 'no user found, please log in'
      });
    default:
     return state;
  }
}

export default AuthReducer;