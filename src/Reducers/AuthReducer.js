//import your actions from authActions
import { 
  GET_USER, 
  SUCCESS, 
  AUTH_ERROR, 
  LOGGING_OUT, 
  LOG_OUT_SUCCESS 
} from '../Actions/AuthActions';

const defaultState = {
  getting_user: false,
  loggedIn: false, 
  username: '', 
  auth_error: '',
  loggingOut: false,
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
    case LOGGING_OUT:
      return Object.assign({}, state, {
        loggingOut: true
      });
    case LOG_OUT_SUCCESS:
      return Object.assign({}, state, {
        getting_user: false,
        loggedIn: false,
        username: '',
        auth_error: '',
        loggingOut: false,
      })
    default:
     return state;
  }
}

export default AuthReducer;