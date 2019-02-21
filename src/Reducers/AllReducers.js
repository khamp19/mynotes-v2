import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import NotesReducer from './NotesReducer';
import SelectedNoteReducer from './SelectedNoteReducer';

const rootReducer = combineReducers({
  AuthReducer,
  NotesReducer,
  SelectedNoteReducer,
})

export default rootReducer;
