import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//import actions

//import components
import Login from '../Authentication/login';
import Logout from '../Authentication/logout';

//user navigation navbar
//if not logged in, shows login option
//if logged in has links to user dashboard, create note, and logout button

class UserNav extends Component {
  state = {
    loggedIn: false,
  }

  //use component did mount to get loggedIn status from redux store
  //update logged in status here to render right element
  render(){
    if(this.state.loggedIn === false) {
      return <Login />
    }

    return(
      <div>
        <p>Logged into User Navbar</p>
      </div>
    )
  }
}

export default UserNav;