export const GET_USER = 'GET_USER';
export const SUCCESS = 'SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGGING_OUT = 'LOGGING_OUT';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';

//check if user is logged in
export const getUser = () => {
  return dispatch => {
    dispatch({type: GET_USER});
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user === null) {
      dispatch({ type: AUTH_ERROR });
    } else {
      dispatch({ type: SUCCESS, username: user.username });
    }
  }
}

export const logUserOut = () => {
  return dispatch => {
    dispatch({ type: LOGGING_OUT});
    localStorage.clear();
    dispatch({ type: LOG_OUT_SUCCESS});
  }
}