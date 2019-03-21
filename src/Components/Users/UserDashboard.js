import React, {Component} from 'react';
import { connect } from 'react-redux';

//import actions 
import { getUser } from '../../Actions/AuthActions';
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
    this.setState({
      loggedIn: this.props.loggedIn,
      username: this.props.username,
      // username: this.props.user.username,
      // notes: this.props.user.notes,
    })
    console.log('dahsboard props', this.props);
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
      <div>hello from UserDashboard </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.AuthReducer.username,
    // password: state.password,
    // loggedIn: state.AuthReducer.loggedIn,
  }
}

export default connect(mapStateToProps, { getUser })(UserDashboard);