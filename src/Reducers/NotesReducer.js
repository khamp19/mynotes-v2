import { GETTING_NOTES, NOTES_SUCCESS, NOTES_ERROR } from '../Actions/NotesActions';

const defaultState = {
  getting_notes: false,
  notes: [],
  notes_error: ''
}

const NotesReducer = (state = defaultState, action) => {
  switch(action.type) {
    case GETTING_NOTES:
      return Object.assign({}, state, {getting_notes: true});
    case NOTES_ERROR:
      return Object.assign({}, state, {
        getting_notes: false, 
        notes_error: action.error
      })
    case NOTES_SUCCESS:
      return Object.assign({}, state, {
        getting_notes: false, 
        notes: state.notes.concat(action.notes)
      });
    default:
      return state;
  }
}

export default NotesReducer;