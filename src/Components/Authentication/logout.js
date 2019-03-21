//create a button that clears localStorage and
//updates the logged-in status (to false)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logUserOut } from '../../Actions/AuthActions';

class LogoutButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
    }
  }
  
  logMeOut = (e) => {
    e.preventDefault();
    this.props.logUserOut();
    this.setState({ loggedIn: false });
    console.log('logging you out');
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <button onClick={this.logMeOut.bind(this)}>
          Log Out
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggingOut: state.AuthReducer.loggingOut,
    loggedIn: state.AuthReducer.loggedIn,
  }
}

export default withRouter(connect(mapStateToProps, { logUserOut })(LogoutButton));