//import your actions
import { GETTING_NOTE, NOTE, NOTE_ERROR} from '../Actions/NotesActions';

//set your default state
const defaultState = {
  getting_note: false,
  note: {},
  error: '',
}

//switch statement
const SelectedNoteReducer = (state = defaultState, action) => {
  switch(action.type) {
    case GETTING_NOTE:
      return Object.assign({}, state, {
        getting_note: true,
      });
    case NOTE:
      return Object.assign({}, state, {
        getting_note: false,
        note: Object.assign({}, {
          id: action.note._id,
          title: action.note.title,
          content: action.note.content,
          created_at: action.note.created_at,
        })
      })
    case NOTE_ERROR:
      return Object.assign({}, state, {
        getting_note: false,
        error: action.error
      })
    default:
      return state;
  }
}

export default SelectedNoteReducer;

