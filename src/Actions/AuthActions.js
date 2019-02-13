//log user in 

//check if user is logged in
export const GET_USER = 'GET_USER';
export const SUCCESS = 'SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

export const getUser = () => {
  return dispatch => {
    dispatch({type: GET_USER});
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log('user data', user);
    if (user === null) {
      dispatch({ type: AUTH_ERROR });
    } else {
      dispatch({ type: SUCCESS, username: user.username });
    }
  }
}