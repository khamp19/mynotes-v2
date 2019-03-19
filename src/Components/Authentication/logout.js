//create a button that clears localStorage and
//updates the logged-in status (to false)

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logUserOut } from '../../Actions/AuthActions';

class LogoutButton extends Component {
  // state = {
  //   loggedIn: true,
  // }
  
  logMeOut = (e) => {
    e.preventDefault();
    this.props.logUserOut();
    // this.setState({ loggedIn: false });
    console.log('logging you out');
  }

  render() {
    return (
      <div>
        <button onClick={this.logMeOut}>
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

export default connect(mapStateToProps, { logUserOut })(LogoutButton);