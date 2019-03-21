//import your actions
import { 
  GETTING_NOTE, 
  NOTE, 
  NOTE_ERROR, 
  SAVING,
  SAVE_ERROR,
} from '../Actions/NotesActions';

//set your default state
const defaultState = {
  saving: false,
  getting_note: false,
  note: {},
  note_error: '',
  save_error: '',
}

//switch statement
const SelectedNoteReducer = (state = defaultState, action) => {
  switch(action.type) {
    case GETTING_NOTE:
      return Object.assign({}, state, {
        getting_note: true,
      });
    case SAVING:
      return Object.assign({}, state, {
        saving: true,
      });
    case NOTE:
      return Object.assign({}, state, {
        getting_note: false,
        saving: false,
        note: Object.assign({}, {
          id: action.note._id,
          title: action.note.title,
          content: action.note.content,
          created_at: action.note.created_at,
          username: action.note.username
        })
      })
    case NOTE_ERROR:
      return Object.assign({}, state, {
        getting_note: false,
        note_error: action.error
      })
    case SAVE_ERROR:
      return Object.assign({}, state, {
        saving: false,
        save_error: action.error,
      })
    default:
      return state;
  }
}

export default SelectedNoteReducer;

