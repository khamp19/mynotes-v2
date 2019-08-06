import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNote, deleteNote } from '../../Actions/NotesActions';
import { getUser } from '../../Actions/AuthActions';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    height: '100vh',
    marginTop: '30px',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '400px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#5aa6a2',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

// import './register.css';
//should let user create un and pw
//should save un and pw to backend
//should get a token from the backend
//should set token to localStorage then
//should redirect to user dashboard or all notes



class NoteDetailTest extends Component {
  state = {
    username: '',
    password: '',
    fullname: '',
    email: '',
    emailRep: '',
    loggedIn: false,
  }

  //check logged-in status
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
    this.props.getUser();
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
    this.props.addUser(this.state);
    // setTimeout(()=> { 
    //   this.setState({
    //     loggedIn: this.props.loggedIn,
    //   });
    // }, 700)
    this.setState({
      username: '',
      password: '',
    })

  }

  render() {
    const { title, content, created_at, username, fullname, password } = this.props.note;
    const { classes } = this.props;
    const note_id = this.props.match.params.id;
    let loggedInUser = localStorage.getItem('username');
    // if(this.props.username){
    //   loggedInUser = this.props.username;
    // }
    console.log(this.props.note);
    let date = String(created_at);
    date = date.substr(0, 10);
    date = moment(date, "YYYY-MM-DD").format("MMM Do YYYY");

    return (
      <div>
        <Grid container component="main"
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.root}
        >
          <CssBaseline />
          <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
            <div className={classes.paper} fullWidth >
              <Typography component="h1" variant="h5" fullWidth>
                {title}
              </Typography>
              <Typography component="h1" variant="h5" fullWidth>
                {content}
              </Typography>
              <form className={classes.form} noValidate onSubmit={this.createUser}>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.createUser}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to='/login' component={RouterLink} variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

NoteDetailTest.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    getting_note: state.SelectedNoteReducer.getting_note,
    note: state.SelectedNoteReducer.note,
    error: state.SelectedNoteReducer.note_error,
  }
}

export default connect(mapStateToProps, { getNote, getUser, deleteNote  })(withStyles(styles)(NoteDetailTest));
