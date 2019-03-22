import axios from 'axios';

const DATA_URL = `https://lit-lake-67095.herokuapp.com`;

//getting all notes in database:
export const GETTING_NOTES = 'GETTING_NOTES';
export const NOTES_SUCCESS = 'NOTES_SUCCESS';
export const NOTES_ERROR = 'NOTES_ERROR';

export const getAllNotes = () => {
  return dispatch => {
    dispatch({type: GETTING_NOTES});
    axios.get(`${DATA_URL}/notes`)
    .then((response) => {
      dispatch({type: NOTES_SUCCESS, notes: response.data});
    })
    .catch((error) => {
      console.log('error getting notes', error);
      dispatch({type: NOTES_ERROR});
    })
  }
}

//single note actions
export const GETTING_NOTE = 'GETTING_NOTE';
export const NOTE = 'NOTE';
export const NOTE_ERROR = 'NOTE_ERROR';

export const getNote = (id) => {
  return dispatch => {
    dispatch({type: GETTING_NOTE});
    axios.get(`${DATA_URL}/notes/${id}`)
    .then((response) => {
      dispatch({type: NOTE, note: response.data})
    })
    .catch((error) => {
      console.log('error getting note', error);
      dispatch({type: NOTE_ERROR});
    })
  }
}

export const SAVING = 'SAVING';
export const SAVE_ERROR = 'SAVE_ERROR';
export const addNote = (noteData) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch({type: SAVING});
    axios.post(`${DATA_URL}/notes/`, noteData, {headers: {Authorization: token}})
    .then((response) => {
      console.log('save successful', response.data);
      dispatch({type: NOTE, note: response.data})
    })
    .catch((error) => {
      console.log('error saving note', error);
      dispatch({ type: SAVE_ERROR });
    })
  }
}

export const updateNote = (id, noteData) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch({ type: SAVING });
    axios.put(`${DATA_URL}/notes/${id}`, noteData, { headers: { Authorization: token }})
      .then((res) => {
        console.log('note update successful', res.data);
        dispatch({ type: NOTE, note: res.data});
      })
      .catch((err)=> {
        console.log('error updating', err);
        dispatch({ type: SAVE_ERROR });
      })
  }
}

export const DELETING_NOTE = 'DELETING_NOTE';
export const DELETE_NOTE_ERROR = 'DELETE_NOTE_ERROR';
export const deleteNote = (id) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch({type: DELETING_NOTE})
    axios.delete(`${DATA_URL}/notes/${id}`, { headers: { Authorization: token } })
      .then((res) => {
        console.log('delete successfull');
        dispatch({type: NOTE, note: res.data});
      })
      .catch((err) => {
        console.log('error deleting note', err);
        dispatch({ type: DELETE_NOTE_ERROR})
      })
  }
}