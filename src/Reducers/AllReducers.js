import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({
  AuthReducer
})

export default rootReducer;

// getting_user: AuthReducer,
// loggedIn: AuthReducer,
// username: AuthReducer,
// auth_error: AuthReducer,