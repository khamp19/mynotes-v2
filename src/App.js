import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import { getUser } from './Actions/AuthActions';
import LandingPage from './Components/landingPage';


class App extends Component {
  state = {
    loggedIn: false,
  }

  componentDidMount() {
    this.props.getUser();
    setTimeout(() => {
      this.setState({loggedIn: this.props.loggedIn});
    }, 50)
  }
  
  render() {
    if(this.state.loggedIn === true){
      return <Redirect to='/notes' />
    }
    return (
      <div className="App">
        <div>
          <LandingPage />
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
// export default App;