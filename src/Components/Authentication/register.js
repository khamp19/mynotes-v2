import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser, getUser } from '../../Actions/AuthActions';
import './register.css';
//should let user create un and pw
//should save un and pw to backend
//should get a token from the backend
//should set token to localStorage then
//should redirect to user dashboard or all notes

class Register extends Component {
  state = {
    username: '',
    password: '',
    loggedIn: false,
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

  createUser = (e) => {
    e.preventDefault();
    let username = this.state.username.toLowerCase();
    this.setState({ username: username });
    this.props.addUser(this.state)
    setTimeout(()=> { 
      this.setState({
        loggedIn: this.props.loggedIn,
      });
    }, 700)
    this.setState({
      username: '',
      password: '',
    })

  }

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to='/notes' />
    }
    return (
      <div className="reg-container">
        <h3>please create a username and password</h3>
        <div className="registration">
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
          <button className="create-user-button"
            onClick={this.createUser}>
            Create User
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.AuthReducer.loggedIn,
  }
}
export default connect(mapStateToProps, { addUser, getUser }) (Register);
