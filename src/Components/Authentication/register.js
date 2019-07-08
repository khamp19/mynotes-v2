import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser, getUser } from '../../Actions/AuthActions';
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
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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



class Register extends Component {
  state = {
    username: '',
    password: '',
    loggedIn: false,
  }

  //check logged-in status
  async componentDidMount() {
    await this.props.getUser();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.loggedIn !== prevProps.loggedIn) {
      await this.props.getUser();
    }
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
    if (this.props.loggedIn === true) {
      return <Redirect to='/notes' />
    }

    const { username, password } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Grid container component="main" 
          spacing={0} 
          direction="column"
          alignItems="center"
          justify="center"
        >
          <CssBaseline />
          <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form} noValidate onSubmit={this.createUser}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={this.handleInput}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={this.handleInput}
                />
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

Register.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    loggedIn: state.AuthReducer.loggedIn,
  }
}
export default connect(mapStateToProps, { addUser, getUser })(withStyles(styles)(Register));
