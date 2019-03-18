import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

//should let user create un and pw
//should save un and pw to backend
//should get a token from the backend
//should set token to localStorage then
//should redirect to user dashboard or all notes

class Register extends Component {
  state = {
    username: '',
    password: '',
    token: '',
    toHome: false,
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  createUser = (e) => {
    e.preventDefault();
    // console.log('new user info', this.state);
    let username = this.state.username.toLowerCase();
    this.setState({ username: username });
    localStorage.setItem('username', this.state.username);
    axios.post('https://lit-lake-67095.herokuapp.com/user/register', this.state)
      .then(res => {
        console.log('response', res);
        this.setState({
          token: res.data.token,
          toHome: true,
        });
        localStorage.setItem('token', this.state.token);
      })
      .catch(err => console.log(err));
    this.setState({
      username: '',
      password: '',
    })
  }

  render() {
    if (this.state.toHome === true) {
      return <Redirect to='/notes' />
    }
    return (
      <div>
        <p>hello from Register</p>
        <p>please create a username and password</p>
        <div>
          <form onSubmit={this.createUser}>
            <input
              name="username"
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleInput} />
            <input
              name="password"
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleInput} />
          </form>
          <button onClick={this.createUser}>Create User</button>
        </div>
      </div>
    )
  }
}

export default Register;