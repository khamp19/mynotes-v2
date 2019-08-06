import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';

import { getNote, deleteNote } from '../../Actions/NotesActions';
import { getUser } from '../../Actions/AuthActions';
// import './noteDetail.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    height: '100vh',
    // marginTop: '30px',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // maxWidth: '400px',
    width: '400px',
    minWidth: '200px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

//needs edit and delete functions as buttons
//link the home button back to the homepage

class NoteDetail extends Component {
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
    this.props.getUser();
  }

  deleteNote = () => {
    const note_id = this.props.match.params.id;
    console.log('note id', note_id);
    this.props.deleteNote(note_id);
    this.props.history.push('/notes');
  }

  render() {
    const { title, content, created_at, username } = this.props.note;
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
      <div className="note-detail-container">
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
              <div className={classes.paper}>
                {this.props.error ? <h4>Error getting this note</h4> : null}
                {this.props.note ?
                  <div>
                    <Typography variant="h5">
                      {title}
                    </Typography>
                    <div style={{ paddingTop: '30px', paddingLeft: '10px' }}>
                      <Typography variant="body1">
                        {content}
                      </Typography>
                      <Typography variant="body1">
                        created by {username} on {date}
                      </Typography>
                    </div>
                  </div>
                  : null
                }
                
                {loggedInUser === username ? 
                  <Grid container justify="flex-end" >
                    <Grid item>
                      <Link to={`/notes/${note_id}/update`} component={RouterLink} variant="body2" >
                        <Button 
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.submit}>
                          Edit
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Button
                        style={{ backgroundColor: 'red', marginLeft: '10px' }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.deleteNote}>
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                  :
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link to='/login' component={RouterLink} variant="body2">
                        Please log in as {username} to edit or delete this note
                      </Link>
                    </Grid>
                  </Grid>
                }
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to='/notes' component={RouterLink} variant="body2" >
                      <Button>Back</Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

NoteDetail.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    getting_note: state.SelectedNoteReducer.getting_note,
    note: state.SelectedNoteReducer.note,
    error: state.SelectedNoteReducer.note_error,
  }
}


export default connect(mapStateToProps, { getNote, getUser, deleteNote })(withStyles(styles)(NoteDetail));


