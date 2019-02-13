import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Actions/AuthActions';

// import login action

// import connect and mapstatetoprops then connect the 
// loguserin fn and un and pw from state

//allow user to set username and password
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  LogUserIn = (e) => {
    e.preventDefault();
    console.log("logging you in");
    const user = {
      username: this.state.username,
      password: this.state.password,
    }
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({
      username: '',
      password:''
    })
    //call login action function here
    this.props.getUser();
  }

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
    username: state.username,
    password: state.password
  }
}

export default connect(mapStateToProps, { getUser }) (Login);