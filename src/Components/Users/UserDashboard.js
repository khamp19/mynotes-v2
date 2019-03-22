import React, {Component} from 'react';
import { connect } from 'react-redux';

//import actions 
import { getUser, getUserNotes } from '../../Actions/AuthActions';
//action for getting the notes of the user
 
//get all notes, then filter by username?

class UserDashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      userNotes: [],
      loggedIn: false,
    }
  }

  componentDidMount(){
    this.props.getUser();
    this.props.getUserNotes();
    setTimeout(() => {
      this.setState({
        loggedIn: this.props.loggedIn,
        username: this.props.username,
        userNotes: this.props.userNotes,
        // username: this.props.user.username,
        // notes: this.props.user.notes,
      })
    })
  }

  render(){
    // const token = localStorage.getItem('token');
    // if (!token){
    if(this.state.loggedIn === false) {
      return(
        <div>Please log in to view this page</div>
      )
    }
    
    //if logged in, return the profile info for the user
      //and an array of their notes
    return(
      <div>
        <p>Welcome to Your Dashboard</p>
        <div>
          <h3>Your Notes</h3>
          <div>
            {this.state.userNotes.map((note, i) => {
              return (
                <li key={i}>{note._id}</li>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.AuthReducer.username,
    loggedIn: state.AuthReducer.loggedIn,
    userNotes: state.AuthReducer.userNotes,
  }
}

export default connect(mapStateToProps, { getUser, getUserNotes })(UserDashboard);