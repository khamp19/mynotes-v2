import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Logout from './logout';
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
      token: '',
      loggedIn: false,
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    if(token) {
      this.setState({ loggedIn: true})
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  LogUserIn = (e) => {
    e.preventDefault();
    axios.put('https://lit-lake-67095.herokuapp.com/user/login', this.state)
      .then( res => {
        this.setState({ 
          token: res.data.token,
          loggedIn: true,
        })
        localStorage.setItem("token", this.state.token);
        localStorage.setItem("user", this.state.username);
      })
    this.setState({
      username: '',
      password:''
    })
    //REDUX: call login action function here
    // this.props.getUser();
  }
  
  
  //need to render navigation and logout after logging in
  render() {
    if(this.state.loggedIn === true) {
      return (
        <div>
          <Logout />
        </div>
      )
    }

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
    username: state.username,
    password: state.password
  }
}

export default connect(mapStateToProps, { getUser }) (Login);