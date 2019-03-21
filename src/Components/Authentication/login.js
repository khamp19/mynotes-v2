import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logUserIn, getUser } from '../../Actions/AuthActions';
import Redirect from 'react-router-dom/Redirect';

//allow user to send username and password to backend
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
    }
  }

  //check login status
  componentDidMount() {
    this.props.getUser();
    setTimeout(() => {
      this.setState({
        loggedIn: this.props.loggedIn,
      });
    }, 200)
  }


  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  LogIn = (e) => {
    e.preventDefault();
    let username = this.state.username.toLowerCase();
    this.setState({ username: username });
    this.props.logUserIn(this.state);
    setTimeout(()=>{
      this.setState({loggedIn: this.props.loggedIn})
    }, 500)
    this.setState({
      username: '',
      password: ''
    })
  }


  render() {
    if(this.state.loggedIn === true){
      return <Redirect to='/notes' />
    }

    const { username, password } = this.state;
    return (
      <div>
        <h2>please log in</h2>
        <div>
          <form onSubmit={this.LogIn}>
            <input
              placeholder="username"
              name="username"
              type="text"
              value={username}
              onChange={this.handleInput}
            />
            <input
              placeholder="password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleInput}
            />
            <button onClick={this.LogIn}>Log In</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // username: state.username,
    // password: state.password,
    loggedIn: state.AuthReducer.loggedIn,
  }
}

export default connect(mapStateToProps, { logUserIn, getUser })(Login);