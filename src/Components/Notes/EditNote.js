import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { getNote, updateNote, deleteNote } from '../../Actions/NotesActions';
import { getUser } from '../../Actions/AuthActions';
// import './editNote.css';

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

class EditNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: '',
    }
  }

  async componentDidMount(){
    await this.props.getUser();
    this.props.getNote(this.props.match.params.id);
    setTimeout(()=> {
      if(this.props.note) {
        this.setState({
          title: this.props.note.title,
          content: this.props.note.content,
        })
      }
    }, 300)
  }
  

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  updateNote = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const noteData = {
      title: this.state.title,
      content: this.state.content,
    }
    this.props.updateNote(id, noteData);
    this.setState({
      title: '',
      content: '',
    })
    setTimeout(()=> {
      this.props.history.push(`/notes/${id}`);
    }, 500);
  }

  deleteNote = () => {
    const note_id = this.props.match.params.id;
    console.log('note id', note_id);
    this.props.deleteNote(note_id);
    this.props.history.push('/notes');
  }

  render() {
    const { title, content } = this.state;
    const { classes } = this.props;
    let note_id = '';
    if(this.props.note){
      note_id = this.props.note.id 
    }
    let loggedInUser = localStorage.getItem('username');
    // if(this.props.username){
    //   loggedInUser = this.props.username;
    // }
    if(!loggedInUser){
      return (
        <div className="edit-note-container">
          <p>you must be logged in to edit this note</p>
          <Link to={`/notes/${note_id}`}>
            <button>Back</button>
          </Link>
        </div> 
      )
    } else if(this.props.note.username !== loggedInUser){
      return(
        <div className="edit-note-container">
         <p>you are not authorized to edit this note</p>
          <Link to={`/notes/${note_id}`}>
            <button className="nav-button">Back</button>
          </Link>
        </div> 
      )
    }

    return(
      <div className="edit-note-container">
        <div>
          {this.props.error ? <h4>error getting note</h4> : null}
          {this.props.note &&
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
                  <Typography component="h1" variant="h5" style={{ marginBottom: '20px'}} >
                    Edit this note
                  </Typography>
                  <form className={classes.form} noValidate>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="title"
                      label="title"
                      name="title"
                      value={title}
                      onChange={this.handleInput}
                    />
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      multiline
                      rows="6"
                      name="content"
                      label="content"
                      type="content"
                      id="content"
                      value={content}
                      onChange={this.handleInput}
                    />
                    <Grid container justify="flex-end">
                      <Grid item style={{ marginRight: '5px' }} >
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={this.updateNote}
                        >
                          Update Note
                        </Button>
                      </Grid>
                      <Grid item style={{ marginRight: '5px' }}>
                        <Button
                          style={{ backgroundColor: 'red' }}
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={this.deleteNote}
                        >
                          Delete Note
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                      <Link to={`/notes/${note_id}`} component={RouterLink} >
                        <Button>Back</Button>
                      </Link>
                    </Grid>
                  </form>
                </div>
              </Grid>
            </Grid>
          }
        </div>
      </div>
    )
  }


}

EditNote.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    getting_note: state.SelectedNoteReducer.getting_note,
    note: state.SelectedNoteReducer.note,
    error: state.SelectedNoteReducer.error,
  }
}

export default connect(mapStateToProps, { getNote, getUser, updateNote, deleteNote })(withStyles(styles)(EditNote));

