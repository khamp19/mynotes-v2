import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getUser } from '../../Actions/AuthActions';

// import login action

// import connect and mapstatetoprops then connect the 
// loguserin fn and un and pw from state

//allow user to send username and password to backend
//set received token to state and localStorage
//set received username to localStorage
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  LogUserIn = (e) => {
    e.preventDefault();
    let username = this.state.username.toLowerCase();
    this.setState({ username: username });
    axios.put('https://lit-lake-67095.herokuapp.com/user/login', this.state)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        this.setState({
          loggedIn: true,
        })
        this.props.getUser();
      })
      .catch(err => console.log(err))
    this.setState({
      username: '',
      password: ''
    })
  }


  //need to render navigation and logout after logging in
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h2>please log in</h2>
        <div>
          <form onSubmit={this.LogUserIn}>
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
            <button onClick={this.LogUserIn}>Log In</button>
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

export default connect(mapStateToProps, { getUser })(Login);