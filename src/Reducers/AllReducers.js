import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';

const AllReducers = combineReducers({
  AuthReducer
})

export default AllReducers;

// getting_user: AuthReducer,
// loggedIn: AuthReducer,
// username: AuthReducer,
// auth_error: AuthReducer,