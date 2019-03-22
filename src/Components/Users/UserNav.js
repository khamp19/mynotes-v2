import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser } from '../../Actions/AuthActions';

import Logout from '../Authentication/logout';
import './userNav.css';
//user navigation navbar
//if not logged in, shows login option
//if logged in has links to user dashboard, create note, and logout button

class UserNav extends Component {

  componentDidMount() {
    this.props.getUser();
    // this.setState({ loggedIn: this.props.loggedIn })
  }

  render(){
    if (this.props.loggedIn === false) {
      return (
        <div className="user-nav-container">
          <div className="button-container">
            <Link to='/login'>
              <button className="nav-button">Login</button>
            </Link>
            <Link to='/notes'>
              <button className="nav-button">Notes</button>
            </Link>
            <Link to='/register'>
              <button className="nav-button">Register</button>
            </Link>
          </div>
        </div>
      )
    }

    return(
      <div className="user-nav-container">
        <div className="button-container">
          <Link to='/notes'>
            <button className="nav-button">Notes</button>
          </Link>
          <Logout />
        </div>
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