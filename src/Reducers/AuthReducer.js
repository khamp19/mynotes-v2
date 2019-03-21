//import your actions from authActions
import {
  MAKE_USER,
  MAKE_USER_ERROR,
  GET_USER,
  AUTHENTICATED,
  AUTH_ERROR,
  LOGGING_OUT,
  LOG_OUT_SUCCESS
} from '../Actions/AuthActions';

const defaultState = {
  creating_user: false,
  new_user_error: '',
  getting_user: false,
  loggedIn: false,
  username: '',
  userNotes: [],
  auth_error: '',
  loggingOut: false,
};

const AuthReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_USER:
      return Object.assign({}, state, {
        creating_user: true,
        loggedIn: false,
      })
    case MAKE_USER_ERROR:
      return Object.assign({}, state, {
        creating_user: false,
        new_user_error: 'error creating user, please try again'
      })
    case GET_USER:
      return Object.assign({}, state, {
        getting_user: true,
        loggedIn: false
      });
    case AUTHENTICATED:
      return Object.assign({}, state, {
        creating_user: false,
        getting_user: false,
        loggedIn: true,
        username: state.username.concat(action.username),
        // userNotes: state.userNotes.push(action.userNotes),
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
        creating_user: false,
        new_user_error: '',
        getting_user: false,
        loggedIn: false,
        username: '',
        userNotes: [],
        auth_error: '',
        loggingOut: false,
      })
    default:
      return state;
  }
}

export default AuthReducer;