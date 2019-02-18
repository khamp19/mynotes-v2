import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import { getUser } from './Actions/AuthActions';
import LandingPage from './Components/landingPage';
import Login from './Components/Authentication/login';
import SuccessPage from './Components/Authentication/loginSuccess';


class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>App under construction</p>
        </header>
        <div>
          <LandingPage />
        </div>
        <div>
          {this.props.loggedIn ? <SuccessPage /> : <Login />}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    getting_user: state.AuthReducer.getting_user,
    loggedIn: state.AuthReducer.loggedIn,
    username: state.AuthReducer.username,
    auth_error: state.AuthReducer.auth_error,
  }
}

export default connect(mapStateToProps, { getUser })(App);