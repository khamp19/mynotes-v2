import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import NotesReducer from './NotesReducer';

const rootReducer = combineReducers({
  AuthReducer,
  NotesReducer,
})

export default rootReducer;
