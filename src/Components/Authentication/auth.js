import React from 'react';
import { connect } from 'react-redux';

import Login from './login';
import { getUser } from '../../Actions/AuthActions';

//check to see if user is logged in (in localStorage)
const Auth = (App) => {
  return class extends React.Component {
    componentDidMount() {
      this.props.getUser();
    }

    render() {
      if (this.state.loggedIn === true) return <App />
      return <Login />
    }
  }
}

const mapStateToProps = state => {
  return {
    getting_user: state.getting_user,
    loggedIn: state.loggedIn,
    username: state.username,
    error: state.error,
  }
}

export default connect(mapStateToProps, { getUser })(Auth);

// const Auth = () => {
//     return (
//       <div>
//         <div>
//           <p>hello from Auth</p>
//         </div>
//         <div>
//           <p>Auth Check</p>
//           <Login />
//         </div>
//       </div>
//     )
// }
// export default Auth;