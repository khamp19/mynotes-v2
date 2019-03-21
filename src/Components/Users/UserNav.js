import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//import actions
import { getUser } from '../../Actions/AuthActions';

//import components
import Login from '../Authentication/login';
import Logout from '../Authentication/logout';

//user navigation navbar
//if not logged in, shows login option
//if logged in has links to user dashboard, create note, and logout button

class UserNav extends Component {

  //use component did mount to get loggedIn status from redux store
  componentDidMount() {
    this.props.getUser();
    // this.setState({ loggedIn: this.props.loggedIn })
  }

  redir = () => {
    this.props.history.push('/');
  }
  
  //update logged in status here to render right element
  render(){
    if (this.props.loggedIn === false) {
      return <Login />
    }

    return(
      <div>
        <p>Logged into User Navbar</p>
        <Link to='/notes'>
          <button>Notes</button>
        </Link>
        <Link to='/dashboard'>
          <button>Dashboard</button>
        </Link>
        <Logout />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.AuthReducer.loggedIn,
    loggingOut: state.AuthReducer.loggingOut,
  }
}

export default connect(mapStateToProps, { getUser })(UserNav);