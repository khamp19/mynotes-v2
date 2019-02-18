import axios from 'axios';

//getting all notes in database:
export const GETTING_NOTES = 'GETTING_NOTES';
export const NOTES_SUCCESS = 'NOTES_SUCCESS';
export const NOTES_ERROR = 'NOTES_ERROR';

export const getAllNotes = () => {
  return dispatch => {
    dispatch({type: GETTING_NOTES});
    axios.get('https://lit-lake-67095.herokuapp.com/notes')
      .then((response) => {
        dispatch({type: NOTES_SUCCESS, notes: response.data});
      })
      .catch((error) => {
        console.log('error getting notes', error);
        dispatch({type: NOTES_ERROR});
      })
  }
}