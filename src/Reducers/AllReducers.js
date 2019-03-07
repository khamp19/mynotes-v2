import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import NotesReducer from './NotesReducer';
import SelectedNoteReducer from './SelectedNoteReducer';
// import NewNoteReducer from './NewNoteReducer';

const rootReducer = combineReducers({
  AuthReducer,
  NotesReducer,
  SelectedNoteReducer,
  // NewNoteReducer
})

export default rootReducer;
