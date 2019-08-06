import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link as RouterLink } from 'react-router-dom';

//import add note action
import { addNote } from '../../Actions/NotesActions';
import { getUser } from '../../Actions/AuthActions';
// import './addNote.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


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

//creates a new note
//on success, redirects to the new note page
class AddNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: '',
      saved: false,
      loggedIn: false,
    }
  }

  componentDidMount() {
    this.props.getUser();
    setTimeout(() => {
      this.setState({ loggedIn: this.props.loggedIn});
    }, 100);
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  saveNote = (e) => {
    e.preventDefault();
    const newNote = {
      username: localStorage.getItem('username'),
      title: this.state.title,
      content: this.state.content,
    }
    // if(!newNote.title){
    //   alert 'please add a title'
    // }
    this.props.addNote(newNote);
    // setTimeout(()=> {
    //   this.setState({
    //     saved: true,
    //     title: '',
    //     content: '',
    //     // note_id: this.props.note.id
    //   })
    //   this.props.match.params.id = this.props.note.id;
    // }, 500)
    this.props.history.push('/notes');
  }

  render() {
    if(this.state.loggedIn === false){
      return(
        <div className="add-note-container">
          <p>Please log in to create a note</p>
        </div>
      )
    }
    // if(this.state.saved === true) {
    //   const { id } = this.props.match.params.id;
    //   return <Redirect to={`/notes/${this.props.match.params.id}`} />
    // }

    const { title, content } = this.state;
    const { classes } = this.props;

    return (
      <div styles={{ marginBottom: '50px' }}>
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
                  <div>
                  <Typography component="h1" variant="h5" style={{ marginLeft: '30%' }} >
                      Add New Note
                    </Typography>
                    <div style={{ paddingTop: '30px', paddingLeft: '10px' }}>
                      <form className={classes.form} noValidate onSubmit={this.LogIn}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          label="title"
                          name="title"
                          value={title}
                          autoFocus
                          onChange={this.handleInput}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          multiline
                          rows="4"
                          name="content"
                          label="content"
                          type="content"
                          id="content"
                          value={content}
                          onChange={this.handleInput}
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={this.saveNote}
                        >
                          Save Note
                        </Button>
                      </form>
                      <Grid container justify="flex-end">
                        <Grid item>
                          <Link to='/notes' component={RouterLink} variant="body2" >
                            <Button>Back</Button>
                          </Link>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

AddNote.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    saving: state.SelectedNoteReducer.saving,
    error: state.SelectedNoteReducer.save_error,
    note: state.SelectedNoteReducer.note,
    loggedIn: state.AuthReducer.loggedIn,
  }
}

export default connect(mapStateToProps, { addNote, getUser })(withStyles(styles)(AddNote));