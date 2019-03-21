import axios from 'axios';

//backend endpoints: 
const backend_url = 'https://lit-lake-67095.herokuapp.com';
//register: axios.post(`${backend_url}/user/register`)
//login: axios.put(`${backend_url}/user/login`)
//user dashboard: axios.get(`${backend_url}/user/dashboard`)
//delete user: axios.delete(`${backend_url}/user/delete-account`)

//addUser (from register)
export const MAKE_USER = 'MAKE_USER';
export const MAKE_USER_ERROR = 'MAKE_USER_ERROR';
export const addUser = (userData) => {
  return dispatch => {
    dispatch({ type: MAKE_USER })
    axios.post('https://lit-lake-67095.herokuapp.com/user/register', userData)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      dispatch({
        type: AUTHENTICATED,
        username: res.data.username,
        // userNotes: res.data.userNotes,
      })
    })
    .catch((error) => {
      console.log('error creating user', error);
      dispatch({ type: MAKE_USER_ERROR });
     })
  }
}

//check if user is logged in
export const GET_USER = 'GET_USER';
export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const getUser = () => {
  return dispatch => {
    dispatch({ type: GET_USER });
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("token");
    if (token === null) {
      dispatch({ type: AUTH_ERROR });
    } else {
      dispatch({ type: AUTHENTICATED, username: username });
    }
  }
}

//logUserIn (from login)
//set received token to state and localStorage
//set received username to localStorage
export const logUserIn = (userData) => {
  return dispatch => {
    dispatch({ type: GET_USER })
    axios.put(`${backend_url}/user/login`, userData)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        dispatch({
          type: AUTHENTICATED, 
          username: res.data.username,
          // userNotes: res.data.userNotes,
        })
      })
      .catch((error) => {
        console.log('error logging in', error);
        dispatch({ type: AUTH_ERROR });
      })
  }
}

export const LOGGING_OUT = 'LOGGING_OUT';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const logUserOut = () => {
  return dispatch => {
    dispatch({ type: LOGGING_OUT });
    //change to .removeItem() and remove the set token
    localStorage.clear();
    dispatch({ type: LOG_OUT_SUCCESS });
  }
}

//deleteUser