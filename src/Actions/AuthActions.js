export const GET_USER = 'GET_USER';
export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGGING_OUT = 'LOGGING_OUT';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';

//check if user is logged in
//backend endpoints: 
// const backend_url = 'https://lit-lake-67095.herokuapp.com';
//register: axios.post(`${backend_url}/user/register`)
//login: axios.put(`${backend_url}/user/login`)
//user dashboard: axios.get(`${backend_url}/user/dashboard`)
//delete user: axios.delete(`${backend_url}/user/delete-account`)

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

export const logUserOut = () => {
  return dispatch => {
    dispatch({ type: LOGGING_OUT });
    //change to .removeItem() and remove the set token
    localStorage.clear();
    dispatch({ type: LOG_OUT_SUCCESS });
  }
}
